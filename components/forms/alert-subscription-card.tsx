"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface AlertOption {
  key: string
  label: string
}

interface AlertSubscriptionCardProps {
  title?: string
  description?: string
  phoneLabel?: string
  phonePlaceholder?: string
  alertsLabel?: string
  activateButtonText?: string
  testButtonText?: string
  alertOptions?: AlertOption[]
  onActivate?: (alerts: Record<string, boolean>, phone: string) => void
  onTest?: (phone: string) => void
  className?: string
}

export function AlertSubscriptionCard({
  title = "Alert Subscriptions",
  description = "Receive notifications about important changes",
  phoneLabel = "Phone Number",
  phonePlaceholder = "(00) 00000-0000",
  alertsLabel = "Receive alerts about:",
  activateButtonText = "ACTIVATE",
  testButtonText = "SEND TEST",
  alertOptions = [
    { key: "price", label: "Price" },
    { key: "climate", label: "Climate" },
    { key: "ndvi", label: "NDVI" },
  ],
  onActivate,
  onTest,
  className,
}: AlertSubscriptionCardProps) {
  const [alerts, setAlerts] = useState<Record<string, boolean>>(
    Object.fromEntries(alertOptions.map((opt) => [opt.key, false]))
  )
  const [phone, setPhone] = useState("")

  const handleToggle = (key: string) => {
    setAlerts((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleActivate = () => {
    onActivate?.(alerts, phone)
    console.log("Alerts activated:", { alerts, phone })
  }

  const handleTest = () => {
    onTest?.(phone)
    console.log("Test sent:", { phone })
  }

  return (
    <Card className={cn("border border-border shadow-md hover:shadow-lg transition-shadow", className)}>
      <CardHeader className="pb-6">
        <CardTitle className="text-base font-bold mb-2 leading-tight">{title}</CardTitle>
        <CardDescription className="text-xs leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2.5">
          <Label className="text-xs font-bold">{phoneLabel}</Label>
          <Input
            type="tel"
            placeholder={phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-11 border-border focus:ring-ring text-base bg-background"
          />
        </div>

        <div className="space-y-3.5">
          <Label className="text-xs font-bold">{alertsLabel}</Label>
          <div className="space-y-2">
            {alertOptions.map(({ key, label }) => (
              <label
                key={key}
                className="flex items-center gap-3 cursor-pointer p-2.5 hover:bg-accent rounded-sm transition-colors"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={alerts[key] || false}
                    onChange={() => handleToggle(key)}
                    className="sr-only"
                  />
                  <div
                    className={cn(
                      "w-5 h-5 border-2 rounded-sm flex items-center justify-center transition-colors",
                      alerts[key] ? "bg-primary border-primary" : "border-border"
                    )}
                  >
                    {alerts[key] && <Check className="h-3.5 w-3.5 text-primary-foreground" />}
                  </div>
                </div>
                <span className="text-xs font-semibold">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2 w-full">
          <Button onClick={handleActivate} size="lg" className="flex-1 min-w-0 h-11 font-semibold">
            {activateButtonText}
          </Button>
          <Button onClick={handleTest} variant="outline" size="lg" className="flex-1 min-w-0 h-11 font-medium">
            {testButtonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Alias for backward compatibility
export const WhatsAppAlerts = AlertSubscriptionCard

