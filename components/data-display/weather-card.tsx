"use client"

import { Sun, Cloud, CloudRain, CloudDrizzle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface WeatherDay {
  day: string
  icon: "sun" | "cloud" | "rain" | "cloudRain" | "cloudDrizzle"
  temp: { max: number; min: number }
  rain?: number
}

export interface WeatherCardProps {
  title?: string
  days: WeatherDay[]
  showImage?: boolean
  imageUrl?: string
  imageAlt?: string
  accumulatedLabel?: string
  maxTempLabel?: string
  temperatureUnit?: string
  rainUnit?: string
  className?: string
}

const iconMap = {
  sun: Sun,
  cloud: Cloud,
  rain: CloudRain,
  cloudRain: CloudRain,
  cloudDrizzle: CloudDrizzle,
}

export function WeatherCard({
  title = "7-Day Forecast",
  days,
  showImage = false,
  imageUrl,
  imageAlt,
  accumulatedLabel = "Accumulated precipitation:",
  maxTempLabel = "Maximum temperature:",
  temperatureUnit = "°",
  rainUnit = "mm",
  className,
}: WeatherCardProps) {
  const accumulated = days.reduce((sum, day) => sum + (day.rain || 0), 0)
  const maxTemp = Math.max(...days.map((day) => day.temp.max))

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
      <CardContent>
        {/* Weather forecast grid */}
        <div className="grid grid-cols-7 gap-3.5 mb-5">
          {days.map((day, index) => {
            const Icon = iconMap[day.icon] || Sun
            return (
              <div key={index} className="text-center space-y-2">
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                  {day.day}
                </div>
                <Icon className="h-7 w-7 mx-auto text-primary" />
                <div className="space-y-0.5">
                  <div className="text-base font-bold text-primary leading-tight">
                    {day.temp.max}
                    {temperatureUnit}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {day.temp.min}
                    {temperatureUnit}
                  </div>
                </div>
                {day.rain !== undefined && day.rain > 0 && (
                  <div className="text-xs font-bold text-info mt-1">
                    {day.rain}
                    {rainUnit}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Summary */}
        <div className="pt-5 border-t border-border space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-muted-foreground">{accumulatedLabel}</span>
            <span className="text-xs font-bold">
              {accumulated}
              {rainUnit}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-muted-foreground">{maxTempLabel}</span>
            <span className="text-xs font-bold">
              {maxTemp}
              {temperatureUnit}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

