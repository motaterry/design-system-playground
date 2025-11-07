"use client"

import { useState } from "react"
import { Lock, Shield, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface ComparisonFormData {
  value1: number
  value2: number
}

export interface CompareGateProps {
  title?: string
  description?: string
  label1?: string
  label2?: string
  placeholder1?: string
  placeholder2?: string
  buttonText?: string
  unlockButtonText?: string
  privacyTitle?: string
  privacyDescription?: string
  isLocked?: boolean
  isSampleInsufficient?: boolean
  insufficientSampleTitle?: string
  insufficientSampleMessage?: string
  inviteButtonText?: string
  lockedImageUrl?: string
  lockedImageAlt?: string
  onUnlock?: () => void
  onSubmit?: (data: ComparisonFormData) => void
  onInvite?: () => void
  parseValue?: (value: string) => number
  renderResult?: (data: ComparisonFormData) => React.ReactNode
  className?: string
}

export function CompareGate({
  title = "Regional Comparison",
  description = "Compare your values with regional averages",
  label1 = "Value 1",
  label2 = "Value 2",
  placeholder1 = "Enter value 1",
  placeholder2 = "Enter value 2",
  buttonText = "COMPARE NOW",
  unlockButtonText = "UNLOCK COMPARISON",
  privacyTitle = "Anonymous Mode • Active",
  privacyDescription = "Your data stays private",
  isLocked = false,
  isSampleInsufficient = false,
  insufficientSampleTitle = "Insufficient Sample",
  insufficientSampleMessage = "Sample size is too small. Invite more participants to unlock comparison.",
  inviteButtonText = "Send Invite",
  lockedImageUrl,
  lockedImageAlt = "Locked content",
  onUnlock,
  onSubmit,
  onInvite,
  parseValue = (value) => {
    // Default: parse as number, handle comma separators
    return parseFloat(value.replace(/,/g, ""))
  },
  renderResult,
  className,
}: CompareGateProps) {
  const [isUnlocked, setIsUnlocked] = useState(!isLocked)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [value1, setValue1] = useState("")
  const [value2, setValue2] = useState("")
  const [comparisonData, setComparisonData] = useState<ComparisonFormData | null>(null)

  const handleUnlock = () => {
    setIsUnlocked(true)
    onUnlock?.()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const parsedValue1 = parseValue(value1)
    const parsedValue2 = parseValue(value2)

    if (isNaN(parsedValue1) || isNaN(parsedValue2) || parsedValue1 <= 0 || parsedValue2 <= 0) {
      return
    }

    const data: ComparisonFormData = {
      value1: parsedValue1,
      value2: parsedValue2,
    }

    setComparisonData(data)
    setIsSubmitted(true)
    onSubmit?.(data)
  }

  // Insufficient sample state
  if (isSampleInsufficient && !isUnlocked) {
    return (
      <Card className={cn("border border-border shadow-md p-4 w-full h-full flex flex-col", className)}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-warning" />
            {insufficientSampleTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{insufficientSampleMessage}</p>
          <Button onClick={onInvite} className="w-full">
            {inviteButtonText}
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Locked state
  if (!isUnlocked) {
    return (
      <Card
        className={cn(
          "border border-border shadow-md p-4 overflow-hidden relative h-full w-full min-h-[400px] flex flex-col",
          className
        )}
      >
        {lockedImageUrl && (
          <div className="absolute inset-0 z-0">
            <img src={lockedImageUrl} alt={lockedImageAlt} className="w-full h-full object-cover opacity-50" />
          </div>
        )}

        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <Lock className="h-8 w-8 text-muted-foreground mb-2" />
        </div>

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4">
          <Button onClick={handleUnlock} className="w-full max-w-xs">
            {unlockButtonText}
          </Button>
        </div>
      </Card>
    )
  }

  // Result state
  if (isSubmitted && comparisonData && renderResult) {
    return <>{renderResult(comparisonData)}</>
  }

  // Form state
  return (
    <Card className={cn("border border-border shadow-md hover:shadow-lg transition-shadow p-6 w-full h-full flex flex-col", className)}>
      <CardHeader className="pb-6">
        <CardTitle className="text-base font-bold mb-2 leading-tight">{title}</CardTitle>
        <CardDescription className="text-xs leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2.5">
            <Label htmlFor="value1" className="text-xs font-bold">
              {label1}
            </Label>
            <Input
              id="value1"
              type="text"
              placeholder={placeholder1}
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              className="h-11 border-border focus:ring-ring text-base bg-background"
            />
          </div>

          <div className="space-y-2.5">
            <Label htmlFor="value2" className="text-xs font-bold">
              {label2}
            </Label>
            <Input
              id="value2"
              type="text"
              placeholder={placeholder2}
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              className="h-11 border-border focus:ring-ring text-base bg-background"
            />
          </div>

          <Button type="submit" size="lg" className="w-full h-12 text-base font-semibold">
            {buttonText}
          </Button>

          {/* Privacy info */}
          <div className="pt-5 border-t border-border flex items-start gap-2.5">
            <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1 space-y-1">
              <p className="text-xs font-bold text-primary">{privacyTitle}</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{privacyDescription}</p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

