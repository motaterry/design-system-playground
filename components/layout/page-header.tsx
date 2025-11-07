"use client"

import { ArrowLeft, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface PageHeaderProps {
  title: string
  subtitle?: string
  backLabel?: string
  backHref?: string
  onBack?: () => void
  logoUrl?: string
  logoAlt?: string
  showLogo?: boolean
  showFilters?: boolean
  filterLabel?: string
  onFilterClick?: () => void
  showPeriodSelector?: boolean
  periodLabel?: string
  periods?: Array<{ label: string; value: string }>
  selectedPeriod?: string
  onPeriodChange?: (period: string) => void
  className?: string
}

export function PageHeader({
  title,
  subtitle,
  backLabel = "Back",
  backHref,
  onBack,
  logoUrl,
  logoAlt = "Logo",
  showLogo = false,
  showFilters = false,
  filterLabel = "Filters",
  onFilterClick,
  showPeriodSelector = false,
  periodLabel = "Period:",
  periods = [
    { label: "7 days", value: "7d" },
    { label: "30 days", value: "30d" },
    { label: "90 days", value: "90d" },
  ],
  selectedPeriod,
  onPeriodChange,
  className,
}: PageHeaderProps) {
  const handleBack = () => {
    if (onBack) {
      onBack()
    } else if (backHref) {
      window.location.href = backHref
    }
  }

  return (
    <div className={cn("bg-background/70 border-b border-border", className)}>
      <div className="max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
        {/* Navigation row */}
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-foreground bg-background hover:bg-accent hover:text-accent-foreground -ml-2 text-xs font-medium"
            size="sm"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
            {backLabel}
          </Button>
          {showLogo && logoUrl && (
            <img src={logoUrl} alt={logoAlt} className="h-7 md:h-8 w-auto opacity-60" />
          )}
        </div>

        {/* Primary content */}
        <div className="mb-8 md:mb-10 space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-primary leading-tight tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
              {subtitle}
            </div>
          )}
        </div>

        {/* Actions row */}
        {(showFilters || showPeriodSelector) && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            {showFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={onFilterClick}
                className="border-border bg-background hover:bg-accent hover:text-accent-foreground text-xs font-semibold h-8 px-3"
              >
                <Filter className="h-3.5 w-3.5 mr-1.5" />
                {filterLabel}
              </Button>
            )}
            {showPeriodSelector && (
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider hidden sm:inline">
                  {periodLabel}
                </span>
                <div className="flex gap-1.5">
                  {periods.map((period) => (
                    <Button
                      key={period.value}
                      variant="ghost"
                      size="sm"
                      onClick={() => onPeriodChange?.(period.value)}
                      className={cn(
                        "text-xs h-8 px-2.5 font-medium bg-background hover:bg-accent hover:text-accent-foreground",
                        selectedPeriod === period.value &&
                          "bg-primary text-primary-foreground font-bold"
                      )}
                    >
                      {period.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

