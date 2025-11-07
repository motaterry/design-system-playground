"use client"

import { useState } from "react"
import { Link2, Copy, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ShareBlockProps {
  title?: string
  description?: string
  url?: string
  generateButtonText?: string
  copyButtonText?: string
  copiedButtonText?: string
  onGenerate?: () => void
  onCopy?: (url: string) => void
  className?: string
}

export function ShareBlock({
  title = "Share Results",
  description = "Generate a public link to share these results",
  url = "",
  generateButtonText = "Generate Public Link",
  copyButtonText = "Copy Link",
  copiedButtonText = "Copied",
  onGenerate,
  onCopy,
  className,
}: ShareBlockProps) {
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState(url)

  const handleGenerate = () => {
    if (onGenerate) {
      onGenerate()
    } else {
      // Default: generate a URL based on current location
      const newUrl = window.location.href
      setShareUrl(newUrl)
      console.log("Link generated:", newUrl)
    }
  }

  const handleCopy = async () => {
    const urlToCopy = shareUrl || url || window.location.href
    try {
      await navigator.clipboard.writeText(urlToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      onCopy?.(urlToCopy)
      console.log("Link copied:", urlToCopy)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <Card className={cn("border border-border shadow-md hover:shadow-lg transition-shadow", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2.5">
          <Link2 className="h-5 w-5 text-primary" />
          <CardTitle className="text-base font-bold leading-tight">{title}</CardTitle>
        </div>
        <CardDescription className="text-xs leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <Button onClick={handleGenerate} size="lg" className="w-full h-11 font-medium">
            {generateButtonText}
          </Button>
          <Button
            onClick={handleCopy}
            variant="outline"
            size="lg"
            className="w-full h-11 font-medium"
            disabled={!shareUrl && !url}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                {copiedButtonText}
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                {copyButtonText}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

