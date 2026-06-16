'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export interface ServicesProps {
  data?: {
    description?: string;
    list?: { title: string; mediaUrl: string }[];
  }
}

export default function Services({ data }: ServicesProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const descriptionLines = (data?.description || "Whether it's capturing the\nessence of a corporate\nevent, immortalizing a\ncouple's special day, or\ncollaborating on artistic\nprojects").split('\n')

  const defaultServices = [
    { title: 'PORTRAITURE', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800&grayscale=true' },
    { title: 'EVENT COVERAGE', image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800&grayscale=true' },
    { title: 'COMMERCIAL PHOTO', image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&q=80&w=800&grayscale=true' },
    { title: 'WEDDING PHOTO', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800&grayscale=true' },
    { title: 'FINE ART PHOTO', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800&grayscale=true' }
  ]

  const services = data?.list && data.list.length > 0 
    ? data.list.map((s, i) => ({ id: `srv_${i}`, title: s.title, image: s.mediaUrl || defaultServices[i%defaultServices.length].image }))
    : defaultServices.map((s, i) => ({ id: `srv_${i}`, title: s.title, image: s.image }))

  return (
    <section id="services" className="w-full min-h-0 md:min-h-screen bg-[#c0c0c0] relative px-6 md:px-16 pt-16 md:pt-24 pb-8 md:pb-20 text-black flex flex-col justify-center">
      <div className="max-w-[1200px] w-full mx-auto flex flex-col md:flex-row justify-between gap-8 md:gap-16">
        
        {/* Left Column */}
        <div className="w-full md:w-[40%] flex flex-col mb-12 md:mb-0 pt-4">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
            MY SERVICES
          </h2>
          <p className="text-[11px] md:text-sm font-bold tracking-wider leading-relaxed uppercase max-w-sm">
            {descriptionLines.map((line, i) => <span key={i}>{line} <br className="hidden md:block" /></span>)}
          </p>
        </div>

        {/* Right Column (List) */}
        <div className="w-full md:w-[55%] flex flex-col">
          {/* Top border for the first item */}
          <div className="border-t border-black/20 w-full" />
          
          {services.map((service) => {
            const isActive = activeId === service.id;
            
            return (
              <div 
                key={service.id}
                onClick={() => setActiveId(isActive ? null : service.id)}
                className="group relative w-full border-b border-black/20 overflow-hidden cursor-pointer flex items-center justify-between py-6 md:py-10 px-2 transition-colors duration-300"
              >
                {/* Hover/Active Background Image */}
                <div className={`absolute inset-0 z-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
                  {!service.image ? (
                    <div className="w-full h-full bg-zinc-900 object-cover" />
                  ) : service.image.match(/(\/video\/upload\/|\.(mp4|webm|ogg|mov|avi|mkv|qt)$)/i) ? (
                    <video 
                      src={service.image} 
                      autoPlay muted loop playsInline 
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      className="object-cover"
                    />
                  )}
                  {/* Dark overlay to ensure text remains readable */}
                  <div className="absolute inset-0 bg-black/50" />
                </div>

                {/* Arrow Button */}
                <div className={`relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full border flex justify-center items-center transition-all duration-300 ${isActive ? 'bg-[#cc0000] border-[#cc0000] text-white' : 'border-black md:group-hover:bg-[#cc0000] md:group-hover:border-[#cc0000] md:group-hover:text-white'}`}>
                  <ArrowRight size={20} strokeWidth={1.5} />
                </div>

                {/* Service Title */}
                <h3 className={`relative z-10 text-xl md:text-4xl font-medium tracking-tight uppercase transition-colors duration-300 ${isActive ? 'text-[#c0c0c0]' : 'text-black md:group-hover:text-[#c0c0c0]'}`}>
                  {service.title}
                </h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
