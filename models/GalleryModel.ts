import galleryData from "./data/gallery.json"

// Reverted back to GalleryItem to match existing imports throughout codebase
export interface GalleryItem {
  id: number
  title: string
  image: string
  category: string
  description: string
}

export class GalleryModel {
  static async getAll(): Promise<GalleryItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return galleryData
  }

  static async getByCategory(category: string): Promise<GalleryItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return galleryData.filter((item) => item.category === category)
  }
}
