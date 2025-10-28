import type { Preview } from '@storybook/react'
import React from 'react'
import '../app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light'
      
      React.useEffect(() => {
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
      }, [theme])

      return (
        <div className={theme}>
          <div className="bg-background text-foreground min-h-screen p-8">
            <Story />
          </div>
        </div>
      )
    },
  ],
}

export default preview

