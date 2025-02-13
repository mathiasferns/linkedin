'use client'

import { useState, useEffect } from 'react'
import { PostGenerator } from "@/components/post-generator"
import { Header } from "@/components/header"
import { auth } from '@/lib/firebase'
import { User } from 'firebase/auth'
import { Button } from '@/components/ui/button'
import { UpdateProfileModal } from '@/components/update-profile-modal'
import {  User2Icon } from 'lucide-react';

export default function Page() {
  const [user, setUser] = useState<User | null>(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

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

  // const name = user?.email?.replace(/@.*$/, '') ?? "";
  const extractedName = user?.email?.replace(/@.*$/, '') ?? "";
  const name = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);


  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
    <Header />
    <main className="flex-1 w-full p-6">
        <div className="container mx-auto">
            <div className={`flex flex-col ${user ? "md:flex-row" : ""} gap-8`}>
                {user && (
                    <aside className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-6">
                        <div className="space-y-6">
                            <div className="flex items-center justify-center">
                                <div className="rounded-full bg-gray-200 w-24 h-24 flex items-center justify-center">
                                    <User2Icon className="text-black w-16 h-16" />
                                </div>
                            </div>
                            <div className="text-xl font-bold text-center">{name}</div>
                            <div className="text-gray-600 text-center">{user.email}</div>

                            <Button
                                onClick={() => setIsUpdateModalOpen(true)}
                                size="sm"
                                className="w-full"
                            >
                                Update Profile
                            </Button>
                            <Button
                                onClick={handleSignOut}
                                variant="outline"
                                size="sm"
                                className="w-full"
                            >
                                Sign Out
                            </Button>
                        </div>
                    </aside>
                )}

                <div className={`bg-white rounded-lg shadow-md p-6 ${user ? "w-full md:w-3/4" : "w-full"}`}>
                    <PostGenerator />
                </div>
            </div>
        </div>
    </main>
    <UpdateProfileModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
    />
</div>
);
}

