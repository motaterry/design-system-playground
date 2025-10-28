import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
}

export const WithValue: Story = {
  args: {
    value: 'Pre-filled value',
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
}

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '0',
  },
}

export const Search: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Label htmlFor="search">Search</Label>
      <div className="relative mt-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <Input id="search" placeholder="Search..." className="pl-9" />
      </div>
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="error-input" className="text-destructive">
        Email
      </Label>
      <Input
        type="email"
        id="error-input"
        placeholder="Email"
        className="border-destructive"
      />
      <p className="text-sm text-destructive">Please enter a valid email address.</p>
    </div>
  ),
}

