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

    // In a real scenario, you would send this to a vision API
    // For now, return mock data based on file processing
    const mockAnalysis = {
      productName: 'Whole Grain Cereal',
      servingSize: '1 cup (28g)',
      calories: 110,
      protein: '3g',
      carbs: '24g',
      fat: '1g',
      sugar: '6g',
      sodium: '200mg',
      allergens: ['Contains: Wheat', 'May contain traces of nuts'],
      highlights: ['High in fiber', 'Low in sugar', 'Whole grains', 'Rich in vitamins'],
      warnings: ['Moderate sodium content'],
      score: 82,
      recommendation:
        'Great choice! This product is nutrient-dense and suitable for most dietary goals. The sugar content is moderate for cereal.',
      processingLevel: 'Minimally Processed',
      transparencyScore: 85,
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json(mockAnalysis, { status: 200 })
  } catch (error) {
    console.error('Label analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze label. Please try again.' },
      { status: 500 }
    )
  }
}
