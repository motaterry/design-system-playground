import type { Meta, StoryObj } from "@storybook/react"
import { PageHeader } from "@/components/layout/page-header"

const meta = {
  title: "Components/Layout/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Search Results",
    subtitle: "Last updated: today 06:15 (Source)",
    backLabel: "Back to Home",
    onBack: () => console.log("Back clicked"),
  },
}

export const WithFilters: Story = {
  args: {
    title: "Data Analysis",
    subtitle: "Last updated: 2 hours ago",
    backLabel: "Back",
    showFilters: true,
    filterLabel: "Filters",
    onFilterClick: () => console.log("Filter clicked"),
  },
}

export const WithPeriodSelector: Story = {
  args: {
    title: "Performance Metrics",
    showPeriodSelector: true,
    selectedPeriod: "7d",
    onPeriodChange: (period) => console.log("Period changed:", period),
  },
}

export const FullFeatured: Story = {
  args: {
    title: "Dashboard",
    subtitle: "Last updated: today 06:15 (API)",
    backLabel: "Home",
    showLogo: true,
    logoUrl: "/logo.svg",
    logoAlt: "Company Logo",
    showFilters: true,
    filterLabel: "Filter",
    showPeriodSelector: true,
    selectedPeriod: "30d",
    onBack: () => console.log("Back"),
    onFilterClick: () => console.log("Filter"),
    onPeriodChange: (period) => console.log("Period:", period),
  },
}

export const Minimal: Story = {
  args: {
    title: "Simple Page",
  },
}

