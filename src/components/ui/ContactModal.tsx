"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendContactEmail } from "@/app/actions/contact";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setErrors({ name: "", email: "", message: "" });
        setSubmitSuccess(false);
      }, 300);
    }
  }, [isOpen]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      message: "",
    };

    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Call server action
    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        console.log("Form submitted:", formData);
        setSubmitSuccess(true);
        // Close modal after success
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        console.error("Submission failed:", result.error);
        // Set a general error message on the form (using 'message' field or a new state)
        // For now, let's just alert or log, as the UI doesn't have a global error state shown in the mock.
        // But we can set it on the 'message' field to show it to the user.
        setErrors((prev) => ({
          ...prev,
          message: result.error || "Failed to send message",
        }));
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrors((prev) => ({
        ...prev,
        message: "An unexpected error occurred. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="mb-6">
                <h2 className="font-bold text-[28px] sm:text-[32px] leading-tight text-[#1A1A1A] mb-2">
                  Get in Touch
                </h2>
                <p className="text-[16px] text-[#616161]">
                  Let&apos;s discuss how we can help transform your business
                  with AI
                </p>
              </div>

              {/* Success Message */}
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p className="text-[14px] text-green-800 font-medium">
                      Thank you! We&apos;ll get back to you soon.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block font-semibold text-[14px] text-[#1A1A1A] mb-2"
                  >
                    Name <span className="text-[#FF6F00]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 text-[16px] border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${errors.name
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:border-[#42A5F5] focus:ring-[#42A5F5]/20"
                      }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-[12px] text-red-600 font-sans"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block font-semibold text-[14px] text-[#1A1A1A] mb-2"
                  >
                    Email <span className="text-[#FF6F00]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 text-[16px] border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${errors.email
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:border-[#42A5F5] focus:ring-[#42A5F5]/20"
                      }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-[12px] text-red-600 font-sans"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block font-semibold text-[14px] text-[#1A1A1A] mb-2"
                  >
                    Message <span className="text-[#FF6F00]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 text-[16px] border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${errors.message
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:border-[#42A5F5] focus:ring-[#42A5F5]/20"
                      }`}
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-[12px] text-red-600 font-sans"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  className="w-full py-3 px-6 font-semibold text-[16px] text-white rounded-lg transition-all duration-200 bg-gradient-to-r from-[#FF6F00] to-[#C33C00] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : submitSuccess ? (
                    "Sent Successfully!"
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
