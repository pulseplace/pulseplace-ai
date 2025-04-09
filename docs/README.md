
# PulsePlace Design System

This repository contains the design system for PulsePlace, including color system, typography, UI components, and usage guidelines.

## Getting Started

To view the design system, navigate to `/brand-system` in the application.

## Color System

PulsePlace uses a carefully crafted color palette that conveys trust, innovation, and wellbeing:

- **Primary Colors**
  - Soulful Midnight (#1A1A2E) - Primary brand color
  - Pulse Blue (#3F8CFF) - Secondary brand color
  - Ember Coral (#FF566B) - Accent color

- **Background Colors**
  - Soft Cloud (#F7F9FB) - Light mode background
  - Midnight Fog (#121417) - Dark mode background

- **Text Colors**
  - Charcoal Ink (#202020) - Primary text color
  - Grey Mist (#8A888A) - Secondary/muted text

- **Functional Colors**
  - Trust Mint (#32D27E) - Success states

## Typography

Our typography system uses two main font families:

- **Neue Haas Grotesk Display Pro** - For headlines and important text (`font-display`)
- **Inter** - For body text and UI elements (`font-body` or `font-sans`)

## Components

The design system includes a set of reusable UI components built with Tailwind CSS and shadcn/ui:

- Buttons
- Badges
- Alerts
- Form elements
- Cards
- And more

## Usage

### Colors

```jsx
<div className="bg-soulful-midnight text-white">
  Primary background
</div>

<div className="bg-pulse-blue text-white">
  Secondary background
</div>

<p className="text-charcoal-ink">
  Primary text
</p>

<p className="text-grey-mist">
  Secondary text
</p>
```

### Typography

```jsx
<h1 className="text-5xl font-display font-bold">
  Main Headline
</h1>

<h2 className="text-4xl font-display font-bold">
  Section Headline
</h2>

<p className="text-base font-body">
  Regular paragraph text.
</p>

<p className="text-sm font-body text-text-muted">
  Small text or caption
</p>
```

### Buttons

```jsx
<Button variant="default">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="accent">Accent Button</Button>
<Button variant="success">Success Button</Button>
```

### Badges

```jsx
<Badge>Default Badge</Badge>
<Badge variant="secondary">Secondary Badge</Badge>
<Badge variant="success">Success Badge</Badge>
<Badge variant="certified">Certified</Badge>
```

## Documentation

For more detailed information, refer to the full brand guidelines in `/docs/BrandGuidelines.md`.

## Maintaining the Design System

When adding new components or modifying existing ones:

1. Ensure they follow the established color system
2. Use the appropriate typography scales
3. Maintain consistency with existing components
4. Document any new variants or usage guidelines
5. Test for responsiveness and accessibility

## Contact

For questions or suggestions about the design system, please contact the design team at design@pulseplace.ai.
