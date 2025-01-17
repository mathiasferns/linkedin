'use client'

import { useState, useEffect } from 'react'
import { PostGenerator } from "@/components/post-generator"
import { Header } from "@/components/header"
import { Toaster } from "sonner"
import { auth } from '@/lib/firebase'
import { User } from 'firebase/auth'
import { Button } from '@/components/ui/button'

export default function Page() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Toaster position="top-center" />     // they say to remove this line
      <Header />
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-12">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="space-y-6 rounded-2xl backdrop-blur-md bg-white/30 shadow-lg border border-white/20 p-6 sm:p-8 lg:p-10">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-black">
                LinkedIn Post Generator
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Transform your achievements into engaging LinkedIn posts that go viral every time. 
                Powered by AI to create content that resonates with your network.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-yellow-400">★★★★★</span>
                  From many happy users starting with you
                </div>
                {user && (
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-px bg-gray-300 hidden sm:block" />
                    <p className="text-sm text-gray-600">
                      {user.email}
                    </p>
                    <Button 
                      onClick={handleSignOut} 
                      variant="outline" 
                      size="sm"
                      className="whitespace-nowrap"
                    >
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="w-full max-w-6xl mx-auto">
            <PostGenerator />
          </div>
        </div>
      </main>
    </div>
  )
}

