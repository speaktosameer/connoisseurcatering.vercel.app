"use client"

import { useState, useEffect } from "react"
import { TestimonialsModel, type Testimonial } from "@/models/TestimonialsModel"

export function TestimonialsPresenter() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await TestimonialsModel.getAll()
        setTestimonials(data)
      } catch (error) {
        console.error("Failed to load testimonials:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  return {
    testimonials,
    isLoading,
  }
}
