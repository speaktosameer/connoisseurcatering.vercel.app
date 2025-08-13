"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ServicesModel, type Service } from "@/models/ServicesModel"
import { MenuModel, type MenuItem } from "@/models/MenuModel"
import { BookingModel, type Booking } from "@/models/BookingModel"
import { TestimonialsModel, type Testimonial } from "@/models/TestimonialsModel"
import { GalleryModel, type GalleryItem } from "@/models/GalleryModel"

interface ServiceForm {
  id?: number
  title: string
  description: string
  startingPrice: string
  features: string
}

interface MenuForm {
  id?: number
  name: string
  description: string
  price: string
  category: string
  dietary: string
}

interface TestimonialForm {
  id?: number
  name: string
  event: string
  rating: number
  quote: string
}

interface GalleryForm {
  id?: number
  title: string
  description: string
  category: string
}

export function AdminDashboardPresenter() {
  // Services state
  const [services, setServices] = useState<Service[]>([])
  const [serviceForm, setServiceForm] = useState<ServiceForm>({
    title: "",
    description: "",
    startingPrice: "",
    features: "",
  })
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false)

  // Menu state
  const [menuItems, setMenuItems] = useState<(MenuItem & { category: string })[]>([])
  const [menuForm, setMenuForm] = useState<MenuForm>({
    name: "",
    description: "",
    price: "",
    category: "",
    dietary: "",
  })
  const [isMenuDialogOpen, setIsMenuDialogOpen] = useState(false)

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>([])

  // Testimonials state
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [testimonialForm, setTestimonialForm] = useState<TestimonialForm>({
    name: "",
    event: "",
    rating: 5,
    quote: "",
  })
  const [isTestimonialDialogOpen, setIsTestimonialDialogOpen] = useState(false)

  // Gallery state
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [galleryForm, setGalleryForm] = useState<GalleryForm>({
    title: "",
    description: "",
    category: "",
  })
  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false)

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, menuData, bookingsData, testimonialsData, galleryData] = await Promise.all([
          ServicesModel.getAll(),
          MenuModel.getAll(),
          BookingModel.getAll(),
          TestimonialsModel.getAll(),
          GalleryModel.getAll(),
        ])

        setServices(servicesData)
        setBookings(bookingsData)
        setTestimonials(testimonialsData)
        setGalleryItems(galleryData)

        // Flatten menu data with categories
        const flatMenuItems = [
          ...menuData.canapes.map((item) => ({ ...item, category: "canapes" })),
          ...menuData.mains.map((item) => ({ ...item, category: "mains" })),
          ...menuData.desserts.map((item) => ({ ...item, category: "desserts" })),
          ...menuData.beverages.map((item) => ({ ...item, category: "beverages" })),
        ]
        setMenuItems(flatMenuItems)
      } catch (error) {
        console.error("Failed to load admin data:", error)
      }
    }

    loadData()
  }, [])

  // Service handlers
  const handleServiceInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setServiceForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const features = serviceForm.features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f)
      const serviceData = {
        ...serviceForm,
        features,
        image: "/placeholder.svg?height=300&width=400",
      }

      if (serviceForm.id) {
        // Update existing service
        const updatedServices = services.map((s) =>
          s.id === serviceForm.id ? { ...serviceData, id: serviceForm.id } : s,
        )
        setServices(updatedServices)
      } else {
        // Add new service
        const newService = {
          ...serviceData,
          id: Date.now(),
        }
        setServices((prev) => [...prev, newService])
      }

      resetServiceForm()
      setIsServiceDialogOpen(false)
    } catch (error) {
      console.error("Failed to save service:", error)
    }
  }

  const handleServiceEdit = (service: Service) => {
    setServiceForm({
      id: service.id,
      title: service.title,
      description: service.description,
      startingPrice: service.startingPrice,
      features: service.features.join(", "),
    })
    setIsServiceDialogOpen(true)
  }

  const handleServiceDelete = (id: number) => {
    setServices((prev) => prev.filter((s) => s.id !== id))
  }

  const resetServiceForm = () => {
    setServiceForm({
      title: "",
      description: "",
      startingPrice: "",
      features: "",
    })
  }

  // Menu handlers
  const handleMenuInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setMenuForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleMenuSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const dietary = menuForm.dietary
        .split(",")
        .map((d) => d.trim())
        .filter((d) => d)
      const menuData = {
        ...menuForm,
        dietary,
      }

      if (menuForm.id) {
        // Update existing menu item
        const updatedMenuItems = menuItems.map((item) =>
          item.id === menuForm.id ? { ...menuData, id: menuForm.id } : item,
        )
        setMenuItems(updatedMenuItems)
      } else {
        // Add new menu item
        const newMenuItem = {
          ...menuData,
          id: Date.now(),
        }
        setMenuItems((prev) => [...prev, newMenuItem])
      }

      resetMenuForm()
      setIsMenuDialogOpen(false)
    } catch (error) {
      console.error("Failed to save menu item:", error)
    }
  }

  const handleMenuEdit = (item: MenuItem & { category: string }) => {
    setMenuForm({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      dietary: item.dietary.join(", "),
    })
    setIsMenuDialogOpen(true)
  }

  const handleMenuDelete = (id: number) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id))
  }

  const resetMenuForm = () => {
    setMenuForm({
      name: "",
      description: "",
      price: "",
      category: "",
      dietary: "",
    })
  }

  // Booking handlers
  const handleBookingStatusUpdate = async (id: number, status: Booking["status"]) => {
    try {
      await BookingModel.updateStatus(id, status)
      setBookings((prev) => prev.map((booking) => (booking.id === id ? { ...booking, status } : booking)))
    } catch (error) {
      console.error("Failed to update booking status:", error)
    }
  }

  // Testimonial handlers
  const handleTestimonialInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTestimonialForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number.parseInt(value) : value,
    }))
  }

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const testimonialData = {
        ...testimonialForm,
        date: new Date().toISOString().split("T")[0],
      }

      if (testimonialForm.id) {
        // Update existing testimonial
        const updatedTestimonials = testimonials.map((t) =>
          t.id === testimonialForm.id ? { ...testimonialData, id: testimonialForm.id } : t,
        )
        setTestimonials(updatedTestimonials)
      } else {
        // Add new testimonial
        const newTestimonial = {
          ...testimonialData,
          id: Date.now(),
        }
        setTestimonials((prev) => [...prev, newTestimonial])
      }

      resetTestimonialForm()
      setIsTestimonialDialogOpen(false)
    } catch (error) {
      console.error("Failed to save testimonial:", error)
    }
  }

  const handleTestimonialEdit = (testimonial: Testimonial) => {
    setTestimonialForm({
      id: testimonial.id,
      name: testimonial.name,
      event: testimonial.event,
      rating: testimonial.rating,
      quote: testimonial.quote,
    })
    setIsTestimonialDialogOpen(true)
  }

  const handleTestimonialDelete = (id: number) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id))
  }

  const resetTestimonialForm = () => {
    setTestimonialForm({
      name: "",
      event: "",
      rating: 5,
      quote: "",
    })
  }

  // Gallery handlers
  const handleGalleryInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGalleryForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const galleryData = {
        ...galleryForm,
        image: "/placeholder.svg?height=400&width=600",
      }

      if (galleryForm.id) {
        // Update existing gallery item
        const updatedGalleryItems = galleryItems.map((item) =>
          item.id === galleryForm.id ? { ...galleryData, id: galleryForm.id } : item,
        )
        setGalleryItems(updatedGalleryItems)
      } else {
        // Add new gallery item
        const newGalleryItem = {
          ...galleryData,
          id: Date.now(),
        }
        setGalleryItems((prev) => [...prev, newGalleryItem])
      }

      resetGalleryForm()
      setIsGalleryDialogOpen(false)
    } catch (error) {
      console.error("Failed to save gallery item:", error)
    }
  }

  const handleGalleryEdit = (item: GalleryItem) => {
    setGalleryForm({
      id: item.id,
      title: item.title,
      description: item.description,
      category: item.category,
    })
    setIsGalleryDialogOpen(true)
  }

  const handleGalleryDelete = (id: number) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id))
  }

  const resetGalleryForm = () => {
    setGalleryForm({
      title: "",
      description: "",
      category: "",
    })
  }

  return {
    // Services
    services,
    serviceForm,
    isServiceDialogOpen,
    setIsServiceDialogOpen,
    handleServiceInputChange,
    handleServiceSubmit,
    handleServiceEdit,
    handleServiceDelete,
    resetServiceForm,

    // Menu
    menuItems,
    menuForm,
    isMenuDialogOpen,
    setIsMenuDialogOpen,
    handleMenuInputChange,
    handleMenuSubmit,
    handleMenuEdit,
    handleMenuDelete,
    resetMenuForm,

    // Bookings
    bookings,
    handleBookingStatusUpdate,

    // Testimonials
    testimonials,
    testimonialForm,
    isTestimonialDialogOpen,
    setIsTestimonialDialogOpen,
    handleTestimonialInputChange,
    handleTestimonialSubmit,
    handleTestimonialEdit,
    handleTestimonialDelete,
    resetTestimonialForm,

    // Gallery
    galleryItems,
    galleryForm,
    isGalleryDialogOpen,
    setIsGalleryDialogOpen,
    handleGalleryInputChange,
    handleGallerySubmit,
    handleGalleryEdit,
    handleGalleryDelete,
    resetGalleryForm,
  }
}
