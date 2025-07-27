'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, DollarSign, Globe, Leaf, Shield, Target, Zap } from 'lucide-react';
import { Container, Building, Users } from 'lucide-react';

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
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

const CarbonXPage = () => {
    const whyCarbonX = [
        {
            title: 'Accessible',
            description:
                'CarbonX tokenizes carbon credits into CX tokens, making them digital, tractable, and accessible to all.',
            icon: Globe,
        },
        {
            title: 'Transparent',
            description:
                'Each token is backed by a certified, verified CO₂ reduction or removal—recorded on-chain, publicly traceable, and immutable.',
            icon: Shield,
        },
        {
            title: 'Cost-Efficient',
            description:
                'No middlemen. No excessive fees. Just a direct, digital bridge between emission reductions and the global community.',
            icon: DollarSign,
        },
        {
            title: 'Impactful',
            description:
                'We simplify carbon engagement so everyone can take transparent, measurable steps toward sustainability.',
            icon: Target,
        },
    ];

    const howItWorks = [
        {
            number: '01',
            title: 'Verified Carbon Credits',
            description:
                'We partner with trusted environmental projects and registries to bring real carbon offsets onto the blockchain.',
        },
        {
            number: '02',
            title: 'Standardized Credit Lots',
            description:
                "Carbon credits are grouped into 'Lots' — carefully averaged and categorized to ensure simplicity and liquidity.",
        },
        {
            number: '03',
            title: 'One Token. One System.',
            description:
                'Each lot is backed by CarbonX Token (CX) — a single utility token that represents a share of the carbon credit pool.',
        },
        {
            number: '04',
            title: 'Trade or Offset',
            description:
                'You can trade CX tokens just like crypto — or retire them to claim your carbon offset and receive a digital certificate of impact.',
        },
    ];

    const userTypes = [
        {
            title: 'Businesses & Startups',
            description:
                'Offset your emissions with a few clicks, show your customers you care, and go climate-positive.',
            icon: Building,
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Web3 Builders & Traders',
            description:
                'Use CX tokens in your DeFi stack, diversify your crypto assets, and support real environmental impact.',
            icon: Container,
            color: 'from-purple-500 to-pink-500',
        },
        {
            title: 'Everyday People',
            description:
                'Buy a few tokens to balance your personal footprint — track your positive impact anytime.',
            icon: Users,
            color: 'from-green-500 to-emerald-500',
        },
    ];

    const greenBenefits = [
        'Real-time tracking of environmental impact',
        'Fractional ownership, enabling small-scale investments',
        'Global accessibility to support green projects worldwide',
    ];

    return (
        <>
            {/* Why CarbonX */}
            <section className="py-24 bg-gradient-to-br from-emerald-50 to-teal-50">
                <div className="container mx-auto px-6">
                    <motion.div className="text-center mb-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                        <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
                            Why <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">CarbonX?</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            The carbon credit market today is complex... CarbonX solves this by turning carbon credits into digital tokens that anyone can access and use.
                        </p>
                    </motion.div>

                    <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                        {whyCarbonX.map((item, i) => (
                            <motion.div key={i} variants={scaleIn} whileHover={{ y: -8, scale: 1.02 }} className="group">
                                <Card className="h-full border-2 border-transparent hover:border-emerald-300 transition-all duration-500 hover:shadow-2xl bg-white/80 backdrop-blur-sm group-hover:bg-white">
                                    <CardContent className="p-6 text-center">
                                        <motion.div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg" whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }}>
                                            <item.icon className="w-8 h-8 text-white" />
                                        </motion.div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-emerald-700">{item.title}</h3>
                                        <p className="text-gray-600 text-sm">{item.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-slate-900">
                <div className="container mx-auto px-6">
                    <motion.div className="text-center mb-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                        <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8">
                            How It <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Works</span>
                        </h2>
                    </motion.div>

                    <motion.div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                        {howItWorks.map((step, i) => (
                            <motion.div key={i} variants={scaleIn} whileHover={{ y: -8, scale: 1.02 }} className="group">
                                <Card className="h-full border-2 border-emerald-500/20 hover:border-emerald-400/50 bg-slate-800/50 backdrop-blur-sm group-hover:bg-slate-800/80">
                                    <CardContent className="p-8">
                                        <div className="flex items-start space-x-4">
                                            <motion.div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg" whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }}>
                                                <span className="text-white font-bold text-lg">{step.number}</span>
                                            </motion.div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300">{step.title}</h3>
                                                <p className="text-gray-300">{step.description}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Carbon Credits in Green Energy */}
            <section className="py-24 bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="container mx-auto px-6">
                    <motion.div className="max-w-6xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                        <motion.div className="text-center mb-16" variants={fadeInUp}>
                            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
                                Carbon Credits in <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Green Energy</span>
                            </h2>
                        </motion.div>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div variants={fadeInUp}>
                                <div className="prose prose-lg text-gray-700">
                                    <p className="text-xl leading-relaxed mb-6">Green energy projects generate carbon credits by displacing fossil fuels.</p>
                                    <p className="text-lg leading-relaxed mb-8">These credits are verified and tokenized on CarbonX.</p>
                                    <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-emerald-100">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Tokenizing ensures:</h3>
                                        <div className="space-y-4">
                                            {greenBenefits.map((text, i) => (
                                                <motion.div key={i} className="flex items-center space-x-3" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                                                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                                                    <span className="text-gray-700 font-medium">{text}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-lg leading-relaxed mt-8 text-emerald-700 font-medium">CarbonX helps fund and accelerate renewable energy worldwide.</p>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="relative">
                                <div className="relative">
                                    <Image src="/images/about/carbon-credit.jpg" alt="Green Energy Carbon Credits" width={600} height={500} className="rounded-2xl shadow-2xl" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent rounded-2xl" />
                                    <motion.div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-sm rounded-full p-3" animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }}>
                                        <Leaf className="w-6 h-6 text-white" />
                                    </motion.div>
                                    <motion.div className="absolute bottom-4 left-4 bg-teal-500/90 backdrop-blur-sm rounded-full p-3" animate={{ y: [5, -5, 5] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}>
                                        <Zap className="w-6 h-6 text-white" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Who Should Use CarbonX */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div className="text-center mb-20" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                        <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
                            Who Should Use <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">CarbonX?</span>
                        </h2>
                    </motion.div>

                    <motion.div className="grid lg:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                        {userTypes.map((type, i) => (
                            <motion.div key={i} variants={scaleIn} whileHover={{ y: -10, scale: 1.02 }} className="group">
                                <Card className="h-full border-2 border-transparent hover:border-emerald-200 bg-gradient-to-br from-white to-gray-50 group-hover:from-emerald-50 group-hover:to-teal-50">
                                    <CardContent className="p-8 text-center">
                                        <motion.div className={`w-20 h-20 bg-gradient-to-br ${type.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`} whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }}>
                                            <type.icon className="w-10 h-10 text-white" />
                                        </motion.div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-700">{type.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{type.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default CarbonXPage;
