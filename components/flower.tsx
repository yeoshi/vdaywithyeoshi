"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"

const loveMessages = [
  "You are can edit all of these messages",
  "You are amazing", 
  "You are beautiful",
  "You are a good person",
  "You are my best friend",
  "You are my one and only" ,
  "You are my soulmate",
  "Yeoshi was here lol!",
]

export function Flower() {
  const [pluckedPetals, setPluckedPetals] = useState<number[]>([])
  const [currentMessage, setCurrentMessage] = useState<string | null>(null)
  const router = useRouter()

  const handlePetalClick = (index: number) => {
    if (!pluckedPetals.includes(index)) {
      setPluckedPetals([...pluckedPetals, index])
      setCurrentMessage(loveMessages[index])
    }
  }

  const closeMessage = () => {
    setCurrentMessage(null)
    if (pluckedPetals.length === 8) {
      router.push("/photo-album")
    }
  }

  useEffect(() => {
    if (pluckedPetals.length === 8 && !currentMessage) {
      router.push("/photo-album")
    }
  }, [pluckedPetals, currentMessage, router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-3xl font-bold text-pink-600 mb-12 text-center">
        8 Reasons Why I Love You!
      </h1>
      <div className="relative w-[400px] h-[400px] flex items-center justify-center">
        {/* Flower stem */}
        <div className="absolute left-1/2 top-[50%] -translate-x-1/2 w-4 
          bg-gradient-to-b from-green-500 to-green-600 rounded-full
          h-[100vh]"
        />
        
        {/* Petals */}
        <AnimatePresence>
          {Array.from({ length: 8 }).map((_, index) => {
            const angle = (index * 360) / 8
            const isPlucked = pluckedPetals.includes(index)
            
            // Calculate offset based on half petal height (h-44 = 176px)
            const offset = 88 // half height (176/2)
            const radians = (angle * Math.PI) / 180
            const x = Math.cos(radians) * offset
            const y = Math.sin(radians) * offset

            if (isPlucked) return null

            return (
              <motion.div
                key={index}
                className="absolute w-28 h-44
                  cursor-pointer rounded-[100%_0%_100%_0%]
                  border-2 border-pink-400 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #FFB6C1 20%, #FF69B4 100%)",
                  transformOrigin: "center center",
                  left: "50%",
                  top: "50%",
                  transform: `
                    translate(calc(-50% + ${x}px), calc(-50% + ${y}px))
                    rotate(${angle - 90}deg)
                  `,
                }}
                onClick={() => handlePetalClick(index)}
                exit={{
                  opacity: 0,
                  y: 500,
                  rotate: `${angle - 90 + (Math.random() * 360)}deg`,
                  transition: {
                    duration: 2,
                    ease: "easeOut"
                  }
                }}
              />
            )
          })}
        </AnimatePresence>

        {/* Center circle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 
          bg-gradient-to-r from-pink-400 to-pink-500 rounded-full z-20 
          shadow-inner border-2 border-pink-300" 
        />
      </div>

      {/* Message display */}
      <AnimatePresence mode="wait">
        {currentMessage && (
          <motion.div
            key={currentMessage}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={closeMessage}
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
            <div 
              className="relative text-center text-2xl font-medium text-pink-600 
                        bg-white p-8 rounded-lg shadow-lg max-w-md mx-4
                        border-2 border-pink-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={closeMessage}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
              {currentMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
