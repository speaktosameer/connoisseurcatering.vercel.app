"use client"

import type React from "react"

import { useState } from "react"
import { BookingModel, type BookingFormData } from "@/models/BookingModel"

export function BookingPresenter() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    guestCount: 0,
    specialRequests: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guestCount" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      eventType: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await BookingModel.create(formData)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Failed to submit booking:", error)
      // In a real app, you'd show an error message
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    isSubmitting,
    isSubmitted,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
  }
}
