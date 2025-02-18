"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const photos = [
  "/photos/photo1.jpg",
  "/photos/photo2.jpg",
  "/photos/photo3.jpg",
  "/photos/photo4.jpg",
  "/photos/photo5.jpg",
  // Add more photo paths as needed
]

function Sparkle({ delay = 0 }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        y: [0, -100],
        x: [-50, 50],
      }}
      transition={{
        duration: 1.5,
        delay,
        ease: "easeOut",
      }}
      className="absolute w-2 h-2 bg-pink-400 rounded-full"
      style={{
        boxShadow: "0 0 20px 2px rgba(255, 182, 193, 0.8)",
      }}
    />
  )
}

function Firework({ x }: { x: number }) {
  return (
    <div className="absolute bottom-0" style={{ left: `${x}%` }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <Sparkle key={i} delay={i * 0.1} />
      ))}
    </div>
  )
}

function FloatingHeart({ delay = 0, scale = 1 }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  return (
    <motion.div
      initial={{ 
        y: Math.random() * dimensions.height + 100, 
        x: Math.random() * dimensions.width,
        opacity: 0, 
        scale 
      }}
      animate={{
        y: [-100, -dimensions.height],
        opacity: [0, 0.3, 0.3, 0],
        x: (i) => i + Math.sin(Math.random() * Math.PI * 2) * 100,
      }}
      transition={{
        duration: 15 + Math.random() * 10,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
      className="fixed text-pink-600/10 select-none pointer-events-none text-2xl"
    >
      ❤
    </motion.div>
  )
}

export function PhotoAlbum() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [showFireworks, setShowFireworks] = useState(true)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
    }, 5000)

    // Hide fireworks after animation
    const fireworkTimer = setTimeout(() => {
      setShowFireworks(false)
    }, 3000)

    return () => {
      clearInterval(timer)
      clearTimeout(fireworkTimer)
    }
  }, [])

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center py-12 space-y-8 overflow-hidden
      bg-gradient-to-b from-red-950 via-[#200] to-red-950">
      {/* Background Hearts - increased count and spread */}
      {Array.from({ length: 30 }).map((_, i) => (
        <FloatingHeart 
          key={i} 
          delay={i * 0.3} 
          scale={0.8 + Math.random() * 1.5}
        />
      ))}

      {/* Semi-transparent overlay - adjusted opacity */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content container - make sure it's above the overlay */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Fireworks */}
        <AnimatePresence>
          {showFireworks && (
            <>
              <Firework x={20} />
              <Firework x={40} />
              <Firework x={60} />
              <Firework x={80} />
            </>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl font-bold text-white text-center mb-8"
        >
          Thank you for being my Valentine&apos;s forever!
          <span className="text-pink-500">❤</span>
        </motion.h1>

        <div className="relative w-[640px] h-[480px] overflow-hidden rounded-lg shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhotoIndex}
              initial={{ x: 800, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -800, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={photos[currentPhotoIndex]}
                alt={`Photo ${currentPhotoIndex + 1}`}
                fill
                className="object-cover"
                priority
              />
              
              {/* Photo caption/overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white text-center text-xl">
                  Our memories together ❤️
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPhotoIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentPhotoIndex 
                    ? "bg-white w-4" 
                    : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Love message */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="max-w-2xl mx-auto px-4 mt-8"
        >
          <p className="text-white text-center text-lg leading-relaxed">
            Hello babe! Thank you for being my Valentine&apos;s again this year!
            I love you so much! Continue writing the rest of your message here ok!
          </p>
        </motion.div>
      </div>
    </div>
  )
}
