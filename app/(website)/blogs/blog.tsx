"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lightbulb, Sparkles } from "lucide-react"
import BlogSection from "@/components/home/blogs-section"
import TestimonialSection from "./testimonial"
import CallToActionSection from "./call-to-action"

// Animation Variants
export const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
    },
}

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
}


// Hero section with animation and explore button
const HeroSection = () => {
    return (
        <>
            <section className="-mt-20 relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
                {/* Animated Backgrounds */}
                <div className="absolute inset-0">
                    {/* Radial Gradient Overlay */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            background: [
                                "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.4) 0%, transparent 50%)",
                                "radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)",
                                "radial-gradient(circle at 40% 80%, rgba(34, 197, 94, 0.4) 0%, transparent 50%)",
                                "radial-gradient(circle at 60% 30%, rgba(16, 185, 129, 0.4) 0%, transparent 50%)",
                            ],
                        }}
                        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                    />

                    {/* Energy Light Patterns */}
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                linear-gradient(45deg, transparent 40%, rgba(16, 185, 129, 0.3) 50%, transparent 60%),
                linear-gradient(-45deg, transparent 40%, rgba(6, 182, 212, 0.3) 50%, transparent 60%),
                linear-gradient(135deg, transparent 40%, rgba(34, 197, 94, 0.2) 50%, transparent 60%)
              `,
                        }}
                        animate={{
                            backgroundPosition: ["0% 0%", "100% 100%"],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />

                    {/* Energy Particles */}
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -50, 0],
                                x: [0, Math.random() * 30 - 15, 0],
                                opacity: [0.3, 1, 0.3],
                                scale: [1, 2, 1],
                            }}
                            transition={{
                                duration: 4 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}

                    {/* Floating Orbs */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={`orb-${i}`}
                            className="absolute w-4 h-4 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-60 blur-sm"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -100, 0],
                                x: [0, Math.random() * 50 - 25, 0],
                                scale: [1, 1.5, 1],
                                opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                                duration: 6 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 3,
                            }}
                        />
                    ))}
                </div>

                {/* Blurred background image */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <Image
                        src="/images/blogs/blogs.jpg"
                        alt="Blur Background"
                        fill
                        className="object-cover w-full h-full opacity-40 blur-[1px]"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        className="text-center max-w-5xl mx-auto"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-full px-6 py-3 mb-8"
                            variants={fadeInUp}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 30px rgba(16, 185, 129, 0.5)",
                                backgroundColor: "rgba(16, 185, 129, 0.3)",
                            }}
                        >
                            <motion.div
                                animate={{
                                    rotate: [0, 360],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 2, repeat: Infinity },
                                }}
                            >
                                <Lightbulb className="w-5 h-5 text-emerald-400" />
                            </motion.div>
                            <span className="text-emerald-300 font-semibold">Knowledge Hub</span>
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Sparkles className="w-4 h-4 text-emerald-400" />
                            </motion.div>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight"
                            variants={fadeInUp}
                            style={{
                                textShadow: "0 0 20px rgba(16, 185, 129, 0.5), 0 0 40px rgba(16, 185, 129, 0.3)",
                            }}
                        >
                            Latest{" "}
                            <motion.span
                                className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                style={{
                                    backgroundSize: "200% 200%",
                                }}
                            >
                                Blogs
                            </motion.span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            className="text-xl lg:text-2xl text-emerald-100 mb-12 leading-relaxed max-w-4xl mx-auto"
                            variants={fadeInUp}
                        >
                            Discover the latest developments in magnetic energy technology, expert insights, and real-world applications
                            that are shaping the future of clean energy.
                        </motion.p>

                        {/* Explore Button */}
                        <motion.div variants={fadeInUp} className="relative">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full blur-xl opacity-50"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.8, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                            />
                            <Button
                                className="relative bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-8 rounded-full text-lg font-semibold shadow-2xl"
                                onClick={() => document.getElementById("blog-carousel")?.scrollIntoView({ behavior: "smooth" })}
                            >
                                <motion.span className="flex items-center" whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                                    Explore Blogs
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </motion.span>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 🔥 Renders fetched blogs */}
            <BlogSection />
        </>
    )
}

// 🔥 Final Main Blog Page
export default function BlogsPage() {
    return (
        <div className="min-h-screen bg-slate-900">
            <HeroSection />
            <TestimonialSection />
            <CallToActionSection />
        </div>
    )
}
