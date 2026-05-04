"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface HealthMeterProps {
  freshnessScore: number
  confidenceScore: number
}

export default function HealthMeter({
  freshnessScore,
  confidenceScore,
}: HealthMeterProps) {
  const [freshDisplay, setFreshDisplay] = useState(0)
  const [confDisplay, setConfDisplay] = useState(0)

  useEffect(() => {
    let f = 0
    let c = 0

    const interval = setInterval(() => {
      if (f < freshnessScore) f++
      if (c < confidenceScore) c++
      setFreshDisplay(f)
      setConfDisplay(c)

      if (f >= freshnessScore && c >= confidenceScore) {
        clearInterval(interval)
      }
    }, 15)

    return () => clearInterval(interval)
  }, [freshnessScore, confidenceScore])

  const getColor = (score: number) => {
    if (score >= 75) return "#22c55e"
    if (score >= 50) return "#f59e0b"
    return "#ef4444"
  }

  const createCircle = (score: number, display: number) => {
    const radius = 60
    const stroke = 10
    const normalizedRadius = radius - stroke * 2
    const circumference = normalizedRadius * 2 * Math.PI
    const strokeDashoffset =
      circumference - (display / 100) * circumference

    return (
      <div className="relative flex flex-col items-center">
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke={getColor(score)}
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1 }}
            style={{
              filter: `drop-shadow(0px 0px 8px ${getColor(score)})`,
            }}
          />
        </svg>
        <div className="absolute text-center">
          <p className="text-2xl font-bold">{display}%</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl shadow-xl">

      {/* 🔥 Animated Gradient Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          padding: "2px",
          background:
            "linear-gradient(90deg, #22c55e, #3b82f6, #f59e0b, #ef4444)",
          backgroundSize: "300% 300%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="relative grid grid-cols-2 gap-6 z-10">
        <div className="flex flex-col items-center">
          {createCircle(freshnessScore, freshDisplay)}
          <p className="mt-2 text-sm font-semibold">
            Freshness
          </p>
        </div>

        <div className="flex flex-col items-center">
          {createCircle(confidenceScore, confDisplay)}
          <p className="mt-2 text-sm font-semibold">
            AI Confidence
          </p>
        </div>
      </div>
    </div>
  )
}