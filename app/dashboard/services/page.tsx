"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose,} from "@/components/ui/dialog";
import { Loader2, Plus, Edit, Trash2, Search, Image as ImageIcon, Headphones, ClipboardList,   Activity, Zap, Sun, BatteryCharging, Settings, Shield, Lightbulb,} from "lucide-react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices, selectServices, selectError, selectIsLoading, addService, updateService, deleteService, ServiceItem,} from "@/lib/redux/features/serviceSlice";
import { AppDispatch } from "@/lib/redux/store";
import { toast } from "sonner";

type FormState = Omit<ServiceItem, "id" | "createdOn" | "updatedOn">;

export default function ServicesPage() {
    const dispatch = useDispatch<AppDispatch>();
    const services = useSelector(selectServices);
    const isLoading = useSelector(selectIsLoading);

    const categoryOptions = [
        { value: "installation", label: "Installation", icon: <Settings className="w-4 h-4 text-green-600" /> },
        { value: "support", label: "Support", icon: <Headphones className="w-4 h-4 text-green-600" /> },
        { value: "planning", label: "Planning", icon: <ClipboardList className="w-4 h-4 text-green-600" /> },
        { value: "maintenance", label: "Maintenance", icon: <Shield className="w-4 h-4 text-green-600" /> },
        { value: "monitoring", label: "Monitoring", icon: <Activity className="w-4 h-4 text-green-600" /> },
        { value: "energy", label: "Energy", icon: <Zap className="w-4 h-4 text-green-600" /> },
        { value: "solar", label: "Solar", icon: <Sun className="w-4 h-4 text-green-600" /> },
        { value: "battery", label: "Battery", icon: <BatteryCharging className="w-4 h-4 text-green-600" /> },
        { value: "Energy Consultation", label: "Battery", icon: < Lightbulb className="w-4 h-4 text-green-600" /> },
    ];

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editItem, setEditItem] = useState<ServiceItem | null>(null);
    const [deleteItem, setDeleteItem] = useState<ServiceItem | null>(null);
    const [form, setForm] = useState<FormState>({
        title: "",
        description: "",
        category: categoryOptions[0].value,
        features: [],
        images: [],
    });
    const [featuresInput, setFeaturesInput] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const filteredServices = useMemo(
        () =>
            (Array.isArray(services) ? services : []).filter((s) =>
                s.title.toLowerCase().includes(search.toLowerCase())
            ),
        [services, search]
    );

    const openAddModal = () => {
        setEditItem(null);
        setForm({
            title: "",
            description: "",
            category: categoryOptions[0].value,
            features: [],
            images: [],
        });
        setImageFile(null);
        setImagePreview(null);
        setModalOpen(true);
    };

    const openEditModal = (service: ServiceItem) => {
        setEditItem(service);
        setForm({
            title: service.title,
            description: service.description,
            category: service.category,
            features: service.features || [],
            images: service.images || [],
        });
        setImagePreview(service.images?.[0] || null);
        setModalOpen(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("category", form.category || categoryOptions[0].value || "");
        formData.append("features", JSON.stringify(form.features));
        if (imageFile) formData.append("image", imageFile);
        else if (editItem?.images?.[0]) formData.append("image", editItem.images[0]);

        try {
            if (editItem) {
                await dispatch(updateService(formData, editItem.id));
                toast.success("Service updated!");
            } else {
                await dispatch(addService(formData));
                toast.success("Service added!");
            }
            await dispatch(fetchServices());
            setModalOpen(false);
        } catch {
            toast.error("Failed to submit service.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteItem) return;
        setLoading(true);
        await dispatch(deleteService(deleteItem.id));
        await dispatch(fetchServices());
        setLoading(false);
        setDeleteItem(null);
        toast.success("Service deleted!");
    };

    const handleFeatureAdd = () => {
        if (featuresInput.trim()) {
            setForm((prev) => ({
                ...prev,
                features: [...prev.features, featuresInput.trim()],
            }));
            setFeaturesInput("");
        }
    };

    const handleFeatureRemove = (idx: number) => {
        setForm((prev) => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== idx),
        }));
    };

    return (
        <div className="mx-auto p-0 flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-2 mb-1 flex-wrap">
                <h2 className="text-xl font-bold text-[var(--primary-green)]" style={{ fontFamily: "var(--font-main)" }}>
                    Services
                </h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-stretch sm:items-center justify-end">
                    <div className="relative w-full sm:w-72">
                        <Input
                            placeholder="Search services..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    <Button
                        onClick={openAddModal}
                        className="gap-2 w-full sm:w-auto bg-[var(--primary-green)] hover:bg-[var(--primary-light-green)]"
                    >
                        <Plus className="w-4 h-4" /> Add Service
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full text-center text-gray-400 py-12">
                        <Loader2 className="w-10 h-10 animate-spin" />
                    </div>
                ) : filteredServices.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400 py-12">No services found.</div>
                ) : (
                    filteredServices.map((service) => {
                        const icon = categoryOptions.find((c) => c.value === service.category)?.icon;
                        return (
                            <div
                                key={service.id}
                                className="bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col overflow-hidden"
                            >
                                <div className="relative w-full h-48 bg-gray-100">
                                    {service.images?.[0] ? (
                                        <Image src={service.images[0]} alt={service.title} fill className="object-cover" />
                                    ) : (
                                        <ImageIcon className="w-16 h-16 text-gray-300 mx-auto" />
                                    )}
                                </div>
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="text-lg font-bold mb-1 flex items-center gap-2" style={{ fontFamily: "var(--font-main)" }}>
                                            {icon}
                                            {service.title}
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-3">{service.description}</p>
                                        <ul className="list-disc text-sm text-gray-700 ml-5 mt-2">
                                            {service.features.map((f, i) => (
                                                <li key={i}>{f}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <Button size="sm" variant="ghost" onClick={() => openEditModal(service)} className="cursor-pointer">
                                            <Edit className="w-4 h-4 mr-1" /> Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => setDeleteItem(service)}
                                            className="text-destructive cursor-pointer"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" /> Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Add/Edit Modal */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>{editItem ? "Edit Service" : "Add Service"}</DialogTitle>
                        </DialogHeader>
                        <Input
                            placeholder="Title"
                            value={form.title}
                            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                            required
                        />
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            placeholder="Description"
                            value={form.description}
                            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px] text-sm"
                        />
                        <label className="block text-sm font-medium">Features</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                value={featuresInput}
                                onChange={(e) => setFeaturesInput(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                                placeholder="Add feature"
                            />
                            <button
                                type="button"
                                onClick={handleFeatureAdd}
                                className="bg-[var(--primary-green)] text-white px-4 py-2 rounded-md"
                            >
                                Add
                            </button>
                        </div>
                        <ul className="flex flex-wrap gap-2">
                            {form.features.map((f, i) => (
                                <li key={i} className="bg-green-100 px-2 py-1 rounded text-sm flex items-center">
                                    {f}
                                    <button type="button" onClick={() => handleFeatureRemove(i)} className="ml-2 text-red-500">
                                        &times;
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <label className="block text-sm font-medium">Category</label>
                        <select
                            value={form.category}
                            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        >

                            <option value="">Select category</option>
                            {categoryOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Image</label>
                            {(imagePreview || form.images?.[0]) && (
                                <img
                                    src={imagePreview || form.images?.[0]}
                                    alt="Preview"
                                    className="w-full h-40 object-cover rounded-lg mb-2 border"
                                />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--primary-green)]/10 file:text-[var(--primary-green)]"
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={loading} className="gap-2 cursor-pointer bg-green-600 hover:bg-green-800">
                                {loading && <Loader2 className="w-4 h-4 animate-spin" />} {editItem ? "Update" : "Add"}
                            </Button>
                            <DialogClose asChild>
                                <Button type="button" variant="ghost">
                                    Cancel
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={!!deleteItem} onOpenChange={(open) => !open && setDeleteItem(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Service</DialogTitle>
                    </DialogHeader>
                    <div>
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-[var(--primary-green)]">{deleteItem?.title}</span>? This action cannot be undone.
                    </div>
                    <DialogFooter>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={loading}
                            className="gap-2 cursor-pointer"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />} Delete
                        </Button>
                        <DialogClose asChild>
                            <Button type="button" variant="ghost" disabled={loading}>
                                Cancel
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
