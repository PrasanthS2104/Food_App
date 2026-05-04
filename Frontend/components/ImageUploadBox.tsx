'use client'

import { useState, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'

interface ImageUploadBoxProps {
  onImageSelected: (file: File, preview: string) => void
  isLoading?: boolean
  icon: React.ReactNode
  title: string
  description: string
}

export default function ImageUploadBox({
  onImageSelected,
  isLoading = false,
  icon,
  title,
  description,
}: ImageUploadBoxProps) {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
  const ACCEPTED_TYPES = ['image/jpeg', 'image/png']

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return 'Only JPG and PNG files are supported'
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be less than 5MB'
    }
    return null
  }

  const handleFile = (file: File) => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      setPreview(null)
      setFileName(null)
      return
    }

    setError(null)
    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (e) => {
      const previewUrl = e.target?.result as string
      setPreview(previewUrl)
      onImageSelected(file, previewUrl)
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleClear = () => {
    setPreview(null)
    setFileName(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      <Card
        className={`p-8 border-2 transition-all duration-300 flex flex-col items-center justify-center min-h-96 ${
          dragActive
            ? 'border-primary bg-primary/5'
            : preview
            ? 'border-green-300 bg-green-50 dark:bg-green-950/30'
            : 'border-dashed border-border/50 hover:border-primary/50'
        } ${isLoading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={!preview ? handleClick : undefined}
      >
        {!preview ? (
          <>
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-full p-6 mb-4">
              {icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground text-center mb-6 max-w-xs">
              {description}
            </p>
            <Button
              onClick={handleClick}
              disabled={isLoading}
              className="bg-gradient-to-r from-primary to-accent"
            >
              <Upload className="mr-2 h-4 w-4" />
              Browse from Device
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              or drag and drop JPG/PNG (max 5MB)
            </p>
          </>
        ) : (
          <>
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 max-w-full rounded-lg mb-4 object-contain"
            />
            <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-4">
              {fileName}
            </p>
            <Button
              onClick={handleClear}
              variant="outline"
              size="sm"
            >
              <X className="mr-2 h-4 w-4" />
              Choose Different Image
            </Button>
          </>
        )}
      </Card>

      {error && (
        <Card className="p-4 border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
          <p className="text-sm font-semibold text-red-700 dark:text-red-300">
            Error: {error}
          </p>
        </Card>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )
}
