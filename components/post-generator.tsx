'use client'

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2, Copy, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from "sonner"
import { useAuth } from "@/app/context/auth-context"
import { ImageUpload } from "@/components/image-upload"

export function PostGenerator() {
  const [input, setInput] = useState("")
  const [postType, setPostType] = useState("achievement")
  const [generatedPost, setGeneratedPost] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  const handleImageUpload = (file: File | null) => {
    setImage(file)
  }

  const generatePost = useCallback(async () => {
    if (!input) return
    
    if (!user) {
      router.push('/auth')
      return
    }

    setLoading(true)
    setGeneratedPost("")
    setError(null)
    
    try {
      const formData = new FormData()
      formData.append('content', input)
      formData.append('type', postType)
      if (image) {
        formData.append('image', image)
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }
      
      if (!data.post) {
        throw new Error("No content generated from Gemini API")
      }

      setGeneratedPost(data.post)
      toast.success("Post generated successfully!")
    } catch (error) {
      console.error("Error generating post:", error)
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [input, postType, image, user, router])

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedPost)
      setCopied(true)
      toast.success("Copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error("Failed to copy to clipboard")
      console.log("Error copying to clipboard:", error)
    }
  }, [generatedPost])

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <Card className="p-6 space-y-4 shadow-md">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Your Content</h2>
          <p className="text-sm text-gray-500">
            Share your achievement, experience, or story and we&apos;ll transform it into an engaging LinkedIn post
          </p>
        </div>
        <Select value={postType} onValueChange={setPostType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select post type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="achievement">🏆 Achievement</SelectItem>
            <SelectItem value="experience">💡 Experience</SelectItem>
            <SelectItem value="professional">🎯 Professional Advice</SelectItem>
            <SelectItem value="story">📖 Story</SelectItem>
            <SelectItem value="fun">😄 Fun </SelectItem>
          </SelectContent>
        </Select>
        <Textarea
          placeholder="eg. I successfully launched a new product line that increased our revenue by 30% in just six months.
                      our dedication and innovative approach proved successful."
          className="min-h-[200px] resize-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Upload an image (optional)
          </label>
          <ImageUpload onImageUpload={handleImageUpload} />
        </div>
        <Button 
          onClick={generatePost} 
          className="w-full"
          disabled={loading || !input}
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating your post...
            </>
          ) : (
            "Generate Engaging Post"
          )}
        </Button>
      </Card>

      <Card className="p-6 space-y-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Generated Post</h2>
            <p className="text-sm text-gray-500">
              Your LinkedIn Post
            </p>
          </div>
          {generatedPost && (
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              className="h-8 w-8"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          )}
        </div>
        <div className="min-h-[200px] p-4 bg-gray-50 rounded-lg relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          )}
          {error ? (
            <div className="text-red-500 text-center mt-12 flex flex-col items-center gap-2">
              <AlertCircle className="w-8 h-8" />
              <p>{error}</p>
              <p className="text-sm text-gray-500">Please try again or contact me if the issue persists.</p>
            </div>
          ) : generatedPost ? (
            <div className="whitespace-pre-wrap">{generatedPost}</div>
          ) : (
            <div className="text-gray-400 text-center mt-12 flex flex-col items-center gap-2">
              Your generated post will appear here
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

