import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      return NextResponse.json(
        { error: 'Only JPG and PNG files are supported' },
        { status: 400 }
      )
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      )
    }

    // In a real scenario, you would send this to a vision API like Google Vision or Claude
    // For now, return mock data based on image analysis
    const mockAnalysis = {
      foodItems: ['Grilled Chicken', 'Brown Rice', 'Steamed Broccoli'],
      totalCalories: 520,
      mealType: 'Protein-Rich Meal',
      confidence: 0.92,
      macros: {
        protein: '45g',
        carbs: '52g',
        fat: '12g',
      },
      nutritionDensity: 85,
      processingLevel: 'Minimally Processed',
      healthScore: 88,
      highlights: ['High in protein', 'Rich in fiber', 'Low in sodium', 'Whole grains'],
      warnings: [],
      recommendations: 'Excellent meal choice! Perfect balance of macronutrients with whole food ingredients.',
      timelineData: {
        impact: '+1.5 years',
        zones: [
          { range: '0-25', color: 'emerald' },
          { range: '25-50', color: 'emerald' },
          { range: '50-70+', color: 'emerald' },
        ],
      },
      alternatives: [
        {
          name: 'Quinoa',
          benefit: 'Higher protein content',
          comparison: '+5g protein per serving',
        },
        {
          name: 'Wild Salmon',
          benefit: 'Rich in Omega-3 fatty acids',
          comparison: '+200mg Omega-3s',
        },
      ],
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return NextResponse.json(mockAnalysis, { status: 200 })
  } catch (error) {
    console.error('Image analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze image. Please try again.' },
      { status: 500 }
    )
  }
}
