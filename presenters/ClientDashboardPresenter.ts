"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { BookingModel, type Booking } from "@/models/BookingModel"
import { useAuth } from "@/contexts/AuthContext"

interface ProfileForm {
  name: string
  email: string
  phone: string
  dietaryRequirements: string
  preferredContact: string
}

export function ClientDashboardPresenter() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [eventHistory, setEventHistory] = useState<Booking[]>([])
  const [profileForm, setProfileForm] = useState<ProfileForm>({
    name: "",
    email: "",
    phone: "",
    dietaryRequirements: "",
    preferredContact: "Email",
  })
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Load user's bookings and profile data
  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real app, this would filter by user ID
        const allBookings = await BookingModel.getAll()

        // For demo purposes, filter by user email
        const userBookings = allBookings.filter((booking) => booking.email === user?.email)

        setBookings(userBookings)

        // Separate past events for history
        const pastEvents = userBookings.filter((booking) => new Date(booking.date) < new Date())
        setEventHistory(pastEvents)

        // Initialize profile form with user data
        if (user) {
          setProfileForm({
            name: user.name,
            email: user.email,
            phone: "",
            dietaryRequirements: "",
            preferredContact: "Email",
          })
        }
      } catch (error) {
        console.error("Failed to load client data:", error)
      }
    }

    if (user) {
      loadData()
    }
  }, [user])

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call to update profile
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, this would update the user profile in the database
      console.log("Profile updated:", profileForm)

      setIsProfileDialogOpen(false)
    } catch (error) {
      console.error("Failed to update profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    bookings,
    eventHistory,
    profileForm,
    isProfileDialogOpen,
    setIsProfileDialogOpen,
    handleProfileInputChange,
    handleProfileSubmit,
    isLoading,
  }
}
