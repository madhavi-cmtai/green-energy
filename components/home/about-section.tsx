"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function AboutSection() {
    return (
        <section className="w-full py-16 px-4 bg-white relative overflow-hidden mt-10">
            {/* Wrapper container to match other sections */}
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-stretch gap-10">
                    {/* Image for small screens */}
                    <div className="relative h-64 w-full md:hidden mb-6 rounded-xl overflow-hidden shadow-xl">
                        <Image
                            src="/images/home/generator.webp"
                            alt="Magnetic Machine"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Text Section */}
                    <div className="w-full md:w-[65%] flex flex-col justify-center">
                        {/* Decorative Heading Background */}
                        <div className="relative mb-6 w-fit">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 rounded-r-xl w-2xl h-full z-0" />
                            <h2
                                className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-bold text-white pl-4 py-4"
                                style={{ fontFamily: 'var(--font-main)' }}
                            >
                                About Magnetic Electricity
                            </h2>
                        </div>

                        {/* Content */}
                        <p className="text-gray-700 text-base md:text-lg leading-relaxed mt-4">
                            At the forefront of innovation, our mission is to revolutionize the energy sector with clean, efficient, and sustainable magnetic electricity solutions.
                            We’re committed to creating power systems that reduce carbon emissions and promote environmental harmony.
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2 text-base md:text-lg">
                            <li>Occupies less space in comparison to the solar industry</li>
                            <li>Variants include 5, 10, and 100 megawatt generators</li>
                            <li>Easy to install – plug and play</li>
                            <li>Easy to operate and maintain – uses no raw materials</li>
                            <li>Faster production ramp-up</li>
                            <li>Zero carbon emissions</li>
                        </ul>

                        {/* Button aligned right */}
                        <div className="mt-6 w-full flex justify-start md:justify-end">
                            <Button className="mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 sm:px-10 sm:py-6 rounded-full text-base sm:text-lg font-semibold shadow-2xl group relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.6 }}
                                />
                                <span className="relative flex items-center">
                                    Know More..
                                    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                            </Button>
                        </div>
                    </div>

                    {/* Image Section for md and above */}
                    <div className="hidden md:flex w-full md:w-[35%] relative">
                        <div className="absolute inset-0 clip-diagonal overflow-hidden shadow-2xl">
                            <Image
                                src="/images/home/generator.webp"
                                alt="Magnetic Machine"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Background Shape */}
            <div className="absolute top-[5%] bottom-[9%] left-0 w-[90%] md:w-[75%] bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 opacity-20 clip-deco z-0" />

            {/* Custom Clip Path Styles */}
            <style jsx>{`
                .clip-diagonal {
                    clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%);
                }
                .clip-deco {
                    clip-path: polygon(0 0%, 95% 0, 100% 100%, 0% 10%);
                }
            `}</style>
        </section>
    );
}
