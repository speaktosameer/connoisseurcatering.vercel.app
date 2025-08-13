"use client"

import { ClientDashboardPresenter } from "@/presenters/ClientDashboardPresenter"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "@/contexts/AuthContext"
import { Calendar, Clock, Users, MapPin, Plus, Eye, Edit, CheckCircle, AlertCircle, XCircle } from "lucide-react"
import Link from "next/link"

export function ClientDashboardView() {
  const { user } = useAuth()
  const {
    bookings,
    eventHistory,
    profileForm,
    isProfileDialogOpen,
    setIsProfileDialogOpen,
    handleProfileInputChange,
    handleProfileSubmit,
    isLoading,
  } = ClientDashboardPresenter()

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const upcomingBookings = bookings.filter((booking) => new Date(booking.date) >= new Date())
  const pastBookings = bookings.filter((booking) => new Date(booking.date) < new Date())

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Client Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back, {user?.name}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingBookings.length}</div>
              <p className="text-xs text-muted-foreground">Next 12 months</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.filter((b) => b.status === "pending").length}</div>
              <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Events</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pastBookings.length}</div>
              <p className="text-xs text-muted-foreground">Successfully delivered</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="history">Event History</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="quick-actions">Quick Actions</TabsTrigger>
          </TabsList>

          {/* Current Bookings */}
          <TabsContent value="bookings">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Bookings</h2>
                <Button asChild>
                  <Link href="/booking">
                    <Plus className="h-4 w-4 mr-2" />
                    New Booking
                  </Link>
                </Button>
              </div>

              {bookings.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Ready to plan your next event? Let's create something memorable together.
                    </p>
                    <Button asChild>
                      <Link href="/booking">Make Your First Booking</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl flex items-center">
                              {booking.eventType}
                              <Badge className={`ml-3 ${getStatusColor(booking.status)}`} variant="secondary">
                                {getStatusIcon(booking.status)}
                                <span className="ml-1 capitalize">{booking.status}</span>
                              </Badge>
                            </CardTitle>
                            <CardDescription className="flex items-center mt-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              Event Location (To be confirmed)
                            </CardDescription>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Booking Details</DialogTitle>
                                <DialogDescription>Complete information about your event booking</DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Event Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <div>
                                        <strong>Type:</strong> {booking.eventType}
                                      </div>
                                      <div>
                                        <strong>Date:</strong>{" "}
                                        {new Date(booking.date).toLocaleDateString("en-AU", {
                                          weekday: "long",
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })}
                                      </div>
                                      <div>
                                        <strong>Guest Count:</strong> {booking.guestCount}
                                      </div>
                                      <div>
                                        <strong>Status:</strong>{" "}
                                        <Badge className={getStatusColor(booking.status)} variant="secondary">
                                          {booking.status}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Contact Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <div>
                                        <strong>Name:</strong> {booking.name}
                                      </div>
                                      <div>
                                        <strong>Email:</strong> {booking.email}
                                      </div>
                                      <div>
                                        <strong>Phone:</strong> {booking.phone}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {booking.specialRequests && (
                                  <div className="col-span-2">
                                    <h4 className="font-semibold mb-2">Special Requests</h4>
                                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                                      {booking.specialRequests}
                                    </p>
                                  </div>
                                )}
                                <div className="col-span-2">
                                  <h4 className="font-semibold mb-2">Booking Timeline</h4>
                                  <div className="text-sm text-muted-foreground">
                                    <div>
                                      <strong>Submitted:</strong>{" "}
                                      {new Date(booking.createdAt).toLocaleDateString("en-AU")}
                                    </div>
                                    {booking.status === "pending" && (
                                      <div className="mt-2 p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                                        <p className="text-yellow-800">
                                          Your booking is being reviewed. We'll contact you within 24 hours with
                                          confirmation and next steps.
                                        </p>
                                      </div>
                                    )}
                                    {booking.status === "confirmed" && (
                                      <div className="mt-2 p-3 bg-green-50 rounded border-l-4 border-green-400">
                                        <p className="text-green-800">
                                          Your booking is confirmed! We'll be in touch closer to the event date with
                                          final details.
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="text-sm">
                              {new Date(booking.date).toLocaleDateString("en-AU", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="text-sm">{booking.guestCount} guests</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="text-sm">
                              {booking.status === "confirmed"
                                ? "Confirmed"
                                : booking.status === "pending"
                                  ? "Awaiting confirmation"
                                  : "Cancelled"}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm text-muted-foreground">
                              Submitted {new Date(booking.createdAt).toLocaleDateString("en-AU")}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Event History */}
          <TabsContent value="history">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Event History</h2>

              {pastBookings.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No past events yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Your completed events will appear here for future reference.
                    </p>
                    <Button asChild>
                      <Link href="/gallery">View Our Gallery</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pastBookings.map((event) => (
                    <Card key={event.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {event.eventType}
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Completed
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          {new Date(event.date).toLocaleDateString("en-AU", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-muted-foreground mr-2" />
                            <span className="text-sm">{event.guestCount} guests</span>
                          </div>
                          <div className="pt-3 border-t">
                            <p className="text-sm text-muted-foreground mb-3">
                              Thank you for choosing Connoisseur Catering for your {event.eventType.toLowerCase()}!
                            </p>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" asChild>
                                <Link href="/testimonials">Leave Review</Link>
                              </Button>
                              <Button size="sm" variant="outline" asChild>
                                <Link href="/booking">Book Again</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Profile Management */}
          <TabsContent value="profile">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Profile Settings</h2>
                <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Profile</DialogTitle>
                      <DialogDescription>Update your personal information and preferences</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={profileForm.name}
                          onChange={handleProfileInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileForm.email}
                          onChange={handleProfileInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={profileForm.phone}
                          onChange={handleProfileInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="dietaryRequirements">Dietary Requirements</Label>
                        <Textarea
                          id="dietaryRequirements"
                          name="dietaryRequirements"
                          value={profileForm.dietaryRequirements}
                          onChange={handleProfileInputChange}
                          placeholder="Any dietary restrictions or preferences..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                        <Input
                          id="preferredContact"
                          name="preferredContact"
                          value={profileForm.preferredContact}
                          onChange={handleProfileInputChange}
                          placeholder="Email, Phone, etc."
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update Profile"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Your account details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Name</Label>
                      <p className="text-sm text-muted-foreground">{profileForm.name || user?.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p className="text-sm text-muted-foreground">{profileForm.email || user?.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Phone</Label>
                      <p className="text-sm text-muted-foreground">{profileForm.phone || "Not provided"}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Your catering preferences and requirements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Dietary Requirements</Label>
                      <p className="text-sm text-muted-foreground">
                        {profileForm.dietaryRequirements || "None specified"}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Preferred Contact</Label>
                      <p className="text-sm text-muted-foreground">{profileForm.preferredContact || "Email"}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Account Type</Label>
                      <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Quick Actions */}
          <TabsContent value="quick-actions">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Quick Actions</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Plus className="h-5 w-5 mr-2" />
                      New Booking
                    </CardTitle>
                    <CardDescription>Request catering for your next event</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link href="/booking">Book New Event</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Eye className="h-5 w-5 mr-2" />
                      Browse Menu
                    </CardTitle>
                    <CardDescription>Explore our latest menu offerings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" asChild className="w-full bg-transparent">
                      <Link href="/menu">View Menu</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Event Gallery
                    </CardTitle>
                    <CardDescription>View photos from past events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" asChild className="w-full bg-transparent">
                      <Link href="/gallery">View Gallery</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Our Services
                    </CardTitle>
                    <CardDescription>Learn about our catering services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" asChild className="w-full bg-transparent">
                      <Link href="/services">View Services</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Contact Us
                    </CardTitle>
                    <CardDescription>Get in touch with our team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" asChild className="w-full bg-transparent">
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="h-5 w-5 mr-2" />
                      Testimonials
                    </CardTitle>
                    <CardDescription>Read reviews from other clients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" asChild className="w-full bg-transparent">
                      <Link href="/testimonials">Read Reviews</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
