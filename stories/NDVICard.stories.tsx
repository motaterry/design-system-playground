import type { Meta, StoryObj } from "@storybook/react"
import { NDVICard } from "@/components/data-display/ndvi-card"

const meta = {
  title: "Components/Data Display/NDVICard",
  component: NDVICard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "number",
    },
    trend: {
      control: "select",
      options: ["up", "down", "stable"],
    },
  },
} satisfies Meta<typeof NDVICard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 0.72,
    trend: "up",
    lastUpdate: "3 days ago",
  },
}

export const DownwardTrend: Story = {
  args: {
    value: 0.65,
    trend: "down",
    lastUpdate: "1 week ago",
  },
}

export const Stable: Story = {
  args: {
    value: 0.70,
    trend: "stable",
    lastUpdate: "2 days ago",
  },
}

export const WithAction: Story = {
  args: {
    value: 0.72,
    trend: "up",
    lastUpdate: "3 days ago",
    actionLabel: "View Detailed Map",
    onAction: () => {
      console.log("Action clicked")
      alert("Viewing detailed map")
    },
  },
}

export const CustomFormat: Story = {
  args: {
    value: 0.725,
    trend: "up",
    unit: "vegetation index",
    formatValue: (v) => (v * 100).toFixed(1) + "%",
    lastUpdate: "Updated today",
  },
}

export const WithImage: Story = {
  args: {
    value: 0.72,
    trend: "up",
    showImage: true,
    imageAlt: "NDVI visualization",
  },
}

