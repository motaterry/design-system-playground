"use client"

import { ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface NDVICardProps {
  title?: string
  value: number
  unit?: string
  trend?: "up" | "down" | "stable"
  lastUpdate?: string
  lastUpdateLabel?: string
  showImage?: boolean
  imageUrl?: string
  imageAlt?: string
  actionLabel?: string
  onAction?: () => void
  formatValue?: (value: number) => string
  className?: string
}

export function NDVICard({
  title = "NDVI Weekly",
  value,
  unit = "vegetation index",
  trend = "stable",
  lastUpdate,
  lastUpdateLabel = "Last update:",
  showImage = false,
  imageUrl,
  imageAlt,
  actionLabel = "View detailed map",
  onAction,
  formatValue = (v) => v.toFixed(2),
  className,
}: NDVICardProps) {
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus
  const trendColor =
    trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"
  const trendBg =
    trend === "up"
      ? "bg-success/10"
      : trend === "down"
        ? "bg-destructive/10"
        : "bg-muted/50"
  const trendText =
    trend === "up" ? "Growing" : trend === "down" ? "Decreasing" : "Stable"

  return (
    <Card className={cn("border border-border shadow-md hover:shadow-lg transition-shadow", className)}>
      {showImage && (
        <div className="w-full h-48 bg-muted flex items-center justify-center border-b border-border mb-6">
          {imageUrl ? (
            <img src={imageUrl} alt={imageAlt || title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-muted-foreground text-xs font-medium">Image Placeholder</span>
          )}
        </div>
      )}
      <CardHeader className="pb-5">
        <CardTitle className="text-xs font-bold uppercase tracking-wider">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Primary metric */}
        <div className="space-y-1.5">
          <div className="text-4xl md:text-5xl font-bold text-primary leading-none tracking-tight">
            {formatValue(value)}
          </div>
          <div className="text-xs font-medium text-muted-foreground">{unit}</div>
        </div>

        {/* Trend indicator */}
        <div className={cn("flex items-center gap-2.5 px-3.5 py-2.5 rounded-md", trendBg)}>
          <TrendIcon className={cn("h-5 w-5", trendColor)} />
          <span className={cn("text-sm font-bold", trendColor)}>{trendText}</span>
        </div>

        {/* Last update */}
        {lastUpdate && (
          <div className="text-[10px] text-muted-foreground leading-relaxed">
            {lastUpdateLabel} <span className="font-bold text-xs">{lastUpdate}</span>
          </div>
        )}

        {/* Action button */}
        {onAction && (
          <Button
            variant="outline"
            onClick={onAction}
            className="w-full justify-between text-sm font-medium border-border bg-background hover:bg-accent hover:text-accent-foreground mt-2"
          >
            <span>{actionLabel}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

