'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle, AlertCircle, Zap, Leaf, Shield, Brain, Barcode, Camera } from 'lucide-react'
import FoodLabelScanner from '@/components/FoodLabelScanner'
import FoodImageScanner from '@/components/FoodImageScanner'
import LandingHero from '@/components/LandingHero'

export default function Home() {
  const [currentTab, setCurrentTab] = useState('home')

  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                NutriCheck
              </span>
            </div>

            <div className="hidden sm:flex gap-2">
              <Button
                variant={currentTab === 'home' ? 'default' : 'ghost'}
                onClick={() => setCurrentTab('home')}
                size="sm"
              >
                Home
              </Button>
              <Button
                variant={currentTab === 'scanner' ? 'default' : 'ghost'}
                onClick={() => setCurrentTab('scanner')}
                size="sm"
              >
                Label Scanner
              </Button>
              <Button
                variant={currentTab === 'image' ? 'default' : 'ghost'}
                onClick={() => setCurrentTab('image')}
                size="sm"
              >
                Image Analysis
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="flex-1 mx-auto max-w-6xl px-6 py-12 w-full">

        {currentTab === 'home' && (
          <div className="space-y-20">

            <LandingHero />

            {/* FEATURES */}
            <section>
              <h2 className="text-3xl font-bold text-center mb-12">
                Why Choose NutriCheck?
              </h2>

              <div className="grid md:grid-cols-3 gap-8">

                {/* Feature Card */}
                <Card className="p-8 rounded-2xl border hover:shadow-xl transition-all duration-300">
                  <Zap className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    Instant AI Analysis
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Advanced deep learning models instantly analyze ingredients,
                    nutritional values, and health risk factors in seconds.
                  </p>
                </Card>

                <Card className="p-8 rounded-2xl border hover:shadow-xl transition-all duration-300">
                  <AlertCircle className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    Allergen & Safety Alerts
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Automatically detects allergens, harmful additives,
                    and processed ingredients you should avoid.
                  </p>
                </Card>

                <Card className="p-8 rounded-2xl border hover:shadow-xl transition-all duration-300">
                  <Brain className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    Personalized Risk Score
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Get a health impact score based on diabetes risk,
                    obesity impact, cardiovascular factors, and WHO standards.
                  </p>
                </Card>

                <Card className="p-8 rounded-2xl border hover:shadow-xl transition-all duration-300">
                  <Leaf className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    Lifestyle Impact Tracking
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Understand long-term health impact, life expectancy trends,
                    and chronic disease probability from food habits.
                  </p>
                </Card>

                <Card className="p-8 rounded-2xl border hover:shadow-xl transition-all duration-300">
                  <Shield className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    Data Privacy & Security
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your food scans and health insights are securely processed.
                    No personal data is stored without consent.
                  </p>
                </Card>

                <Card className="p-8 rounded-2xl border hover:shadow-xl transition-all duration-300">
                  <CheckCircle className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    WHO Guideline Based
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Analysis aligned with WHO recommendations and
                    evidence-based global nutrition research.
                  </p>
                </Card>

              </div>
            </section>

            {/* HOW IT WORKS */}
            <section>
              <h2 className="text-3xl font-bold text-center mb-12">
                How It Works
              </h2>

              <div className="grid md:grid-cols-2 gap-12 items-center">

                <div className="space-y-8">

                  <div className="flex gap-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary text-white font-semibold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold">Scan or Upload</h3>
                      <p className="text-sm text-muted-foreground">
                        Scan barcode, upload label image, or capture food photo.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary text-white font-semibold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold">AI Deep Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Our ML model evaluates ingredients, nutrition, and health risks.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary text-white font-semibold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold">Get Smart Insights</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive health score, alerts, and lifestyle recommendations.
                      </p>
                    </div>
                  </div>

                </div>

                <div className="bg-primary/5 rounded-3xl p-10 text-center">
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-white shadow rounded-xl p-6 flex justify-center">
                      <Barcode className="h-10 w-10 text-primary" />
                    </div>
                    <div className="bg-white shadow rounded-xl p-6 flex justify-center">
                      <Camera className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Supports Barcode • Label • Food Image
                  </p>
                </div>

              </div>
            </section>

            {/* CTA */}
            <section className="text-center py-16">
              <div className="bg-primary/10 rounded-3xl p-14">
                <h2 className="text-3xl font-bold mb-4">
                  Take Control of Your Nutrition Today
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  AI-powered nutrition intelligence to help you prevent
                  chronic diseases and make smarter food decisions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={() => setCurrentTab('scanner')}>
                    Try Label Scanner
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setCurrentTab('image')}>
                    Try Image Analysis
                  </Button>
                </div>
              </div>
            </section>

          </div>
        )}

        {currentTab === 'scanner' && <FoodLabelScanner />}
        {currentTab === 'image' && <FoodImageScanner />}

      </main>

      {/* FOOTER */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2026 NutriCheck — AI Powered Nutrition Intelligence
          </p>
          <div className="flex gap-6 mt-4 sm:mt-0 text-sm text-muted-foreground">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  )
}