'use client'

import { Card } from '@/components/ui/card'
import { BarChart3 } from 'lucide-react'

interface TransparencyScoreProps {
  additiveCount?: number
  hasSyntheticIngredients?: boolean
  hasArtificialPreservatives?: boolean
  hasArtificialColors?: boolean
  excessSodium?: boolean
  excessSugar?: boolean
}

export default function LabelTransparencyScore({
  additiveCount = 5,
  hasSyntheticIngredients = true,
  hasArtificialPreservatives = true,
  hasArtificialColors = true,
  excessSodium = true,
  excessSugar = false,
}: TransparencyScoreProps) {
  // Calculate transparency score
  const calculateScore = () => {
    let score = 100

    // Additive penalties
    const additivePenalty = Math.min(additiveCount * 3, 25)
    score -= additivePenalty

    // Synthetic ingredient penalty
    if (hasSyntheticIngredients) score -= 8
    if (hasArtificialPreservatives) score -= 10
    if (hasArtificialColors) score -= 12

    // Excess nutrient penalties
    if (excessSodium) score -= 10
    if (excessSugar) score -= 8

    return Math.max(0, score)
  }

  const score = calculateScore()

  const getScoreRating = (s: number) => {
    if (s >= 80) return { level: 'Transparent', color: 'emerald', description: 'Clear labeling with simple ingredients' }
    if (s >= 60) return { level: 'Moderate', color: 'yellow', description: 'Some clarity concerns with additives' }
    return { level: 'Low Transparency', color: 'red', description: 'Complex ingredient list with many additives' }
  }

  const rating = getScoreRating(score)
  const percentage = Math.round((score / 100) * 100)

  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-950',
      border: 'border-emerald-200 dark:border-emerald-900',
      progress: 'bg-emerald-500',
      text: 'text-emerald-700 dark:text-emerald-200',
      icon: 'text-emerald-600',
    },
    yellow: {
      bg: 'bg-yellow-50 dark:bg-yellow-950',
      border: 'border-yellow-200 dark:border-yellow-900',
      progress: 'bg-yellow-500',
      text: 'text-yellow-700 dark:text-yellow-200',
      icon: 'text-yellow-600',
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-950',
      border: 'border-red-200 dark:border-red-900',
      progress: 'bg-red-500',
      text: 'text-red-700 dark:text-red-200',
      icon: 'text-red-600',
    },
  }

  const colors = colorClasses[rating.color as keyof typeof colorClasses]

  return (
    <Card className={`p-6 border-2 ${colors.bg} ${colors.border}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <BarChart3 className={`h-5 w-5 ${colors.icon}`} />
          <h4 className="font-semibold text-lg">Label Transparency Score</h4>
        </div>

        {/* Score Display */}
        <div className="flex items-end gap-4">
          <div className="text-center">
            <div className={`text-4xl font-bold ${colors.text}`}>{score}</div>
            <p className="text-xs text-muted-foreground mt-1">out of 100</p>
          </div>

          <div className="flex-1 space-y-2">
            <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className={`${colors.progress} h-full rounded-full transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
        </div>

        {/* Rating and Description */}
        <div>
          <p className={`font-semibold ${colors.text}`}>{rating.level}</p>
          <p className="text-sm text-muted-foreground mt-1">{rating.description}</p>
        </div>

        {/* Breakdown */}
        <div className="pt-3 border-t border-border/40 space-y-2 text-xs">
          <p className="font-semibold text-muted-foreground">Score Factors:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Additives: -{Math.min(additiveCount * 3, 25)} points</li>
            {hasSyntheticIngredients && <li>• Synthetic ingredients: -8 points</li>}
            {hasArtificialPreservatives && <li>• Artificial preservatives: -10 points</li>}
            {hasArtificialColors && <li>• Artificial colors: -12 points</li>}
            {excessSodium && <li>• High sodium content: -10 points</li>}
            {excessSugar && <li>• High sugar content: -8 points</li>}
          </ul>
        </div>
      </div>
    </Card>
  )
}
