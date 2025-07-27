"use client"
import { motion } from "framer-motion"
import type React from "react"
import MagneticEnergySection from "@/components/home/magnetic-energy"
import { Zap, Leaf, Settings, TrendingUp, Globe, DollarSign, Target, Lightbulb, Battery, Sun, ArrowRight, CheckCircle, BarChart3, Recycle, Shield, Home,} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { useEffect, useState } from "react";
import TeamMembersSection from "./TeamMembersSection"
import CarbonXHeroSection from "./CarbonXHeroSection"


// Market data for the chart
const marketData = [
  { year: "2023", value: 1.2 },
  { year: "2025", value: 1.8 },
  { year: "2027", value: 2.5 },
  { year: "2030", value: 3.6 },
  { year: "2033", value: 4.1 },
]

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

// Hero Section Component

const HeroSection = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
    <section className="-mt-24 relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-green-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 60% 30%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Electricity Pulse Lines */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 40%, rgba(16, 185, 129, 0.3) 50%, transparent 60%),
              linear-gradient(-45deg, transparent 40%, rgba(6, 182, 212, 0.3) 50%, transparent 60%),
              linear-gradient(135deg, transparent 40%, rgba(34, 197, 94, 0.2) 50%, transparent 60%)`,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            rotate: [0, 360],
          }}
          transition={{
            backgroundPosition: { duration: 6, repeat: Infinity, ease: "linear" },
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
          }}
        />

        {/* Only render dynamic elements after mount */}
        {isClient && (
          <>
            {/* Energy Particles */}
            {[...Array(40)].map((_, i) => {
              const left = `${Math.random() * 100}%`;
              const top = `${Math.random() * 100}%`;
              const xShift = Math.random() * 20 - 10;
              return (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                  style={{ left, top }}
                  animate={{
                    y: [0, -50, 0],
                    x: [0, xShift, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 2, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              );
            })}

            {/* Lightning Bolts */}
            {[...Array(8)].map((_, i) => {
              const left = `${Math.random() * 100}%`;
              const top = `${Math.random() * 100}%`;
              return (
                <motion.div
                  key={`lightning-${i}`}
                  className="absolute"
                  style={{ left, top }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    repeatDelay: 2 + Math.random() * 3,
                  }}
                >
                  <Zap className="w-6 h-6 text-yellow-400" />
                </motion.div>
              );
            })}
          </>
        )}

        {/* 🌁 ✅ Blurred Image Background Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Image
            src="/images/about/hero.jpeg"
            alt="Blur Background"
            fill
            className="object-cover w-full h-full opacity-40 blur-[1px]
"
            priority
          />
        </div>

        {/* Magnetic Field Rings */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-96 h-96 border-2 border-emerald-400/20 rounded-full" />
          <div className="absolute w-80 h-80 border border-teal-400/15 rounded-full" />
          <div className="absolute w-64 h-64 border border-green-400/10 rounded-full" />
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-full px-6 py-3 mb-8"
            variants={fadeInUp}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)" }}
          >
            <Zap className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-300 font-medium">Emergency Power Solution</span>
          </motion.div>

          <motion.h1
            className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight"
            variants={fadeInUp}
          >
            Don't Wait For{" "}
            <motion.span
              className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
              animate={{
                textShadow: [
                  "0 0 20px rgba(251, 191, 36, 0.5)",
                  "0 0 40px rgba(251, 191, 36, 0.8)",
                  "0 0 20px rgba(251, 191, 36, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Power
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl lg:text-2xl text-emerald-100 mb-12 leading-relaxed max-w-4xl mx-auto"
            variants={fadeInUp}
          >
            Be Ready with Your Go-To Solution Before The Next{" "}
            <span className="text-yellow-400 font-bold">Storm Strikes</span>
          </motion.p>

          <motion.div variants={fadeInUp}>
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)",
                backgroundColor: "rgba(16, 185, 129, 0.9)",
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-12 py-8 rounded-full text-xl font-bold shadow-2xl group relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative flex items-center">
                  Prepare Now
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </motion.div>
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating Icons */}
          <motion.div
            className="absolute top-1/2 left-10 transform -translate-y-1/2"
            animate={{ y: [-20, 20, -20], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <motion.div
            className="absolute top-1/2 right-10 transform -translate-y-1/2"
            animate={{ y: [20, -20, 20], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
              <Battery className="w-8 h-8 text-white" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
      <MagneticEnergySection />
    </>
  );
};



// Content Highlights Section
const ContentHighlightsSection = () => {
  const highlights = [
    { text: "Occupies less space than solar systems", icon: Home },
    { text: "Variants: 5, 10, 100 MW", icon: BarChart3 },
    { text: "Plug & play – easy to install", icon: Settings },
    { text: "Uses no raw materials", icon: Recycle },
    { text: "Easy to operate & maintain", icon: Shield },
    { text: "Zero carbon emissions", icon: Leaf },
    { text: "Fast production scaling", icon: TrendingUp },
  ]

  return (<>
    <section className="py-24 bg-gradient-to-br from-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2310b981' fillOpacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
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
            className="inline-flex items-center space-x-2 bg-emerald-100 border border-emerald-200 rounded-full px-6 py-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">Content Highlights</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Magnetic Power
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {highlights.map((highlight, index) => (
            <motion.div key={index} variants={scaleIn} whileHover={{ y: -8, scale: 1.02 }} className="group">
              <Card className="h-full border-2 border-transparent hover:border-emerald-300 transition-all duration-500 hover:shadow-2xl bg-white/80 backdrop-blur-sm group-hover:bg-white -mt-5">
                <CardContent className="p-6 text-center">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <highlight.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <p className="text-gray-700 font-medium leading-relaxed group-hover:text-emerald-700 transition-colors">
                    {highlight.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    <TeamMembersSection/>
  </>
  )
}

// Feature Grid Section
const FeatureGridSection = () => {
  const features = [
    {
      title: "No Carbon Emission",
      description: "100% clean energy generation with zero environmental impact",
      icon: Leaf,
      image: "/images/about/co2.jpg",
    },
    {
      title: "Space Efficient Design",
      description: "Compact footprint requiring 70% less space than solar installations",
      icon: Home,
      image: "/images/about/generator.jpg",
    },
    {
      title: "Plug & Play Installation",
      description: "Quick setup with minimal technical expertise required",
      icon: Settings,
      image: "/images/about/installation.jpg",
    },
    {
      title: "Zero Raw Materials",
      description: "Self-sustaining operation without external material consumption",
      icon: Recycle,
      image: "/images/about/zero-raw.jpg",
    },
    {
      title: "Low Maintenance",
      description: "Minimal upkeep with self-monitoring capabilities",
      icon: Shield,
      image: "/images/about/maintenance.jpg",
    },
    {
      title: "Scalable Power Output",
      description: "Flexible capacity from residential to industrial applications",
      icon: TrendingUp,
      image: "/images/about/output.jpg",
    },
  ]

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background blob */}
      <motion.div
        className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full opacity-30 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-emerald-100 border border-emerald-200 rounded-full px-6 py-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Lightbulb className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">Core Benefits</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Revolutionary{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
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
              <Card className="overflow-hidden border hover:border-emerald-200 transition-all duration-500 bg-gradient-to-br from-white to-gray-50 group-hover:from-emerald-50 group-hover:to-teal-50">
                <div className="relative h-72 overflow-hidden -mt-7">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <motion.div
                    className="absolute top-3 right-3 w-10 h-10 bg-emerald-500/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(16, 185, 129, 0.4)',
                        '0 0 0 15px rgba(16, 185, 129, 0)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <feature.icon className="w-5 h-5 text-white" />
                  </motion.div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


// Power Output Metrics Section
const PowerOutputSection = () => {
  const powerMetrics = [
    { value: "10,000", unit: "Units/hour", icon: Zap, color: "from-yellow-400 to-orange-500" },
    { value: "240,000", unit: "Units/day", icon: Sun, color: "from-orange-400 to-red-500" },
    { value: "8,76,00,000", unit: "Units/year", icon: Battery, color: "from-green-400 to-emerald-500" },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-emerald-600 to-teal-700 relative overflow-hidden">
      {/* Background Effects */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
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
            className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <BarChart3 className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Power Generation</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
            Maximum Power{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Generated
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {powerMetrics.map((metric, index) => (
            <motion.div key={index} variants={scaleIn} whileHover={{ y: -10, scale: 1.05 }} className="group">
              <Card className="text-center border-2 border-white/20 hover:border-white/40 transition-all duration-500 hover:shadow-2xl bg-white/10 backdrop-blur-sm group-hover:bg-white/20">
                <CardContent className="p-8">
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${metric.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    animate={{
                      boxShadow: [
                        "0 10px 30px rgba(255, 255, 255, 0.2)",
                        "0 20px 40px rgba(255, 255, 255, 0.4)",
                        "0 10px 30px rgba(255, 255, 255, 0.2)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <metric.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <motion.div
                    className="text-3xl lg:text-4xl font-bold text-white mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    🔋 {metric.value}
                  </motion.div>
                  <div className="text-lg text-emerald-100 font-medium">{metric.unit}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Card className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-300/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <p className="text-xl text-white leading-relaxed">
                <span className="font-bold text-red-300">Conventional energy sources</span> generate less than{" "}
                <span className="font-bold text-red-300 text-2xl">50%</span> due to heat loss, evaporation, and
                friction.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

// Market Chart Section
const MarketChartSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-emerald-100 border border-emerald-200 rounded-full px-6 py-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">Market Growth</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            Renewable Energy{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Market Size
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-4">(2023–2033)</p>
        </motion.div>

        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Card className="p-8 shadow-2xl border-2 border-emerald-100 bg-gradient-to-br from-white to-emerald-50">
            <CardContent className="p-0">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                    <XAxis dataKey="year" stroke="#059669" fontSize={14} fontWeight={600} tick={{ fill: "#059669" }} />
                    <YAxis
                      stroke="#059669"
                      fontSize={14}
                      fontWeight={600}
                      tick={{ fill: "#059669" }}
                      label={{
                        value: "USD Trillions",
                        angle: -90,
                        position: "insideLeft",
                        style: { textAnchor: "middle", fill: "#059669" },
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ecfdf5",
                        border: "2px solid #10b981",
                        borderRadius: "16px",
                        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                      formatter={(value) => [`$${value}T`, "Market Size"]}
                      labelStyle={{ color: "#059669", fontWeight: "bold" }}
                    />
                    <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                      {marketData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
                      ))}
                    </Bar>
                    <defs>
                      {marketData.map((_, index) => (
                        <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="50%" stopColor="#059669" />
                          <stop offset="100%" stopColor="#047857" />
                        </linearGradient>
                      ))}
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

// Zero Emission Projections Section
const ZeroEmissionProjectionsSection = () => {
  const projections = [
    {
      title: "Market Value",
      stat1: "$3.6 Trillion by 2030",
      stat2: "CAGR of 17.2% (2024–2030)",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Investment Trends",
      stat1: "$2 Trillion/year in renewables",
      stat2: "Twice oil/gas/coal investment",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "China's Leadership",
      stat1: "951 TWh clean electricity in Q1 2025",
      stat2: "19% up from 2024 - Wind & solar dominant",
      icon: Globe,
      color: "from-red-500 to-pink-500",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-emerald-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-emerald-100 border border-emerald-200 rounded-full px-6 py-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">Future Outlook</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            Projections for{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Zero-Emission Technologies
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {projections.map((projection, index) => (
            <motion.div key={index} variants={scaleIn} whileHover={{ y: -10, scale: 1.02 }} className="group">
              <Card className="h-full border-2 border-transparent hover:border-emerald-300 transition-all duration-500 hover:shadow-sm bg-white/80 backdrop-blur-sm group-hover:bg-white">
                <CardContent className="p-8 text-center">
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${projection.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <projection.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-emerald-700 transition-colors">
                    {projection.title}
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4">
                      <p className="text-lg font-bold text-emerald-700">{projection.stat1}</p>
                    </div>
                    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 leading-relaxed">{projection.stat2}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Key Insights Section
const KeyInsightsSection = () => {
  const insights = [
    {
      title: "Policy Support",
      description: "Governments adopting subsidies, tax incentives, and targets for renewables",
      icon: Target,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Technological Advancements",
      description: "Ongoing innovation reducing costs and increasing efficiency",
      icon: Lightbulb,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Investment Opportunities",
      description: "Huge demand growth in solar, wind, energy storage, and smart grids",
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
    },
  ]

  return (
    <>
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-emerald-100 border border-emerald-200 rounded-full px-6 py-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Lightbulb className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700 font-semibold">Industry Analysis</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            Key{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Insights
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {insights.map((insight, index) => (
            <motion.div key={index} variants={scaleIn} whileHover={{ y: -10, scale: 1.02 }} className="group">
              <Card className="h-full border-2 border-transparent hover:border-emerald-300 transition-all duration-500 hover:shadow-2xl bg-white group-hover:shadow-emerald-100">
                <CardContent className="p-8 text-center">
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${insight.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <insight.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors">
                    {insight.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">{insight.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    <CarbonXHeroSection/>
    </>
  )
}



// Main About Page Component
export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ContentHighlightsSection />
      <FeatureGridSection />
      <PowerOutputSection />
      <MarketChartSection />
      <ZeroEmissionProjectionsSection />
      <KeyInsightsSection />
    </div>
  )
}
