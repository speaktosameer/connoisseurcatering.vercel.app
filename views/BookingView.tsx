"use client"

import { BookingPresenter } from "@/presenters/BookingPresenter"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Users, Clock, CheckCircle } from "lucide-react"

export function BookingView() {
  const { formData, isSubmitting, isSubmitted, handleInputChange, handleSelectChange, handleSubmit } =
    BookingPresenter()

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Booking Submitted!</CardTitle>
              <CardDescription>
                Thank you for your interest. We'll contact you within 24 hours to discuss your event details.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild>
                <a href="/">Return Home</a>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Book Your Event</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Let us create an unforgettable culinary experience for your special occasion. Fill out the form below and
            we'll get back to you with a personalized quote.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Event Details</CardTitle>
                  <CardDescription>
                    Please provide as much information as possible to help us create the perfect event for you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="+61 400 123 456"
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventType">Event Type *</Label>
                        <Select name="eventType" value={formData.eventType} onValueChange={handleSelectChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Wedding">Wedding</SelectItem>
                            <SelectItem value="Corporate Event">Corporate Event</SelectItem>
                            <SelectItem value="Private Function">Private Function</SelectItem>
                            <SelectItem value="Birthday Party">Birthday Party</SelectItem>
                            <SelectItem value="Anniversary">Anniversary</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Event Date *</Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div>
                        <Label htmlFor="guestCount">Number of Guests *</Label>
                        <Input
                          id="guestCount"
                          name="guestCount"
                          type="number"
                          value={formData.guestCount}
                          onChange={handleInputChange}
                          required
                          min="1"
                          placeholder="50"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="specialRequests">Special Requests</Label>
                      <Textarea
                        id="specialRequests"
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        placeholder="Please let us know about any dietary restrictions, special requirements, or additional services you need..."
                        rows={4}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    What Happens Next?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-2 mr-3 mt-1">
                      <span className="text-primary font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Initial Contact</h4>
                      <p className="text-sm text-muted-foreground">We'll call you within 24 hours to discuss details</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-2 mr-3 mt-1">
                      <span className="text-primary font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Custom Quote</h4>
                      <p className="text-sm text-muted-foreground">Receive a detailed proposal within 48 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-2 mr-3 mt-1">
                      <span className="text-primary font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Menu Tasting</h4>
                      <p className="text-sm text-muted-foreground">
                        Schedule a tasting session (for events 50+ guests)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Event Minimums
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Weddings:</span>
                    <span className="text-sm font-semibold">50 guests</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Corporate:</span>
                    <span className="text-sm font-semibold">20 guests</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Private Functions:</span>
                    <span className="text-sm font-semibold">15 guests</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Booking Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We recommend booking at least 4-6 weeks in advance for optimal menu selection and availability. Rush
                    bookings may be accommodated with additional fees.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
