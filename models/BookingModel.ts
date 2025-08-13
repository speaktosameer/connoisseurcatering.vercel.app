import bookingsData from "./data/bookings.json"

export interface Booking {
  id: number
  name: string
  email: string
  phone: string
  eventType: string
  date: string
  guestCount: number
  specialRequests: string
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
}

export interface BookingFormData {
  name: string
  email: string
  phone: string
  eventType: string
  date: string
  guestCount: number
  specialRequests: string
}

export class BookingModel {
  static async getAll(): Promise<Booking[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return bookingsData
  }

  static async getByUserEmail(email: string): Promise<Booking[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return bookingsData.filter((booking) => booking.email === email)
  }

  static async create(data: BookingFormData): Promise<Booking> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newBooking: Booking = {
      id: Date.now(),
      ...data,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    // In a real app, this would save to a database
    bookingsData.push(newBooking)
    return newBooking
  }

  static async updateStatus(id: number, status: Booking["status"]): Promise<Booking | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const booking = bookingsData.find((b) => b.id === id)
    if (booking) {
      booking.status = status
      return booking
    }
    return null
  }
}
