import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const meta = {
  title: 'Components/Toast',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
        })
      }
    >
      Show Toast
    </Button>
  ),
}

export const Success: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.success('Success!', {
          description: 'Your changes have been saved.',
        })
      }
    >
      Show Success Toast
    </Button>
  ),
}

export const Error: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.error('Error!', {
          description: 'Something went wrong. Please try again.',
        })
      }
    >
      Show Error Toast
    </Button>
  ),
}

export const Warning: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.warning('Warning!', {
          description: 'Please check your input and try again.',
        })
      }
    >
      Show Warning Toast
    </Button>
  ),
}

export const Info: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.info('Info', {
          description: 'This is an informational message.',
        })
      }
    >
      Show Info Toast
    </Button>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
          action: {
            label: 'Undo',
            onClick: () => toast('Undo action triggered'),
          },
        })
      }
    >
      Show Toast with Action
    </Button>
  ),
}

export const PromiseExample: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        const promise = (): Promise<{ name: string }> =>
          new Promise((resolve) => setTimeout(() => resolve({ name: 'Data' }), 2000))

        toast.promise(promise(), {
          loading: 'Loading...',
          success: (data) => {
            return `${data.name} has been loaded`
          },
          error: 'Error loading data',
        })
      }}
    >
      Show Promise Toast
    </Button>
  ),
}

