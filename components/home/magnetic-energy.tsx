"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    Zap,
    Recycle,
    Leaf,
    Settings,
    Lightbulb,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
    const images = [
        "/images/home/magEnergy/mag1.jpeg",
        "/images/home/magEnergy/mag2.jpeg",
        "/images/home/magEnergy/mag3.jpeg",
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const benefits = [
        {
            icon: Zap,
            title: "Zero Fuel Required",
            desc: "Self-sustaining magnetic field generation with no external energy input",
            color: "from-yellow-400 to-orange-500",
        },
        {
            icon: Recycle,
            title: "Continuous Generation",
            desc: "24/7 uninterrupted power output through perpetual magnetic motion",
            color: "from-green-400 to-emerald-500",
        },
        {
            icon: Leaf,
            title: "100% Eco-Friendly",
            desc: "Zero emissions, zero waste, minimal environmental footprint",
            color: "from-emerald-400 to-teal-500",
        },
        {
            icon: Settings,
            title: "Scalable Design",
            desc: "Modular systems from residential to industrial applications",
            color: "from-blue-400 to-cyan-500",
        },
    ];

    return (
        <section id="about" className="py-20 bg-white relative overflow-hidden">
            {/* Background Elements */}
            <motion.div
                className="absolute top-0 right-0 w-96 h-80 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full opacity-30 blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{ duration: 15, repeat: Infinity }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center space-x-2 bg-emerald-100 border border-emerald-200 rounded-full px-6 py-3 mb-6"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Lightbulb className="w-5 h-5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">
                            Revolutionary Technology
                        </span>
                    </motion.div>

                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                        Magnetic Electricity{" "}
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Generator
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-7xl mx-auto leading-relaxed">
                        Our breakthrough magnetic electricity generator harnesses the power
                        of permanent magnets to create a continuous, clean energy source
                        that operates without any external fuel or power input. This
                        revolutionary technology represents the future of sustainable energy
                        generation.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="grid sm:grid-cols-2 gap-8">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    className="group"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.15 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                >
                                    <Card className="p-8 h-full border-2 border-transparent hover:border-emerald-200 transition-all duration-500 hover:shadow-2xl bg-gradient-to-br from-white to-gray-50 group-hover:from-emerald-50 group-hover:to-teal-50">
                                        <CardContent className="p-0">
                                            <motion.div
                                                className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                                                whileHover={{ rotate: 360, scale: 1.1 }}
                                                transition={{ duration: 0.6 }}
                                            >
                                                <benefit.icon className="w-8 h-8 text-white" />
                                            </motion.div>
                                            <h3 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-emerald-700 transition-colors">
                                                {benefit.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {benefit.desc}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <motion.div
                            className="relative z-10 rounded-3xl overflow-hidden"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Image
                                src={images[currentImageIndex]}
                                alt="Magnetic Generator"
                                width={400}
                                height={400}
                                className="w-full h-auto transition-opacity duration-1000"
                                key={images[currentImageIndex]}
                            />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-teal-500/20"
                                animate={{ opacity: [0.2, 0.4, 0.2] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-emerald-200"
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-sm font-semibold text-gray-800">
                                        Active
                                    </span>
                                </div>
                                <div className="text-xs text-gray-600 mt-1">Generating 50kW</div>
                            </motion.div>
                            <motion.div
                                className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-teal-200"
                                animate={{ y: [5, -5, 5] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1,
                                }}
                            >
                                <div className="flex items-center space-x-2">
                                    <Zap className="w-4 h-4 text-yellow-500" />
                                    <span className="text-sm font-semibold text-gray-800">
                                        Efficiency
                                    </span>
                                </div>
                                <div className="text-xs text-gray-600 mt-1">99.2% Output</div>
                            </motion.div>
                        </motion.div>

                        {/* Magnetic Field Rings */}
                        <motion.div
                            className="absolute inset-0 border-4 border-emerald-300/30 rounded-full"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute inset-8 border-2 border-teal-300/20 rounded-full"
                            animate={{ rotate: [360, 0] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Background Glow */}
                        <motion.div
                            className="absolute -inset-4 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-2xl"
                            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutPage;
