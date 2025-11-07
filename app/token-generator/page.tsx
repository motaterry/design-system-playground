"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Utility functions for color conversion
const hslToHex = (hsl: string): string => {
  try {
    const parts = hsl.trim().split(/\s+/)
    if (parts.length !== 3) return "#000000"
    
    const h = parseFloat(parts[0])
    const s = parseFloat(parts[1]) / 100
    const l = parseFloat(parts[2]) / 100

    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = l - c / 2

    let r = 0, g = 0, b = 0

    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; b = x
    }

    const toHex = (n: number) => {
      const hex = Math.round((n + m) * 255).toString(16)
      return hex.length === 1 ? "0" + hex : hex
    }

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  } catch {
    return "#000000"
  }
}

const hexToHsl = (hex: string): string => {
  try {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6
          break
        case g:
          h = ((b - r) / d + 2) / 6
          break
        case b:
          h = ((r - g) / d + 4) / 6
          break
      }
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
  } catch {
    return "0 0% 0%"
  }
}

interface DesignTokens {
  // Light theme colors (HSL format)
  light: {
    bg: string
    bgSubtle: string
    card: string
    border: string
    ring: string
    text: string
    textMuted: string
    primary: string
    primaryForeground: string
    accent: string
    accentForeground: string
    success: string
    warning: string
    danger: string
    info: string
  }
  // Dark theme colors
  dark: {
    bg: string
    bgSubtle: string
    card: string
    border: string
    ring: string
    text: string
    textMuted: string
    primary: string
    primaryForeground: string
    accent: string
    accentForeground: string
    success: string
    warning: string
    danger: string
    info: string
  }
  // Radius tokens
  radius: {
    sm: string
    md: string
    lg: string
  }
  // Project metadata
  project: {
    name: string
    description: string
  }
}

const defaultTokens: DesignTokens = {
  light: {
    bg: "0 0% 100%",
    bgSubtle: "0 0% 98%",
    card: "0 0% 100%",
    border: "0 0% 90%",
    ring: "217 91% 60%",
    text: "0 0% 0%",
    textMuted: "240 4% 46%",
    primary: "240 6% 10%",
    primaryForeground: "0 0% 98%",
    accent: "240 5% 96%",
    accentForeground: "240 6% 10%",
    success: "142 76% 45%",
    warning: "45 93% 47%",
    danger: "0 84% 60%",
    info: "217 91% 60%",
  },
  dark: {
    bg: "240 6% 4%",
    bgSubtle: "240 6% 10%",
    card: "240 6% 10%",
    border: "0 0% 40%",
    ring: "217 91% 68%",
    text: "0 0% 100%",
    textMuted: "240 5% 65%",
    primary: "0 0% 98%",
    primaryForeground: "240 6% 10%",
    accent: "240 4% 16%",
    accentForeground: "0 0% 98%",
    success: "142 76% 45%",
    warning: "45 93% 47%",
    danger: "0 84% 60%",
    info: "217 91% 68%",
  },
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
  },
  project: {
    name: "",
    description: "",
  },
}

export default function TokenGeneratorPage() {
  const [tokens, setTokens] = useState<DesignTokens>(defaultTokens)
  const [preview, setPreview] = useState<string>("")

  const generateCSS = (tokens: DesignTokens): string => {
    return `@import "tailwindcss";

:root {
  /* Design Tokens - Light Theme (HSL format: hue saturation% lightness%) */
  --color-bg: ${tokens.light.bg};
  --color-bg-subtle: ${tokens.light.bgSubtle};
  --color-card: ${tokens.light.card};
  --color-border: ${tokens.light.border};
  --color-ring: ${tokens.light.ring};
  --color-text: ${tokens.light.text};
  --color-text-muted: ${tokens.light.textMuted};
  --color-primary: ${tokens.light.primary};
  --color-primary-foreground: ${tokens.light.primaryForeground};
  --color-accent: ${tokens.light.accent};
  --color-accent-foreground: ${tokens.light.accentForeground};
  --color-success: ${tokens.light.success};
  --color-warning: ${tokens.light.warning};
  --color-danger: ${tokens.light.danger};
  --color-info: ${tokens.light.info};
  
  /* Radius Tokens */
  --radius-sm: ${tokens.radius.sm};
  --radius-md: ${tokens.radius.md};
  --radius-lg: ${tokens.radius.lg};
  
  /* Shadow Tokens */
  --shadow-surface: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  --shadow-focus: 0 0 0 2px rgb(59 130 246 / 0.5);

  /* shadcn/ui compatibility */
  --background: ${tokens.light.bg};
  --foreground: ${tokens.light.text};
  --card-bg: ${tokens.light.card};
  --card-foreground: ${tokens.light.text};
  --popover: ${tokens.light.bg};
  --popover-foreground: ${tokens.light.text};
  --primary-base: ${tokens.light.primary};
  --primary-fg: ${tokens.light.primaryForeground};
  --secondary: ${tokens.light.accent};
  --secondary-foreground: ${tokens.light.accentForeground};
  --muted: ${tokens.light.bgSubtle};
  --muted-foreground: ${tokens.light.textMuted};
  --accent-base: ${tokens.light.accent};
  --accent-fg: ${tokens.light.accentForeground};
  --destructive: ${tokens.light.danger};
  --destructive-foreground: ${tokens.light.primaryForeground};
  --border-base: ${tokens.light.border};
  --input: ${tokens.light.border};
  --ring-base: ${tokens.light.ring};
  --radius: ${tokens.radius.md};
}

.dark {
  /* Design Tokens - Dark Theme (HSL format: hue saturation% lightness%) */
  --color-bg: ${tokens.dark.bg};
  --color-bg-subtle: ${tokens.dark.bgSubtle};
  --color-card: ${tokens.dark.card};
  --color-border: ${tokens.dark.border};
  --color-ring: ${tokens.dark.ring};
  --color-text: ${tokens.dark.text};
  --color-text-muted: ${tokens.dark.textMuted};
  --color-primary: ${tokens.dark.primary};
  --color-primary-foreground: ${tokens.dark.primaryForeground};
  --color-accent: ${tokens.dark.accent};
  --color-accent-foreground: ${tokens.dark.accentForeground};
  --color-success: ${tokens.dark.success};
  --color-warning: ${tokens.dark.warning};
  --color-danger: ${tokens.dark.danger};
  --color-info: ${tokens.dark.info};

  /* shadcn/ui compatibility */
  --background: ${tokens.dark.bg};
  --foreground: ${tokens.dark.text};
  --card-bg: ${tokens.dark.card};
  --card-foreground: ${tokens.dark.text};
  --popover: ${tokens.dark.bg};
  --popover-foreground: ${tokens.dark.text};
  --primary-base: ${tokens.dark.primary};
  --primary-fg: ${tokens.dark.primaryForeground};
  --secondary: ${tokens.dark.accent};
  --secondary-foreground: ${tokens.dark.accentForeground};
  --muted: ${tokens.dark.bgSubtle};
  --muted-foreground: ${tokens.dark.textMuted};
  --accent-base: ${tokens.dark.accent};
  --accent-fg: ${tokens.dark.accentForeground};
  --destructive: ${tokens.dark.danger};
  --destructive-foreground: ${tokens.dark.primaryForeground};
  --border-base: ${tokens.dark.border};
  --input: ${tokens.dark.border};
  --ring-base: ${tokens.dark.ring};
}

@theme inline {
  /* Map CSS variables to Tailwind theme - Use HSL format */
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  
  /* shadcn/ui theme tokens */
  --color-card: hsl(var(--card-bg));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary-base));
  --color-primary-foreground: hsl(var(--primary-fg));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent-base));
  --color-accent-foreground: hsl(var(--accent-fg));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border-base));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring-base));
  
  /* Custom design tokens */
  --color-bg-custom: hsl(var(--color-bg));
  --color-bg-subtle: hsl(var(--color-bg-subtle));
  --color-text-custom: hsl(var(--color-text));
  --color-text-muted-custom: hsl(var(--color-text-muted));
  --color-success: hsl(var(--color-success));
  --color-warning: hsl(var(--color-warning));
  --color-danger: hsl(var(--color-danger));
  --color-info-custom: hsl(var(--color-info));
  
  /* Border radius tokens */
  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
  --radius-default: var(--radius);
}

body {
  background: var(--background);
  color: var(--foreground);
}
`
  }

  const generateJSON = (tokens: DesignTokens): string => {
    return JSON.stringify(
      {
        project: tokens.project,
        tokens: {
          light: tokens.light,
          dark: tokens.dark,
          radius: tokens.radius,
        },
        generatedAt: new Date().toISOString(),
      },
      null,
      2
    )
  }

  const generateMarkdown = (tokens: DesignTokens): string => {
    return `# ${tokens.project.name || "Design System"} Project Document

${tokens.project.description || "Generated design system configuration"}

## Design Tokens

### Light Theme Colors (HSL)

- Background: \`${tokens.light.bg}\`
- Background Subtle: \`${tokens.light.bgSubtle}\`
- Card: \`${tokens.light.card}\`
- Border: \`${tokens.light.border}\`
- Ring: \`${tokens.light.ring}\`
- Text: \`${tokens.light.text}\`
- Text Muted: \`${tokens.light.textMuted}\`
- Primary: \`${tokens.light.primary}\`
- Primary Foreground: \`${tokens.light.primaryForeground}\`
- Accent: \`${tokens.light.accent}\`
- Accent Foreground: \`${tokens.light.accentForeground}\`
- Success: \`${tokens.light.success}\`
- Warning: \`${tokens.light.warning}\`
- Danger: \`${tokens.light.danger}\`
- Info: \`${tokens.light.info}\`

### Dark Theme Colors (HSL)

- Background: \`${tokens.dark.bg}\`
- Background Subtle: \`${tokens.dark.bgSubtle}\`
- Card: \`${tokens.dark.card}\`
- Border: \`${tokens.dark.border}\`
- Ring: \`${tokens.dark.ring}\`
- Text: \`${tokens.dark.text}\`
- Text Muted: \`${tokens.dark.textMuted}\`
- Primary: \`${tokens.dark.primary}\`
- Primary Foreground: \`${tokens.dark.primaryForeground}\`
- Accent: \`${tokens.dark.accent}\`
- Accent Foreground: \`${tokens.dark.accentForeground}\`
- Success: \`${tokens.dark.success}\`
- Warning: \`${tokens.dark.warning}\`
- Danger: \`${tokens.dark.danger}\`
- Info: \`${tokens.dark.info}\`

### Radius Tokens

- Small: \`${tokens.radius.sm}\`
- Medium: \`${tokens.radius.md}\`
- Large: \`${tokens.radius.lg}\`

## Usage

1. Copy the generated CSS to your \`globals.css\` file
2. Use the JSON config for programmatic access
3. Reference this document when building your UI components

Generated on: ${new Date().toLocaleString()}
`
  }

  const handleDownload = (format: "css" | "json" | "md") => {
    let content = ""
    let filename = ""
    let mimeType = ""

    switch (format) {
      case "css":
        content = generateCSS(tokens)
        filename = `${tokens.project.name || "design-system"}-tokens.css`
        mimeType = "text/css"
        break
      case "json":
        content = generateJSON(tokens)
        filename = `${tokens.project.name || "design-system"}-tokens.json`
        mimeType = "application/json"
        break
      case "md":
        content = generateMarkdown(tokens)
        filename = `${tokens.project.name || "design-system"}-document.md`
        mimeType = "text/markdown"
        break
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const updatePreview = () => {
    setPreview(generateCSS(tokens))
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 space-y-2">
          <h1 className="text-4xl font-bold">Design Token Generator</h1>
          <p className="text-muted-foreground">
            Fill in your design tokens to generate a project document for your branded UI
          </p>
        </div>

        <Tabs defaultValue="project" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="project">Project Info</TabsTrigger>
            <TabsTrigger value="light">Light Theme</TabsTrigger>
            <TabsTrigger value="dark">Dark Theme</TabsTrigger>
            <TabsTrigger value="radius">Radius</TabsTrigger>
            <TabsTrigger value="preview">Preview & Download</TabsTrigger>
          </TabsList>

          <TabsContent value="project" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
                <CardDescription>Basic information about your project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="My Branded UI"
                    value={tokens.project.name}
                    onChange={(e) =>
                      setTokens({
                        ...tokens,
                        project: { ...tokens.project, name: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-description">Description</Label>
                  <Input
                    id="project-description"
                    placeholder="A beautiful design system for..."
                    value={tokens.project.description}
                    onChange={(e) =>
                      setTokens({
                        ...tokens,
                        project: { ...tokens.project, description: e.target.value },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="light" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Light Theme Colors</CardTitle>
                <CardDescription>
                  Use the color picker or enter HSL values in format: hue saturation% lightness% (e.g., &quot;240 6% 10%&quot;)
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {Object.entries(tokens.light).map(([key, value]) => {
                  const hexValue = hslToHex(value)
                  return (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={`light-${key}`}>
                        {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                      </Label>
                      <div className="flex gap-2">
                        <div className="relative flex-shrink-0">
                          <input
                            type="color"
                            value={hexValue}
                            onChange={(e) => {
                              const newHsl = hexToHsl(e.target.value)
                              setTokens({
                                ...tokens,
                                light: { ...tokens.light, [key]: newHsl },
                              })
                            }}
                            className="h-10 w-16 cursor-pointer rounded-md border border-input bg-background"
                            title="Color picker"
                          />
                        </div>
                        <Input
                          id={`light-${key}`}
                          value={value}
                          onChange={(e) =>
                            setTokens({
                              ...tokens,
                              light: { ...tokens.light, [key]: e.target.value },
                            })
                          }
                          className="flex-1"
                        />
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dark" className="space-y-4">
            <div className="dark">
              <Card>
                <CardHeader>
                  <CardTitle>Dark Theme Colors</CardTitle>
                  <CardDescription>
                    Use the color picker or enter HSL values in format: hue saturation% lightness% (e.g., &quot;240 6% 4%&quot;)
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  {Object.entries(tokens.dark).map(([key, value]) => {
                    const hexValue = hslToHex(value)
                    return (
                      <div key={key} className="space-y-2">
                        <Label htmlFor={`dark-${key}`}>
                          {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                        </Label>
                        <div className="flex gap-2">
                          <div className="relative flex-shrink-0">
                            <input
                              type="color"
                              value={hexValue}
                              onChange={(e) => {
                                const newHsl = hexToHsl(e.target.value)
                                setTokens({
                                  ...tokens,
                                  dark: { ...tokens.dark, [key]: newHsl },
                                })
                              }}
                              className="h-10 w-16 cursor-pointer rounded-md border border-input bg-background"
                              title="Color picker"
                            />
                          </div>
                          <Input
                            id={`dark-${key}`}
                            value={value}
                            onChange={(e) =>
                              setTokens({
                                ...tokens,
                                dark: { ...tokens.dark, [key]: e.target.value },
                              })
                            }
                            className="flex-1"
                          />
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="radius" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Border Radius Tokens</CardTitle>
                <CardDescription>Enter values in rem (e.g., &quot;0.5rem&quot;)</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                {Object.entries(tokens.radius).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={`radius-${key}`}>
                      {key.toUpperCase()} ({key === "sm" ? "Small" : key === "md" ? "Medium" : "Large"})
                    </Label>
                    <Input
                      id={`radius-${key}`}
                      value={value}
                      onChange={(e) =>
                        setTokens({
                          ...tokens,
                          radius: { ...tokens.radius, [key]: e.target.value },
                        })
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Preview & Download</CardTitle>
                <CardDescription>Review your generated CSS and download project files</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button onClick={updatePreview}>Generate Preview</Button>
                  <Button variant="outline" onClick={() => handleDownload("css")}>
                    Download CSS
                  </Button>
                  <Button variant="outline" onClick={() => handleDownload("json")}>
                    Download JSON
                  </Button>
                  <Button variant="outline" onClick={() => handleDownload("md")}>
                    Download Markdown
                  </Button>
                </div>
                {preview && (
                  <div className="rounded-md border bg-muted p-4">
                    <pre className="overflow-auto text-xs">
                      <code>{preview}</code>
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

