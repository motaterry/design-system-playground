import type { Meta, StoryObj } from "@storybook/react"
import { WeatherCard, type WeatherDay } from "@/components/data-display/weather-card"

const meta = {
  title: "Components/Data Display/WeatherCard",
  component: WeatherCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof WeatherCard>

export default meta
type Story = StoryObj<typeof meta>

const sampleDays: WeatherDay[] = [
  { day: "Today", icon: "sun", temp: { max: 28, min: 20 }, rain: 0 },
  { day: "Tomorrow", icon: "cloud", temp: { max: 26, min: 18 }, rain: 5 },
  { day: "Wed", icon: "rain", temp: { max: 24, min: 17 }, rain: 12 },
  { day: "Thu", icon: "cloud", temp: { max: 25, min: 18 }, rain: 3 },
  { day: "Fri", icon: "sun", temp: { max: 27, min: 19 }, rain: 0 },
  { day: "Sat", icon: "sun", temp: { max: 29, min: 21 }, rain: 0 },
  { day: "Sun", icon: "cloud", temp: { max: 26, min: 19 }, rain: 2 },
]

export const Default: Story = {
  args: {
    days: sampleDays,
  },
}

export const CustomLabels: Story = {
  args: {
    title: "7-Day Forecast",
    days: sampleDays,
    accumulatedLabel: "Total precipitation:",
    maxTempLabel: "Peak temperature:",
    temperatureUnit: "°C",
    rainUnit: "mm",
  },
}

export const WithImage: Story = {
  args: {
    days: sampleDays,
    showImage: true,
    imageAlt: "Weather forecast",
  },
}

export const Fahrenheit: Story = {
  args: {
    days: sampleDays.map((day) => ({
      ...day,
      temp: {
        max: Math.round((day.temp.max * 9) / 5 + 32),
        min: Math.round((day.temp.min * 9) / 5 + 32),
      },
    })),
    temperatureUnit: "°F",
  },
}

