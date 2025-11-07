"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface PriceCardProps {
  title?: string
  source?: string
  price: number
  unit?: string
  change?: number
  changePeriod?: string
  minPrice?: number
  maxPrice?: number
  showImage?: boolean
  imageUrl?: string
  imageAlt?: string
  formatPrice?: (price: number) => string
  formatRange?: (min: number, max: number) => string
  className?: string
}

export function PriceCard({
  title = "Price Today",
  source,
  price,
  unit = "unit",
  change = 0,
  changePeriod = "7 days",
  minPrice,
  maxPrice,
  showImage = false,
  imageUrl,
  imageAlt,
  formatPrice = (p) => `$${p.toFixed(2)}`,
  formatRange = (min, max) => `${formatPrice(min)} – ${formatPrice(max)}`,
  className,
}: PriceCardProps) {
  const isPositive = change >= 0
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

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
        <CardTitle className="text-xs font-bold uppercase tracking-wider mb-1.5">{title}</CardTitle>
        {source && <CardDescription className="text-[10px] font-medium">{source}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Primary metric */}
        <div className="space-y-1.5">
          <div className="text-4xl md:text-5xl font-bold text-primary leading-none tracking-tight">
            {formatPrice(price)}
          </div>
          <div className="text-xs font-medium text-muted-foreground">per {unit}</div>
        </div>

        {/* Change indicator */}
        {change !== 0 && (
          <div
            className={cn(
              "flex items-center gap-2.5 px-3.5 py-2.5 rounded-md",
              isPositive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            )}
          >
            <TrendIcon className="h-5 w-5" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold">
                {isPositive ? "+" : ""}
                {change.toFixed(1)}%
              </span>
              <span className="text-[10px] font-medium text-muted-foreground">{changePeriod}</span>
            </div>
          </div>
        )}

        {/* Price range */}
        {minPrice !== undefined && maxPrice !== undefined && (
          <div className="pt-4 border-t border-border">
            <p className="text-[10px] font-medium text-muted-foreground leading-relaxed">
              Price range: <span className="font-bold text-xs">{formatRange(minPrice, maxPrice)}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

