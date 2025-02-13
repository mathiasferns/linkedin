'use client';

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { toast } from 'sonner'

interface OnboardingForm {
  linkedinPurpose: string
  currentGoals: string
  industry: string
  targetAudience: string
  finalWords: string
  cta: string
}

export default function OnboardingPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState<OnboardingForm>({
    linkedinPurpose: '',
    currentGoals: '',
    industry: '',
    targetAudience: '',
    finalWords: '',
    cta: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast.error('User not authenticated')
      return
    }

    try {
      await setDoc(doc(db, 'users', user.uid), {
        ...formData,
        email: user.email,
        subscriptionStatus: 'trial',
        postCount: 0,
        createdAt: new Date().toISOString(),
      })

      toast.success('Profile created successfully!')
      router.push('/dashboard')
    } catch (error) {
      console.error('Error saving onboarding data:', error)
      toast.error('Failed to save your profile. Please try again.')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5dc] py-12 px-4 sm:px-6 lg:px-8"> {/* Beige/Cream background */}
      <Card className="w-full max-w-2xl shadow-lg rounded-lg bg-white"> {/* White card, rounded corners */}
        <CardHeader className="text-center py-8 px-6"> {/* Added padding */}
          <CardTitle className="text-4xl font-bold mb-3 text-[#a82424]">Complete Your Profile</CardTitle> {/* Red title */}
          <CardDescription className="text-gray-700"> {/* Darker gray description */}
            Help us understand your LinkedIn goals better to provide more personalized post suggestions (PS:You can refine them later)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-8 py-6"> {/* Added padding */}
          <form onSubmit={handleSubmit} className="space-y-5"> {/* Added spacing to form */}

            {/* Reusable Form Field Component */}
            {renderFormField("What topics do you like to share on LinkedIn?", "linkedinPurpose", "e.g., Business insights, technical knowledge, career advice", Textarea, true, handleChange)}
            {renderFormField("What are your content Goals or Intentions?", "currentGoals", "e.g., Networking, Job opportunities, Personal branding", Textarea, true, handleChange)}
            {renderFormField("What is you industry field?", "industry", "e.g., Marketing, Ecommerce, Sales, technology, finance", Textarea, true, handleChange)}
            {renderFormField("Who is your target audience?", "targetAudience", "e.g., Tech professionals, startup founders, students", Textarea, true, handleChange)}
            {renderFormField("Any final words for LinkedIn Gen?", "finalWords", "e.g., Be professional with your tone, Be polite with your tone", Textarea, true, handleChange)}
            {renderFormField("Call to Action (which will appear to the end of every post, optional)", "cta", "e.g. NIKE, Just Do It", Textarea, false, handleChange)}

            <Button type="submit" className="w-full bg-[#a82424] hover:bg-[#911f1f] text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"> {/* Red button, transition */}
              Complete Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )

  function renderFormField(label: string, fieldName: string, placeholder: string, Component: typeof Input | typeof Textarea, required: boolean, handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void) {
    return (
      <div className="space-y-2">
        <label className="text-lg font-medium text-gray-800">{label}</label> {/* Darker gray label */}
        <Component
          name={fieldName}
          value={formData[fieldName as keyof typeof formData]}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a82424] transition duration-300" /* Red focus ring, transition */
        />
      </div>
    );
  }
}