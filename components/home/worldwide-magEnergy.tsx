'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Image paths
const images = [
    "/images/home/futureOfMag.png",
    "/images/home/futureOfMag2.jpeg",
];

const MagEnergyPage = () => {
    return (
        <section className="py-20 bg-background">
            <div className="container max-w-screen-xl mx-auto px-4">
                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
                        World Wide <span className="text-[var(--primary-green)]">MagEnergy</span>
                    </h2>
                </motion.div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {images.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="w-full h-[850px] overflow-hidden rounded-2xl shadow-lg"
                        >
                            <img
                                src={src}
                                alt={`MagEnergy ${index + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MagEnergyPage;
