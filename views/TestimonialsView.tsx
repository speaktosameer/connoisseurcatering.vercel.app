"use client"

import { TestimonialsPresenter } from "@/presenters/TestimonialsPresenter"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import Link from "next/link"

export function TestimonialsView() {
  const { testimonials, isLoading } = TestimonialsPresenter()

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Client Testimonials</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about their experiences with
            Connoisseur Catering.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      {[1, 2, 3, 4, 5].map((j) => (
                        <div key={j} className="h-4 w-4 bg-muted rounded" />
                      ))}
                    </div>
                    <div className="h-6 bg-muted rounded w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-5/6" />
                      <div className="h-4 bg-muted rounded w-4/6" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="hover:shadow-lg transition-shadow relative">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">{renderStars(testimonial.rating)}</div>
                      <Quote className="h-6 w-6 text-primary/30" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                        <Badge variant="outline" className="mt-1">
                          {testimonial.event}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(testimonial.date).toLocaleDateString("en-AU", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-muted-foreground italic leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-primary-foreground/80">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-primary-foreground/80">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-primary-foreground/80">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Happy Clients</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Experience the exceptional service and cuisine that has earned us these wonderful reviews.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/booking">Book Your Event</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
