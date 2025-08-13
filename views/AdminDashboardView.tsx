"use client"

import { AdminDashboardPresenter } from "@/presenters/AdminDashboardPresenter"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/contexts/AuthContext"
import { Users, Calendar, ChefHat, Star, Plus, Edit, Trash2, Eye, Check, X, ImageIcon } from "lucide-react"

export function AdminDashboardView() {
  const { user } = useAuth()
  const {
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
  } = AdminDashboardPresenter()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back, {user?.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.length}</div>
              <p className="text-xs text-muted-foreground">
                {bookings.filter((b) => b.status === "pending").length} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Services</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{services.length}</div>
              <p className="text-xs text-muted-foreground">Active services</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
              <ChefHat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{menuItems.length}</div>
              <p className="text-xs text-muted-foreground">Across all categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testimonials.length}</div>
              <p className="text-xs text-muted-foreground">Client reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          {/* Bookings Management */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Booking Management</CardTitle>
                <CardDescription>View and manage all event bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Event Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{booking.name}</div>
                            <div className="text-sm text-muted-foreground">{booking.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{booking.eventType}</TableCell>
                        <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                        <TableCell>{booking.guestCount}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)} variant="secondary">
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {booking.status === "pending" && (
                              <>
                                <Button size="sm" onClick={() => handleBookingStatusUpdate(booking.id, "confirmed")}>
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleBookingStatusUpdate(booking.id, "cancelled")}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Booking Details</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <strong>Name:</strong> {booking.name}
                                  </div>
                                  <div>
                                    <strong>Email:</strong> {booking.email}
                                  </div>
                                  <div>
                                    <strong>Phone:</strong> {booking.phone}
                                  </div>
                                  <div>
                                    <strong>Event Type:</strong> {booking.eventType}
                                  </div>
                                  <div>
                                    <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
                                  </div>
                                  <div>
                                    <strong>Guest Count:</strong> {booking.guestCount}
                                  </div>
                                  <div>
                                    <strong>Special Requests:</strong> {booking.specialRequests || "None"}
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Management */}
          <TabsContent value="services">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Services Management</CardTitle>
                  <CardDescription>Manage your catering services</CardDescription>
                </div>
                <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={resetServiceForm}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Service
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{serviceForm.id ? "Edit Service" : "Add New Service"}</DialogTitle>
                      <DialogDescription>
                        {serviceForm.id ? "Update service details" : "Create a new catering service"}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleServiceSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="title">Service Title</Label>
                        <Input
                          id="title"
                          name="title"
                          value={serviceForm.title}
                          onChange={handleServiceInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={serviceForm.description}
                          onChange={handleServiceInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="startingPrice">Starting Price</Label>
                        <Input
                          id="startingPrice"
                          name="startingPrice"
                          value={serviceForm.startingPrice}
                          onChange={handleServiceInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="features">Features (comma-separated)</Label>
                        <Textarea
                          id="features"
                          name="features"
                          value={serviceForm.features}
                          onChange={handleServiceInputChange}
                          placeholder="Feature 1, Feature 2, Feature 3"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        {serviceForm.id ? "Update Service" : "Add Service"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <Card key={service.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-primary">{service.startingPrice}</div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleServiceEdit(service)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleServiceDelete(service.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Menu Management */}
          <TabsContent value="menu">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Menu Management</CardTitle>
                  <CardDescription>Manage your menu items and pricing</CardDescription>
                </div>
                <Dialog open={isMenuDialogOpen} onOpenChange={setIsMenuDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={resetMenuForm}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Menu Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{menuForm.id ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
                      <DialogDescription>
                        {menuForm.id ? "Update menu item details" : "Create a new menu item"}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleMenuSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Item Name</Label>
                        <Input id="name" name="name" value={menuForm.name} onChange={handleMenuInputChange} required />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={menuForm.description}
                          onChange={handleMenuInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          name="price"
                          value={menuForm.price}
                          onChange={handleMenuInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          name="category"
                          value={menuForm.category}
                          onValueChange={(value) =>
                            handleMenuInputChange({ target: { name: "category", value } } as any)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="canapes">Canapés</SelectItem>
                            <SelectItem value="mains">Main Courses</SelectItem>
                            <SelectItem value="desserts">Desserts</SelectItem>
                            <SelectItem value="beverages">Beverages</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="dietary">Dietary Options (comma-separated)</Label>
                        <Input
                          id="dietary"
                          name="dietary"
                          value={menuForm.dietary}
                          onChange={handleMenuInputChange}
                          placeholder="Vegetarian, Gluten-Free, Vegan"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        {menuForm.id ? "Update Item" : "Add Item"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Dietary</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {menuItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">{item.description}</div>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{item.category}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>
                          {item.dietary.map((diet, index) => (
                            <Badge key={index} variant="outline" className="mr-1">
                              {diet}
                            </Badge>
                          ))}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleMenuEdit(item)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleMenuDelete(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Management */}
          <TabsContent value="testimonials">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Testimonials Management</CardTitle>
                  <CardDescription>Manage client testimonials and reviews</CardDescription>
                </div>
                <Dialog open={isTestimonialDialogOpen} onOpenChange={setIsTestimonialDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={resetTestimonialForm}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Testimonial
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{testimonialForm.id ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
                      <DialogDescription>
                        {testimonialForm.id ? "Update testimonial details" : "Create a new testimonial"}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Client Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={testimonialForm.name}
                          onChange={handleTestimonialInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="event">Event Type</Label>
                        <Input
                          id="event"
                          name="event"
                          value={testimonialForm.event}
                          onChange={handleTestimonialInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="rating">Rating (1-5)</Label>
                        <Select
                          name="rating"
                          value={testimonialForm.rating.toString()}
                          onValueChange={(value) =>
                            handleTestimonialInputChange({ target: { name: "rating", value } } as any)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select rating" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 Stars</SelectItem>
                            <SelectItem value="4">4 Stars</SelectItem>
                            <SelectItem value="3">3 Stars</SelectItem>
                            <SelectItem value="2">2 Stars</SelectItem>
                            <SelectItem value="1">1 Star</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="quote">Testimonial Quote</Label>
                        <Textarea
                          id="quote"
                          name="quote"
                          value={testimonialForm.quote}
                          onChange={handleTestimonialInputChange}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        {testimonialForm.id ? "Update Testimonial" : "Add Testimonial"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {testimonials.map((testimonial) => (
                    <Card key={testimonial.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                            <CardDescription>{testimonial.event}</CardDescription>
                          </div>
                          <div className="flex">
                            {Array.from({ length: testimonial.rating }, (_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">"{testimonial.quote}"</p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleTestimonialEdit(testimonial)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleTestimonialDelete(testimonial.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Management */}
          <TabsContent value="gallery">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gallery Management</CardTitle>
                  <CardDescription>Manage event photos and gallery images</CardDescription>
                </div>
                <Dialog open={isGalleryDialogOpen} onOpenChange={setIsGalleryDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={resetGalleryForm}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Image
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{galleryForm.id ? "Edit Gallery Item" : "Add New Gallery Item"}</DialogTitle>
                      <DialogDescription>
                        {galleryForm.id ? "Update gallery item details" : "Add a new image to the gallery"}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleGallerySubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="title">Image Title</Label>
                        <Input
                          id="title"
                          name="title"
                          value={galleryForm.title}
                          onChange={handleGalleryInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          name="description"
                          value={galleryForm.description}
                          onChange={handleGalleryInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          name="category"
                          value={galleryForm.category}
                          onValueChange={(value) =>
                            handleGalleryInputChange({ target: { name: "category", value } } as any)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weddings">Weddings</SelectItem>
                            <SelectItem value="corporate">Corporate</SelectItem>
                            <SelectItem value="private">Private Functions</SelectItem>
                            <SelectItem value="food">Food & Presentation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit" className="w-full">
                        {galleryForm.id ? "Update Item" : "Add Item"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryItems.map((item) => (
                    <Card key={item.id}>
                      <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="capitalize">
                            {item.category}
                          </Badge>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleGalleryEdit(item)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleGalleryDelete(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
