"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Flower } from "./components/flower"

export default function ValentinePage() {
  const [noCount, setNoCount] = useState(0)
  const [yesPressed, setYesPressed] = useState(false)
  const [yesScale, setYesScale] = useState(1)

  const noTexts = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely sure?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
  ]

  const handleNoClick = () => {
    setNoCount(noCount + 1)
    if (noCount < 16) {
      setYesScale((scale) => scale * 1.5)
    }
  }

  const handleYesClick = () => {
    setYesPressed(true)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      {yesPressed && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.h1 initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-4xl font-bold text-pink-500 mb-8">
              Let me count the ways... 🌸
            </motion.h1>
            <Flower />
          </div>
        </div>
      )}

      <div className="max-w-md w-full space-y-8 text-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/1/1a/Miffy.png"
          alt="Miffy with hearts"
          className="w-64 h-64 mx-auto object-contain"
        />

        <h1 className="text-3xl font-bold text-gray-900">Will you be my Valentine?</h1>

        <div
          className="flex justify-center items-center gap-4"
          style={{ minHeight: `${Math.max(48, 48 * yesScale)}px` }}
        >
          <motion.button
            onClick={handleYesClick}
            style={{ scale: yesScale }}
            className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Yes
          </motion.button>

          <button
            onClick={handleNoClick}
            className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            {noTexts[Math.min(noCount, noTexts.length - 1)]}
          </button>
        </div>
      </div>
    </div>
  )
}

