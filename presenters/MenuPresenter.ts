"use client"

import { useState, useEffect } from "react"
import { MenuModel, type MenuData } from "@/models/MenuModel"

export function MenuPresenter() {
  const [menuData, setMenuData] = useState<MenuData>({
    canapes: [],
    mains: [],
    desserts: [],
    beverages: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await MenuModel.getAll()
        setMenuData(data)
      } catch (error) {
        console.error("Failed to load menu:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMenu()
  }, [])

  return {
    menuData,
    isLoading,
  }
}
