"use client";

import React from "react";
import ContactModal from "./ContactModal";
import { useContactModal } from "@/contexts/ContactModalContext";

export default function ContactModalWrapper() {
  const { isOpen, closeModal } = useContactModal();

  return <ContactModal isOpen={isOpen} onClose={closeModal} />;
}
