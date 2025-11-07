import type { Meta, StoryObj } from "@storybook/react"
import {
  CardSkeleton,
  PriceCardSkeleton,
  WeatherCardSkeleton,
  NDVICardSkeleton,
  DataCardSkeleton,
} from "@/components/feedback/skeleton"

const meta = {
  title: "Components/Feedback/Skeleton",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Card: Story = {
  render: () => <CardSkeleton />,
}

export const PriceCard: Story = {
  render: () => <PriceCardSkeleton />,
}

export const WeatherCard: Story = {
  render: () => <WeatherCardSkeleton />,
}

export const NDVICard: Story = {
  render: () => <NDVICardSkeleton />,
}

export const DataCard: Story = {
  render: () => <DataCardSkeleton />,
}

export const AllSkeletons: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
      <PriceCardSkeleton />
      <WeatherCardSkeleton />
      <NDVICardSkeleton />
    </div>
  ),
}

