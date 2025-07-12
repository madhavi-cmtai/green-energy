"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Shield, Lightbulb, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface Service {
    title: string;
    description: string;
    features: string[];
    category: string;
    image: string;
}

const iconMap: { [key: string]: React.ElementType } = {
    installation: Settings,
    maintenance: Shield,
    consultation: Lightbulb,
};

const ServicesSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await axios.get("/api/routes/services");
                const data: Service[] = res.data.data.map((item: any) => ({
                    title: item.title,
                    description: item.description,
                    features: item.features || [],
                    category: item.category.toLowerCase(),
                    image: item.images?.[0] || "",

                }));
                setServices(data);
            } catch (err) {
                console.error("Error fetching services", err);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (services.length ? (prev + 1) % services.length : 0));
        }, 5000);
        return () => clearInterval(timer);
    }, [services.length]);

    if (loading) {
        return <div className="text-center py-20 text-gray-700">Loading services...</div>;
    }

    if (services.length === 0) {
        return <div className="text-center py-20 text-red-500">No services available.</div>;
    }

    return (
        <section
            id="services"
            className="py-24 bg-gradient-to-br from-gray-50 to-emerald-50 relative overflow-hidden"
        >
            {/* Background */}
            <motion.div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2310b981' fillOpacity='0.4'%3E%3Cpath d='M50 50c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
                animate={{ backgroundPosition: ["0px 0px", "80px 80px"] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
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
                        <Settings className="w-5 h-5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Our Services</span>
                    </motion.div>

                    <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
                        Complete{" "}
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Solutions
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        From initial consultation to ongoing maintenance, we provide comprehensive
                        services to ensure your magnetic energy system operates at peak performance.
                    </p>
                </motion.div>

                {/* Slider */}
                <div className="relative max-w-6xl mx-auto">
                    <div className="overflow-hidden rounded-3xl shadow-2xl bg-white">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                className="relative"
                                initial={{ opacity: 0, x: 300 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -300 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="grid lg:grid-cols-2">
                                    {/* Image Section */}
                                    <div className="relative h-96 lg:h-auto">
                                        {services[currentSlide]?.image && (
                                            <Image
                                                src={services[currentSlide].image}
                                                alt={services[currentSlide].title}
                                                fill
                                                className="object-cover"
                                            />
                                        )}


                                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

                                        {/* Icon */}
                                        <motion.div
                                            className="absolute top-8 left-8 w-16 h-16 bg-emerald-500/90 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                                            animate={{
                                                boxShadow: [
                                                    "0 0 0 0 rgba(16, 185, 129, 0.4)",
                                                    "0 0 0 20px rgba(16, 185, 129, 0)",
                                                ],
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            {React.createElement(
                                                iconMap[services[currentSlide].category] || Lightbulb,
                                                { className: "w-8 h-8 text-white" }
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-12 flex flex-col justify-center">
                                        <motion.h3
                                            className="text-4xl font-bold text-gray-900 mb-6"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            {services[currentSlide].title}
                                        </motion.h3>

                                        <motion.p
                                            className="text-xl text-gray-600 mb-8 leading-relaxed"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                        >
                                            {services[currentSlide].description}
                                        </motion.p>

                                        <motion.div
                                            className="space-y-3 mb-8"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.4 }}
                                        >
                                            {services[currentSlide].features.map((f, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="flex items-center space-x-3"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                                                >
                                                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                                                    <span className="text-gray-700 font-medium">{f}</span>
                                                </motion.div>
                                            ))}
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 1 }}
                                        >
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Slide Indicators */}
                    <div className="flex justify-center mt-8 space-x-3">
                        {services.map((_, index) => (
                            <button
                                key={index}
                                className={`w-4 h-4 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-emerald-600 w-12" : "bg-gray-300"
                                    }`}
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
