'use client'

import { Button } from '@/components/ui/button'
import { Leaf, Sparkles, TrendingUp } from 'lucide-react'

export default function LandingHero() {
  const handleScroll = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="relative py-12 sm:py-20">
      {/* Background gradient orbs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none opacity-50 animate-pulse-soft" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none opacity-50 animate-pulse-soft" style={{ animationDelay: '1s' }} />

      <div className="relative space-y-8">
        {/* Main heading */}
        <div className="space-y-4 animate-slide-up">
          <div className="flex items-center gap-2 justify-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <span className="inline-block rounded-full bg-accent/20 px-4 py-1 text-sm font-semibold text-primary">
              AI-Powered Nutrition
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-center leading-tight animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Scan Your Food,{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Predict Your Health
            </span>
          </h1>

          <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            AI-powered food safety validation and long-term health impact analysis. Understand nutrition, detect allergens, and visualize your health future.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Button
            size="lg"
            onClick={() => handleScroll('scanner-section')}
            className="bg-gradient-to-r from-primary to-accent hover:shadow-lg text-base transition-all duration-300 hover:scale-105"
          >
            Get Started Free
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleScroll('features-section')}
            className="text-base transition-all duration-300 hover:scale-105"
          >
            Learn More
            <TrendingUp className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Stats or features row */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-8 border-t border-border/40 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="text-center hover:scale-105 transition-transform duration-300">
            <div className="text-2xl font-bold">100K+</div>
            <p className="text-xs text-muted-foreground mt-1">Products Analyzed</p>
          </div>
          <div className="text-center hover:scale-105 transition-transform duration-300">
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground mt-1">Accuracy Rate</p>
          </div>
          <div className="text-center hover:scale-105 transition-transform duration-300">
            <div className="text-2xl font-bold">50K+</div>
            <p className="text-xs text-muted-foreground mt-1">Active Users</p>
          </div>
        </div>
      </div>
    </div>
  )
}
