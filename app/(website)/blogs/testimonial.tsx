import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, User } from "lucide-react";
import { fadeInUp } from "./blog";




export default function TestimonialSection() {
    return (
        <section className="py-28 bg-slate-900 relative overflow-hidden">
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
                    className="max-w-4xl mx-auto text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <Card className="border-2 border-emerald-500/30 bg-slate-800/50 backdrop-blur-sm relative overflow-hidden">
                        {/* Glowing Quote Icon */}
                        <motion.div
                            className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center"
                            animate={{
                                boxShadow: ["0 0 0 0 rgba(16, 185, 129, 0.4)", "0 0 0 20px rgba(16, 185, 129, 0)"],
                            }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                            <Quote className="w-8 h-8 text-white" />
                        </motion.div>

                        <CardContent className="p-12 pt-20">
                            <motion.blockquote
                                className="text-2xl lg:text-3xl text-white font-medium leading-relaxed mb-8"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                "Magnetic energy generation represents the most significant breakthrough in clean energy technology
                                since the invention of the solar panel. This technology will revolutionize how we think about
                                sustainable power."
                            </motion.blockquote>

                            <motion.div
                                className="flex items-center justify-center space-x-4"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                                    <User className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-left">
                                    <div className="text-white font-semibold text-lg">Dr. Elena Rodriguez</div>
                                    <div className="text-emerald-400">Chief Energy Scientist, GreenTech Institute</div>
                                </div>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    )
}