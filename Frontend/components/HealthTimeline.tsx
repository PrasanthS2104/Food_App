'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { AlertCircle, Heart } from 'lucide-react'

interface HealthTimelineProps {
  nutritionDensity: number
  isFoodHealthy: boolean
}

interface AgeSegment {
  ageRange: string
  startAge: number
  endAge: number
  color: string
  bgColor: string
  tooltipText: string
  riskLevel: string
}

export default function HealthTimeline({ nutritionDensity, isFoodHealthy }: HealthTimelineProps) {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)

  // Determine health classification based on nutrition density
  const isHealthy = nutritionDensity >= 75
  const isModerate = nutritionDensity >= 50 && nutritionDensity < 75
  const isHighRisk = nutritionDensity < 50

  // Generate age segments with detailed tooltips
  const getAgeSegments = (): AgeSegment[] => {
    if (isHealthy) {
      return [
        {
          ageRange: '0-25',
          startAge: 0,
          endAge: 25,
          color: 'bg-emerald-500',
          bgColor: 'from-emerald-500',
          tooltipText: 'Youth & Foundation: Establishes healthy growth patterns and optimal metabolic function.',
          riskLevel: 'Low'
        },
        {
          ageRange: '25-50',
          startAge: 25,
          endAge: 50,
          color: 'bg-emerald-600',
          bgColor: 'from-emerald-600',
          tooltipText: 'Prime Years: Supports heart health, bone density, and sustained energy levels.',
          riskLevel: 'Low'
        },
        {
          ageRange: '50-70+',
          startAge: 50,
          endAge: 70,
          color: 'bg-emerald-700',
          bgColor: 'from-emerald-700',
          tooltipText: 'Longevity & Vitality: Reduces chronic disease risk and supports healthy aging.',
          riskLevel: 'Low'
        }
      ]
    } else if (isModerate) {
      return [
        {
          ageRange: '0-30',
          startAge: 0,
          endAge: 30,
          color: 'bg-emerald-500',
          bgColor: 'from-emerald-500',
          tooltipText: 'Early Years: Minimal health impact when consumed occasionally. Body adapts well.',
          riskLevel: 'Low'
        },
        {
          ageRange: '30-50',
          startAge: 30,
          endAge: 50,
          color: 'bg-yellow-500',
          bgColor: 'from-yellow-500',
          tooltipText: 'Accumulation Phase: Moderate sodium and sugar levels begin affecting blood pressure and metabolic health.',
          riskLevel: 'Moderate'
        },
        {
          ageRange: '50-70+',
          startAge: 50,
          endAge: 70,
          color: 'bg-orange-600',
          bgColor: 'from-orange-600',
          tooltipText: 'Risk Zone: Increased risk of hypertension, type 2 diabetes, and cardiovascular disease.',
          riskLevel: 'High'
        }
      ]
    } else {
      return [
        {
          ageRange: '0-25',
          startAge: 0,
          endAge: 25,
          color: 'bg-emerald-500',
          bgColor: 'from-emerald-500',
          tooltipText: 'Childhood: Young bodies recover quickly, but early habits establish lifetime patterns.',
          riskLevel: 'Low'
        },
        {
          ageRange: '25-45',
          startAge: 25,
          endAge: 45,
          color: 'bg-red-500',
          bgColor: 'from-red-500',
          tooltipText: 'Critical Exposure: High saturated fat and sugar content accelerates cardiovascular and metabolic decline.',
          riskLevel: 'Critical'
        },
        {
          ageRange: '45-70+',
          startAge: 45,
          endAge: 70,
          color: 'bg-red-700',
          bgColor: 'from-red-700',
          tooltipText: 'Severe Risk: Regular consumption significantly increases obesity, heart disease, and diabetes risk.',
          riskLevel: 'Severe'
        }
      ]
    }
  }

  const getLifeExpectancyImpact = () => {
    if (isHealthy) {
      return { impact: '+1 to +2 years', description: 'Supports heart health and longevity' }
    } else if (isModerate) {
      return { impact: '-0.5 to -1 year', description: 'Moderate long-term health impact' }
    } else {
      return { impact: '-2 to -3 years', description: 'May increase chronic disease risk' }
    }
  }

  const segments = getAgeSegments()
  const lifeExpectancy = getLifeExpectancyImpact()

  return (
    <Card className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-0">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Heart className={`h-6 w-6 ${isHealthy ? 'text-emerald-600' : isModerate ? 'text-yellow-600' : 'text-red-600'}`} />
            Lifespan Health Exposure Visualization
          </h3>
          <p className="text-sm text-muted-foreground">
            Hover over each segment to see age-specific health risks and impacts
          </p>
        </div>

        {/* Timeline Visualization */}
        <div className="space-y-4">
          {/* Age labels top */}
          <div className="flex justify-between text-xs font-semibold text-muted-foreground px-1">
            <span>Age 0</span>
            <span>Age 70+</span>
          </div>

          {/* Segmented timeline bar */}
          <div className="relative flex gap-1 h-16 w-full">
            {segments.map((segment, idx) => (
              <div
                key={idx}
                className="flex-1 relative group cursor-pointer"
                onMouseEnter={() => setHoveredSegment(idx)}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                {/* Bar segment */}
                <div className={`${segment.color} h-full rounded-lg transition-all duration-300 transform ${
                  hoveredSegment === idx ? 'scale-y-125 shadow-lg' : 'shadow-md'
                }`} />

                {/* Tooltip */}
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-10 transition-all duration-300 pointer-events-none ${
                  hoveredSegment === idx ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                  <div className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                    {segment.tooltipText}
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-100 transform rotate-45" />
                </div>

                {/* Age marker below */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-muted-foreground">
                  {segment.ageRange}
                </div>
              </div>
            ))}
          </div>

          {/* Risk level indicators */}
          <div className="flex gap-1 mt-12">
            {segments.map((segment, idx) => (
              <div key={idx} className="flex-1 text-center">
                <span className={`text-xs font-semibold ${
                  segment.riskLevel === 'Low'
                    ? 'text-emerald-600'
                    : segment.riskLevel === 'Moderate'
                    ? 'text-yellow-600'
                    : segment.riskLevel === 'High'
                    ? 'text-orange-600'
                    : 'text-red-600'
                }`}>
                  {segment.riskLevel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Animated fill indicator */}
        <div className="relative h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-600 rounded-full"
            style={{
              animation: 'slideIn 2s ease-out forwards',
              backgroundSize: '300% 100%'
            }}
          />
        </div>

        {/* Life Expectancy Impact */}
        <div className={`p-4 rounded-lg border-2 ${
          isHealthy
            ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950'
            : isModerate
            ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950'
            : 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950'
        }`}>
          <div className="flex items-start gap-3">
            <Heart className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
              isHealthy ? 'text-emerald-600' : isModerate ? 'text-yellow-600' : 'text-red-600'
            }`} />
            <div>
              <p className={`font-bold text-lg ${
                isHealthy ? 'text-emerald-700 dark:text-emerald-200' : isModerate ? 'text-yellow-700 dark:text-yellow-200' : 'text-red-700 dark:text-red-200'
              }`}>
                {lifeExpectancy.impact}
              </p>
              <p className={`text-sm ${
                isHealthy ? 'text-emerald-600 dark:text-emerald-300' : isModerate ? 'text-yellow-600 dark:text-yellow-300' : 'text-red-600 dark:text-red-300'
              }`}>
                {lifeExpectancy.description}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-slate-700 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-sm">📊 What This Means</span>
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isHealthy
                ? 'This food supports long-term health when consumed regularly. High in beneficial nutrients like fiber, antioxidants, and essential vitamins that promote heart health and longevity.'
                : isModerate
                ? 'This food has some nutritional value but also contains concerning levels of sodium, sugar, or saturated fats. Moderation is key to minimizing long-term health impact.'
                : 'This food is highly processed with low nutritional value. Frequent consumption significantly increases risk of obesity, heart disease, diabetes, and other chronic conditions.'}
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-700 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-sm">💡 Consumption Recommendation</span>
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {isHealthy
                ? 'Safe to consume regularly as part of a balanced diet. Incorporate into your daily meals for optimal nutritional benefits.'
                : isModerate
                ? 'Enjoy occasionally or in moderation. Balance with other nutrient-dense foods to maintain overall health. Monitor portion sizes.'
                : 'Minimize consumption. Reserve for occasional treats and balance with healthier food choices. Regular intake may significantly impact long-term health.'}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg flex gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
            <strong>Disclaimer:</strong> This timeline projection is an AI-based estimation using nutritional research patterns and WHO guidelines. It is not a medical prediction or diagnosis. Individual health outcomes depend on overall lifestyle, genetics, and personal health conditions. Consult healthcare professionals for personalized nutrition advice.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </Card>
  )
}
