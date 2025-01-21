'use client'

import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (user) {
        setIsAuthorized(true)
      } else {
        router.push('/auth')
      }
    }
  }, [user, loading, router])

  if (loading) {
    return <div>Loading...</div>
  }

  return isAuthorized ? <>{children}</> : null
}

