import type { Meta, StoryObj } from "@storybook/react"
import { CostComparisonCard } from "@/components/forms/cost-comparison-card"

const meta = {
  title: "Components/Forms/CostComparisonCard",
  component: CostComparisonCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
    },
    description: {
      control: "text",
    },
    yieldPerUnit: {
      control: "number",
    },
  },
} satisfies Meta<typeof CostComparisonCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const CustomLabels: Story = {
  args: {
    title: "Profit Calculator",
    description: "Calculate your profit margin",
    costLabel: "Total Investment",
    priceLabel: "Selling Price per Unit",
    costPlaceholder: "Enter investment amount",
    pricePlaceholder: "Enter selling price",
    buttonText: "CALCULATE",
    resultLabel: "Profit margin:",
    privacyText: "All calculations are private",
  },
}

export const CustomCalculation: Story = {
  args: {
    title: "Custom Calculator",
    description: "Calculate with custom logic",
    onCalculate: (cost, price) => {
      // Custom calculation: simple percentage
      return ((price - cost) / cost) * 100
    },
  },
}

export const Agricultural: Story = {
  args: {
    title: "Farm Profit Calculator",
    description: "Calculate your farm profitability",
    costLabel: "Total Cost (per hectare)",
    priceLabel: "Sale Price (per unit)",
    costPlaceholder: "Ex: 3500",
    pricePlaceholder: "Ex: 145",
    buttonText: "CALCULATE PROFIT",
    resultLabel: "Estimated profit margin:",
    yieldPerUnit: 60,
    privacyText: "Your farm data is 100% anonymous",
  },
}

