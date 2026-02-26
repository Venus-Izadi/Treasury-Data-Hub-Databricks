/**
 * DATABANK DESIGN SYSTEM
 * ======================
 * 
 * This file documents all design tokens, colors, typography, and UI patterns
 * used in the Databank Treasury Dashboard. Use this as a reference when
 * building new components or extending the UI.
 * 
 * QUICK REFERENCE:
 * ----------------
 * - Colors: Use Tailwind classes like `bg-primary`, `text-status-green`, etc.
 * - Fonts: Inter (Google Font) - use `font-sans` class
 * - Border radius: Use `rounded-lg` (0.75rem default)
 * - Shadows: Cards use `border border-border`, no box-shadow
 */

// =============================================================================
// COLOR PALETTE
// =============================================================================

export const colors = {
  // Primary Brand Color (Green - used for positive states, CTAs, active nav)
  primary: {
    hsl: "152 55% 41%",  // #22c55e equivalent
    tailwind: "primary",
    usage: "Primary buttons, active states, positive metrics, success indicators",
  },

  // Background Colors
  background: {
    main: { hsl: "220 20% 97%", tailwind: "background", usage: "Page background" },
    card: { hsl: "0 0% 100%", tailwind: "card", usage: "Card backgrounds, sidebar" },
    muted: { hsl: "220 14% 96%", tailwind: "muted", usage: "Hover states, subtle backgrounds" },
  },

  // Text Colors
  text: {
    primary: { hsl: "220 20% 10%", tailwind: "foreground", usage: "Headings, primary text" },
    secondary: { hsl: "220 9% 46%", tailwind: "muted-foreground", usage: "Labels, secondary text" },
  },

  // Border Colors
  border: {
    default: { hsl: "220 13% 91%", tailwind: "border", usage: "Card borders, dividers" },
  },

  // Status Colors (for alerts, metrics, badges)
  status: {
    green: { hsl: "152 55% 41%", tailwind: "status-green", usage: "Positive, success, good metrics" },
    blue: { hsl: "217 91% 60%", tailwind: "status-blue", usage: "Informational, neutral alerts" },
    yellow: { hsl: "25 95% 53%", tailwind: "status-yellow", usage: "Warning, caution, needs attention" },
    red: { hsl: "0 84% 60%", tailwind: "status-red", usage: "Critical, error, action required" },
  },

  // Chart Colors (use these for data visualizations)
  chart: {
    primary: { hsl: "152 55% 41%", tailwind: "chart-1", usage: "Primary data series" },
    secondary: { hsl: "217 91% 60%", tailwind: "chart-2", usage: "Secondary data series" },
    tertiary: { hsl: "25 95% 53%", tailwind: "chart-3", usage: "Tertiary data series" },
    quaternary: { hsl: "263 70% 50%", tailwind: "chart-4", usage: "Fourth data series" },
    quinary: { hsl: "0 84% 60%", tailwind: "chart-5", usage: "Fifth data series" },
  },
} as const

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const typography = {
  fontFamily: {
    name: "Inter",
    source: "Google Fonts",
    variable: "--font-inter",
    tailwind: "font-sans",
  },

  // Font sizes and usage
  scale: {
    "2xl": { size: "1.5rem", weight: "700", usage: "Page titles (H1)" },
    "xl": { size: "1.25rem", weight: "600", usage: "Section headings" },
    "lg": { size: "1.125rem", weight: "600", usage: "Card titles" },
    "base": { size: "1rem", weight: "400", usage: "Body text, paragraphs" },
    "sm": { size: "0.875rem", weight: "400", usage: "Secondary text, descriptions" },
    "xs": { size: "0.75rem", weight: "500", usage: "Labels, badges, metadata" },
  },
} as const

// =============================================================================
// SPACING & LAYOUT
// =============================================================================

export const spacing = {
  // Standard padding/margin values
  page: { x: "2rem", y: "1.5rem", tailwind: "px-8 py-6" },
  card: { all: "1.25rem", tailwind: "p-5" },
  section: { gap: "1.25rem", tailwind: "space-y-5" },
  
  // Grid layouts
  grid: {
    metricsRow1: "grid grid-cols-1 md:grid-cols-3 gap-4",
    metricsRow2: "grid grid-cols-1 md:grid-cols-2 gap-4",
    threeColumn: "grid grid-cols-1 lg:grid-cols-3 gap-5",
  },
} as const

// =============================================================================
// COMPONENT PATTERNS
// =============================================================================

export const components = {
  // Metric Card (the colored-top-border cards)
  metricCard: {
    base: "bg-card rounded-lg border border-border overflow-hidden",
    borderColors: {
      positive: "hsl(152, 55%, 41%)",  // Green
      warning: "hsl(25, 95%, 53%)",    // Orange
      critical: "hsl(0, 84%, 60%)",    // Red
      info: "hsl(217, 91%, 60%)",      // Blue
    },
    example: `<div style={{ borderTop: "3px solid hsl(152, 55%, 41%)" }}>`,
  },

  // Insight/Alert Row
  alertRow: {
    base: "flex items-start gap-3 py-3 border-b border-border/50 last:border-0",
    severityBorder: "border-l-2", // + border color based on severity
    badge: "text-xs font-semibold px-2.5 py-1 rounded-md",
    badgeColors: {
      green: "bg-status-green/10 text-status-green border border-status-green/20",
      blue: "bg-status-blue/10 text-status-blue border border-status-blue/20",
      yellow: "bg-status-yellow/10 text-status-yellow border border-status-yellow/20",
      red: "bg-status-red/10 text-status-red border border-status-red/20",
    },
  },

  // Sidebar
  sidebar: {
    width: "240px",
    background: "bg-white border-r border-border",
    navItem: {
      base: "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
      active: "bg-primary/10 text-primary",
      inactive: "text-muted-foreground hover:bg-muted hover:text-foreground",
    },
  },

  // Header
  header: {
    base: "flex items-center justify-between px-8 py-5 border-b border-border bg-card",
    title: "text-2xl font-bold text-foreground",
    subtitle: "text-sm text-muted-foreground mt-0.5",
  },

  // Button variants
  button: {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-card border border-border text-foreground hover:bg-muted",
    ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
  },
} as const

// =============================================================================
// BRAND ASSETS
// =============================================================================

export const brand = {
  name: "Databank",
  tagline: "Treasury Hub",
  logo: {
    path: "/images/databank-logo.png",
    alt: "Databank Logo",
    width: 40,
    height: 40,
  },
} as const

// =============================================================================
// FILE LOCATIONS
// =============================================================================

export const fileLocations = {
  "Color Variables": "app/globals.css - CSS custom properties in :root",
  "Tailwind Config": "tailwind.config.ts - Tailwind color mappings",
  "Typography": "app/layout.tsx - Inter font setup",
  "Logo": "public/images/databank-logo.png",
  "Components": "components/dashboard/ - All dashboard components",
  "Types": "lib/types/dashboard.ts - TypeScript interfaces",
  "Data Service": "lib/services/dashboard-service.ts - API layer (mock)",
  "Hooks": "hooks/use-dashboard-data.ts - Data fetching hooks",
} as const
