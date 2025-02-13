'use client'

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Why LinkedInGen Exists</h1>
            
            <div className="space-y-6 text-gray-700 text-lg">
              <p>
                The world is filled with talented professionals who struggle to showcase their value online. Whether due to time constraints, writer’s block, or a lack of confidence, many miss out on opportunities simply because their LinkedIn presence doesn’t reflect their true potential.
              </p>

              <h2 className="text-2xl font-bold text-gray-900">Our Purpose</h2>
              <p>
                LinkedInGen was built on a simple but powerful belief: <b>everyone deserves to be seen and heard</b>. Our mission is to help professionals amplify their voice, tell their story, and build a network that recognizes their expertise.
              </p>

              <h2 className="text-2xl font-bold text-gray-900">How We Make It Happen</h2>
              <p>
                Using cutting-edge AI, LinkedInGen transforms your raw thoughts, ideas, and experiences into ,<b>high-quality LinkedIn posts</b>. Our platform understands what makes content engaging, ensuring your posts resonate with your audience while maintaining your authentic voice.
              </p>

              <h2 className="text-2xl font-bold text-gray-900">What We Offer</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>AI-powered content creation tailored for LinkedIn</li>
                <li>Multiple post styles for different professional needs</li>
                <li>Real-time editing and preview for maximum control</li>
                <li>Secure authentication and profile management</li>
                <li>Seamless LinkedIn integration for instant sharing</li>
              </ul>

              <div className="mt-8 flex justify-center gap-4">
                <Button asChild>
                  <Link href="/dashboard">Start Creating</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/features">Explore Features</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
