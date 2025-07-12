"use client";

import { motion } from "framer-motion";
import { Gauge, Settings, Award, Battery, Shield, Users, CheckCircle} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"; 

const WhyChooseUsSection = () => {
    const features = [
        {
            title: "24/7 Monitoring",
            icon: Gauge,
            desc: "Real-time system monitoring and performance analytics",
        },
        {
            title: "Maximum Control",
            icon: Settings,
            desc: "Complete control over your energy generation and distribution",
        },
        {
            title: "Proven Efficiency",
            icon: Award,
            desc: "Industry-leading 99.2% energy conversion efficiency",
        },
        {
            title: "Reliable Power",
            icon: Battery,
            desc: "Consistent, uninterrupted power generation",
        },
        {
            title: "Trusted Technology",
            icon: Shield,
            desc: "Backed by years of research and development",
        },
        {
            title: "Expert Support",
            icon: Users,
            desc: "Dedicated technical support and maintenance services",
        },
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
                
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
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">
                            Why Choose MagneGen
                        </span>
                    </motion.div>

                    <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
                        Unmatched{" "}
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Excellence
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Experience the difference with our cutting-edge technology,
                        exceptional service, and commitment to sustainable energy solutions.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group cursor-pointer"
                        >
                            <Card className="p-8 text-center border-2 border-transparent hover:border-emerald-300 transition-all duration-500 hover:shadow-2xl bg-white/80 backdrop-blur-sm group-hover:bg-white h-full">
                                <CardContent className="p-0">
                                    <motion.div
                                        className="relative mb-6"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.div
                                            className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                                            animate={{
                                                boxShadow: [
                                                    "0 10px 30px rgba(16, 185, 129, 0.2)",
                                                    "0 20px 40px rgba(16, 185, 129, 0.3)",
                                                    "0 10px 30px rgba(16, 185, 129, 0.2)",
                                                ],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Number.POSITIVE_INFINITY,
                                            }}
                                        >
                                            <feature.icon className="w-10 h-10 text-white" />
                                        </motion.div>

                                        {/* Animated Ring */}
                                        <motion.div
                                            className="absolute inset-0 border-2 border-emerald-300/30 rounded-2xl"
                                            animate={{ rotate: [0, 360] }}
                                            transition={{
                                                duration: 10,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: "linear",
                                            }}
                                        />
                                    </motion.div>

                                    <h3 className="font-bold text-gray-900 text-xl mb-4 group-hover:text-emerald-700 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.desc}
                                    </p>

                                    {/* Hover Effect Line */}
                                    <motion.div className="w-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-6 group-hover:w-16 transition-all duration-500" />
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUsSection;
