"use client"

import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addLead } from "@/lib/redux/features/leadSlice"
import { motion } from "framer-motion"
import { Mail, Phone, MessageSquare, MapPin, User, Send, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
}

const stagger = {
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
}

const Contact = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    })
    const [success, setSuccess] = useState(false)

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await dispatch(addLead(formData) as any)
            setSuccess(true)
            setFormData({ name: "", email: "", phone: "", message: "" })
        } catch (err) {
            console.error("Submission failed:", err)
            setSuccess(false)
        }
    }

    return (
        <section className="bg-gradient-to-br from-gray-50 to-emerald-50 py-24 px-6 overflow-hidden relative">
            <motion.div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2310b981' fillOpacity='0.4'%3E%3Cpath d='M50 50c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
                animate={{
                    backgroundPosition: ["0px 0px", "80px 80px"],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Contact{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                            Our Team
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        Be it installation, consultation, or support — we're ready to power your journey.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* FORM CARD */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <Card className="shadow-lg border-emerald-100 bg-white">
                            <CardContent className="p-8 space-y-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 -mt-4">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <Input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="John Doe"
                                                className="pl-10 h-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <Input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="john@example.com"
                                                className="pl-10 h-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <Input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="+1 (555) 123-4567"
                                                className="pl-10 h-10"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Message
                                        </label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                            <Textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                placeholder="Tell us your needs..."
                                                rows={5}
                                                className="pl-10 h-16"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {success && (
                                        <div className="flex items-center text-green-600 text-sm font-medium">
                                            <CheckCircle className="w-4 h-4 mr-1" />
                                            Message sent successfully!
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full h-10 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 text-lg font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition"
                                    >
                                        <Send className="w-5 h-5 mr-2" /> Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* CONTACT INFO */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {[
                            {
                                icon: <Phone className="text-white" />,
                                label: "Phone",
                                value: "+91 85274 49007",
                                color: "from-emerald-500 to-teal-600",
                            },
                            {
                                icon: <Mail className="text-white" />,
                                label: "Email",
                                value: "info@themaggen.com",
                                color: "from-blue-500 to-cyan-600",
                            },
                            {
                                icon: <MapPin className="text-white" />,
                                label: "Address",
                                value: "Muscat Grand Mall 5th Floor, Building No. 6, Gubrah, Muscat, Sultanate of Oman ",
                                color: "from-purple-500 to-pink-600",
                            },
                        ].map(({ icon, label, value, color }, index) => (
                            <motion.div key={index} variants={fadeInUp}>
                                <Card className="bg-white/80 backdrop-blur-md border-2 border-emerald-100">
                                    <CardContent className="p-6 flex items-start space-x-4">
                                        <div
                                            className={`w-12 h-14 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow`}
                                        >
                                            {icon}
                                        </div>
                                        <div>
                                            <div className="text-lg font-semibold text-gray-900">
                                                {label}
                                            </div>
                                            <div className="text-gray-600">{value}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Contact
