"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Lightbulb, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
    fetchBlogs,
    selectBlogs,
    selectIsLoading,
    titleToSlug,
} from "@/lib/redux/features/blogsSlice";

const BlogPage = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const maxVisible = 3;
    const dispatch = useDispatch<AppDispatch>();
    const blogs = useSelector(selectBlogs);
    const loading = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    if (loading) {
        return <div className="text-white text-center py-20">Loading blogs...</div>;
    }

    return (
        <section id="blogs" className="py-24 bg-gray-900 relative overflow-hidden">
            <motion.div
                className="absolute inset-0"
                style={{
                    background: `
            radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`,
                }}
                animate={{
                    background: [
                        `radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`,
                        `radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`,
                    ],
                }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-14 -mt-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-full px-6 py-3 mb-4"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Lightbulb className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-300 font-semibold">Knowledge Hub</span>
                    </motion.div>

                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        Latest{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            Insights
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
                        Stay updated with the latest developments in magnetic energy technology,
                        installation guides, and industry insights.
                    </p>
                </motion.div>

                <div className="hidden lg:flex gap-6 max-w-7xl mx-auto -mt-7">
                    {blogs.slice(0, maxVisible).map((blog, index) => (
                        <motion.div
                            key={blog.id}
                            className="relative cursor-pointer overflow-hidden rounded-3xl group h-[500px] transition-all duration-500 ease-in-out"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            animate={{
                                width:
                                    hoveredIndex !== null
                                        ? hoveredIndex === index
                                            ? "65%"
                                            : "17.5%"
                                        : "33.33%",
                            }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                            <Link
                                href={`/blogs/${titleToSlug(blog.title)}`}
                                className="block w-full h-full"
                            >
                                <div className="relative h-full w-full">
                                    <Image
                                        src={blog.image || "/fallback.jpg"}
                                        alt={blog.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                    <motion.div
                                        className="absolute top-6 left-6 bg-emerald-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        {blog.category}
                                    </motion.div>

                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 p-8 text-white"
                                        initial={{ opacity: 1 }}
                                        animate={{
                                            opacity: hoveredIndex !== null && hoveredIndex !== index ? 0 : 1,
                                        }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <motion.div
                                            className="flex items-center space-x-4 text-sm text-gray-300 mb-4"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        >
                                            <span>{blog.date}</span>
                                        </motion.div>

                                        <motion.h3
                                            className="text-2xl lg:text-3xl font-bold mb-4 leading-tight"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                        >
                                            {blog.title}
                                        </motion.h3>

                                        <AnimatePresence>
                                            {(hoveredIndex === index || hoveredIndex === null) && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 20 }}
                                                    transition={{ duration: 0.4 }}
                                                >
                                                    <p className="text-gray-200 text-lg leading-relaxed mb-4 line-clamp-1">
                                                        {blog.summary}
                                                    </p>

                                                    <motion.div
                                                        className="inline-flex items-center space-x-2 text-emerald-400 font-semibold group-hover:text-emerald-300 transition-colors cursor-pointer"
                                                        whileHover={{ x: 5 }}
                                                    >
                                                        <span>Read More</span>
                                                        <ArrowRight className="w-4 h-4" />
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPage;
