import servicesData from "./data/services.json"

export interface Service {
  id: number
  title: string
  description: string
  image: string
  features: string[]
  startingPrice: string
}

export class ServicesModel {
  static async getAll(): Promise<Service[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))
    return servicesData
  }

  static async getById(id: number): Promise<Service | null> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return servicesData.find((service) => service.id === id) || null
  }
}
