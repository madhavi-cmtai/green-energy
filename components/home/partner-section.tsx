"use client"

import { Award } from "lucide-react"
import { motion } from "framer-motion"
import React from "react"

const PartnersSection = () => {
    const partners = [
        "TechCorp Solutions",
        "GreenEnergy Industries",
        "EcoSolutions Global",
        "PowerTech Systems",
        "CleanFuture Energy",
        "EnergyPlus Technologies",
        "Sustainable Power Co",
        "NextGen Energy",
    ]

    return (
        <section className="py-20 bg-gray-900 relative overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-full px-6 py-3 mb-6"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Award className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-300 font-semibold">Industry Leaders</span>
                    </motion.div>

                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        Trusted by{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            Industry Leaders
                        </span>
                    </h2>
                </motion.div>

                {/* Scrolling Partner Cards */}
                <div className="overflow-hidden relative h-[120px]">
                    <motion.div
                        className="flex space-x-6 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {[...partners, ...partners].map((partner, index) => (
                            <motion.div
                                key={index}
                                className="flex-shrink-0 bg-gradient-to-br from-emerald-600 to-teal-700 text-white px-8 py-4 rounded-2xl shadow-lg min-w-[240px] text-center"
                                whileHover={{ scale: 1.05, y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="font-bold text-lg">{partner}</div>
                                <div className="text-emerald-200 text-sm mt-1">Trusted Partner</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default PartnersSection
