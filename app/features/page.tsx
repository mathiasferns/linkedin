'use client'

import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Target, Brain, Palette, Shield, Share2, Settings } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Why LinkedInGen Exists</h1>
          <p className="text-xl text-gray-600">We believe every professional has a story worth sharing. Our features are designed to help you amplify your voice, build your brand, and connect with the right audience.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Brain className="w-8 h-8 text-[#EA4939]" />}
            title="AI-Powered Content Generation"
            description="Your voice, enhanced. Our AI helps craft compelling stories that capture your expertise and professional journey."
          />
          <FeatureCard
            icon={<Target className="w-8 h-8 text-[#EA4939]" />}
            title="Multiple Post Types"
            description="Because every story is unique. Share achievements, experiences, and industry insights in ways that resonate with your audience."
          />
          <FeatureCard
            icon={<Palette className="w-8 h-8 text-[#EA4939]" />}
            title="Customizable Content"
            description="Your brand, your style. Personalize your posts with images and messaging that reflect your professional identity."
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-[#EA4939]" />}
            title="Secure Authentication"
            description="Your career, protected. We prioritize security so you can focus on growing your influence with confidence."
          />
          <FeatureCard
            icon={<Share2 className="w-8 h-8 text-[#EA4939]" />}
            title="Direct LinkedIn Integration"
            description="Effortless sharing. Post your content directly to LinkedIn and engage with your network instantly."
          />
          <FeatureCard
            icon={<Settings className="w-8 h-8 text-[#EA4939]" />}
            title="Profile Customization"
            description="Your professional identity, refined. Keep your profile up to date and generate content that aligns with your career goals."
          />
        </div>
      </main>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="rounded-full bg-gray-50 p-3">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Card>
  )
}
