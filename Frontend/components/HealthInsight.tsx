'use client'

import { Card } from '@/components/ui/card'
import { Leaf, TrendingUp, AlertTriangle, Award, Heart, Zap } from 'lucide-react'

interface HealthInsightProps {
  score: number
  category: 'excellent' | 'good' | 'fair' | 'poor'
  insights: string[]
}

export default function HealthInsight({ score, category, insights }: HealthInsightProps) {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'excellent':
        return 'from-green-500 to-emerald-600'
      case 'good':
        return 'from-blue-500 to-cyan-600'
      case 'fair':
        return 'from-yellow-500 to-orange-600'
      case 'poor':
        return 'from-red-500 to-rose-600'
      default:
        return 'from-primary to-accent'
    }
  }

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'excellent':
        return <Award className="h-6 w-6" />
      case 'good':
        return <Heart className="h-6 w-6" />
      case 'fair':
        return <TrendingUp className="h-6 w-6" />
      case 'poor':
        return <AlertTriangle className="h-6 w-6" />
      default:
        return <Zap className="h-6 w-6" />
    }
  }

  return (
    <div className="space-y-4">
      <Card className={`bg-gradient-to-r ${getCategoryColor(category)} p-8 text-white rounded-xl shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold capitalize">{category}</h3>
          {getIcon(category)}
        </div>
        <div className="text-5xl font-bold mb-2">{score}</div>
        <p className="text-white/90">Health Score out of 100</p>
      </Card>

      <Card className="p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary" />
          Key Insights
        </h4>
        <ul className="space-y-3">
          {insights.map((insight, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-primary font-bold flex-shrink-0 mt-1">•</span>
              <span className="text-sm text-muted-foreground">{insight}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
