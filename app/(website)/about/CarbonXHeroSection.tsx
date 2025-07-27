"use client"

import { Award, Battery, CheckCircle, Container, ContainerIcon, DollarSign, Globe, Hospital, Leaf, MapPin, Settings, Shield, Sun, Target, TrendingUp, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Building, Users } from 'lucide-react';
import CarbonXPage from "./carbonPage";
import { useState } from "react";


const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
}

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
}
// Static dot animation positions
const dotPositions = [
    { left: "10%", top: "20%", delay: 0.2, duration: 4 },
    { left: "30%", top: "40%", delay: 0.4, duration: 3.5 },
    { left: "50%", top: "60%", delay: 0.6, duration: 4.5 },
    { left: "70%", top: "30%", delay: 0.3, duration: 3.8 },
    { left: "90%", top: "80%", delay: 0.1, duration: 4.2 },
    { left: "15%", top: "10%", delay: 0.5, duration: 4.7 },
    { left: "25%", top: "70%", delay: 0.6, duration: 3.9 },
    { left: "85%", top: "50%", delay: 0.2, duration: 4.1 },
    { left: "35%", top: "90%", delay: 0.4, duration: 4.3 },
    { left: "65%", top: "20%", delay: 0.3, duration: 3.7 },
    { left: "5%", top: "85%", delay: 0.7, duration: 4.4 },
    { left: "75%", top: "10%", delay: 0.2, duration: 4.5 },
    { left: "55%", top: "35%", delay: 0.3, duration: 3.6 },
    { left: "20%", top: "50%", delay: 0.4, duration: 4.6 },
    { left: "40%", top: "15%", delay: 0.1, duration: 3.8 },
    { left: "60%", top: "75%", delay: 0.5, duration: 4.2 },
    { left: "80%", top: "65%", delay: 0.6, duration: 3.9 },
    { left: "10%", top: "45%", delay: 0.2, duration: 4 },
    { left: "45%", top: "25%", delay: 0.3, duration: 4.1 },
    { left: "70%", top: "85%", delay: 0.5, duration: 3.7 },
]

const CarbonXHeroSection = () => {
    const features = [
        {
            title: "Real-Time Data",
            description: "Verified carbon prices and project info via oracles",
            icon: TrendingUp,
        },
        {
            title: "On-Chain Credit System",
            description: "Transparent tracking of every credit lot",
            icon: Container,
        },
        {
            title: "Digital Impact Certificate",
            description: "Generated instantly when CX is retired",
            icon: Award,
        },
        {
            title: "CX Token (ERC-20)",
            description: "Fully tradable, fractional carbon credit token",
            icon: Zap,
        },
        {
            title: "Decentralized Trading Platform",
            description: "Simple, fast, and trustless carbon trading",
            icon: Globe,
        },
    ]

    return (
        <section className="py-24 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)",
                            "radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
                            "radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)",
                        ],
                    }}
                    transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                />

                {/* Glowing dots animation */}
                {dotPositions.map((dot, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-60"
                        style={{ left: dot.left, top: dot.top }}
                        animate={{
                            scale: [1, 2, 1],
                            opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                            duration: dot.duration,
                            repeat: Infinity,
                            delay: dot.delay,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Heading */}
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <motion.div
                        className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-full px-6 py-3 mb-8"
                        variants={fadeInUp}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Container className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-300 font-semibold">
                            Blockchain Technology
                        </span>
                    </motion.div>

                    <motion.h2
                        className="text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
                        variants={fadeInUp}
                    >
                        Powered by{" "}
                        <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                            Web3
                        </span>
                    </motion.h2>

                    <motion.p
                        className="text-xl lg:text-2xl text-emerald-100 mb-12 leading-relaxed max-w-4xl mx-auto"
                        variants={fadeInUp}
                    >
                        CarbonX uses blockchain to make carbon credit trading transparent,
                        traceable, and accessible to all – in real time.
                    </motion.p>
                </motion.div>

                {/* Features */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={scaleIn}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group"
                        >
                            <Card className="h-full border-2 border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-500 hover:shadow-2xl bg-white/10 backdrop-blur-sm group-hover:bg-white/20">
                                <CardContent className="p-6">
                                    <motion.div
                                        className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </motion.div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

const TechnologyTimelineSection = () => {
    const timelineItems = [
        {
            year: "2024",
            status: "completed",
            title: "TRL 7 Prototype",
            description: "300 kW prototype successfully developed and tested",
            icon: CheckCircle,
            color: "from-green-500 to-emerald-600",
        },
        {
            year: "Current",
            status: "progress",
            title: "TRL 8 Validation",
            description: "Comprehensive validation testing underway",
            icon: Settings,
            color: "from-blue-500 to-cyan-600",
        },
        {
            year: "Sept 2025",
            status: "upcoming",
            title: "5 MW Commercial Launch",
            description: "Full-scale commercial deployment ready",
            icon: Zap,
            color: "from-purple-500 to-pink-600",
        },
    ]

    const certifications = [
        { name: "CE", description: "European Conformity" },
        { name: "ISO", description: "International Standards" },
        { name: "BIS", description: "Bureau of Indian Standards" },
        { name: "IEC", description: "International Electrotechnical" },
        { name: "IEEE", description: "Institute of Electrical Engineers" },
    ]

    const testingAreas = [
        { name: "Grid Stability", icon: Shield, progress: 85 },
        { name: "Weather Resistance", icon: Sun, progress: 92 },
        { name: "Load Testing", icon: Battery, progress: 78 },
    ]

    return (
        <section className="py-24 bg-gradient-to-br from-slate-900 to-emerald-900 relative overflow-hidden">
            {/* Background Effects */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        "radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)",
                        "radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)",
                        "radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)",
                    ],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-20"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <motion.div
                        className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-full px-6 py-3 mb-6"
                        whileHover={{ scale: 1.05 }}
                    >
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-300 font-semibold">Development Progress</span>
                    </motion.div>

                    <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8">
                        Technology Development{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            Timeline
                        </span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <motion.div
                    className="relative mb-20"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {/* Timeline Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-purple-500 transform -translate-y-1/2" />

                    <div className="grid md:grid-cols-3 gap-8">
                        {timelineItems.map((item, index) => (
                            <motion.div key={index} className="relative" variants={scaleIn} whileHover={{ y: -10, scale: 1.02 }}>
                                <Card className="h-full border-2 border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-500 bg-slate-800/50 backdrop-blur-sm group">
                                    <CardContent className="h-full flex flex-col justify-between p-6 text-center">

                                        {/* Status Indicator */}
                                        <motion.div
                                            className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg relative`}
                                            animate={
                                                item.status === "progress"
                                                    ? {
                                                        boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0.4)", "0 0 0 20px rgba(59, 130, 246, 0)"],
                                                    }
                                                    : {}
                                            }
                                            transition={item.status === "progress" ? { duration: 2, repeat: Number.POSITIVE_INFINITY } : {}}
                                        >
                                            <item.icon className="w-8 h-8 text-white" />
                                            {item.status === "completed" && (
                                                <motion.div
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.5 }}
                                                >
                                                    <CheckCircle className="w-4 h-4 text-white" />
                                                </motion.div>
                                            )}
                                        </motion.div>

                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                                            {item.year}
                                        </h3>
                                        <h4 className="text-lg font-semibold text-emerald-400 mb-3">{item.title}</h4>
                                        <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>

                                        {/* Progress indicator for current item */}
                                        {item.status === "progress" && (
                                            <motion.div
                                                className="mt-4 bg-slate-700 rounded-full h-2 overflow-hidden"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.8 }}
                                            >
                                                <motion.div
                                                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: "65%" }}
                                                    transition={{ duration: 2, delay: 1 }}
                                                />
                                            </motion.div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Timeline connector */}
                                <motion.div
                                    className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-emerald-500 rounded-full z-10 border-4 border-slate-900"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                />

                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Certifications */}
                <motion.div
                    className="mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h3 className="text-3xl font-bold text-white text-center mb-8">📜 Certifications & Standards</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-lg px-6 py-3"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.3)" }}
                            >
                                <div className="text-emerald-300 font-bold text-lg">{cert.name}</div>
                                <div className="text-gray-400 text-xs">{cert.description}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Testing Areas */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                    <h3 className="text-3xl font-bold text-white text-center mb-8">🔧 Grid Testing Progress</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {testingAreas.map((area, index) => (
                            <motion.div key={index} variants={scaleIn}>
                                <Card className="border-2 border-emerald-500/30 bg-slate-800/50 backdrop-blur-sm">
                                    <CardContent className="p-6 text-center">
                                        <area.icon className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                                        <h4 className="text-white font-semibold mb-3">{area.name}</h4>
                                        <div className="bg-slate-700 rounded-full h-3 overflow-hidden mb-2">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${area.progress}%` }}
                                                transition={{ duration: 1.5, delay: index * 0.2 }}
                                            />
                                        </div>

                                        <span className="text-emerald-400 font-bold">{area.progress}%</span>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}


const MarketSegmentsAndRevenue = () => {
    const marketTiers = [
        {
            tier: "Tier 1",
            priority: "🥇",
            title: "Industrial Clusters & Data Centers",
            description:
                "High-capacity installations for industrial complexes and data processing facilities",
            capacity: "50-100 MW",
            examples: [
                "Manufacturing Plants",
                "Data Centers",
                "Industrial Parks",
                "Mining Operations",
            ],
            color: "from-yellow-400 to-orange-500",
            icon: Building,
        },
        {
            tier: "Tier 2",
            priority: "🥈",
            title: "Hospitals & Universities",
            description:
                "Critical infrastructure requiring reliable, continuous power supply",
            capacity: "10-50 MW",
            examples: [
                "Medical Centers",
                "Universities",
                "Research Facilities",
                "Government Buildings",
            ],
            color: "from-blue-500 to-cyan-500",
            icon: Hospital,
        },
        {
            tier: "Tier 3",
            priority: "🥉",
            title: "Residential & Agriculture",
            description:
                "Distributed power solutions for communities and agricultural operations",
            capacity: "1-10 MW",
            examples: ["Residential Communities", "Farms", "Rural Areas", "Small Businesses"],
            color: "from-green-500 to-emerald-500",
            icon: Users,
        },
    ];


    const revenueStreams = [
        {
            name: "Generator Sales",
            percentage: 40,
            description: "Direct sales of magnetic generator systems",
            icon: Zap,
            colorStart: "#3B82F6", // blue-500
            colorEnd: "#06B6D4",   // cyan-500
            details: ["Hardware Sales", "Installation", "Initial Setup"],
        },
        {
            name: "Power-as-a-Service",
            percentage: 30,
            description: "Subscription-based power delivery model",
            icon: Settings,
            colorStart: "#10B981", // green-500
            colorEnd: "#34D399",   // emerald-500
            details: ["Monthly Subscriptions", "Performance Guarantees", "Maintenance Included"],
        },
        {
            name: "Maintenance Services",
            percentage: 20,
            description: "Ongoing support and maintenance contracts",
            icon: Shield,
            colorStart: "#8B5CF6", // purple-500
            colorEnd: "#EC4899",   // pink-500
            details: ["24/7 Support", "Preventive Maintenance", "Remote Monitoring"],
        },
        {
            name: "Carbon Credits",
            percentage: 10,
            description: "Revenue from carbon credit trading",
            icon: Leaf,
            colorStart: "#F97316", // orange-500
            colorEnd: "#EF4444",   // red-500
            details: ["Credit Generation", "Trading Platform", "Verification Services"],
        },
    ];

    const [selectedStream, setSelectedStream] = useState(0)

    return (
        <>
            {/* Market Segment Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <motion.div
                    className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full opacity-30 blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        className="text-center mb-20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <motion.div className="inline-flex items-center space-x-2 bg-emerald-100 border border-emerald-200 rounded-full px-6 py-3 mb-6">
                            <Target className="w-5 h-5 text-emerald-600" />
                            <span className="text-emerald-700 font-semibold">Market Segments</span>
                        </motion.div>
                        <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
                            Who Is It{" "}
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                For?
                            </span>
                        </h2>
                    </motion.div>

                    <motion.div
                        className="grid lg:grid-cols-3 gap-8 mb-20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        {marketTiers.map((tier, index) => (
                            <motion.div
                                key={index}
                                variants={scaleIn}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group"
                            >
                                <Card className="h-full border-2 border-transparent hover:border-emerald-200 transition-all duration-500 hover:shadow-2xl bg-gradient-to-br from-white to-gray-50 group-hover:from-emerald-50 group-hover:to-teal-50 relative overflow-hidden">
                                    <motion.div
                                        className="absolute top-4 right-4 text-3xl"
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        {tier.priority}
                                    </motion.div>

                                    <CardContent className="p-8">
                                        <motion.div
                                            className={`w-20 h-20 bg-gradient-to-br ${tier.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                                        >
                                            <tier.icon className="w-10 h-10 text-white" />
                                        </motion.div>

                                        <div className="text-center mb-6">
                                            <h3 className="text-sm font-bold text-gray-500 mb-2">{tier.tier}</h3>
                                            <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                                                {tier.title}
                                            </h4>
                                            <p className="text-gray-600 leading-relaxed mb-4">{tier.description}</p>
                                            <div className="bg-emerald-100 rounded-lg p-3 mb-4">
                                                <span className="text-emerald-700 font-bold">Capacity: {tier.capacity}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className="font-semibold text-gray-800 mb-3">Applications:</h5>
                                            <div className="space-y-2">
                                                {tier.examples.map((example, idx) => (
                                                    <motion.div key={idx} className="flex items-center space-x-2">
                                                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                                                        <span className="text-gray-600 text-sm">{example}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </section>

            {/* Revenue Section */}
            <section className="py-24 bg-gradient-to-br from-slate-900 to-emerald-900 relative overflow-hidden">
                {/* Background Effects */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            "radial-gradient(circle at 30% 40%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)",
                            "radial-gradient(circle at 70% 60%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)",
                            "radial-gradient(circle at 30% 40%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)",
                        ],
                    }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        className="text-center mb-20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <motion.div
                            className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-full px-6 py-3 mb-6"
                            whileHover={{ scale: 1.05 }}
                        >
                            <DollarSign className="w-5 h-5 text-emerald-400" />
                            <span className="text-emerald-300 font-semibold">Business Model</span>
                        </motion.div>

                        <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8">
                            Revenue{" "}
                            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Streams</span>
                        </h2>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Interactive Pie Chart */}
                        <motion.div
                            className="relative"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <div className="relative w-80 h-80 mx-auto">
                                {/* Animated Pie Chart */}
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                                    <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="20" />
                                    {revenueStreams.map((stream, index) => {
                                        const previousPercentages = revenueStreams.slice(0, index).reduce((sum, s) => sum + s.percentage, 0)
                                        const circumference = 2 * Math.PI * 80
                                        const strokeDasharray = `${(stream.percentage / 100) * circumference} ${circumference}`
                                        const strokeDashoffset = -((previousPercentages / 100) * circumference)

                                        return (
                                            <motion.circle
                                                key={index}
                                                cx="100"
                                                cy="100"
                                                r="80"
                                                fill="none"
                                                stroke={`url(#gradient-${index})`}
                                                strokeWidth="20"
                                                strokeDasharray={strokeDasharray}
                                                strokeDashoffset={strokeDashoffset}
                                                className="cursor-pointer transition-all duration-300 hover:stroke-width-24"
                                                onClick={() => setSelectedStream(index)}
                                                initial={{ strokeDasharray: `0 ${circumference}` }}
                                                animate={{ strokeDasharray }}
                                                transition={{ duration: 1.5, delay: index * 0.3 }}
                                            />
                                        )
                                    })}
                                    <defs>
                                        {revenueStreams.map((stream, index) => (
                                            <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor={stream.colorStart} />
                                                <stop offset="100%" stopColor={stream.colorEnd} />
                                            </linearGradient>

                                        ))}
                                    </defs>
                                </svg>

                                {/* Center Content */}
                                <motion.div
                                    className="absolute inset-0 flex items-center justify-center"
                                    key={selectedStream}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-white mb-2">{revenueStreams[selectedStream].percentage}%</div>
                                        <div className="text-emerald-300 text-sm font-medium">{revenueStreams[selectedStream].name}</div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Revenue Stream Cards */}
                        <motion.div
                            className="space-y-4"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            {revenueStreams.map((stream, index) => (
                                <motion.div
                                    key={index}
                                    variants={scaleIn}
                                    whileHover={{ scale: 1.02, x: 10 }}
                                    className={`cursor-pointer transition-all duration-300 ${selectedStream === index ? "scale-105" : ""}`}
                                    onClick={() => setSelectedStream(index)}
                                >
                                    <Card
                                        className={`border-2 transition-all duration-300 bg-slate-800/50 backdrop-blur-sm ${selectedStream === index
                                            ? "border-emerald-400/50 shadow-2xl shadow-emerald-500/20"
                                            : "border-emerald-500/20 hover:border-emerald-400/30"
                                            }`}
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex items-start space-x-4">
                                                <motion.div
                                                    style={{
                                                        background: `linear-gradient(to bottom right, ${stream.colorStart}, ${stream.colorEnd})`,
                                                    }}
                                                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                                    transition={{ duration: 0.6 }}
                                                >
                                                    <stream.icon className="w-6 h-6 text-white" />
                                                </motion.div>


                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="text-lg font-bold text-white">{stream.name}</h3>
                                                        <span className="text-2xl font-bold text-emerald-400">{stream.percentage}%</span>
                                                    </div>
                                                    <p className="text-gray-300 text-sm mb-3">{stream.description}</p>

                                                    {/* Progress Bar */}
                                                    <div className="bg-slate-700 rounded-full h-2 overflow-hidden mb-3">
                                                        <stop offset="0%" stopColor={stream.colorStart} />
                                                        <stop offset="100%" stopColor={stream.colorEnd} />

                                                    </div>

                                                    {/* Details */}
                                                    <div className="flex flex-wrap gap-2">
                                                        {stream.details.map((detail, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded text-xs font-medium"
                                                            >
                                                                {detail}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Revenue Projections */}
                    <motion.div
                        className="mt-20 text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <Card className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-2 border-emerald-400/30 backdrop-blur-sm max-w-4xl mx-auto">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold text-white mb-6">5-Year Revenue Projection</h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-emerald-400 mb-2">$50M</div>
                                        <div className="text-gray-300">Year 1 Target</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-teal-400 mb-2">$250M</div>
                                        <div className="text-gray-300">Year 3 Target</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-cyan-400 mb-2">$500M</div>
                                        <div className="text-gray-300">Year 5 Target</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </>
    );
}





export default function CarbonPage() {
    return (
        <div className="min-h-screen">
            <CarbonXHeroSection />
            <CarbonXPage />
            <TechnologyTimelineSection />
            <MarketSegmentsAndRevenue />
        </div>
    )
}