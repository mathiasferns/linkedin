'use client'

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Image, X } from 'lucide-react'

interface ImageUploadProps {
  onImageUpload: (file: File | null) => void
}

export function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
      onImageUpload(file)
    } else {
      setPreviewUrl(null)
      onImageUpload(null)
    }
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null)
    onImageUpload(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      {previewUrl ? (
        <div className="relative">
          <img src={previewUrl} alt="Preview" className="max-w-full h-auto rounded-md" />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="w-full"
        >
          <Image className="mr-2 h-4 w-4" />
          Upload Image
        </Button>
      )}
    </div>
  )
}

