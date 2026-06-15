'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export interface HeroProps {
  data?: {
    topSubheading?: string;
    mainTitle?: string;
    signature?: string;
    signatureSubtext?: string;
    imageUrl?: string;
  }
}

export default function Hero({ data }: HeroProps) {
  // Use exact values from reference image if no data
  const mainTitle = data?.mainTitle || "LUCKY"
  const signature = "LS"
  const imageUrl = data?.imageUrl

  return (
    <section 
      id="home" 
      className="relative w-full min-h-[calc(100vh-110px)] md:min-h-screen flex flex-col justify-center text-white"
    >
      {/* Left Text Block */}
      <div className="absolute top-32 left-8 md:left-16 z-20 text-[10px] md:text-[11px] leading-relaxed tracking-wider uppercase text-[#a3a3a3] font-semibold flex flex-col">
        <span>AN AWARD-WINNING</span>
        <span>PHOTOGRAPHER WHOSE LENS</span>
        <span>TRANSFORMS MOMENTS INTO</span>
        <span>TIMELESS MASTERPIECES</span>
      </div>
      
      {/* Right Text Block */}
      <div className="absolute top-[45%] right-8 md:right-16 z-20 text-[10px] md:text-[11px] leading-snug tracking-wider uppercase text-[#a3a3a3] font-semibold text-right">
        <span>SCROLL</span><br/>
        <span>MORE</span>
      </div>

      {/* Main Portrait - FULL WIDTH */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image 
            src={"/img2.jpeg"} 
            alt="Hero Portrait" 
            fill 
            className="object-cover object-top grayscale brightness-50 contrast-125"
            priority
          />
        </motion.div>
      </div>

      {/* Huge Cutout Title & Red Circle container */}
      <div className="absolute bottom-0 left-0 w-full z-40 pointer-events-none flex flex-col items-center justify-end">
        
        {/* Text container for precise signature positioning */}
        <div className="relative w-full">
          {/* SVG Mask for Cutout Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full"
          >
            <svg className="w-full h-[35vw] md:h-[18vw] overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 230">
              <defs>
                <mask id="textMask">
                  {/* White rect to reveal text cutout */}
                  <rect x="-50%" y="-100%" width="200%" height="500%" fill="white" />
                  
                  {/* Mobile Text - Stretched horizontally to touch the screen edges */}
                  <text 
                    className="md:hidden"
                    x="50%" 
                    y="52%" 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    fill="black" 
                    fontSize="320" 
                    fontWeight="900" 
                    fontFamily="sans-serif"
                    letterSpacing="-0.02em"
                    lengthAdjust="spacingAndGlyphs"
                    textLength="1080"
                  >
                    {mainTitle}
                  </text>

                  {/* Desktop Text */}
                  <text 
                    className="hidden md:inline"
                    x="50%" 
                    y="52%" 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    fill="black" 
                    fontSize="320" 
                    fontWeight="900" 
                    fontFamily="sans-serif"
                    letterSpacing="-0.02em"
                    lengthAdjust="spacingAndGlyphs"
                    textLength="1000"
                  >
                    {mainTitle}
                  </text>
                </mask>
              </defs>
              
              {/* Gray Background masked by text */}
              <rect width="100%" height="105%" fill="#c0c0c0" mask="url(#textMask)" />

              {/* Red Circle Accent (Mobile) */}
              <motion.ellipse 
                className="md:hidden"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
                cx="630"
                cy="230"
                rx="160"
                ry="105"
                fill="#cc0000"
                mask="url(#textMask)"
                style={{ transformOrigin: "630px 230px" }}
              />

              {/* Red Circle Accent (Desktop) */}
              <motion.ellipse 
                className="hidden md:inline"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
                cx="750"
                cy="230"
                rx="98"
                ry="125"
                fill="#cc0000"
                mask="url(#textMask)"
                style={{ transformOrigin: "750px 230px" }}
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  )
}




