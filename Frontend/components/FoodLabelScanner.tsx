'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Barcode, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react'
import ImageUploadBox from './ImageUploadBox'
import ProcessingLevelClassification from './ProcessingLevelClassification'
import LabelTransparencyScore from './LabelTransparencyScore'
import ExplainableAI from './ExplainableAI'
import { TrendingDown, Zap, AlertTriangle as AlertIcon } from 'lucide-react'

interface NutritionData {
  productName?: string
  servingSize?: string
  calories?: number
  protein?: string
  carbs?: string
  fat?: string
  sugar?: string
  sodium?: string
  allergens?: string[]
  highlights?: string[]
  warnings?: string[]
  score?: number
  recommendation?: string
  processingLevel?: string
  transparencyScore?: number
}

export default function FoodLabelScanner() {
  const [analyzed, setAnalyzed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analysisData, setAnalysisData] = useState<NutritionData | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleImageSelected = (file: File, preview: string) => {
    setSelectedFile(file)
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', selectedFile)

      const response = await fetch('/api/label-analysis', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to analyze label')
      }

      const result = await response.json()
      setAnalysisData(result)
      setAnalyzed(true)

      // Smooth scroll to results
      setTimeout(() => {
        const resultsSection = document.getElementById('label-results')
        resultsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze label. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score?: number) => {
    if (!score) return 'text-gray-600'
    if (score >= 75) return 'text-green-600'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const data = analysisData || {
    productName: 'Whole Grain Cereal',
    servingSize: '1 cup (28g)',
    calories: 110,
    protein: '3g',
    carbs: '24g',
    fat: '1g',
    sugar: '6g',
    sodium: '200mg',
    allergens: ['Contains: Wheat, May contain traces of nuts'],
    highlights: ['High in fiber', 'Low in sugar', 'Whole grains', 'Rich in vitamins'],
    warnings: ['Moderate sodium content'],
    score: 82,
    recommendation:
      'Great choice! This product is nutrient-dense and suitable for most dietary goals. The sugar content is moderate for cereal.',
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold">Food Label Scanner</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload or scan a food label to instantly get nutritional analysis and safety recommendations
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-4">
          <ImageUploadBox
            icon={<Barcode className="h-12 w-12 text-primary" />}
            title="Upload Food Label"
            description="Take a photo or upload an image of any food label"
            onImageSelected={handleImageSelected}
            isLoading={loading}
          />

          {selectedFile && !analyzed && (
            <Button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-accent h-12"
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2 h-4 w-4">⏳</span>
                  Analyzing Label...
                </>
              ) : (
                'Analyze Label'
              )}
            </Button>
          )}

          {analyzed && (
            <>
              <div className="bg-green-100 dark:bg-green-950 rounded-lg p-6 flex flex-col items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600 mb-2" />
                <p className="font-semibold text-green-900 dark:text-green-200">Label Analyzed</p>
              </div>
              <Button
                onClick={() => {
                  setAnalyzed(false)
                  setSelectedFile(null)
                  setAnalysisData(null)
                  setError(null)
                }}
                variant="outline"
                className="w-full"
              >
                Analyze Another Label
              </Button>
            </>
          )}

          {error && (
            <Card className="p-4 border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
              <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                Error: {error}
              </p>
            </Card>
          )}
        </div>

        {/* Results Section */}
        {analyzed && (
          <div id="label-results" className="space-y-4">
            {/* Product Header */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">{data.productName}</h3>
                  <p className="text-sm text-muted-foreground">{data.servingSize}</p>
                </div>
                <div className={`text-4xl font-bold ${getScoreColor(data.score)}`}>
                  {data.score}
                </div>
              </div>
              <p className="text-sm font-semibold text-primary mb-2">Health Score out of 100</p>
            </Card>
            

            {/* Nutrition Facts */}
            <Card className="p-6">
              <h4 className="font-semibold mb-4">Nutrition Facts</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background rounded p-3">
                  <p className="text-xs text-muted-foreground">Calories</p>
                  <p className="text-2xl font-bold">{data.calories}</p>
                </div>
                <div className="bg-background rounded p-3">
                  <p className="text-xs text-muted-foreground">Protein</p>
                  <p className="text-2xl font-bold">{data.protein}</p>
                </div>
                <div className="bg-background rounded p-3">
                  <p className="text-xs text-muted-foreground">Carbs</p>
                  <p className="text-2xl font-bold">{data.carbs}</p>
                </div>
                <div className="bg-background rounded p-3">
                  <p className="text-xs text-muted-foreground">Fat</p>
                  <p className="text-2xl font-bold">{data.fat}</p>
                </div>
                <div className="bg-background rounded p-3">
                  <p className="text-xs text-muted-foreground">Sugar</p>
                  <p className="text-2xl font-bold">{data.sugar}</p>
                </div>
                <div className="bg-background rounded p-3">
                  <p className="text-xs text-muted-foreground">Sodium</p>
                  <p className="text-2xl font-bold">{data.sodium}</p>
                </div>
              </div>
            </Card>

            {/* Allergens & Warnings */}
            {data.allergens && data.allergens.length > 0 && (
              <Card className="p-4 border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
                <div className="flex gap-2 items-start">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm mb-2">Allergens</p>
                    <p className="text-sm text-orange-800 dark:text-orange-200">
                      {data.allergens.join('. ')}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Highlights */}
            {data.highlights && data.highlights.length > 0 && (
              <Card className="p-6">
                <h4 className="font-semibold mb-3">Highlights</h4>
                <div className="space-y-2">
                  {data.highlights.map((highlight, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Recommendation */}
            {data.recommendation && (
              <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
                <p className="text-sm font-semibold text-green-900 dark:text-green-200">
                  {data.recommendation}
                </p>
              </Card>
            )}

            {/* Processing Level Classification */}
            <ProcessingLevelClassification
              ingredientCount={12}
              artificialAdditives={5}
              hasArtificialColors={true}
              hasPreservatives={true}
            />

            {/* Label Transparency Score */}
            <LabelTransparencyScore
              additiveCount={5}
              hasSyntheticIngredients={true}
              hasArtificialPreservatives={true}
              hasArtificialColors={true}
              excessSodium={true}
              excessSugar={false}
            />

            {/* Explainable AI Section */}
            <ExplainableAI
              phase="phase1"
              triggers={[
                {
                  icon: <AlertIcon className="h-4 w-4" />,
                  label: 'Sodium Content',
                  value: '1,200mg',
                  description: '48% of daily WHO limit. Excess sodium increases hypertension risk.',
                  color: 'red',
                },
                {
                  icon: <Zap className="h-4 w-4" />,
                  label: 'Artificial Preservatives',
                  value: 'E110, E211',
                  description: 'Contains artificial colors restricted in EU. Known to trigger allergies.',
                  color: 'red',
                },
                {
                  icon: <TrendingDown className="h-4 w-4" />,
                  label: 'Sugar Content',
                  value: '6g per serving',
                  description: 'Moderate for cereal. Consistent consumption adds up over time.',
                  color: 'orange',
                },
                {
                  icon: <AlertCircle className="h-4 w-4" />,
                  label: 'Fiber Content',
                  value: '3g per serving',
                  description: 'Good for digestion and sustained energy throughout the day.',
                  color: 'emerald',
                },
              ]}
            />
          </div>
        )}
      </div>
    </div>
  )
}
