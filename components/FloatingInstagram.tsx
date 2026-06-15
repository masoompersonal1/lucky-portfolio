'use client'

import { Instagram } from "lucide-react"

export default function FloatingInstagram({ link = "https://instagram.com" }: { link?: string }) {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] w-12 h-12 bg-[#cc0000] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-black transition-all duration-300"
      aria-label="Instagram"
    >
      <Instagram size={24} />
    </a>
  )
}
