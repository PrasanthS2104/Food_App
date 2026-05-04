'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Calendar } from 'lucide-react'

interface DietSimulatorProps {
  nutritionDensity: number
  isHealthy: boolean
}

type ConsumptionFrequency = 'monthly' | 'weekly' | '3x-weekly' | 'daily'

export default function DietPatternSimulator({ nutritionDensity, isHealthy }: DietSimulatorProps) {
  const [frequency, setFrequency] = useState<ConsumptionFrequency>('weekly')

  const frequencyOptions = [
    { value: 'monthly' as const, label: 'Once per month', multiplier: 0.25 },
    { value: 'weekly' as const, label: 'Once per week', multiplier: 1 },
    { value: '3x-weekly' as const, label: '3 times per week', multiplier: 1.5 },
    { value: 'daily' as const, label: 'Daily', multiplier: 2.5 }
  ]

  const getImpactAssessment = () => {
    if (isHealthy) {
      if (frequency === 'monthly') {
        return { risk: 'Minimal', color: 'emerald', description: 'Excellent choice - safe for occasional consumption' }
      } else if (frequency === 'weekly') {
        return { risk: 'Low', color: 'emerald', description: 'Ideal - part of a healthy regular diet' }
      } else if (frequency === '3x-weekly') {
        return { risk: 'Low', color: 'emerald', description: 'Good - frequent consumption still beneficial' }
      } else {
        return { risk: 'Very Low', color: 'emerald', description: 'Excellent - recommended for daily nutrition' }
      }
    } else if (nutritionDensity >= 50) {
      // Moderate foods
      if (frequency === 'monthly') {
        return { risk: 'Low', color: 'emerald', description: 'Occasional consumption minimizes health impact' }
      } else if (frequency === 'weekly') {
        return { risk: 'Moderate', color: 'yellow', description: 'Acceptable in moderation - balance with healthier foods' }
      } else if (frequency === '3x-weekly') {
        return { risk: 'Moderate-High', color: 'orange', description: 'Frequent consumption may affect long-term health' }
      } else {
        return { risk: 'High', color: 'red', description: 'Daily consumption increases chronic disease risk significantly' }
      }
    } else {
      // High-risk foods
      if (frequency === 'monthly') {
        return { risk: 'Low-Moderate', color: 'yellow', description: 'Occasional indulgence has minimal health impact' }
      } else if (frequency === 'weekly') {
        return { risk: 'High', color: 'red', description: 'Regular consumption significantly increases disease risk' }
      } else if (frequency === '3x-weekly') {
        return { risk: 'Very High', color: 'red', description: 'Frequent consumption substantially increases health risks' }
      } else {
        return { risk: 'Critical', color: 'red', description: 'Daily consumption poses severe long-term health consequences' }
      }
    }
  }

  const getLifeImpact = () => {
    if (isHealthy) {
      if (frequency === 'daily') return '+2 to +3 years'
      if (frequency === '3x-weekly') return '+1.5 to +2 years'
      return '+1 to +2 years'
    } else if (nutritionDensity >= 50) {
      if (frequency === 'daily') return '-1.5 to -2.5 years'
      if (frequency === '3x-weekly') return '-1 to -1.5 years'
      if (frequency === 'weekly') return '-0.5 to -1 year'
      return '-0.2 to -0.5 year'
    } else {
      if (frequency === 'daily') return '-3 to -5 years'
      if (frequency === '3x-weekly') return '-2 to -3 years'
      if (frequency === 'weekly') return '-1 to -1.5 years'
      return '-0.5 to -0.8 year'
    }
  }

  const assessment = getImpactAssessment()

  const colorClasses = {
    emerald: 'from-emerald-500 to-emerald-600',
    yellow: 'from-yellow-500 to-yellow-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600'
  }

  const bgColorClasses = {
    emerald: 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-900',
    yellow: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-900',
    orange: 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-900',
    red: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-900'
  }

  return (
    <Card className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-0">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            Consumption Frequency Simulator
          </h3>
          <p className="text-sm text-muted-foreground">
            See how eating this food at different frequencies affects your long-term health
          </p>
        </div>

        {/* Frequency Selector */}
        <div className="space-y-4">
          <label className="text-sm font-semibold">How often do you consume this food?</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {frequencyOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setFrequency(option.value)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 font-semibold text-sm ${
                  frequency === option.value
                    ? 'border-primary bg-primary/10'
                    : 'border-border/40 bg-background hover:border-primary/50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Impact Indicator */}
        <div className={`p-6 rounded-lg border-2 bg-gradient-to-r ${colorClasses[assessment.color]} text-white transition-all duration-500`}>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold opacity-90">Risk Level</p>
              <p className="text-2xl font-bold">{assessment.risk}</p>
            </div>
            <p className="text-sm leading-relaxed opacity-95">
              {assessment.description}
            </p>
          </div>
        </div>

        {/* Life Expectancy Impact */}
        <div className={`p-6 rounded-lg border-2 ${bgColorClasses[assessment.color]} transition-all duration-500`}>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-muted-foreground">Estimated Lifespan Impact</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground bg-clip-text">
              {getLifeImpact()}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Based on consumption at {frequencyOptions.find(o => o.value === frequency)?.label.toLowerCase()}
            </p>
          </div>
        </div>

        {/* Frequency Insights */}
        <div className="grid md:grid-cols-2 gap-4 p-4 bg-white dark:bg-slate-700 rounded-lg border border-border/50">
          <div>
            <h4 className="font-semibold mb-2 text-sm">Timeline Pattern</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {frequency === 'monthly' && 'Minimal accumulation of risk factors. Your body has time to recover between exposures.'}
              {frequency === 'weekly' && 'Moderate consumption pattern. Good balance for most foods when choosing wisely.'}
              {frequency === '3x-weekly' && 'Regular exposure begins accumulating health effects. Consider mixing with healthier alternatives.'}
              {frequency === 'daily' && 'Daily consumption significantly amplifies long-term health impacts. This is a critical consumption pattern.'}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-sm">Recommendation</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {frequency === 'monthly' && 'This is an ideal frequency for less-nutritious foods - occasional treats minimally impact health.'}
              {frequency === 'weekly' && 'A sustainable frequency if balanced with nutrient-dense alternatives and portion control.'}
              {frequency === '3x-weekly' && 'Consider reducing frequency or improving the nutritional quality of your version of this food.'}
              {frequency === 'daily' && 'Strongly recommend reducing frequency or switching to healthier alternatives for regular consumption.'}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg text-xs text-blue-800 dark:text-blue-200">
          <strong>Simulation Disclaimer:</strong> This simulation reflects dietary pattern impact trends based on WHO nutritional research. It is not a medical prediction and assumes consistent consumption patterns. Actual health outcomes depend on overall diet quality, exercise, genetics, and lifestyle factors.
        </div>
      </div>
    </Card>
  )
}
