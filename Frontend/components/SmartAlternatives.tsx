'use client'

import { Card } from '@/components/ui/card'
import { Lightbulb, CheckCircle, AlertCircle } from 'lucide-react'

interface SmartAlternativesProps {
  foodItems: string[]
  nutritionDensity: number
  isHealthy: boolean
}

export default function SmartAlternatives({ foodItems, nutritionDensity, isHealthy }: SmartAlternativesProps) {
  const getAlternatives = () => {
    // High-risk/Processed foods
    if (nutritionDensity < 50) {
      return {
        title: 'Healthier Alternatives & Improvements',
        subtitle: 'Transform this meal into a more nutritious version',
        suggestions: [
          { type: 'positive', icon: '✓', text: 'Choose whole grain or thin crust alternatives' },
          { type: 'positive', icon: '✓', text: 'Add more vegetables for fiber and micronutrients' },
          { type: 'moderate', icon: '⚠', text: 'Reduce portion sizes of high-fat components' },
          { type: 'moderate', icon: '⚠', text: 'Pair with protein-rich sides for satiety' },
          { type: 'moderate', icon: '⚠', text: 'Include fresh salad or vegetable sides' },
          { type: 'warning', icon: '→', text: 'Limit consumption to once per week maximum' }
        ],
        improvementTips: 'Making small modifications can significantly improve nutritional value without sacrificing taste.'
      }
    }
    // Moderate foods (50-75)
    else if (nutritionDensity < 75) {
      return {
        title: 'Healthier Alternatives & Improvements',
        subtitle: 'Optimize this meal for better nutrition',
        suggestions: [
          { type: 'positive', icon: '✓', text: 'Maintain current preparation - it\'s reasonably balanced' },
          { type: 'positive', icon: '✓', text: 'Consider adding extra vegetables for enhanced fiber' },
          { type: 'moderate', icon: '⚠', text: 'Watch sodium levels - balance with lower-salt sides' },
          { type: 'moderate', icon: '⚠', text: 'Monitor portion sizes for weight management' },
          { type: 'positive', icon: '✓', text: 'Great for regular consumption 2-3 times per week' }
        ],
        improvementTips: 'This meal is already a solid choice. Small tweaks can make it even better.'
      }
    }
    // Healthy foods (75+)
    else {
      return {
        title: 'Optimization Tips for Maximum Benefits',
        subtitle: 'Enhance the nutritional profile of this excellent meal',
        suggestions: [
          { type: 'positive', icon: '✓', text: 'This is an excellent nutritional choice - keep it up!' },
          { type: 'positive', icon: '✓', text: 'Safe to consume regularly as part of balanced diet' },
          { type: 'positive', icon: '✓', text: 'Ideal for fitness goals and overall wellness' },
          { type: 'moderate', icon: '→', text: 'Combine with complementary healthy foods for variety' },
          { type: 'moderate', icon: '→', text: 'Vary preparation methods to maintain nutrient diversity' }
        ],
        improvementTips: 'This meal is a nutritional powerhouse. Focus on enjoying it and maintaining consistency.'
      }
    }
  }

  const alternatives = getAlternatives()

  const typeStyles = {
    positive: 'border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-950',
    moderate: 'border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950',
    warning: 'border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950'
  }

  const textStyles = {
    positive: 'text-emerald-900 dark:text-emerald-200',
    moderate: 'text-yellow-900 dark:text-yellow-200',
    warning: 'text-orange-900 dark:text-orange-200'
  }

  return (
    <Card className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-0">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            {alternatives.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {alternatives.subtitle}
          </p>
        </div>

        {/* Current Foods Summary */}
        <div className="p-4 bg-white dark:bg-slate-700 rounded-lg border border-border/50">
          <p className="text-xs font-semibold text-muted-foreground mb-3">Foods Detected</p>
          <div className="flex flex-wrap gap-2">
            {foodItems.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Suggestions Grid */}
        <div className="space-y-3">
          <p className="text-sm font-semibold">Suggestions for Improvement</p>
          <div className="space-y-2">
            {alternatives.suggestions.map((suggestion, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg ${typeStyles[suggestion.type]} transition-all duration-300 hover:shadow-md`}
              >
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 font-bold text-lg">
                    {suggestion.type === 'positive' && <CheckCircle className="h-5 w-5 text-emerald-600" />}
                    {suggestion.type === 'moderate' && <AlertCircle className="h-5 w-5 text-yellow-600" />}
                    {suggestion.type === 'warning' && <AlertCircle className="h-5 w-5 text-orange-600" />}
                  </span>
                  <p className={`text-sm leading-relaxed ${textStyles[suggestion.type]}`}>
                    {suggestion.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insight */}
        <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
          <div className="flex gap-3">
            <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed">
              <span className="font-semibold">Key Insight:</span> {alternatives.improvementTips}
            </p>
          </div>
        </div>

        {/* Action Items */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white dark:bg-slate-700 rounded-lg border border-border/50">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <span>🎯</span> Next Steps
            </h4>
            <ul className="text-xs space-y-2 text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>Review suggestions that apply to your dietary preferences</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>Start with one modification for your next meal</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>Track how changes affect your energy and wellbeing</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-white dark:bg-slate-700 rounded-lg border border-border/50">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <span>📊</span> Nutritional Impact
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {nutritionDensity >= 75
                ? 'Small modifications can further enhance an already excellent meal. Focus on variety and consistency.'
                : nutritionDensity >= 50
                ? 'Implementing these suggestions can improve nutritional value by 20-35% while maintaining taste and enjoyment.'
                : 'Following these recommendations can improve nutritional density by 40-60%, significantly reducing health risks.'}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
