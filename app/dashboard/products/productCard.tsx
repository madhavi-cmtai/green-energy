import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { ProductItem } from '@/lib/redux/features/productSlice';

interface ProductCardProps {
    product: ProductItem;
    onEdit: (product: ProductItem) => void;
    onDelete: (product: ProductItem) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    return (
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-md">
            <CardContent className="p-0">
                {/* Image Section */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden">
                    {product.images.length > 0 ? (
                        <>
                            <img
                                src={product.images[currentImageIndex]}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>

                                    {/* Image indicators */}
                                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                                        {product.images.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <ImageIcon className="w-16 h-16 text-gray-400" />
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-4 space-y-3">
                    <div>
                        <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                            {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                            {product.summary}
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            Power: {product.power}
                        </span>
                        <span className="text-xs text-gray-500">
                            {new Date(product.createdOn as string).toLocaleDateString()}
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(product)}
                            className="flex-1 hover:bg-blue-50 hover:border-blue-300"
                        >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDelete(product)}
                            className="flex-1 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                        >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
