import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { AutocompleteInput, type AutocompleteOption } from "@/components/forms/autocomplete-input"

const meta = {
  title: "Components/Forms/AutocompleteInput",
  component: AutocompleteInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // Disable controls for stories that use render functions
  argTypes: {},
} satisfies Meta<typeof AutocompleteInput>

export default meta
type Story = StoryObj<typeof meta>

const simpleSuggestions = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeydew",
]

const optionsWithMetadata: AutocompleteOption[] = [
  { label: "Apple", value: "apple", metadata: { trend: "up", change: 2.5 } },
  { label: "Banana", value: "banana", metadata: { trend: "down", change: -1.2 } },
  { label: "Cherry", value: "cherry", metadata: { trend: "stable", change: 0.5 } },
  { label: "Date", value: "date", metadata: { trend: "up", change: 3.8 } },
  { label: "Elderberry", value: "elderberry", metadata: { trend: "down", change: -2.1 } },
]

function SimpleComponent() {
  const [value, setValue] = useState("")
  return (
    <div className="w-80">
      <AutocompleteInput
        value={value}
        onChange={setValue}
        onSelect={(val) => {
          setValue(val)
          console.log("Selected:", val)
        }}
        placeholder="Type to search..."
        suggestions={simpleSuggestions}
      />
    </div>
  )
}

function WithMetadataComponent() {
  const [value, setValue] = useState("")
  return (
    <div className="w-80">
      <AutocompleteInput
        value={value}
        onChange={setValue}
        onSelect={(val) => {
          setValue(val)
          console.log("Selected:", val)
        }}
        placeholder="Type to search..."
        suggestions={optionsWithMetadata}
        showMetrics={true}
      />
    </div>
  )
}

function DisabledComponent() {
  const [value, setValue] = useState("")
  return (
    <div className="w-80">
      <AutocompleteInput
        value={value}
        onChange={setValue}
        onSelect={(val) => setValue(val)}
        placeholder="Disabled input..."
        suggestions={simpleSuggestions}
        disabled={true}
      />
    </div>
  )
}

function CustomHighlightComponent() {
  const [value, setValue] = useState("")
  const customHighlight = (text: string, query: string) => {
    if (!query.trim()) return [{ text, highlight: false }]
    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)
    return parts.map((part) => ({
      text: part,
      highlight: regex.test(part),
    }))
  }
  return (
    <div className="w-80">
      <AutocompleteInput
        value={value}
        onChange={setValue}
        onSelect={(val) => setValue(val)}
        placeholder="Type to search..."
        suggestions={simpleSuggestions}
        highlightMatch={customHighlight}
      />
    </div>
  )
}

export const Simple: Story = {
  args: {
    value: "",
    onChange: () => {},
    onSelect: () => {},
    suggestions: [],
  },
  render: () => <SimpleComponent />,
}

export const WithMetadata: Story = {
  args: {
    value: "",
    onChange: () => {},
    onSelect: () => {},
    suggestions: [],
  },
  render: () => <WithMetadataComponent />,
}

export const Disabled: Story = {
  args: {
    value: "",
    onChange: () => {},
    onSelect: () => {},
    suggestions: [],
  },
  render: () => <DisabledComponent />,
}

export const CustomHighlight: Story = {
  args: {
    value: "",
    onChange: () => {},
    onSelect: () => {},
    suggestions: [],
  },
  render: () => <CustomHighlightComponent />,
}

