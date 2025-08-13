"use client"

import { GalleryPresenter } from "@/presenters/GalleryPresenter"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

export function GalleryView() {
  const { galleryItems, isLoading } = GalleryPresenter()
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { value: "all", label: "All Events" },
    { value: "weddings", label: "Weddings" },
    { value: "corporate", label: "Corporate" },
    { value: "private", label: "Private Functions" },
    { value: "food", label: "Food & Presentation" },
  ]

  const filteredItems =
    selectedCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Event Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Take a look at some of our recent events and see how we bring culinary visions to life
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.value)}
                className="mb-2"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-square bg-muted rounded-lg" />
                </Card>
              ))}
            </div>
          ) : (
            <>
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No images found for this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map((item) => (
                    <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                          <div className="absolute top-3 right-3">
                            <Badge variant="secondary" className="bg-white/90 text-primary capitalize">
                              {item.category}
                            </Badge>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-sm text-white/90">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Own Memorable Event?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let us help you create beautiful moments that your guests will remember forever.
          </p>
          <Button size="lg" asChild>
            <a href="/booking">Start Planning Your Event</a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
