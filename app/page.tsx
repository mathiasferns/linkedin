import { PostGenerator } from "@/components/post-generator"
import { Header } from "@/components/header"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-12 p-8 rounded-xl backdrop-blur-md bg-white/30 shadow-lg border border-white/20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-black">
            LinkedIn Post Generator
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Transform your achievements into engaging LinkedIn posts that go viral. Powered by AI to create content that resonates with your network.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex -space-x-2">
              {/* Placeholder for avatars */}
              {/* {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"
                />
              ))} */}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span className="text-yellow-400">★★★★★</span>
              <span>From many happy users starting with you</span>
            </div>
          </div>
        </div>
        <PostGenerator />
      </main>
    </div>
  )
}
