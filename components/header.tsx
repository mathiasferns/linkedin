import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { Linkedin } from "lucide-react"

export function Header() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleAuthAction = () => {
    if (user) {
      signOut()
    } else {
      router.push('/auth')
    }
  }

  return (
    <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl flex items-center">
        <Linkedin className="text-black mr-2" />
        <span className="text-red-500">LinkedIn</span><span className="text-black">Gen</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/features" className="text-gray-600 hover:text-gray-900">
            Features
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900">
            About
          </Link>
          <Button onClick={handleAuthAction}>
            {user ? 'Sign Out' : 'Sign In'}
          </Button>
        </nav>
      </div>
    </header>
  )
}

