import menuData from "./data/menu.json"

export interface MenuItem {
  id: number
  name: string
  description: string
  price: string
  dietary: string[]
}

export interface MenuData {
  canapes: MenuItem[]
  mains: MenuItem[]
  desserts: MenuItem[]
  beverages: MenuItem[]
}

export class MenuModel {
  static async getAll(): Promise<MenuData> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return menuData
  }

  static async getByCategory(category: keyof MenuData): Promise<MenuItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return menuData[category] || []
  }
}
