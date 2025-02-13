'use client';

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from '@/context/auth-context'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { toast } from 'sonner'

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpdateProfileModal({ isOpen, onClose }: UpdateProfileModalProps) {
  const { user, userProfile } = useAuth()
  const [formData, setFormData] = useState({
    linkedinPurpose: '',
    currentGoals: '',
    industry: '',
    targetAudience: '',
    finalWords: '',
    cta: '',
  })

  useEffect(() => {
    if (userProfile) {
      setFormData({
        linkedinPurpose: userProfile.linkedinPurpose || '',
        currentGoals: userProfile.currentGoals || '',
        industry: userProfile.industry || '',
        targetAudience: userProfile.targetAudience || '',
        finalWords: userProfile.finalWords || '',
        cta: userProfile.cta || '',
      })
    }
  }, [userProfile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      await updateDoc(doc(db, 'users', user.uid), formData);
      toast.success('Profile updated successfully!')
      onClose()
    } catch (error) {
      toast.error('Failed to update profile')
      console.error('Error updating profile:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) { // Check if the click is on the backdrop
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg "> {/* Added shadow */}
        <h2 className="text-3xl font-bold mb-6 text-center text-red-600">Update Profile</h2> {/* Centered and larger heading */}
        <form onSubmit={handleSubmit} className="space-y-6"> {/* Increased spacing */}

          {/* Reusable Input/Textarea Component */}
          {renderFormField("What topics do you like to share on LinkedIn?", "linkedinPurpose", "e.g., Business, Inspirational Quotes, Tech News", Textarea)}
          {renderFormField("What are your current Goals?", "currentGoals", "e.g., Increase engagement, Build network", Textarea)}
          {renderFormField("What is you industry field?", "industry", "e.g., Tech, Sales, Marketing, Finance", Textarea)}
          {renderFormField("Who is your target audience?", "targetAudience", "e.g., Tech professionals, startup founders", Textarea)}
          {renderFormField("Any final suggestioons for LinkedIn Gen?", "finalWords", "e.g., Share technical insights", Textarea)}
          {renderFormField("Call To Action", "cta", "e.g., Apple! Think Different", Textarea)}


          <div className="flex justify-end gap-4 mt-8"> {/* Increased margin and gap */}
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  )

  function renderFormField(label: string, fieldName: keyof typeof formData, placeholder: string, Component: typeof Input | typeof Textarea) {
    return (
      <div className="space-y-2">
        <label className="text-lg font-medium">{label}</label>
        <Component
          value={formData[fieldName]} // Now type-safe!
          onChange={(e) => setFormData(prev => ({ ...prev, [fieldName]: e.target.value }))}
          placeholder={userProfile?.[fieldName] || placeholder}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }
}