'use client'

import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, checkUserProfile } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      if (!loading) {
        if (user) {
          const hasProfile = await checkUserProfile(user)
          if (!hasProfile && window.location.pathname !== '/onboarding') {
            router.push('/onboarding')
          } else {
            setIsAuthorized(true)
          }
        } else {
          router.push('/auth')
        }
      }
    }

    checkAuth()
  }, [user, loading, router, checkUserProfile])

  if (loading) {
    return <div>Loading...</div>
  }

  return isAuthorized ? <>{children}</> : null
}
