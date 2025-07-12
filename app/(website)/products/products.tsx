"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductItem } from "@/lib/redux/features/productSlice";
import ProductCard from "./productCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProducts,
    selectProducts,
    selectIsLoading,
    selectError,
} from "@/lib/redux/features/productSlice";
import { AppDispatch } from "@/lib/redux/store";

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
    },
};

const staggerContainer = {
    visible: {
        transition: {
            staggerChildren: 0.3,
        },
    },
};


export default function ProductsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector(selectProducts);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    const [position, setPosition] = useState({ top: "0%", left: "0%" });

    useEffect(() => {
        setPosition({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
        });
    }, []);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const displayProducts = products.length > 0 ? products : [];

    return (
        <>
            {/* Hero Section */}
            <section className="py-40 bg-gradient-to-br from-emerald-600 via-teal-700 to-green-800 relative overflow-hidden">
                <div className="absolute inset-0">
                    {/* Background Image */}
                    <motion.div className="absolute inset-0 overflow-hidden opacity-20 blur-[0.5px]">
                        <Image src="/images/about/earth.jpg" alt="background" fill className="object-cover" priority />
                    </motion.div>

                    {/* Glowing Light Backgrounds */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            background: [
                                "radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                                "radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                                "radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                            ],
                        }}
                        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                    />

                    {/* Energy Particles */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-white rounded-full opacity-60"
                            style={position}
                            animate={{
                                y: [0, -40, 0],
                                opacity: [0.6, 1, 0.6],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 4 + Math.random() * 3,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        className="text-center max-w-4xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.h2
                            className="text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight"
                            variants={fadeInUp}
                        >
                            ENERGISING EARTH <br />
                            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                WITHOUT COSTING IT
                            </span>
                        </motion.h2>

                        <motion.p
                            className="text-xl lg:text-2xl text-emerald-100 mb-12 leading-relaxed"
                            variants={fadeInUp}
                        >
                            Join the revolution towards sustainable energy and help create a cleaner, greener future for generations to come.
                        </motion.p>

                        <motion.div className="flex flex-col sm:flex-row gap-6 justify-center" variants={fadeInUp}>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button className="bg-white ml-3 text-emerald-700 hover:bg-emerald-50 px-12 py-7 rounded-full text-lg font-semibold shadow-2xl">
                                    Explore Our Technology <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    variant="outline"
                                    className="border-2 border-white text-white hover:bg-white hover:text-emerald-700 px-10 py-7 rounded-full text-lg font-semibold bg-transparent backdrop-blur-sm"
                                >
                                    Contact Us
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Product Range</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            From residential to utility-scale applications, find the perfect magnetic generator for your energy needs
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {isLoading ? (
                            <div className="col-span-full text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                                <p className="text-gray-600">Loading products...</p>
                            </div>
                        ) : error ? (
                            <div className="col-span-full text-center py-12">
                                <p className="text-red-600 mb-4">Error loading products: {error}</p>
                                <p className="text-gray-600">Showing fallback products...</p>
                            </div>
                        ) : null}
                        {displayProducts.map((product: ProductItem, index: number) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
