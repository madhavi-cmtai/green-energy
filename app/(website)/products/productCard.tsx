"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Zap, ArrowRight, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import type { ProductItem } from "@/lib/redux/features/productSlice"

interface ProductCardProps {
    product: ProductItem
}

export default function ProductCard({ product }: ProductCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
    }

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
    }

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden group cursor-pointer"
        >
            {/* Image Carousel */}
            <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                >
                    <Image
                        src={product.images[currentImageIndex] || "/placeholder.svg"}
                        alt={`${product.name} - View ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                    />
                </motion.div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Carousel Controls */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-between p-4 z-10"
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={prevImage}
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/20"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={nextImage}
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/20"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </motion.div>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    {product.images.map((_, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setCurrentImageIndex(index)
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? "bg-white scale-125" : "bg-white/60"
                                }`}
                        />
                    ))}
                </div>

                {/* Power Output Badge */}
                <div className="absolute top-4 right-4 z-10">
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

                {/* View Count Badge */}
                <div className="absolute top-4 left-4 z-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm"
                    >
                        <Eye className="w-3 h-3" />
                        {product.images.length}
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                            {product.name}
                        </h3>
                        <div className="text-right">
                            <div className="text-xs text-gray-500 uppercase tracking-wide">{product.specifications?.useCase}</div>
                        </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">{product.summary}</p>

                    {/* Quick Specs Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-3 border border-emerald-100">
                            <span className="text-emerald-600 text-xs font-medium block mb-1">EFFICIENCY</span>
                            <span className="font-bold text-gray-800">{product.specifications?.efficiency}</span>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-3 border border-emerald-100">
                            <span className="text-emerald-600 text-xs font-medium block mb-1">WARRANTY</span>
                            <span className="font-bold text-gray-800">{product.specifications?.warranty}</span>
                        </div>
                    </div>

                    {/* Features Preview */}
                    <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                            {product.features?.slice(0, 2).map((feature, index) => (
                                <span key={index} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                                    {feature}
                                </span>
                            ))}
                            {product.features?.length && product.features.length > 2 && (
                                <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                                    +{product.features.length - 2} more
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Link href={`/products/${product.id}`} className="flex-1">
                            <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all group/btn">
                               Buy Now
                                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            className="px-6 py-3 rounded-xl border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-colors text-emerald-600 bg-transparent"
                        >
                            Quote
                        </Button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
