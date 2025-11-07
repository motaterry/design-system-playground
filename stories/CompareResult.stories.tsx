import type { Meta, StoryObj } from "@storybook/react"
import { CompareResult, type ComparisonMetric } from "@/components/comparison/compare-result"
import { DollarSign, Package } from "lucide-react"

const meta = {
  title: "Components/Comparison/CompareResult",
  component: CompareResult,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CompareResult>

export default meta
type Story = StoryObj<typeof meta>

const sampleMetrics: ComparisonMetric[] = [
  {
    label: "Cost per Unit",
    icon: DollarSign,
    userValue: 3500,
    averageValue: 4000,
    rangeMin: 2800,
    rangeMax: 5200,
    category: "low",
    interpretation: "Your costs are below the regional average.",
  },
  {
    label: "Sale Price",
    icon: Package,
    userValue: 145,
    averageValue: 140,
    rangeMin: 119,
    rangeMax: 161,
    category: "high",
    interpretation: "Your price is above the regional average.",
  },
]

export const Default: Story = {
  args: {
    title: "Your Position",
    subtitle: "Comparison with regional average",
    metrics: sampleMetrics,
    percentile: 75,
    recommendation: "Your performance is strong. Consider optimizing further.",
    averageValues: [
      { label: "Cost", value: "$4,000", range: "$2,800–$5,200" },
      { label: "Price", value: "$119–$161" },
    ],
  },
}

export const AveragePerformance: Story = {
  args: {
    title: "Your Performance",
    metrics: [
      {
        label: "Metric 1",
        userValue: 100,
        averageValue: 100,
        rangeMin: 80,
        rangeMax: 120,
        category: "average",
        interpretation: "You're right at the average.",
      },
    ],
    percentile: 50,
  },
}

export const HighPerformance: Story = {
  args: {
    title: "Excellent Results",
    metrics: [
      {
        label: "Efficiency Score",
        userValue: 95,
        averageValue: 70,
        rangeMin: 50,
        rangeMax: 90,
        category: "very-high",
        interpretation: "You're performing exceptionally well!",
      },
    ],
    percentile: 95,
    recommendation: "Keep up the excellent work!",
  },
}

export const WithoutPercentile: Story = {
  args: {
    title: "Comparison Results",
    metrics: sampleMetrics,
    averageValues: [
      { label: "Average Cost", value: "$4,000" },
      { label: "Average Price", value: "$140" },
    ],
  },
}

export const InvalidValues: Story = {
  args: {
    title: "Your Position",
    metrics: [
      {
        label: "Cost",
        userValue: 0, // Invalid
        averageValue: 4000,
        rangeMin: 2800,
        rangeMax: 5200,
        category: "average",
        interpretation: "",
      },
    ],
  },
}

