"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Zap, Download, Phone, Mail, MessageCircle, ArrowLeft, CheckCircle, Star, Shield,Truck,Headphones, X} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductById, selectSelectedProduct, selectIsLoading, selectError } from "@/lib/redux/features/productSlice"
import { AppDispatch } from "@/lib/redux/store"
import type { ProductItem } from "@/lib/redux/features/productSlice"


export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const dispatch = useDispatch<AppDispatch>()
    const product = useSelector(selectSelectedProduct)
    const isLoading = useSelector(selectIsLoading)
    const error = useSelector(selectError)
    const { id } = await params;
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [lightboxImageIndex, setLightboxImageIndex] = useState(0)

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id))
        }
    }, [dispatch, id])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading product...</p>
                </div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h1>
                    <p className="text-gray-600 mb-4">{error || "The requested product could not be found."}</p>
                    <Link href="/products">
                        <Button>Back to Products</Button>
                    </Link>
                </div>
            </div>
        )
    }

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
    }

    const openLightbox = (index: number) => {
        setLightboxImageIndex(index)
        setIsLightboxOpen(true)
    }

    const nextLightboxImage = () => {
        setLightboxImageIndex((prev) => (prev + 1) % product.images.length)
    }

    const prevLightboxImage = () => {
        setLightboxImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2310B981%22%20fillOpacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60"></div>

            <div className="relative z-10">
                {/* Navigation */}
                <div className="p-6">
                    <div className="max-w-7xl mx-auto">
                        <Link href="/products">
                            <Button variant="ghost" className="mb-4 hover:bg-emerald-50">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Products
                            </Button>
                        </Link>

                        {/* Breadcrumb */}
                        <nav className="text-sm text-gray-600 mb-6">
                            <Link href="/products" className="hover:text-emerald-600">
                                Products
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-gray-800">{product.name}</span>
                        </nav>
                    </div>
                </div>

                {/* Hero Section */}
                <section className="px-6 pb-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Image Gallery */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="sticky top-6"
                            >
                                {/* Main Image */}
                                <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-4 cursor-pointer group">
                                    <motion.div
                                        key={currentImageIndex}
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative w-full h-full"
                                        onClick={() => openLightbox(currentImageIndex)}
                                    >
                                        <Image
                                            src={product.images[currentImageIndex] || "/placeholder.svg"}
                                            alt={`${product.name} - View ${currentImageIndex + 1}`}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </motion.div>

                                    {/* Zoom Indicator */}
                                    <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        Click to enlarge
                                    </div>

                                    {/* Navigation Arrows */}
                                    <div className="absolute inset-0 flex items-center justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                prevImage()
                                            }}
                                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                nextImage()
                                            }}
                                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </Button>
                                    </div>

                                    {/* Power Badge */}
                                    <div className="absolute top-4 left-4">
                                        <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                            className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 font-bold shadow-lg"
                                        >
                                            <Zap className="w-4 h-4" />
                                            {product.power}
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Thumbnail Gallery */}
                                <div className="grid grid-cols-5 gap-2">
                                    {product.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                                index === currentImageIndex
                                                    ? "border-emerald-500 scale-105"
                                                    : "border-gray-200 hover:border-emerald-300"
                                            }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`${product.name} thumbnail ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Product Info */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="space-y-8"
                            >
                                {/* Header */}
                                <div>
                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4"
                                    >
                                        {product.name}
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="text-xl text-gray-600 leading-relaxed"
                                    >
                                        {product.summary}
                                    </motion.p>
                                </div>

                                {/* Quick Stats */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="grid grid-cols-2 gap-4"
                                >
                                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                        <div className="text-emerald-600 text-sm font-medium mb-1">Power Output</div>
                                        <div className="text-2xl font-bold text-gray-800">{product.power}</div>
                                    </div>
                                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                        <div className="text-emerald-600 text-sm font-medium mb-1">Use Case</div>
                                        <div className="text-2xl font-bold text-gray-800">{product.specifications?.useCase || "N/A"}</div>
                                    </div>
                                </motion.div>

                                {/* Features */}
                                {product.features && product.features.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.0 }}
                                    >
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {product.features.map((feature, index) => (
                                                <div key={index} className="flex items-center gap-3">
                                                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                                    <span className="text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Action Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2 }}
                                    className="flex flex-col sm:flex-row gap-4"
                                >
                                    <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all">
                                        <Phone className="w-5 h-5 mr-2" />
                                        Get Quote
                                    </Button>
                                    <Button variant="outline" className="px-8 py-4 rounded-xl border-2 border-emerald-200 hover:bg-emerald-50">
                                        <MessageCircle className="w-5 h-5 mr-2" />
                                        Contact Sales
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Lightbox */}
            {isLightboxOpen && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <div className="relative max-w-4xl w-full">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsLightboxOpen(false)}
                            className="absolute top-4 right-4 text-white hover:bg-white/20"
                        >
                            <X className="w-6 h-6" />
                        </Button>
                        
                        <div className="relative h-96 lg:h-[600px]">
                            <Image
                                src={product.images[lightboxImageIndex]}
                                alt={`${product.name} - View ${lightboxImageIndex + 1}`}
                                fill
                                className="object-contain"
                            />
                        </div>
                        
                        <div className="absolute inset-0 flex items-center justify-between p-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={prevLightboxImage}
                                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={nextLightboxImage}
                                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
