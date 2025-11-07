import type { Meta, StoryObj } from "@storybook/react"
import { ShareBlock } from "@/components/sharing/share-block"

const meta = {
  title: "Components/Sharing/ShareBlock",
  component: ShareBlock,
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
    url: {
      control: "text",
    },
  },
} satisfies Meta<typeof ShareBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const CustomText: Story = {
  args: {
    title: "Share Your Results",
    description: "Create a shareable link for these results",
    generateButtonText: "Create Link",
    copyButtonText: "Copy to Clipboard",
    copiedButtonText: "Copied!",
  },
}

export const WithURL: Story = {
  args: {
    url: "https://example.com/results/123",
    title: "Share Analysis",
    description: "Share this analysis with your team",
  },
}

export const WithCallbacks: Story = {
  args: {
    onGenerate: () => {
      console.log("Generate clicked")
      alert("Link generated!")
    },
    onCopy: (url) => {
      console.log("Copied:", url)
    },
  },
}

