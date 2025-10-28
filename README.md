# Design System Playground

A comprehensive design system playground built with Next.js, shadcn/ui, and Tailwind CSS, matching the [Radix Themes Figma UI Kit](https://www.figma.com/community/file/1295178911782127106).

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the Next.js app.

Visit [http://localhost:3000/preview](http://localhost:3000/preview) to see the Settings demo page.

## 📚 Storybook

This project includes comprehensive Storybook documentation for all components.

```bash
# Start Storybook
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to view Storybook.

### Building Storybook

```bash
# Build static Storybook
npm run build-storybook
```

The static files will be generated in `storybook-static/`.

## 🎨 Design System

### Design Tokens

This design system uses CSS variables that map directly to Figma variables, ensuring consistency between design and code.

#### Color Tokens

- `--color-bg`: Main background color
- `--color-bg-subtle`: Subtle background for sections
- `--color-card`: Card background
- `--color-border`: Border color
- `--color-text`: Primary text color
- `--color-text-muted`: Secondary text color
- `--color-primary`: Primary brand color
- `--color-accent`: Accent color
- `--color-success`: Success state
- `--color-warning`: Warning state
- `--color-danger`: Danger/error state
- `--color-info`: Info state

#### Radius Tokens

- `--radius-sm`: 0.375rem
- `--radius-md`: 0.5rem
- `--radius-lg`: 0.75rem

### Mapping Figma Variables to Code

1. **In Figma**: Export your design tokens from the Radix Themes Figma kit
2. **In Code**: Update CSS variables in `app/globals.css`

```css
:root {
  --color-primary: 24 24 27;  /* Update with your Figma token */
  --radius-md: 0.5rem;
}
```

3. **Reference in Tailwind**: Use in your components via Tailwind utilities

```tsx
<div className="bg-primary text-primary-foreground rounded-md">
  Content
</div>
```

The Tailwind configuration (`tailwind.config.ts` via the `@theme inline` block in `globals.css`) automatically maps these CSS variables to Tailwind utilities.

## 🧩 Components

All components are built with [shadcn/ui](https://ui.shadcn.com/), which uses Radix UI primitives.

### Available Components

- Button
- Input
- Label
- Card
- Select
- Tabs
- Switch
- Dialog
- Dropdown Menu
- Table
- Tooltip
- Sheet
- Toast (Sonner)

### Adding New Components

```bash
# Add a new shadcn/ui component
npx shadcn@latest add [component-name]

# Example: Add the avatar component
npx shadcn@latest add avatar
```

This will:
1. Install the necessary dependencies
2. Create the component file in `components/ui/`
3. You can then import and use it in your app

### Creating Storybook Stories

After adding a new component, create a story file:

```tsx
// stories/ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentName } from '@/components/ui/component-name'

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentName>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // component props
  },
}
```

## 📜 Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build Next.js for production
- `npm run start` - Start Next.js production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check
- `npm run storybook` - Start Storybook dev server
- `npm run build-storybook` - Build static Storybook

## 🏗️ Project Structure

```
design-system-playground/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── preview/           # Preview/demo pages
│       └── page.tsx       # Settings page demo
├── components/
│   └── ui/                # shadcn/ui components
├── lib/
│   └── utils.ts           # Utility functions (cn)
├── stories/               # Storybook stories
│   ├── Introduction.mdx   # Documentation
│   ├── Button.stories.tsx
│   ├── Input.stories.tsx
│   └── ...
├── .storybook/            # Storybook configuration
├── .github/
│   └── workflows/
│       └── ci.yml         # GitHub Actions CI
├── .husky/                # Git hooks
│   └── pre-commit         # Pre-commit hook
└── components.json        # shadcn/ui configuration
```

## 🚢 Deployment

### Deploying to Vercel

This project is optimized for deployment on Vercel:

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository

2. **Configure Project**
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `npm run build` (auto-configured)
   - Output Directory: `.next` (auto-configured)

3. **Deploy**
   - Click "Deploy"
   - Your site will be live in minutes!

### Environment Variables

No environment variables are required for this static design system playground.

### Automatic Deployments

Once connected to Vercel:
- Every push to `main` branch triggers a production deployment
- Every pull request gets a preview deployment

### Deploy Storybook

To deploy Storybook separately:

```bash
# Build static Storybook
npm run build-storybook

# Deploy the storybook-static folder to your hosting provider
```

## 🔧 Development Workflow

### Git Hooks

This project uses Husky to run checks before commits:

- **Pre-commit**: Runs ESLint and TypeScript type checking
- If checks fail, the commit is blocked

### Continuous Integration

GitHub Actions runs on every pull request:
- Lint check
- Type check
- Build verification
- Storybook build

## 🎨 Theming

### Light & Dark Mode

The design system supports light and dark themes out of the box.

In Storybook, use the theme toggle in the toolbar.

To implement theme switching in your Next.js app:

```tsx
// Add theme provider and toggle button
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState('light')
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  )
}
```

### Customizing the Theme

1. **Colors**: Update CSS variables in `app/globals.css`
2. **Radius**: Adjust `--radius-sm`, `--radius-md`, `--radius-lg`
3. **Spacing**: Use Tailwind's default spacing scale or customize in Tailwind config

## 📖 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Storybook Documentation](https://storybook.js.org/docs)
- [Radix Themes Figma Kit](https://www.figma.com/community/file/1295178911782127106)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all checks pass (`npm run lint`, `npm run type-check`)
4. Submit a pull request

## 📝 License

MIT
