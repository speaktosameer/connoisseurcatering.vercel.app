"use client"

import { MenuPresenter } from "@/presenters/MenuPresenter"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Leaf, Wheat, Heart } from "lucide-react"

export function MenuView() {
  const { menuData, isLoading } = MenuPresenter()

  const getDietaryIcon = (dietary: string) => {
    switch (dietary.toLowerCase()) {
      case "vegetarian":
        return <Leaf className="h-3 w-3" />
      case "vegan":
        return <Heart className="h-3 w-3" />
      case "gluten-free":
      case "gluten-free available":
        return <Wheat className="h-3 w-3" />
      default:
        return null
    }
  }

  const getDietaryColor = (dietary: string) => {
    switch (dietary.toLowerCase()) {
      case "vegetarian":
        return "bg-green-100 text-green-800"
      case "vegan":
        return "bg-purple-100 text-purple-800"
      case "gluten-free":
      case "gluten-free available":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Menu</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our carefully crafted selection of dishes, featuring fresh ingredients and innovative flavors to
            delight your guests
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="space-y-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-8 bg-muted rounded w-48 mb-6" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((j) => (
                      <Card key={j}>
                        <CardHeader>
                          <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                          <div className="h-4 bg-muted rounded w-full" />
                        </CardHeader>
                        <CardContent>
                          <div className="h-6 bg-muted rounded w-24" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Tabs defaultValue="canapes" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
                <TabsTrigger value="canapes">Canapés</TabsTrigger>
                <TabsTrigger value="mains">Main Courses</TabsTrigger>
                <TabsTrigger value="desserts">Desserts</TabsTrigger>
                <TabsTrigger value="beverages">Beverages</TabsTrigger>
              </TabsList>

              <TabsContent value="canapes">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Canapés</h2>
                  <p className="text-muted-foreground">Elegant bite-sized appetizers perfect for cocktail hours</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuData.canapes?.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <span className="text-lg font-bold text-primary">{item.price}</span>
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      {item.dietary.length > 0 && (
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {item.dietary.map((diet, index) => (
                              <Badge key={index} variant="secondary" className={getDietaryColor(diet)}>
                                {getDietaryIcon(diet)}
                                <span className="ml-1">{diet}</span>
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="mains">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Main Courses</h2>
                  <p className="text-muted-foreground">Expertly prepared dishes featuring premium ingredients</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuData.mains?.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <span className="text-lg font-bold text-primary">{item.price}</span>
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      {item.dietary.length > 0 && (
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {item.dietary.map((diet, index) => (
                              <Badge key={index} variant="secondary" className={getDietaryColor(diet)}>
                                {getDietaryIcon(diet)}
                                <span className="ml-1">{diet}</span>
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="desserts">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Desserts</h2>
                  <p className="text-muted-foreground">Sweet endings to create lasting memories</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuData.desserts?.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <span className="text-lg font-bold text-primary">{item.price}</span>
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      {item.dietary.length > 0 && (
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {item.dietary.map((diet, index) => (
                              <Badge key={index} variant="secondary" className={getDietaryColor(diet)}>
                                {getDietaryIcon(diet)}
                                <span className="ml-1">{diet}</span>
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="beverages">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Beverages</h2>
                  <p className="text-muted-foreground">Curated selection of wines, cocktails, and specialty drinks</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuData.beverages?.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <span className="text-lg font-bold text-primary">{item.price}</span>
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      {item.dietary.length > 0 && (
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {item.dietary.map((diet, index) => (
                              <Badge key={index} variant="secondary" className={getDietaryColor(diet)}>
                                {getDietaryIcon(diet)}
                                <span className="ml-1">{diet}</span>
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Plan Your Menu?</h2>
          <p className="text-xl mb-8 opacity-90">
            Our chefs can customize any dish to meet your specific dietary requirements and preferences
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/booking">Book Your Event</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
