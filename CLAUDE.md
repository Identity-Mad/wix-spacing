# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Wix Spacing Simulator - an interactive React application for previewing and configuring spacing and typography settings based on an 8pt grid system. The app allows designers and developers to visualize how different spacing values affect layout across desktop, tablet, and mobile breakpoints.

## Development Commands

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with PostCSS
- **Icons**: Lucide React
- **Backend**: Supabase (configured but not actively used in current implementation)
- **Linting**: ESLint with TypeScript and React-specific rules

## Architecture

### Core Application Structure

- **Single-page application** with tabbed interface for different breakpoint previews
- **State management** using React hooks (useState, useEffect) with localStorage persistence
- **Component structure**: Main App component with nested PreviewSection component for rendering breakpoint-specific previews

### Key Data Structures

1. **SpacingValues**: Comprehensive spacing configuration object with nested breakpoint-specific values (desktop/tablet/mobile)
2. **TypographySettings**: Typography configuration including font families, sizes, line heights, letter spacing, and font weights
3. **spacingLabels**: Human-readable labels mapping to spacing property keys

### Configuration System

- Settings are automatically saved to localStorage on changes
- Default configurations provided for both spacing and typography
- 8pt grid system validation with visual feedback for non-conforming values
- Export functionality for configuration backup/sharing

## File Structure

- `src/App.tsx` - Main application component containing all logic and UI
- `src/main.tsx` - React application entry point
- `src/index.css` - Global styles and Tailwind imports
- `vite.config.ts` - Vite configuration with React plugin and lucide-react optimization
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.js` - ESLint configuration with TypeScript and React rules

## Key Features

1. **Multi-breakpoint preview system** with visual layout examples
2. **Real-time spacing and typography editing** with immediate visual feedback  
3. **8pt grid compliance checking** with visual indicators for non-conforming values
4. **localStorage persistence** for settings across browser sessions
5. **Settings export/import** functionality for sharing configurations
6. **Comprehensive preview layouts** including sections, grids, and typography examples

## Development Notes

- The application uses inline styles for dynamic spacing values rather than CSS classes
- Breakpoint-specific logic is handled through conditional rendering and styling
- All spacing inputs include step="8" for 8pt grid alignment guidance
- Typography preview is integrated into the spacing preview system
- Mobile layouts automatically stack columns and adjust grid behaviors