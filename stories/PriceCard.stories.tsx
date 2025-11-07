import type { Meta, StoryObj } from "@storybook/react"
import { PriceCard } from "@/components/data-display/price-card"

const meta = {
  title: "Components/Data Display/PriceCard",
  component: PriceCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    price: {
      control: "number",
    },
    change: {
      control: "number",
    },
  },
} satisfies Meta<typeof PriceCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    price: 145.0,
    change: 2.3,
    unit: "unit",
  },
}

export const NegativeChange: Story = {
  args: {
    price: 142.5,
    change: -1.8,
    unit: "unit",
  },
}

export const WithRange: Story = {
  args: {
    price: 145.0,
    change: 2.3,
    minPrice: 142.0,
    maxPrice: 148.0,
    unit: "unit",
  },
}

export const CustomFormat: Story = {
  args: {
    price: 1450.5,
    change: 2.3,
    unit: "per item",
    formatPrice: (p) => `$${p.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
    formatRange: (min, max) => `$${min.toFixed(2)} - $${max.toFixed(2)}`,
  },
}

export const WithImage: Story = {
  args: {
    price: 145.0,
    change: 2.3,
    showImage: true,
    imageAlt: "Price chart",
  },
}

export const NoChange: Story = {
  args: {
    price: 145.0,
    change: 0,
    unit: "unit",
  },
}

