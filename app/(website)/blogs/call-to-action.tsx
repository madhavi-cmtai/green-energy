import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "./blog";



// Call to Action Section
export default function CallToActionSection() {
    return (
        <section className="py-24 bg-gradient-to-br from-emerald-600 via-teal-700 to-green-800 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
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
                            repeat: Number.POSITIVE_INFINITY,
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
                    <motion.h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight" variants={fadeInUp}>
                        Ready to Explore{" "}
                        <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">More?</span>
                    </motion.h2>

                    <motion.p className="text-xl lg:text-2xl text-emerald-100 mb-12 leading-relaxed" variants={fadeInUp}>
                        Dive deeper into our comprehensive library of articles, guides, and insights about magnetic energy
                        technology.
                    </motion.p>

                    <motion.div className="flex flex-col sm:flex-row gap-6 justify-center" variants={fadeInUp}>
                        <motion.div
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button className="bg-white text-emerald-700 hover:bg-emerald-50 px-10 py-7 rounded-full text-lg font-semibold shadow-2xl">
                                Explore All Articles
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="outline"
                                className="border-2 border-white text-white hover:bg-white hover:text-emerald-700 px-10 py-7 rounded-full text-lg font-semibold bg-transparent backdrop-blur-sm"
                            >
                                Get In Touch for Consulting
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}