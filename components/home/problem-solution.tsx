"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TrendingUp, AlertTriangle, Leaf, Lightbulb, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"; // Adjust this path to match your setup

const ProblemStatementPage = () => {
    const problems = [
        {
            icon: TrendingUp,
            title: "Growing Energy Demand",
            description:
                "Global energy consumption is increasing exponentially, putting unprecedented strain on existing power infrastructure.",
            image: "/images/home/growing-demand.jpg",
            stats: "40% increase by 2040",
        },
        {
            icon: AlertTriangle,
            title: "Environmental Impact",
            description:
                "Current dependence on fossil fuels is causing irreversible damage to our planet's climate and ecosystems.",
            image: "/images/home/enviroment-impact.jpg",
            stats: "75% of emissions from energy",
        },
        {
            icon: Leaf,
            title: "Need for Clean Solutions",
            description:
                "The urgent requirement for sustainable, eco-friendly energy solutions that can meet growing demand without environmental cost.",
            image: "/images/home/eco-friendly.jpg",
            stats: "Net zero by 2050",
        },
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">
            {/* Background Pattern */}
            <motion.div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ef4444' fillOpacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
                animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
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
                        className="inline-flex items-center space-x-2 bg-red-100 border border-red-200 rounded-full px-6 py-3 mb-2"
                        whileHover={{ scale: 1.05 }}
                    >
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <span className="text-red-700 font-semibold">Critical Challenge</span>
                    </motion.div>

                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        The Energy{" "}
                        <span className="text-red-600 relative inline-block">
                            Crisis
                            <motion.div
                                className="absolute -bottom-2 left-0 w-full h-1 bg-red-400 origin-left"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                viewport={{ once: true }}
                            />
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed">
                        Our planet faces an unprecedented energy challenge that demands immediate action and innovative solutions.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid lg:grid-cols-3 gap-12 -mt-5">
                    {problems.map((problem, index) => (
                        <motion.div
                            key={index}
                            className="group"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                        >
                            <Card className="h-full border-2 border-transparent hover:border-red-200 transition-all duration-500 hover:shadow-2xl bg-white/80 backdrop-blur-sm overflow-hidden group-hover:bg-white">
                                <div className="relative aspect-[4/3] overflow-hidden -mt-6">
                                    <Image
                                        src={problem.image || "/placeholder.svg"}
                                        alt={problem.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    {/* Icon */}
                                    <motion.div
                                        className="absolute top-4 right-4 w-12 h-12 bg-red-500/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                                        animate={{
                                            boxShadow: [
                                                "0 0 0 0 rgba(239, 68, 68, 0.4)",
                                                "0 0 0 20px rgba(239, 68, 68, 0)",
                                            ],
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <problem.icon className="w-6 h-6 text-white" />
                                    </motion.div>

                                    {/* Stats Badge */}
                                    <motion.div
                                        className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <span className="text-red-600 font-bold text-sm">{problem.stats}</span>
                                    </motion.div>
                                </div>

                                <CardContent className="p-8 -mt-7">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                                        {problem.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">{problem.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    className="text-center mt-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center space-x-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl cursor-pointer"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
                        }}
                    >
                        <Lightbulb className="w-6 h-6" />
                        <span>Discover Our Solution</span>
                        <ArrowRight className="w-5 h-5" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProblemStatementPage;
