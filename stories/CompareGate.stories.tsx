import type { Meta, StoryObj } from "@storybook/react"
import { CompareGate } from "@/components/comparison/compare-gate"

const meta = {
  title: "Components/Comparison/CompareGate",
  component: CompareGate,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CompareGate>

export default meta
type Story = StoryObj<typeof meta>

export const Unlocked: Story = {
  args: {
    isLocked: false,
    title: "Regional Comparison",
    description: "Compare your values with regional averages",
    label1: "Total Cost",
    label2: "Sale Price",
    placeholder1: "Enter cost",
    placeholder2: "Enter price",
  },
}

export const Locked: Story = {
  args: {
    isLocked: true,
    title: "Regional Comparison",
    unlockButtonText: "UNLOCK COMPARISON",
  },
}

export const InsufficientSample: Story = {
  args: {
    isSampleInsufficient: true,
    insufficientSampleTitle: "Insufficient Sample Size",
    insufficientSampleMessage: "We need more data points to provide accurate comparisons. Invite others to participate.",
    inviteButtonText: "Send Invite",
    onInvite: () => {
      console.log("Invite clicked")
      alert("Sending invite...")
    },
  },
}

export const WithCallbacks: Story = {
  args: {
    isLocked: false,
    onUnlock: () => {
      console.log("Unlocked!")
    },
    onSubmit: (data) => {
      console.log("Submitted:", data)
      alert(`Comparing: ${data.value1} vs ${data.value2}`)
    },
  },
}

export const CustomLabels: Story = {
  args: {
    isLocked: false,
    title: "Performance Comparison",
    description: "Compare your metrics",
    label1: "Your Score",
    label2: "Average Score",
    placeholder1: "Enter your score",
    placeholder2: "Enter average",
    buttonText: "COMPARE",
    privacyTitle: "Privacy Mode • Active",
    privacyDescription: "Your data is kept confidential",
  },
}

