'use client'

import { Card } from '@/components/ui/card'
import { AlertCircle, Factory } from 'lucide-react'

interface ProcessingLevelProps {
  ingredientCount: number
  artificialAdditives: number
  hasArtificialColors: boolean
  hasPreservatives: boolean
}

export default function ProcessingLevelClassification({
  ingredientCount = 8,
  artificialAdditives = 5,
  hasArtificialColors = true,
  hasPreservatives = true,
}: ProcessingLevelProps) {
  // Rule-based classification logic
  const getTotalAdditives = () => {
    let count = artificialAdditives
    if (hasArtificialColors) count += 2
    if (hasPreservatives) count += 1
    return count
  }

  const totalAdditives = getTotalAdditives()

  const getClassification = () => {
    if (totalAdditives >= 5 || hasArtificialColors) {
      return {
        level: 'Ultra-Processed',
        color: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-900',
        badge: 'bg-red-600 text-red-50',
        icon: 'text-red-600',
        explanation:
          'This product contains multiple artificial additives and preservatives, classifying it as ultra-processed. Regular consumption may impact long-term health.',
      }
    } else if (totalAdditives >= 2) {
      return {
        level: 'Processed',
        color: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-900',
        badge: 'bg-yellow-600 text-yellow-50',
        icon: 'text-yellow-600',
        explanation:
          'This product contains moderate levels of additives and processing. Consume in moderation as part of a balanced diet.',
      }
    } else {
      return {
        level: 'Minimally Processed',
        color: 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-900',
        badge: 'bg-emerald-600 text-emerald-50',
        icon: 'text-emerald-600',
        explanation:
          'This product is minimally processed with few artificial additives. It retains most natural nutrients and is an excellent choice for a healthy diet.',
      }
    }
  }

  const classification = getClassification()

  return (
    <Card className={`p-6 border-2 ${classification.color}`}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-lg flex items-center gap-2">
            <Factory className={`h-5 w-5 ${classification.icon}`} />
            Food Processing Level Classification
          </h4>
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${classification.badge}`}>
            {classification.level}
          </span>
        </div>

        <p className={`text-sm leading-relaxed ${
          classification.level === 'Ultra-Processed'
            ? 'text-red-800 dark:text-red-200'
            : classification.level === 'Processed'
            ? 'text-yellow-800 dark:text-yellow-200'
            : 'text-emerald-800 dark:text-emerald-200'
        }`}>
          {classification.explanation}
        </p>

        <div className="pt-2 text-xs text-muted-foreground space-y-1">
          <p>
            <strong>Additives Found:</strong> {totalAdditives} (Artificial: {artificialAdditives}, Colors: {hasArtificialColors ? '1' : '0'}, Preservatives: {hasPreservatives ? '1' : '0'})
          </p>
        </div>
      </div>
    </Card>
  )
}
