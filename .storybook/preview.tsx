import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "../components/ui/sonner";
import { TooltipProvider } from "../components/ui/tooltip";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true, // We're using our own background
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground p-8">
            <Story />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    ),
  ],
};

export default preview;
