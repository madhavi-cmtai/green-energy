"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import Image from "next/image"
import React from "react"

const testimonials = [
    {
        name: "Aarav Mehta",
        role: "GreenTech Engineer",
        message:
            "The magnetic generator has completely transformed our energy consumption. It's efficient, reliable, and truly the future of sustainable power.",
        image: "/placeholder.svg?height=80&width=80&text=A",
        rating: 5,
    },
    {
        name: "Sana Kapoor",
        role: "Eco Consultant",
        message:
            "Installing this generator in our eco-housing project was the best decision. Minimal maintenance and zero emissions make it a game changer.",
        image: "/placeholder.svg?height=80&width=80&text=S",
        rating: 4,
    },
    {
        name: "Rahul Verma",
        role: "Energy Officer",
        message:
            "Scalable and powerful. We've deployed the system across multiple units with outstanding performance and efficiency.",
        image: "/placeholder.svg?height=80&width=80&text=R",
        rating: 5,
    },
    {
        name: "Ishita Rao",
        role: "Sustainability Lead",
        message:
            "Exceptional service, outstanding performance. A must-have for every green initiative.",
        image: "/placeholder.svg?height=80&width=80&text=I",
        rating: 5,
    },
    {
        name: "Dev Sharma",
        role: "Industrial Lead",
        message:
            "We cut costs and boosted efficiency using this magnetic tech. Highly recommended!",
        image: "/placeholder.svg?height=80&width=80&text=D",
        rating: 4,
    },
]

const TestimonialSection = () => {
    return (
        <section className="py-24 bg-gray-700 relative overflow-hidden" id="testimonials">
            {/* Animated Background Pattern (Same as PartnersSection) */}
            <motion.div
                className="absolute inset-0 opacity-10 z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2310b981' fillOpacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
                animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Heading */}
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-full px-6 py-3 mb-6"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Quote className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-300 font-semibold">Testimonials</span>
                    </motion.div>

                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                        What Our{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            Clients Say
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                        Hear from those who have experienced the future of clean energy first-hand.
                    </p>
                </motion.div>

                {/* Sliding Testimonial Cards */}
                <div className="overflow-hidden relative">
                    <motion.div
                        className="flex space-x-6 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 40,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {[...testimonials, ...testimonials].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="flex-shrink-0 w-[300px] bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 rounded-3xl shadow-xl backdrop-blur-md hover:shadow-2xl transition-all"
                                whileHover={{ scale: 1.05, y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        width={50}
                                        height={50}
                                        className="rounded-full border-2 border-white"
                                    />
                                    <div>
                                        <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                                        <p className="text-emerald-100 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>

                                {/* ⭐ Rating below name/role */}
                                <div className="flex gap-1 mb-4 ml-14">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>

                                <p className="text-sm text-white/90">"{testimonial.message}"</p>
                            </motion.div>

                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default TestimonialSection
