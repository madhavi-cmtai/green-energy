"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Gauge, Zap, Shield, Lightbulb, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HeroSection = () => {
    const stats = [
        { number: "500+", label: "Installations", icon: Home },
        { number: "99.9%", label: "Uptime", icon: Gauge },
        { number: "50MW", label: "Generated", icon: Zap },
        { number: "24/7", label: "Support", icon: Shield },
    ];

    // ✅ Fix: Generate particles only on client side
    const [particles, setParticles] = useState<
        { left: string; top: string; delay: number; duration: number }[]
    >([]);
    const router = useRouter();
    useEffect(() => {
        const p = Array.from({ length: 20 }).map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: Math.random() * 2,
            duration: 3 + Math.random() * 4,
        }));
        setParticles(p);
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            background: [
                                "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)",
                                "radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
                                "radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)",
                                "radial-gradient(circle at 60% 30%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
                            ],
                        }}
                        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
                    />
                </div>

                {/* Grid Pattern */}
                <motion.div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
            `,
                        backgroundSize: "50px 50px",
                    }}
                    animate={{ backgroundPosition: ["0px 0px", "50px 50px"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                {/* ✅ Fixed Particles */}
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-30"
                        style={{ left: p.left, top: p.top }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 py-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* LEFT SIDE */}
                    <motion.div
                        className="text-center lg:text-left"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <motion.div
                            className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-full px-6 py-3 mb-8"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Lightbulb className="w-5 h-5 text-emerald-400" />
                            <span className="text-emerald-300 font-medium">Revolutionary Technology</span>
                        </motion.div>

                        <motion.h1
                            className="text-4xl lg:text-6xl xl:text-6xl font-bold text-white mb-6 leading-tight"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            Power the{" "}
                            <motion.span className="relative inline-block" whileHover={{ scale: 1.05 }}>
                                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                                    Future
                                </span>
                                <motion.div
                                    className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 1.5, delay: 1.2 }}
                                />
                            </motion.span>
                            <br />
                            with{" "}
                            <motion.span
                                className="text-emerald-400"
                                animate={{
                                    textShadow: [
                                        "0 0 20px rgba(16, 185, 129, 0.5)",
                                        "0 0 40px rgba(16, 185, 129, 0.8)",
                                        "0 0 20px rgba(16, 185, 129, 0.5)",
                                    ],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                Magnetic Energy
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            className="text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            Experience the next generation of clean energy with our revolutionary magnetic electricity generators.
                            <span className="text-emerald-400 font-semibold"> Zero fuel, infinite possibilities.</span>
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-6 mb-16 -mt-5"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button onClick={() => router.push("/products")} 
                                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-10 py-6 rounded-full text-lg font-semibold shadow-2xl group relative overflow-hidden">
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "100%" }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <span className="relative flex items-center">
                                        Explore Products
                                        <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                    </span>
                                </Button>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    variant="outline"
                                    onClick={() => router.push("/about")} 
                                    className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white px-10 py-6 rounded-full text-lg font-semibold bg-transparent backdrop-blur-sm group"
                                >
                                    Know More
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT SIDE */}
                    <motion.div
                        className="relative mt-[-50px]"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        <motion.div
                            className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="relative aspect-video bg-gradient-to-br from-emerald-900 to-teal-900">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20"
                                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        className="w-32 h-32 border-4 border-emerald-400 rounded-full flex items-center justify-center cursor-pointer group"
                                        whileHover={{ scale: 1.1 }}
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
                                    >
                                        <Play className="w-12 h-12 text-emerald-400 group-hover:text-white transition-colors ml-1" />
                                    </motion.div>
                                </div>
                            </div>
                            <motion.div
                                className="absolute bottom-4 right-4 w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center"
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Zap className="w-8 h-8 text-emerald-400" />
                            </motion.div>
                        </motion.div>

                        {/* STATS */}
                        <motion.div
                            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center group"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <motion.div
                                        className="w-12 h-12 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-500/30 transition-all duration-300"
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <stat.icon className="w-6 h-6 text-emerald-400" />
                                    </motion.div>
                                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                                    <div className="text-gray-400 text-sm">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
