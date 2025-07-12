"use client";

import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, X, ImageIcon } from "lucide-react";
import { ProductItem } from "@/lib/redux/features/productSlice";

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (
        product: Omit<ProductItem, "id" | "createdOn">,
        images: File[],
        deletedImages: string[]
    ) => void;
    product?: ProductItem | null;
}

const ProductModal: React.FC<ProductModalProps> = ({
    isOpen,
    onClose,
    onSave,
    product,
}) => {
    const [formData, setFormData] = useState({ name: "", summary: "", power: "" });
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [deletedImages, setDeletedImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            if (product) {
                setFormData({
                    name: product.name,
                    summary: product.summary,
                    power: product.power,
                });
                setImagePreviews(product.images);
                setDeletedImages([]);
                setSelectedImages([]);
            } else {
                setFormData({ name: "", summary: "", power: "" });
                setImagePreviews([]);
                setDeletedImages([]);
                setSelectedImages([]);
            }
        }
    }, [isOpen, product]);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setSelectedImages((prev) => [...prev, ...files]);
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...newPreviews]);
    };

    const removeImage = (index: number) => {
        const isExistingImage = product && index < product.images.length;
        if (isExistingImage) {
            const removed = product.images[index];
            setDeletedImages((prev) => [...prev, removed]);
            setImagePreviews((prev) => prev.filter((_, i) => i !== index));
        } else {
            const newImageIndex = product ? index - product.images.length : index;
            setSelectedImages((prev) =>
                prev.filter((_, i) => i !== newImageIndex)
            );
            setImagePreviews((prev) => prev.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (
            !formData.name.trim() ||
            !formData.summary.trim() ||
            !formData.power.trim()
        ) {
            return;
        }

        setIsLoading(true);
        try {
            await onSave(
                {
                    name: formData.name.trim(),
                    summary: formData.summary.trim(),
                    power: formData.power.trim(),
                    images: imagePreviews,
                },
                selectedImages,
                deletedImages
            );
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {product ? "Edit Product" : "Add New Product"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                                }
                                placeholder="Enter product name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="summary">Summary *</Label>
                            <Textarea
                                id="summary"
                                value={formData.summary}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, summary: e.target.value }))
                                }
                                placeholder="Enter product summary"
                                rows={3}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="power">Power *</Label>
                            <Input
                                id="power"
                                value={formData.power}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, power: e.target.value }))
                                }
                                placeholder="e.g., 100W, High, Medium"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Product Images</Label>
                            <div className="space-y-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full h-24 border-2 border-dashed border-gray-300 hover:border-green-400 transition-colors"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <Upload className="w-6 h-6 text-gray-400" />
                                        <span className="text-sm text-gray-600">
                                            Click to upload images or drag and drop
                                        </span>
                                    </div>
                                </Button>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageSelect}
                                    className="hidden"
                                />

                                {imagePreviews.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {imagePreviews.map((src, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={src}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-24 object-cover rounded-lg border"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                        <p className="text-sm">No images selected</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gradient-to-r from-green-300 to-green-600 hover:from-green-700 hover:to-purple-700"
                        >
                            {isLoading
                                ? "Saving..."
                                : product
                                    ? "Update Product"
                                    : "Create Product"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ProductModal;
