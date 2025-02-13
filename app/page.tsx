"use client";
import { Header } from "@/components/header"
import Link from "next/link"
import { ArrowRight, Zap, Target, Repeat } from "lucide-react"

export default function Home() {


  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] text-gray-700 ">
      <Header/>
      <main className="flex-grow">
        <section className="h-screen flex items-center justify-center text-center px-4"> {/* Matching hero background */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"> {/* Darker text for contrast */}
              Ignite Your Influence
              <br />
              With Compelling LinkedIn Content
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-500">
              Stop struggling with what to post. LinkedInGen empowers you to create engaging content that builds your brand and attracts opportunities.
            </p>
            <Link
              href="/dashboard"
              className="bg-[#EA4939] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#d13828] transition duration-300 inline-flex items-center" // Red CTA
            >
              Get Started <ArrowRight className="ml-2" />
            </Link>
          </div>
        </section>

        <section id="features" className="py-20 bg-white"> {/* White features background */}
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Why Choose LinkedInGen?</h2> {/* Darker heading */}
            <p className="text-xl text-center mb-12 text-gray-500 max-w-3xl mx-auto">Because your voice matters. LinkedInGen helps you amplify it by crafting content that resonates with your network, sparks conversations, and positions you as a thought leader in your field.</p>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap className="w-12 h-12 text-[#EA4939]" />} // Red icons
                title="Instant Content Creation"
                description="Generate high-quality LinkedIn posts in seconds, freeing you to focus on what matters most."
              />
              <FeatureCard
                icon={<Target className="w-12 h-12 text-[#EA4939]" />}
                title="Laser-Focused Targeting"
                description="Tailor your content to specific industries and audiences, ensuring maximum visibility and engagement."
              />
              <FeatureCard
                icon={<Repeat className="w-12 h-12 text-[#EA4939]" />}
                title="Consistent Brand Presence"
                description="Maintain a regular posting schedule effortlessly, keeping your network engaged and your profile top-of-mind."
              />
            </div>
          </div>
        </section>

        <section id="cta" className="py-20 bg-[#EA4939]"> {/* Red CTA background */}
          <div className="container mx-auto text-center px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Share Your Story?</h2>
            <p className="text-xl mb-8 text-gray-100">
              Join a community of professionals who are using LinkedInGen to build their personal brands and advance their careers.
            </p>
            <Link
              href="/auth"
              className="bg-white text-[#EA4939] px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300" // Red text on white button
            >
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-white text-gray-500 py-8"> {/* Light footer */}
        <div className="container mx-auto text-center px-4">
          <p>&copy; {new Date().getFullYear()} LinkedInGen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}


interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-lg text-center transition-transform duration-300 hover:scale-105 bg-white hover:bg-gray-100"> {/* Light card background and hover */}
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-2xl font-semibold mb-2 text-gray-900">{title}</h3> {/* Darker title */}
      <p className="text-gray-500">{description}</p>
    </div>
  )
}