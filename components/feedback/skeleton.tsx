import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function CardSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "border border-border bg-muted/20 rounded-md shadow-md p-4 animate-pulse",
        className
      )}
    >
      <div className="h-5 bg-muted w-32 mb-3" />
      <div className="h-8 bg-muted w-40 mb-2" />
      <div className="h-6 bg-muted w-full mb-3" />
      <div className="h-4 bg-muted w-48" />
    </div>
  )
}

export function PriceCardSkeleton({ className }: SkeletonProps) {
  return <CardSkeleton className={className} />
}

export function WeatherCardSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "border border-border bg-muted/20 rounded-md shadow-md p-4 animate-pulse",
        className
      )}
    >
      <div className="h-5 bg-muted w-32 mb-3" />
      <div className="grid grid-cols-7 gap-2 mb-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 bg-muted w-full" />
            <div className="h-8 bg-muted" />
            <div className="h-3 bg-muted w-full" />
          </div>
        ))}
      </div>
      <div className="h-4 bg-muted w-48" />
    </div>
  )
}

export function NDVICardSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "border border-border bg-muted/20 rounded-md shadow-md p-4 animate-pulse",
        className
      )}
    >
      <div className="h-5 bg-muted w-32 mb-3" />
      <div className="h-8 bg-muted w-24 mb-2" />
      <div className="h-4 bg-muted w-40 mb-3" />
      <div className="h-10 bg-muted w-full" />
    </div>
  )
}

export function DataCardSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "border border-border bg-muted/20 rounded-md shadow-md p-6 animate-pulse",
        className
      )}
    >
      <div className="h-4 bg-muted w-24 mb-4" />
      <div className="h-10 bg-muted w-32 mb-3" />
      <div className="h-6 bg-muted w-full mb-2" />
      <div className="h-4 bg-muted w-48" />
    </div>
  )
}

