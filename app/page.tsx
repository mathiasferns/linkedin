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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Toaster position="top-center" />
      <Header />
      <main className="container mx-auto px-4 py-12 bg-white">
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-12 p-8 rounded-xl backdrop-blur-md bg-white/30 shadow-lg border border-white/20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-black">
            LinkedIn Post Generator
          </h1>
          <p className="text-xl text-gray-600">
            Transform your achievements into engaging LinkedIn posts that go viral. Powered by AI to create content that resonates with your network.
          </p>
          {user && (
            <div className="flex justify-center items-center gap-4">
              <p className="text-sm text-gray-600">Signed in as {user.email}</p>
              <Button onClick={handleSignOut} variant="outline" size="sm">Sign Out</Button>
            </div>
          )}
        </div>
        <PostGenerator />
      </main>
    </div>
  )
}

