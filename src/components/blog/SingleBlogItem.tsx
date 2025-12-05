"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import TagButton from "../ui/TagButton";
import { BlogPost } from "@/types/blog";

interface SingleBlogItemProps {
    featuredPost: BlogPost | null;
}

const SingleBlogItem = ({ featuredPost }: SingleBlogItemProps) => {
    if (!featuredPost) return null;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <section className="w-full py-16 px-4 md:px-8 lg:px-16 bg-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative group"
                >
                    {/* Gradient Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#4A86F7] via-[#A055F7] to-[#FF8A3D] rounded-3xl blur-lg opacity-0 group-hover:opacity-70 transition duration-500 group-hover:duration-200" />

                    {/* Card Container with Gradient Border */}
                    <div className="relative p-[2px] rounded-3xl bg-gradient-to-r from-[#4A86F7] via-[#A055F7] to-[#FF8A3D]">
                        <div className="flex flex-col md:flex-row bg-white rounded-[22px] overflow-hidden h-full">
                            {/* Image Section */}
                            <div className="w-full md:w-1/2 relative bg-gray-50 min-h-[300px] md:min-h-[400px]">
                                {featuredPost.imageUrl ? (
                                    <Image
                                        src={featuredPost.imageUrl!}
                                        alt={featuredPost.imageAlt || featuredPost.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        No Image Available
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="mb-6"
                                >
                                    <TagButton text="Latest Article" size="small" />
                                </motion.div>

                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-gray-900 font-satoshi"
                                >
                                    {featuredPost.title}
                                </motion.h2>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className="text-gray-500 mb-8 text-sm md:text-base font-medium"
                                >
                                    By <span className="text-gray-900">{featuredPost.author}</span> |{" "}
                                    {formatDate(featuredPost.publishDate)}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                >
                                    <Link
                                        href={`/blog/${featuredPost.slug}`}
                                        className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#4A86F7] to-[#A055F7] hover:from-[#42A5F5] hover:to-[#7E57C2] text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl group/btn"
                                    >
                                        Read more
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SingleBlogItem;
