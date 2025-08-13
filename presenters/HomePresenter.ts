"use client"

import { useState, useEffect } from "react"
import { ServicesModel, type Service } from "@/models/ServicesModel"
import { TestimonialsModel, type Testimonial } from "@/models/TestimonialsModel"
// Updated import to use GalleryItem instead of GalleryImage
import { GalleryModel, type GalleryItem } from "@/models/GalleryModel"

interface ReviewFormData {
  name: string
  email: string
  rating: number
  review: string
  event: string
}

export function HomePresenter() {
  const [services, setServices] = useState<Service[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  // Updated type to GalleryItem to match the model export
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, testimonialsData, galleryData] = await Promise.all([
          ServicesModel.getAll(),
          TestimonialsModel.getAll(),
          GalleryModel.getAll(),
        ])

        setServices(servicesData)
        setTestimonials(testimonialsData)
        setGalleryImages(galleryData)
      } catch (error) {
        console.error("Failed to load data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const submitReview = async (reviewData: ReviewFormData) => {
    try {
      const newTestimonial: Omit<Testimonial, "id"> = {
        name: reviewData.name,
        review: reviewData.review,
        rating: reviewData.rating,
        event: reviewData.event || "General Review",
        date: new Date().toISOString().split("T")[0],
      }

      const createdTestimonial = await TestimonialsModel.create(newTestimonial)

      // Update local state to include the new testimonial
      setTestimonials((prev) => [createdTestimonial, ...prev])

      return createdTestimonial
    } catch (error) {
      console.error("Failed to submit review:", error)
      throw error
    }
  }

  return {
    services,
    testimonials,
    galleryImages,
    isLoading,
    submitReview, // Added submitReview to the returned object
  }
}
