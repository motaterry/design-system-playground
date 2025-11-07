import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Design System Playground
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              A comprehensive design system built with Next.js, shadcn/ui, and Tailwind CSS.
              Matching the Radix Themes Figma UI Kit.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/preview">View Settings Demo</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/token-generator">Generate Design Tokens</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href="http://localhost:6006"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Storybook
              </a>
            </Button>
          </div>

          <div className="grid w-full max-w-5xl gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>🎨 Design Tokens</CardTitle>
                <CardDescription>
                  CSS variables mapped to Figma design tokens
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Centralized color, radius, and spacing tokens that sync with your
                Figma designs.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🧩 Components</CardTitle>
                <CardDescription>
                  Built with shadcn/ui and Radix primitives
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                13+ components ready to use: Button, Input, Card, Dialog, Table,
                and more.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📚 Storybook</CardTitle>
                <CardDescription>
                  Comprehensive component documentation
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Interactive stories for every component with variants, states, and
                examples.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🌓 Dark Mode</CardTitle>
                <CardDescription>Built-in theme support</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Seamless light and dark mode with CSS variables and Tailwind
                utilities.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>⚡ Type Safe</CardTitle>
                <CardDescription>Full TypeScript support</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Strict type checking with pre-commit hooks and CI validation.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🚀 Production Ready</CardTitle>
                <CardDescription>Optimized for deployment</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Vercel-ready configuration with GitHub Actions CI/CD pipeline.
              </CardContent>
            </Card>
          </div>

          <div className="pt-8">
            <p className="text-sm text-muted-foreground">
              Based on the{" "}
              <a
                href="https://www.figma.com/community/file/1295178911782127106"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
              >
                Radix Themes Figma UI Kit
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
