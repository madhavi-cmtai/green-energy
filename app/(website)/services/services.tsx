"use client"

import ServicesSection from "@/components/home/services-section"
import { motion } from "framer-motion"
import { ShieldCheck, Zap, Leaf, Globe2, Monitor, BatteryCharging, ArrowRight } from "lucide-react"
import Image from "next/image";
import { Button } from "@/components/ui/button";

const services = [
    {
        icon: <Zap className="w-8 h-8 text-emerald-600" />,
        title: "Magnetic Power Systems",
        description: "Efficient, fuel-free magnetic generators designed for residential, commercial, and industrial use.",
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
        title: "Maintenance & Monitoring",
        description: "Round-the-clock health monitoring and remote diagnostics for uninterrupted power delivery.",
    },
    {
        icon: <Leaf className="w-8 h-8 text-emerald-600" />,
        title: "Eco-Friendly Solutions",
        description: "Zero-emission technology designed to reduce your carbon footprint and save long-term costs.",
    },
    {
        icon: <Monitor className="w-8 h-8 text-emerald-600" />,
        title: "Smart Grid Integration",
        description: "Seamless integration with smart home systems and renewable energy management platforms.",
    },
    {
        icon: <BatteryCharging className="w-8 h-8 text-emerald-600" />,
        title: "Backup Power Units",
        description: "Portable and standby units to ensure continuous energy supply during outages or in remote areas.",
    },
    {
        icon: <Globe2 className="w-8 h-8 text-emerald-600" />,
        title: "Global Deployment",
        description: "Logistics, installation, and support services across multiple regions and climates.",
    },
]

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

export default function Services() {
    return (
        <div className="min-h-screen bg-white  px-4">
            <section className="py-44 bg-gradient-to-br from-emerald-600 via-teal-700 to-green-800 relative overflow-hidden">
                <div className="absolute inset-0">
                    {/* Background Image */}
                    <motion.div className="absolute inset-0 overflow-hidden opacity-20 blur-[0.5px]">
                        <Image
                            src="/images/services/services.jpg"
                            alt="background"
                            fill
                            className="object-cover"
                            priority
                        />
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
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
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
                            TRANSFORM POWER INTO 
                            <br />
                            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                PURPOSE
                            </span>
                        </motion.h2>

                        <motion.p
                            className="text-xl lg:text-2xl text-emerald-100 mb-12 leading-relaxed"
                            variants={fadeInUp}
                        >
                            Engineered for efficiency. Designed for sustainability. Delivered to empower communities and industries alike.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-6 justify-center"
                            variants={fadeInUp}
                        >

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

            <div className="-mt-9">
            <ServicesSection />
            </div>
            <div className="max-w-7xl mx-auto text-center mt-9 mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold text-emerald-600 mb-4"
                >
                    Our Services
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-gray-600 text-lg max-w-2xl mx-auto mb-12"
                >
                    We offer complete magnetic power generation solutions — from product delivery to ongoing support and monitoring.
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
                        >
                            <div className="mb-4 flex justify-center">{service.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                            <p className="text-gray-600 text-sm">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
