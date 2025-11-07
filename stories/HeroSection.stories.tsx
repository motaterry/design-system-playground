import type { Meta, StoryObj } from "@storybook/react"
import { HeroSection } from "@/components/layout/hero-section"

const meta = {
  title: "Components/Layout/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HeroSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Welcome to Our Platform",
    description: "Get started with powerful tools and insights",
  },
}

export const WithBackground: Story = {
  args: {
    title: "Beautiful Hero Section",
    description: "This hero section has a background image with overlay",
    backgroundImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920",
    backgroundImageAlt: "Mountain landscape",
    overlayOpacity: 0.6,
  },
}

export const CustomOverlay: Story = {
  args: {
    title: "Custom Overlay Color",
    description: "You can customize the overlay color and opacity",
    backgroundImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920",
    overlayColor: "hsl(217, 91%, 60%)",
    overlayOpacity: 0.5,
  },
}

export const WithContent: Story = {
  args: {
    title: "Hero with Custom Content",
    description: "Add any content below the title and description",
    children: (
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-white text-primary font-semibold rounded-md">
          Get Started
        </button>
        <button className="px-6 py-3 bg-white/20 text-white font-semibold rounded-md border border-white/30">
          Learn More
        </button>
      </div>
    ),
  },
}

export const NoDescription: Story = {
  args: {
    title: "Simple Hero",
    children: <button className="px-6 py-3 bg-white text-primary font-semibold rounded-md">Action</button>,
  },
}

