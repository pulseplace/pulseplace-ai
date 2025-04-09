
# PulsePlace Brand Guidelines

## Overview

This document provides comprehensive guidelines for using the PulsePlace brand elements consistently across all products and marketing materials. Our brand system is built on the principles of trust, innovation, and well-being.

## Brand Colors

### Primary Colors

| Name | Hex | Tailwind Class | Usage |
|------|-----|---------------|-------|
| Soulful Midnight | #1A1A2E | bg-soulful-midnight, text-soulful-midnight | Primary brand color, headers, important UI elements |
| Pulse Blue | #3F8CFF | bg-pulse-blue, text-pulse-blue | Secondary brand color, buttons, links, highlights |
| Ember Coral | #FF566B | bg-ember-coral, text-ember-coral | Accent color, CTAs, emphasis |

### Background Colors

| Name | Hex | Tailwind Class | Usage |
|------|-----|---------------|-------|
| Soft Cloud | #F7F9FB | bg-soft-cloud | Light mode backgrounds, cards |
| Midnight Fog | #121417 | bg-midnight-fog | Dark mode backgrounds |

### Text Colors

| Name | Hex | Tailwind Class | Usage |
|------|-----|---------------|-------|
| Charcoal Ink | #202020 | text-charcoal-ink | Primary text in light mode |
| Grey Mist | #8A888A | text-grey-mist | Secondary/muted text |

### Functional Colors

| Name | Hex | Tailwind Class | Usage |
|------|-----|---------------|-------|
| Trust Mint | #32D27E | bg-trust-mint, text-trust-mint | Success states, positive feedback |

## Typography

### Font Families

- **Display/Headings**: Neue Haas Grotesk Display Pro
  - Tailwind class: `font-display`
  - Use for headings, prominent text

- **Body**: Inter
  - Tailwind class: `font-body` or `font-sans`
  - Use for body text, UI elements

### Type Scale

| Element | Tailwind Classes | Usage |
|---------|-----------------|-------|
| Heading 1 | text-5xl font-display font-bold | Main page headlines |
| Heading 2 | text-4xl font-display font-bold | Section headlines |
| Heading 3 | text-3xl font-display font-semibold | Sub-section headlines |
| Heading 4 | text-2xl font-display font-medium | Minor section headlines |
| Paragraph | text-base font-body | Standard body text |
| Small/Caption | text-sm font-body text-text-muted | Supporting text, captions |

### Letter Spacing

- Standard: `tracking-normal`
- Wide: `tracking-wider` (0.05em)
- Widest: `tracking-widest` (0.1em)
- Uppercase headlines: `uppercase tracking-wider`

## UI Components

### Buttons

| Type | Tailwind Component | Usage |
|------|-------------------|-------|
| Primary | `<Button variant="default">Text</Button>` | Main actions |
| Secondary | `<Button variant="secondary">Text</Button>` | Alternative actions |
| Outline | `<Button variant="outline">Text</Button>` | Tertiary actions |
| Accent | `<Button variant="accent">Text</Button>` | Emphasized actions |
| Success | `<Button variant="success">Text</Button>` | Confirmation actions |
| Ghost | `<Button variant="ghost">Text</Button>` | Subtle actions |

### Badges

| Type | Tailwind Component | Usage |
|------|-------------------|-------|
| Default | `<Badge>Text</Badge>` | Standard badge |
| Secondary | `<Badge variant="secondary">Text</Badge>` | Alternative styling |
| Success | `<Badge variant="success">Text</Badge>` | Positive status |
| Certified | `<Badge variant="certified">Certified</Badge>` | Certification status |

### Alerts

```jsx
<Alert className="bg-secondary/10 border-secondary/30 text-secondary">
  <Info className="h-4 w-4" />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    Alert content
  </AlertDescription>
</Alert>
```

Color variations:
- Information: `bg-secondary/10 border-secondary/30 text-secondary`
- Success: `bg-success/10 border-success/30 text-success`
- Warning: `bg-accent/10 border-accent/30 text-accent`
- Error: `bg-destructive/10 border-destructive/30 text-destructive`

## Gradients

| Name | Tailwind Class | CSS Value | Usage |
|------|---------------|-----------|-------|
| Pulse Gradient | bg-pulse-gradient | linear-gradient(135deg, #3F8CFF 0%, #1A1A2E 100%) | Feature sections, CTAs |
| Teal Gradient | bg-teal-gradient | linear-gradient(135deg, #32D27E 0%, #1A1A2E 100%) | Success sections |

## Logo Usage

### Clear Space

Maintain padding equal to the height of the "P" in the logo around all sides.

### Minimum Size

- Digital: 24px height minimum
- Print: 0.5" / 12.7mm height minimum

### Don'ts

- Don't stretch or distort the logo
- Don't change the logo colors
- Don't place the logo on busy backgrounds
- Don't add effects or shadows to the logo

## Implementation Tips

### CSS Variables

When implementing the design system, use CSS variables for colors and other values that might change in the future:

```css
:root {
  --color-primary: #1A1A2E;
  --color-secondary: #3F8CFF;
  --color-accent: #FF566B;
  /* etc. */
}
```

### Responsive Design

All UI components should be designed with responsiveness in mind. Use the built-in Tailwind breakpoints:

- sm: 640px and up
- md: 768px and up
- lg: 1024px and up
- xl: 1280px and up
- 2xl: 1536px and up

### Accessibility

Ensure all color combinations meet WCAG 2.1 AA standards for contrast. Text should be legible on all backgrounds, and interactive elements should be clearly distinguishable.

## Contact

For questions about these brand guidelines or to request additional assets, please contact the design team at design@pulseplace.ai.
