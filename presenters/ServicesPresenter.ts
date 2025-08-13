"use client"

import { useState, useEffect } from "react"
import { ServicesModel, type Service } from "@/models/ServicesModel"

export function ServicesPresenter() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await ServicesModel.getAll()
        setServices(data)
      } catch (error) {
        console.error("Failed to load services:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadServices()
  }, [])

  return {
    services,
    isLoading,
  }
}
