"use client"

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { X, ArrowUp, ArrowDown, Minus } from "lucide-react"

export interface AutocompleteOption {
  label: string
  value: string
  metadata?: {
    trend?: "up" | "down" | "stable"
    change?: number
    [key: string]: unknown
  }
}

export interface AutocompleteInputProps {
  value: string
  onChange: (value: string) => void
  onSelect: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  placeholder?: string
  suggestions: string[] | AutocompleteOption[]
  className?: string
  disabled?: boolean
  showSuggestionsOnFocus?: boolean
  showMetrics?: boolean
  highlightMatch?: (text: string, query: string) => Array<{ text: string; highlight: boolean }>
}

export interface AutocompleteInputHandle {
  focus: () => void
  blur: () => void
}

const defaultHighlightMatch = (text: string, query: string): Array<{ text: string; highlight: boolean }> => {
  if (!query.trim()) {
    return [{ text, highlight: false }]
  }

  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase().trim()
  const index = lowerText.indexOf(lowerQuery)

  if (index === -1) {
    return [{ text, highlight: false }]
  }

  const segments: Array<{ text: string; highlight: boolean }> = []

  if (index > 0) {
    segments.push({ text: text.slice(0, index), highlight: false })
  }

  segments.push({ text: text.slice(index, index + query.length), highlight: true })

  if (index + query.length < text.length) {
    segments.push({ text: text.slice(index + query.length), highlight: false })
  }

  return segments
}

export const AutocompleteInput = forwardRef<AutocompleteInputHandle, AutocompleteInputProps>(
  (
    {
      value,
      onChange,
      onSelect,
      onFocus,
      onBlur,
      placeholder,
      suggestions,
      className,
      disabled = false,
      showSuggestionsOnFocus = true,
      showMetrics = false,
      highlightMatch = defaultHighlightMatch,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus()
      },
      blur: () => {
        inputRef.current?.blur()
      },
    }))

    const isAutocompleteOptions = suggestions.length > 0 && typeof suggestions[0] === "object" && "label" in suggestions[0]

    const filteredSuggestions = isAutocompleteOptions
      ? (suggestions as AutocompleteOption[]).filter((option) =>
          option.label.toLowerCase().includes(value.toLowerCase().trim())
        )
      : (suggestions as string[]).filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase().trim())
        )

    // Calculate showDropdown based on state (avoid useEffect for derived state)
    const showDropdown =
      isOpen && filteredSuggestions.length > 0 && (showSuggestionsOnFocus || value.trim().length > 0)

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false)
          setHighlightedIndex(-1)
        }
      }

      if (showDropdown) {
        document.addEventListener("mousedown", handleClickOutside)
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [showDropdown])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!showDropdown) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          setIsOpen(true)
          return
        }
        return
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setHighlightedIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev))
          break
        case "ArrowUp":
          e.preventDefault()
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1))
          break
        case "Enter":
          e.preventDefault()
          if (highlightedIndex >= 0 && highlightedIndex < filteredSuggestions.length) {
            const selected = filteredSuggestions[highlightedIndex]
            handleSelect(selected)
          } else if (filteredSuggestions.length === 1) {
            handleSelect(filteredSuggestions[0])
          }
          break
        case "Escape":
          setIsOpen(false)
          setHighlightedIndex(-1)
          inputRef.current?.blur()
          break
      }
    }

    const handleFocus = () => {
      setIsOpen(true)
      onFocus?.()
    }

    const handleBlur = () => {
      setTimeout(() => {
        setIsOpen(false)
        setHighlightedIndex(-1)
        onBlur?.()
      }, 200)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      onChange(newValue)
      setIsOpen(true)
      setHighlightedIndex(-1)
    }

    const handleSelect = (suggestion: string | AutocompleteOption) => {
      const selectedValue = typeof suggestion === "string" ? suggestion : suggestion.value || suggestion.label
      onSelect(selectedValue)
      setIsOpen(false)
      setHighlightedIndex(-1)
      inputRef.current?.blur()
    }

    const handleMouseEnter = (index: number) => {
      setHighlightedIndex(index)
    }

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      e.preventDefault()
      onChange("")
      setIsOpen(false)
      setHighlightedIndex(-1)
      inputRef.current?.focus()
    }

    return (
      <div ref={containerRef} className="relative flex-1">
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(className, value.trim() && "pr-10")}
        />
        {value.trim() && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            onMouseDown={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 z-10 pointer-events-auto rounded-sm"
            aria-label="Clear input"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-1 bg-popover shadow-xl border border-border max-h-60 overflow-y-auto rounded-md"
          >
            {filteredSuggestions.map((suggestion, index) => {
              const suggestionLabel = typeof suggestion === "string" ? suggestion : suggestion.label
              const segments = highlightMatch(suggestionLabel, value)
              const option = typeof suggestion === "object" ? suggestion : null

              return (
                <button
                  key={suggestionLabel}
                  type="button"
                  onClick={() => handleSelect(suggestion)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  className={cn(
                    "w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between gap-2",
                    "hover:bg-accent focus:bg-accent focus:outline-none",
                    highlightedIndex === index && "bg-accent"
                  )}
                >
                  <span className="flex-1">
                    {segments.map((segment, i) => (
                      <span
                        key={i}
                        className={cn(segment.highlight && "font-semibold text-primary")}
                      >
                        {segment.text}
                      </span>
                    ))}
                  </span>
                  {showMetrics && option?.metadata && (
                    <div className="flex items-center gap-1 text-xs font-medium flex-shrink-0">
                      {option.metadata.trend === "up" && option.metadata.change !== undefined && (
                        <span className="text-success flex items-center gap-0.5">
                          <ArrowUp className="h-3 w-3" />
                          <span>+{Math.abs(option.metadata.change).toFixed(1)}%</span>
                        </span>
                      )}
                      {option.metadata.trend === "down" && option.metadata.change !== undefined && (
                        <span className="text-destructive flex items-center gap-0.5">
                          <ArrowDown className="h-3 w-3" />
                          <span>{option.metadata.change.toFixed(1)}%</span>
                        </span>
                      )}
                      {option.metadata.trend === "stable" && option.metadata.change !== undefined && (
                        <span className="text-muted-foreground flex items-center gap-0.5">
                          <Minus className="h-3 w-3" />
                          <span>{option.metadata.change.toFixed(1)}%</span>
                        </span>
                      )}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    )
  }
)

AutocompleteInput.displayName = "AutocompleteInput"

