import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
}

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="marketing" className="flex flex-col space-y-1">
          <span>Marketing emails</span>
          <span className="text-xs font-normal text-muted-foreground">
            Receive emails about new products, features, and more.
          </span>
        </Label>
        <Switch id="marketing" />
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="security" className="flex flex-col space-y-1">
          <span>Security emails</span>
          <span className="text-xs font-normal text-muted-foreground">
            Receive emails about your account security.
          </span>
        </Label>
        <Switch id="security" defaultChecked />
      </div>
    </div>
  ),
}

