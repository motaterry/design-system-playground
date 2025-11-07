"use client"

import { useState, useEffect } from "react"
import { Shield, TrendingUp, TrendingDown, Lightbulb } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ComparisonCategory = "very-low" | "low" | "average" | "high" | "very-high"

export interface ComparisonMetric {
  label: string
  icon?: React.ComponentType<{ className?: string }>
  userValue: number
  averageValue: number
  rangeMin: number
  rangeMax: number
  category: ComparisonCategory
  interpretation: string
}

export interface CompareResultProps {
  title?: string
  subtitle?: string
  metrics: ComparisonMetric[]
  percentile?: number
  percentileLabel?: string
  percentileDescription?: (percentile: number) => string
  recommendation?: string
  recommendationLabel?: string
  averageLabel?: string
  averageValues?: Array<{ label: string; value: string; range?: string }>
  privacyText?: string
  invalidValueTitle?: string
  invalidValueMessage?: string
  retryButtonText?: string
  onReset?: () => void
  formatValue?: (value: number) => string
  className?: string
}

function getCategoryColor(category: ComparisonCategory): string {
  switch (category) {
    case "very-low":
      return "bg-success/10 text-success border-success"
    case "low":
      return "bg-success/5 text-success border-success/50"
    case "average":
      return "bg-accent/10 text-foreground border-border"
    case "high":
      return "bg-warning/10 text-warning border-warning/50"
    case "very-high":
      return "bg-warning/20 text-warning border-warning"
  }
}

function getCategoryIcon(category: ComparisonCategory) {
  switch (category) {
    case "very-low":
    case "low":
      return TrendingDown
    case "average":
      return null
    case "high":
    case "very-high":
      return TrendingUp
  }
}

function calculateRangePosition(
  userValue: number,
  minValue: number,
  maxValue: number
): { position: number; displayMin: number; displayMax: number } {
  const range = maxValue - minValue
  const padding = range * 0.2
  let displayMin = minValue - padding
  let displayMax = maxValue + padding

  if (userValue < displayMin) {
    displayMin = userValue - range * 0.1
  }
  if (userValue > displayMax) {
    displayMax = userValue + range * 0.1
  }

  const fullRange = displayMax - displayMin
  if (fullRange === 0) {
    return { position: 50, displayMin, displayMax }
  }

  const position = ((userValue - displayMin) / fullRange) * 100
  return {
    position: Math.max(0, Math.min(100, position)),
    displayMin,
    displayMax,
  }
}

export function CompareResult({
  title = "Your Position",
  subtitle,
  metrics,
  percentile,
  percentileLabel = "Efficiency Score",
  percentileDescription = (p) => `You are in the top ${p}%`,
  recommendation,
  recommendationLabel = "Quick Tip",
  averageLabel = "Regional Average",
  averageValues,
  privacyText = "Anonymous Mode • Your data stays private",
  invalidValueTitle = "Invalid Value",
  invalidValueMessage = "The value entered seems outside the typical range. Please verify and try again.",
  retryButtonText = "Try Again",
  onReset,
  formatValue = (v) => v.toFixed(2),
  className,
}: CompareResultProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
  }, [])

  // Check if any values are invalid (0 or negative)
  const hasInvalidValues = metrics.some((m) => m.userValue <= 0)

  if (hasInvalidValues) {
    return (
      <Card className={cn("bg-card border-border shadow-md p-5 space-y-4 w-full h-full flex flex-col", className)}>
        <h2 className="text-lg font-semibold">{invalidValueTitle}</h2>
        <div className="bg-accent/10 p-4 rounded-md text-sm space-y-3">
          <div>
            <p className="font-medium">{invalidValueMessage}</p>
          </div>
          {onReset && (
            <div className="flex gap-2 pt-2">
              <Button onClick={onReset} className="flex-1 h-10 text-sm font-semibold">
                {retryButtonText}
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 mt-auto">
          <Shield className="w-3 h-3" />
          <span>{privacyText}</span>
        </div>
      </Card>
    )
  }

  return (
    <Card className={cn("bg-card border-border shadow-md p-6 w-full h-full flex flex-col", className)}>
      {/* Header */}
      <div className="mb-6 pb-6 border-b border-border">
        <h2 className="text-2xl font-bold text-primary leading-tight tracking-tight mb-1">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground font-medium">{subtitle}</p>}
      </div>

      {/* Metrics */}
      <div className="space-y-5 mb-6">
        {metrics.map((metric, index) => {
          const Icon = getCategoryIcon(metric.category)
          const colorClass = getCategoryColor(metric.category)
          const rangeData = calculateRangePosition(metric.userValue, metric.rangeMin, metric.rangeMax)

          return (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-2 mb-1">
                {metric.icon && <metric.icon className="h-4 w-4 text-primary" />}
                <span className="text-xs font-bold uppercase tracking-wider">{metric.label}</span>
              </div>
              <div className={cn("flex items-center gap-3 px-4 py-3.5 rounded-md border", colorClass)}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
                    <div className="text-sm font-bold capitalize">
                      {metric.category.replace("-", " ")}
                    </div>
                  </div>
                  <div className="mt-2.5 space-y-2">
                    <div className="relative h-3 bg-accent/30 border border-accent/40 rounded-md overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-primary/30 rounded-md"
                        style={{
                          width: isAnimating ? `${rangeData.position}%` : "0%",
                          transition: "width 1.2s ease-out",
                        }}
                      />
                      <div
                        className="absolute top-0 h-full w-1 bg-primary z-10 shadow-sm transition-all duration-1000 ease-out"
                        style={{
                          left: isAnimating ? `${rangeData.position}%` : "0%",
                          transform: "translateX(-50%)",
                          transitionDelay: "0.1s",
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span className="font-medium">{formatValue(rangeData.displayMin)}</span>
                      <span className="font-bold text-primary text-xs">{formatValue(metric.userValue)}</span>
                      <span className="font-medium">{formatValue(rangeData.displayMax)}</span>
                    </div>
                    {metric.interpretation && (
                      <p className="text-xs leading-relaxed text-muted-foreground pt-1">
                        {metric.interpretation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Percentile */}
      {percentile !== undefined && (
        <div className="bg-primary/5 border border-primary/20 px-4 py-4 mb-6 rounded-md">
          <div className="text-center space-y-1">
            <div className="text-[10px] font-semibold uppercase tracking-wider">{percentileLabel}</div>
            <div className="text-3xl md:text-4xl font-bold text-primary leading-none tracking-tight">
              {percentile}%
            </div>
            <div className="text-xs text-muted-foreground font-medium">
              {percentileDescription(percentile)}
            </div>
          </div>
        </div>
      )}

      {/* Regional Average */}
      {averageValues && averageValues.length > 0 && (
        <div className="border-t border-border pt-5 pb-5 mb-5 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider mb-2">{averageLabel}</div>
          <div className="space-y-1.5 text-xs text-muted-foreground">
            {averageValues.map((avg, index) => (
              <div key={index} className="flex items-baseline gap-2">
                <span className="font-medium">{avg.label}:</span>
                <span>{avg.value}</span>
                {avg.range && <span className="text-[10px]">({avg.range})</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendation */}
      {recommendation && (
        <div className="bg-accent/10 border border-accent/30 p-4 rounded-md mb-5">
          <div className="flex items-start gap-2.5">
            <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1 space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider">{recommendationLabel}</div>
              <p className="text-xs leading-relaxed">{recommendation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy */}
      <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-4 border-t border-border mt-auto">
        <Shield className="h-3.5 w-3.5 text-primary flex-shrink-0" />
        <span className="leading-relaxed">
          <span className="font-semibold text-primary">{privacyText}</span>
        </span>
      </div>
    </Card>
  )
}

