'use client'

import { Card } from '@/components/ui/card'
import { AlertCircle, TrendingDown, Zap, AlertTriangle, Flame } from 'lucide-react'

interface ExplainableAIProps {
  phase: 'phase1' | 'phase2'
  triggers: {
    icon: React.ReactNode
    label: string
    value: string
    description: string
    color: 'red' | 'orange' | 'yellow' | 'emerald'
  }[]
}

export default function ExplainableAI({ phase, triggers }: ExplainableAIProps) {
  const colorMap = {
    red: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-900 text-red-700 dark:text-red-300',
    orange: 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-900 text-orange-700 dark:text-orange-300',
    yellow: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-900 text-yellow-700 dark:text-yellow-300',
    emerald: 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300',
  }

  return (
    <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-2 border-blue-200 dark:border-blue-900">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h4 className="font-semibold text-lg text-blue-900 dark:text-blue-200">Why This Result?</h4>
        </div>

        <p className="text-sm text-blue-800 dark:text-blue-300">
          {phase === 'phase1'
            ? 'Key factors that triggered this risk assessment:'
            : 'Health impact factors based on detected food analysis:'}
        </p>

        {/* Triggers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {triggers.map((trigger, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border-2 ${colorMap[trigger.color]}`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">
                  {trigger.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{trigger.label}</p>
                  <p className="text-sm font-bold mt-0.5">{trigger.value}</p>
                  <p className="text-xs mt-1 opacity-90">{trigger.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="pt-2 border-t border-blue-200 dark:border-blue-900">
          <p className="text-xs text-blue-700 dark:text-blue-300">
            <strong>Logic:</strong> Results are calculated using evidence-based nutritional research and WHO guidelines. Each trigger represents a specific health concern identified in the product analysis.
          </p>
        </div>
      </div>
    </Card>
  )
}
