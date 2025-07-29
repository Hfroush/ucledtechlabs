# EduAccelerator - Startup Application Management System

## Overview

EduAccelerator is a full-stack web application for managing startup applications and interest registrations for an education technology accelerator program. The platform allows potential participants to apply to specific programs across different cities (London, Paris, Toronto, Dubai) and register interest for future cohorts.

## System Architecture

This is a full-stack TypeScript application using a modern React frontend with an Express.js backend, built for deployment on Replit's infrastructure.

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom configuration

### Backend Architecture
- **Runtime**: Node.js 20 with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Connect-pg-simple for PostgreSQL session store
- **Validation**: Zod schemas shared between frontend and backend

## Key Components

### Database Schema
Three main entities defined in `shared/schema.ts`:
- **Applications**: Startup application submissions with company details
- **Interest Registrations**: Interest expressions for future programs
- **Users**: Basic user authentication system

### API Endpoints
- `POST /api/applications` - Submit startup applications
- `POST /api/interest-registrations` - Register interest for programs

### Frontend Pages and Components
- **Landing Page**: Multi-section homepage with hero, stats, programs, methodology, startups showcase
- **Application Forms**: Dual-form interface for applications and interest registration
- **Responsive Navigation**: Mobile-friendly navigation with smooth scrolling

### Storage Layer
Implements a storage interface pattern with:
- Database storage using Drizzle ORM and PostgreSQL
- Memory storage fallback for development/testing
- Type-safe operations with full TypeScript support

## Data Flow

1. **User Interaction**: Users interact with React components on the frontend
2. **Form Submission**: React Hook Form validates data using Zod schemas
3. **API Communication**: TanStack Query manages HTTP requests to Express backend
4. **Backend Processing**: Express routes validate requests and interact with storage layer
5. **Database Operations**: Drizzle ORM handles PostgreSQL operations
6. **Response Handling**: Success/error states managed through React Query and toast notifications

## External Dependencies

### Core Infrastructure
- **Replit**: Development and hosting platform
- **Neon Database**: Serverless PostgreSQL database provider
- **Vite**: Frontend build tool and development server

### Major Libraries
- **UI Framework**: React ecosystem with Radix UI primitives
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod for runtime type checking
- **HTTP Client**: Fetch API with React Query wrapper
- **Styling**: Tailwind CSS with PostCSS processing

### Development Tools
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Backend bundling for production
- **TSX**: TypeScript execution for development

## Deployment Strategy

The application is configured for Replit's autoscale deployment:

### Development Mode
- Frontend: Vite dev server with HMR
- Backend: TSX for TypeScript execution
- Database: Connects to Neon PostgreSQL instance
- Port: 5000 (mapped to external port 80)

### Production Build
- Frontend: Vite builds to `dist/public`
- Backend: ESBuild bundles to `dist/index.js`
- Static Assets: Served from Express backend
- Database: Same Neon PostgreSQL connection

### Environment Configuration
- `NODE_ENV`: Controls development vs production behavior
- `DATABASE_URL`: PostgreSQL connection string (required)
- Replit modules: nodejs-20, web, postgresql-16

## Changelog

- June 24, 2025: Initial setup with complete EdTech accelerator website
- June 24, 2025: Added partners section showcasing supporters and collaborators across institutional, corporate, and investment partners
- June 24, 2025: Updated hero section with custom headline emphasizing EdTech product development and academic methodology focus, replaced hero image with collaborative workshop photo
- June 24, 2025: Updated methodology section with specific 5-step program content including Vision/Mission/Purpose, Business modeling, Research methods & ethics, Sustainable funding, and Pitching & storytelling
- June 24, 2025: Moved methodology section above programs section to emphasize academic approach first
- June 24, 2025: Updated stats section with 300+ startups, 12 cohorts, and 60+ investment rounds to better reflect program achievements
- June 24, 2025: Hidden current application form and button, showing only interest registration for future cohorts
- June 24, 2025: Added UCL EdTech Labs logo to navigation header (JPG format for compatibility)
- June 24, 2025: Updated hero section key point from "$1M Member Perks" to "Evidence-Led Method" to emphasize academic research approach
- June 24, 2025: Updated methodology section blurb with structured 5-point format featuring emoji icons and clear value propositions
- June 24, 2025: Added two new stats to showcase impact: 8M learners impacted and £500M+ total startup valuation
- June 24, 2025: Updated funding raised statistic from $50M+ to £37M+ for accuracy and UK currency consistency
- June 24, 2025: Updated investment rounds from 60+ to 28+ for accurate reporting
- June 24, 2025: Added animated logo carousel showcasing trusted partner organizations with autoplay functionality
- June 25, 2025: Enhanced logo carousel with authentic sponsor logos and clickable links to partner websites
- June 25, 2025: Added past programs section showcasing recent cohort achievements, funding raised, and featured startup outcomes
- June 25, 2025: Updated past programs with authentic data for London (6 cohorts), Paris (5 cohorts), and Toronto (1 cohort) including real startup success stories like Atom Learning, Vittascience, and KnowledgeHook
- June 25, 2025: Replaced startups section with authentic success stories including iSchool, Moi Panda, Chatterbox, Graffinity, LinkyThinks, and KnowledgeHook with real funding amounts and impact metrics
- June 25, 2025: Added authentic company logos to all startup success stories with professional logo placement and branding
- June 25, 2025: Added clickable website links to all startup success stories opening in new tabs with external link icons
- June 25, 2025: Updated partners section with authentic organizations including UCL's #1 ranked education faculty, Centre for Digital Innovation powered by AWS, Santander Universities, Île-de-France Region, CY Cergy Paris Université, Startup Labs, and IDEAL London
- June 25, 2025: Created comprehensive policy pages including Accessibility Statement, Disclaimer, Freedom of Information, Policies & Guidance, Privacy and Cookies, and Modern Slavery Statement with professional content
- June 25, 2025: Updated footer with streamlined design featuring only social media links (LinkedIn and email) and policies section, removed programs and resources sections
- June 25, 2025: Successfully deployed website with GoDaddy domain connection working properly
- June 26, 2025: Created comprehensive 4-step application form with 30+ detailed fields including personal information, company details, product information, and business model selections
- June 26, 2025: Implemented EdTech domain selection with 32 specific categories, problem cause analysis, and customer type identification
- June 26, 2025: Added multi-step progress tracking, real-time validation, accessibility features (WCAG 2.1 AA), and GDPR compliance notices
- June 26, 2025: Updated number of employees field to dropdown with ranges: 1, 2-3, 4-10, 11-20, >20 for better data consistency
- June 26, 2025: Updated Monthly Recurring Revenue field to dropdown with ranges: Pre-revenue, <£1,000, <£5,000, <£10,000, <£25,000, >£25,000
- June 26, 2025: Added research evidence field supporting Evidence-Led methodology - allows applicants to attach/link research papers evidencing educational impact, supporting theories, or problem descriptions
- June 26, 2025: Implemented comprehensive file upload system with drag-and-drop functionality, 10MB file limits, support for academic document formats (PDF, DOC, DOCX, TXT, PNG, JPG), and real-time upload progress feedback
- June 26, 2025: Made comprehensive application form accessible from homepage by updating hero section "Apply Now" button and application section to prominently feature the detailed 4-step application process instead of just interest registration
- June 26, 2025: Reverted all website buttons to "Register Interest" including navigation header - comprehensive application form remains accessible via direct URL while entire website focuses on lead capture for future cohort notifications
- June 27, 2025: Added contact form to Past Programs and Partners page with email functionality using SendGrid to send messages to info@ucledtechlabs.com, includes name, email, and message fields with proper validation and success/error handling
- June 27, 2025: Created custom EdTech hero SVG illustration (600x400px) as alternative to existing collaborative workshop photo, optimized for the two-column hero layout
- June 27, 2025: Added dedicated hero section to Past Programs and Partners page featuring cityscape cartoon illustration with iconic landmarks from program cities (London, Paris, Toronto, Dubai) to reinforce global network messaging
- June 27, 2025: Fixed broken logo links in London section of Past Programs page by implementing authentic partner logos provided by user (Santander Universities, UCL departments, IDEAL London, DOHE Global, London EdTech Week) - all 9 partner logos now display correctly
- June 27, 2025: Added all 9 authentic partner logos to Paris section (UCL Institute of Education, CY Cergy Paris Université, UCL Engineering, ESSEC Business School, Val d'Oise, La Turbine, bpifrance, EdTech France, Île-de-France)
- June 27, 2025: Fixed all broken images on homepage including logo carousel (replaced with authentic partner logos), navigation logo (UCL EdTech Labs), hero section image (collaborative workshop photo), startup section (gradient text placeholders), and testimonials (text-based initials)
- July 2, 2025: Redesigned hero section with full-width background image layout - collaborative workshop photo now fills entire viewport width with headline and subheading overlaid on image with dark overlay for optimal text readability
- July 29, 2025: Fixed application startup issue by removing unnecessary explicit React import from admin.tsx file - Vite configuration already handles JSX transformation automatically, making explicit React imports redundant

## User Preferences

Preferred communication style: Simple, everyday language.