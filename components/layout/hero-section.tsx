"use client"

import { cn } from "@/lib/utils"

export interface HeroSectionProps {
  title: string
  description?: string
  backgroundImageUrl?: string
  backgroundImageAlt?: string
  overlayColor?: string
  overlayOpacity?: number
  children?: React.ReactNode
  className?: string
  contentClassName?: string
}

export function HeroSection({
  title,
  description,
  backgroundImageUrl,
  backgroundImageAlt = "Hero background",
  overlayColor = "hsl(var(--primary))",
  overlayOpacity = 0.7,
  children,
  className,
  contentClassName,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative w-full min-h-[480px] sm:min-h-[560px] md:min-h-[640px] flex items-center justify-center overflow-visible",
        className
      )}
    >
      {/* Background Image */}
      {backgroundImageUrl && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={backgroundImageUrl}
            alt={backgroundImageAlt}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: overlayColor,
              opacity: overlayOpacity,
            }}
          />
        </div>
      )}

      {/* Content Container */}
      <div
        className={cn(
          "relative z-10 w-full max-w-[1200px] mx-auto px-10 py-12 text-center",
          contentClassName
        )}
      >
        <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg max-w-[600px] mx-auto">
          {title}
        </h1>
        {description && (
          <p className="text-base sm:text-lg md:text-base text-white/95 mb-8 sm:mb-10 md:mb-12 drop-shadow-md max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {children && <div className="flex justify-center">{children}</div>}
      </div>
    </section>
  )
}

