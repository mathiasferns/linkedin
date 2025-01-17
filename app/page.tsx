import { PostGenerator } from "@/components/post-generator"
import { Header } from "@/components/header"
import { Toaster } from "sonner"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* <Toaster position="top-center" /> */}
      <Header />
      <main className="container mx-auto px-4 py-12 bg-white">
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-12 p-8 rounded-xl backdrop-blur-md bg-white/30 shadow-lg border border-white/20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-black">
            LinkedIn Post Generator
          </h1>
          <p className="text-xl text-gray-600">
            Transform your achievements into engaging LinkedIn posts that go viral. Powered by AI to create content that resonates with your network.
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {/* {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"
                />
              ))} */}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span className="text-yellow-400">★★★★★</span>
              From many happy users starting with you
            </div>
          </div>
        </div>
        <PostGenerator />
      </main>
    </div>
  )
}

