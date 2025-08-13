"use client"

import type React from "react"

import { HomePresenter } from "@/presenters/HomePresenter"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowRight, Star, Users, Award, ChefHat, CheckCircle, Quote, Send } from "lucide-react"
import { useState, useEffect } from "react"

export function HomeView() {
  const { services, testimonials, galleryImages, isLoading, submitReview } = HomePresenter()

  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    rating: 5,
    review: "",
    event: "",
  })
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)

  useEffect(() => {
    if (testimonials && testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [testimonials])

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingReview(true)

    try {
      await submitReview(reviewForm)
      setReviewSubmitted(true)
      setReviewForm({ name: "", email: "", rating: 5, review: "", event: "" })
      setTimeout(() => setReviewSubmitted(false), 5000)
    } catch (error) {
      console.error("Error submitting review:", error)
    } finally {
      setIsSubmittingReview(false)
    }
  }

  const getVisibleTestimonials = () => {
    if (!testimonials || testimonials.length === 0) return []
    const visible = []
    for (let i = 0; i < 3; i++) {
      const index = (currentTestimonialIndex + i) % testimonials.length
      visible.push(testimonials[index])
    }
    return visible
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-slate-900/90 to-slate-800/70 flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/placeholder.svg?height=800&width=1200')",
          }}
        />
        <div className="absolute inset-0 bg-slate-900/60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Delight <span className="text-amber-400">Your</span> Guests
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Creating unforgettable culinary experiences with artisanal dishes, premium ingredients, and exceptional
            service for every occasion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-amber-500 text-slate-900 hover:bg-amber-400 font-semibold">
              <Link href="/menu">
                Explore Our Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
            >
              <Link href="/booking">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-amber-100 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">1,200+</h3>
              <p className="text-slate-600">Events Catered</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-amber-100 p-4 rounded-full mb-4">
                <Star className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">4.9/5</h3>
              <p className="text-slate-600">Customer Rating</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-amber-100 p-4 rounded-full mb-4">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">25+</h3>
              <p className="text-slate-600">Years Experience</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-amber-100 p-4 rounded-full mb-4">
                <ChefHat className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">15</h3>
              <p className="text-slate-600">Expert Chefs</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">
                Experience <span className="text-amber-600">The Sublime</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Welcome to Connoisseur Catering, where we bring food to different dimensions and share our lovely
                experiences with you. We are a premium catering company with Chef's who cook for you the best food with
                a touch of fusion that you will never forget. The perfect combination of truly exquisite delicious food
                along with a friendly staff and warm ambiance which will make you feel at home.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-amber-600" />
                  <span className="text-slate-700">Premium locally-sourced ingredients</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-amber-600" />
                  <span className="text-slate-700">Award-winning culinary team</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-amber-600" />
                  <span className="text-slate-700">Customized menu planning</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-amber-600" />
                  <span className="text-slate-700">Full-service event coordination</span>
                </div>
              </div>
              <Button asChild className="mt-8 bg-slate-800 hover:bg-slate-700">
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img src="/placeholder.svg?height=300&width=250" alt="Chef plating" className="rounded-lg shadow-lg" />
                <img
                  src="/placeholder.svg?height=300&width=250"
                  alt="Catered appetizers"
                  className="rounded-lg shadow-lg mt-8"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-amber-500 text-slate-900 p-4 rounded-lg shadow-lg">
                <p className="font-semibold">25+ Years</p>
                <p className="text-sm">of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Our Signature Services</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              From intimate gatherings to grand celebrations, we provide exceptional catering services tailored to your
              unique vision and requirements
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-64 bg-slate-200 rounded-t-lg" />
                  <CardHeader>
                    <div className="h-6 bg-slate-200 rounded w-3/4" />
                    <div className="h-4 bg-slate-200 rounded w-full" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={
                        service.image || "/placeholder.svg?height=250&width=400&query=elegant catering service setup"
                      }
                      alt={service.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-slate-800">{service.title}</CardTitle>
                    <CardDescription className="text-slate-600 leading-relaxed">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-amber-600">From {service.startingPrice}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-slate-300 hover:bg-slate-800 hover:text-white bg-transparent"
                      >
                        <Link href="/services">Learn More</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Our Process</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              From initial consultation to final service, we ensure every detail is perfect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "We discuss your vision, preferences, and requirements" },
              { step: "02", title: "Menu Design", desc: "Custom menu creation tailored to your event and guests" },
              { step: "03", title: "Preparation", desc: "Expert chefs prepare everything with premium ingredients" },
              { step: "04", title: "Service", desc: "Professional service team ensures flawless execution" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-amber-600 font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section with Carousel */}
      <section className="py-20 bg-slate-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>

          <div className="relative">
            <div className="flex transition-transform duration-1000 ease-in-out gap-8">
              {getVisibleTestimonials().map((testimonial, index) => (
                <Card
                  key={`${testimonial.id}-${currentTestimonialIndex}-${index}`}
                  className="bg-slate-700 border-slate-600 text-white flex-shrink-0 w-full md:w-1/3 transform transition-all duration-1000"
                >
                  <CardHeader>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < testimonial.rating ? "text-amber-400 fill-current" : "text-slate-400"}`}
                        />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-amber-400 mb-2" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-200 mb-4 italic">"{testimonial.review}"</p>
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-slate-400">{testimonial.event}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8 gap-2">
              {testimonials?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentTestimonialIndex ? "bg-amber-400" : "bg-slate-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Review Submission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Share Your Experience</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We'd love to hear about your event! Leave us a review and help others discover our services.
            </p>
          </div>

          {reviewSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-green-800 mb-2">Thank You!</h3>
              <p className="text-green-700">
                Your review has been submitted successfully. We appreciate your feedback!
              </p>
            </div>
          ) : (
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl text-slate-800">Leave a Review</CardTitle>
                <CardDescription className="text-slate-600">
                  Tell us about your experience with our catering services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-slate-700 font-medium">
                        Your Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="mt-2 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-slate-700 font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={reviewForm.email}
                        onChange={(e) => setReviewForm((prev) => ({ ...prev, email: e.target.value }))}
                        className="mt-2 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="event" className="text-slate-700 font-medium">
                      Event Type
                    </Label>
                    <Input
                      id="event"
                      type="text"
                      value={reviewForm.event}
                      onChange={(e) => setReviewForm((prev) => ({ ...prev, event: e.target.value }))}
                      className="mt-2 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                      placeholder="e.g., Wedding, Corporate Event, Birthday Party"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-700 font-medium">Rating *</Label>
                    <div className="flex items-center gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm((prev) => ({ ...prev, rating: star }))}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-8 w-8 transition-colors ${
                              star <= reviewForm.rating
                                ? "text-amber-400 fill-current"
                                : "text-slate-300 hover:text-amber-300"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-slate-600">({reviewForm.rating}/5)</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="review" className="text-slate-700 font-medium">
                      Your Review *
                    </Label>
                    <Textarea
                      id="review"
                      required
                      value={reviewForm.review}
                      onChange={(e) => setReviewForm((prev) => ({ ...prev, review: e.target.value }))}
                      className="mt-2 border-slate-300 focus:border-amber-500 focus:ring-amber-500 min-h-[120px]"
                      placeholder="Share your experience with our catering services..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-3"
                  >
                    {isSubmittingReview ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900 mr-2" />
                        Submitting Review...
                      </>
                    ) : (
                      <>
                        Submit Review
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Recent Events</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Take a look at some of our recent catering successes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "elegant wedding reception table setting",
              "corporate event buffet spread",
              "gourmet appetizer platter",
              "outdoor event catering setup",
              "fine dining plated dessert",
              "cocktail party canapés",
              "formal dinner service",
              "celebration cake cutting",
            ].map((query, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg">
                <img
                  src={`/placeholder.svg?height=250&width=250&query=${query}`}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-slate-300 hover:bg-slate-800 hover:text-white bg-transparent"
            >
              <Link href="/gallery">View Full Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Create Your Perfect Event?</h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Let us bring your culinary vision to life with our exceptional catering services and attention to detail
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-slate-800 text-white hover:bg-slate-700 font-semibold">
              <Link href="/booking">Get a Custom Quote</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white bg-transparent"
            >
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
