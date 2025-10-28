import type { Meta, StoryObj } from '@storybook/react'
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content area with some text.</p>
      </CardContent>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Your project will be deployed to production.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
}

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px] p-6">
      <p className="text-sm">
        This is a simple card with just content, no header or footer.
      </p>
    </Card>
  ),
}

export const Interactive: Story = {
  render: () => (
    <Card className="w-[350px] cursor-pointer transition-colors hover:bg-accent">
      <CardHeader>
        <CardTitle>Clickable Card</CardTitle>
        <CardDescription>This card responds to hover</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Hover over this card to see the effect.</p>
      </CardContent>
    </Card>
  ),
}

export const WithList: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {['Message 1', 'Message 2', 'Message 3'].map((msg, i) => (
            <div
              key={i}
              className="flex items-center rounded-md border px-3 py-2 text-sm"
            >
              {msg}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  ),
}

