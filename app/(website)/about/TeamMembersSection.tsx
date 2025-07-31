'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import {  fetchTeamMembers,  selectIsLoading,  selectTeamMembers} from '@/lib/redux/features/teamMemberSlice';
import { Mail, Users } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';


const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

const staggerContainer = {
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

const TeamSection = () => {
    const dispatch = useDispatch<AppDispatch>();
    const teamMembers = useSelector(selectTeamMembers);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(fetchTeamMembers());
    }, [dispatch]);

    return (
        <>
            <section className="py-24 bg-white relative overflow-hidden">
                {/* Background Gradient */}
                <motion.div
                    className="absolute top-0 left-0 w-6xl h-96 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full opacity-30 blur-3xl"
                    animate={{ scale: [1, 1.3, 1], x: [0, 100, 0], y: [0, -50, 0] }}
                    transition={{ duration: 25, repeat: Infinity }}
                />

                <div className="container mx-auto px-6 relative z-10">
                    {/* Section Heading */}
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
                            <Users className="w-5 h-5 text-emerald-600" />
                            <span className="text-emerald-700 font-semibold">Our Team</span>
                        </motion.div>

                        <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
                            Meet Our{' '}
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Experts
                            </span>
                        </h2>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Our diverse team of engineers, scientists, and industry experts are dedicated to
                            revolutionizing clean energy through magnetic generation technology.
                        </p>
                    </motion.div>

                    {/* Team Members */}
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <motion.div
                                className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"
                                initial={{ rotate: 0 }}
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            />
                        </div>
                    ) : (
                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            {teamMembers.map((member) => (
                                <motion.div
                                    key={member.id}
                                    variants={scaleIn}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="group"
                                >
                                    <Card className="h-full border-2 border-transparent hover:border-emerald-200 transition-all duration-500 hover:shadow-sm bg-gradient-to-br from-white to-gray-50 group-hover:from-emerald-50 group-hover:to-teal-50 overflow-hidden">
                                        <div className="relative h-80 overflow-hidden -mt-7">
                                            <Image
                                                src={member.image || '/placeholder.svg'}
                                                alt={member.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                            <div className="absolute bottom-4 left-4 right-4">
                                                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                                                    {member.name}
                                                </h3>
                                                <p className="text-emerald-200 font-medium">{member.position}</p>
                                            </div>
                                        </div>

                                        <CardContent className="p-6"> 
                                            <p className="text-gray-600 leading-relaxed mb-4 whitespace-pre-line">
                                                {(member.bio ?? '').replace(/\n/g, ' ')}

                                            </p>
                                            
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

        </>
    );
};

export default TeamSection;
