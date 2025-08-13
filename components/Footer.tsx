import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Connoisseur Catering</h3>
            <p className="text-primary-foreground/80 mb-4">
              Premium catering services for weddings, corporate events, and private functions. Creating memorable
              experiences through exceptional cuisine and service.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span className="text-primary-foreground/80">+61 2 9876 5432</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-primary-foreground/80">info@connoisseurcatering.com.au</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-primary-foreground/80">Sydney, Australia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60">© 2024 Connoisseur Catering. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
