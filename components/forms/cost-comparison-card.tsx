"use client"

import { useState } from "react"
import { Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CostComparisonCardProps {
  title?: string
  description?: string
  costLabel?: string
  priceLabel?: string
  costPlaceholder?: string
  pricePlaceholder?: string
  buttonText?: string
  resultLabel?: string
  privacyText?: string
  onCalculate?: (cost: number, price: number) => number | null
  yieldPerUnit?: number
  className?: string
}

export function CostComparisonCard({
  title = "Cost Comparison",
  description = "Calculate profitability",
  costLabel = "Total Cost",
  priceLabel = "Sale Price",
  costPlaceholder = "Ex: 3500",
  pricePlaceholder = "Ex: 145",
  buttonText = "COMPARE NOW",
  resultLabel = "Estimated profit margin:",
  privacyText = "Your data is 100% anonymous",
  onCalculate,
  yieldPerUnit = 60,
  className,
}: CostComparisonCardProps) {
  const [totalCost, setTotalCost] = useState("")
  const [salePrice, setSalePrice] = useState("")
  const [result, setResult] = useState<number | null>(null)

  const handleCompare = () => {
    const cost = parseFloat(totalCost)
    const price = parseFloat(salePrice)

    if (!isNaN(cost) && !isNaN(price) && cost > 0 && price > 0) {
      if (onCalculate) {
        const calculatedResult = onCalculate(cost, price)
        setResult(calculatedResult)
      } else {
        // Default calculation: assuming yield per unit
        const revenue = price * yieldPerUnit
        const profit = revenue - cost
        const profitMargin = (profit / revenue) * 100
        setResult(profitMargin)
      }
    }
  }

  return (
    <Card className={cn("w-full max-w-2xl mx-auto border border-border shadow-lg hover:shadow-xl transition-shadow duration-200", className)}>
      <CardHeader className="p-6 pb-6">
        <CardTitle className="text-base font-bold mb-2 leading-tight">{title}</CardTitle>
        <CardDescription className="text-xs leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-6">
        <div className="space-y-2.5">
          <Label htmlFor="total-cost" className="text-xs font-bold">
            {costLabel}
          </Label>
          <Input
            id="total-cost"
            type="number"
            placeholder={costPlaceholder}
            value={totalCost}
            onChange={(e) => setTotalCost(e.target.value)}
            className="h-11 text-base border-border"
          />
        </div>
        <div className="space-y-2.5">
          <Label htmlFor="sale-price" className="text-xs font-bold">
            {priceLabel}
          </Label>
          <Input
            id="sale-price"
            type="number"
            placeholder={pricePlaceholder}
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            className="h-11 text-base border-border"
          />
        </div>
        <Button onClick={handleCompare} size="lg" className="w-full h-12 text-base font-semibold hover:shadow-md transition-shadow">
          {buttonText}
        </Button>
        {result !== null && (
          <div className="pt-5 border-t border-border">
            <div className="text-center space-y-2.5">
              <div className="text-xs font-medium text-muted-foreground">{resultLabel}</div>
              <div
                className={cn(
                  "text-4xl md:text-5xl font-bold leading-none tracking-tight",
                  result >= 0 ? "text-success" : "text-destructive"
                )}
              >
                {result >= 0 ? "+" : ""}
                {result.toFixed(1)}%
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0 flex items-center gap-2.5 text-[10px] text-muted-foreground">
        <Shield className="h-4 w-4 text-primary" />
        <span className="leading-relaxed">{privacyText}</span>
      </CardFooter>
    </Card>
  )
}

