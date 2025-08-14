# Overview

This is a Portuguese amigurumi pricing calculator application that helps artisans calculate the optimal selling price for their handmade products. The app features a sophisticated pricing algorithm that considers materials costs, labor hours, difficulty levels, platform fees, taxes, and desired profit margins. It includes preset management functionality and provides multiple pricing tiers (minimum, recommended, premium) with psychological pricing support.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui component system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React hooks for local state, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation
- **Design System**: Custom dark theme with gradient cards and professional styling

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for preset CRUD operations
- **Data Storage**: In-memory storage (MemStorage class) with interface for future database integration
- **Validation**: Zod schemas for request/response validation
- **Development**: Hot reload with Vite integration in development mode

## Data Storage
- **Current Implementation**: In-memory Map-based storage for calculator presets
- **Database Ready**: Drizzle ORM configured for PostgreSQL with migration support
- **Schema**: Calculator presets table with fields for all pricing parameters
- **Connection**: Neon Database serverless PostgreSQL configured but not actively used

## Pricing Calculation Engine
- **Core Algorithm**: Multi-factor pricing calculation considering:
  - Material costs (threads, accessories, stuffing, packaging)
  - Labor calculation (hours × hourly rate)
  - Difficulty multiplier percentage
  - Overhead costs and operational expenses
  - Platform fees and tax gross-up calculations
  - Profit margin application
- **Psychological Pricing**: Optional rounding to .90 endings
- **Multiple Tiers**: Generates minimum, recommended, and premium price points
- **Discount Support**: Built-in discount calculation for promotional pricing

## Form Management
- **Size Presets**: Predefined P/M/G sizes with automatic parameter population
- **Real-time Calculation**: Immediate price updates as parameters change
- **Validation**: Comprehensive form validation with error handling
- **Preset System**: Save and load frequently used configurations

## Component Architecture
- **Modular Design**: Separated form inputs and results display
- **Reusable Components**: Consistent UI components across the application
- **Responsive Layout**: Mobile-first design with adaptive grid layouts
- **Accessibility**: ARIA labels and keyboard navigation support

# External Dependencies

## Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing solution
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Zod integration for form validation

## UI and Styling
- **@radix-ui/***: Complete set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **clsx**: Conditional className utility
- **lucide-react**: Modern icon library

## Database and Validation
- **drizzle-orm**: Type-safe SQL ORM
- **drizzle-zod**: Zod schema generation from Drizzle schemas
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **zod**: Runtime type validation and schema definition

## Development Tools
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: JavaScript bundler for production builds
- **@replit/vite-plugin-***: Replit-specific development enhancements

## Utility Libraries
- **date-fns**: Date manipulation and formatting
- **nanoid**: URL-safe unique ID generation
- **cmdk**: Command menu component
- **embla-carousel-react**: Touch-friendly carousel component