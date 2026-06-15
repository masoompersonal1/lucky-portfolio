'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const links = [
    { name: 'ABOUT ME', href: '#about' },
    { name: 'MY WORKS', href: '#works' },
    { name: 'MY SERVICES', href: '#services' },
    { name: 'CONTACT ME', href: '#contact' },
  ]

  return (
    <nav className="absolute top-0 left-0 w-full z-50 py-8 px-8 md:px-16 flex justify-between items-center bg-transparent">
      {/* Left Logo (Text) - Double click for Admin */}
      <div className="flex-shrink-0 cursor-pointer" onDoubleClick={() => router.push('/admin')}>
        <div className="font-['Brush_Script_MT','Brush_Script_Std',cursive] text-2xl leading-none text-white drop-shadow-md tracking-wider select-none">
          Prince<br />Lucky
        </div>
      </div>

      {/* Desktop Menu - Right aligned */}
      <div className="hidden md:flex gap-24 items-center pr-12">
        <Link href="#about" className="text-sm font-bold tracking-[0.2em] text-white hover:text-[#cc0000] transition-colors relative group">
          ABOUT ME
        </Link>
        <Link href="#works" className="text-sm font-bold tracking-[0.2em] text-white hover:text-[#cc0000] transition-colors relative group">
          MY WORKS
        </Link>
        <Link href="#services" className="text-sm font-bold tracking-[0.2em] text-white hover:text-[#cc0000] transition-colors relative group">
          MY SERVICES
        </Link>
        <Link href="#contact" className="text-sm font-bold tracking-[0.2em] text-white hover:text-[#cc0000] transition-colors relative group">
          CONTACT
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden text-white z-50 ml-auto"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black flex flex-col items-center justify-center z-40"
          >
            <ul className="flex flex-col gap-8 text-xl tracking-[0.1em] text-[#a3a3a3] text-center">
              {links.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="hover:text-white transition-colors block py-2"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

