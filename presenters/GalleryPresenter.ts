"use client"

import { useState, useEffect } from "react"
import { GalleryModel, type GalleryItem } from "@/models/GalleryModel"

export function GalleryPresenter() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const data = await GalleryModel.getAll()
        setGalleryItems(data)
      } catch (error) {
        console.error("Failed to load gallery:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadGallery()
  }, [])

  return {
    galleryItems,
    isLoading,
  }
}
