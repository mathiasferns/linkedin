import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"

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
        <Link href="/" className="font-bold text-xl flex items-center gap-2">
          <span className="text-red-500">Post</span>
          <span>Generator</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/blog" className="text-gray-600 hover:text-gray-900">
            Blog
          </Link>
          <Link href="/examples" className="text-gray-600 hover:text-gray-900">
            Examples
          </Link>
          <Button onClick={handleAuthAction}>
            {user ? 'Sign Out' : 'Sign In'}
          </Button>
        </nav>
      </div>
    </header>
  )
}

