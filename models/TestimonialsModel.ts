import testimonialsData from "./data/testimonials.json"

export interface Testimonial {
  id: number
  name: string
  rating: number
  quote: string
  event: string
  date: string
}

export class TestimonialsModel {
  static async getAll(): Promise<Testimonial[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return testimonialsData
  }
}
