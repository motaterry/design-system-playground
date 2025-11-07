import type { Meta, StoryObj } from "@storybook/react"
import { AlertSubscriptionCard } from "@/components/forms/alert-subscription-card"

const meta = {
  title: "Components/Forms/AlertSubscriptionCard",
  component: AlertSubscriptionCard,
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
  },
} satisfies Meta<typeof AlertSubscriptionCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const CustomAlerts: Story = {
  args: {
    title: "Notification Preferences",
    description: "Choose what notifications you want to receive",
    phoneLabel: "Mobile Number",
    phonePlaceholder: "+1 (555) 000-0000",
    alertsLabel: "Subscribe to:",
    alertOptions: [
      { key: "news", label: "News Updates" },
      { key: "promotions", label: "Promotions" },
      { key: "security", label: "Security Alerts" },
      { key: "updates", label: "Product Updates" },
    ],
    activateButtonText: "SUBSCRIBE",
    testButtonText: "TEST",
  },
}

export const WithCallbacks: Story = {
  args: {
    onActivate: (alerts, phone) => {
      console.log("Activated:", { alerts, phone })
      alert(`Subscribed to ${Object.values(alerts).filter(Boolean).length} alerts for ${phone}`)
    },
    onTest: (phone) => {
      console.log("Test sent to:", phone)
      alert(`Test notification sent to ${phone}`)
    },
  },
}

export const Minimal: Story = {
  args: {
    title: "Get Notified",
    description: "Stay updated",
    alertOptions: [
      { key: "email", label: "Email" },
      { key: "sms", label: "SMS" },
    ],
  },
}

