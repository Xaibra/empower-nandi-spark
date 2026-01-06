# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a single-page web application for **Tujitume Youth & Women CBO**, built with **Vite**, **React 18**, **TypeScript**, **Tailwind CSS**, and **shadcn-ui**. It exposes a public marketing site and an in-browser admin portal for managing content (team, news, events, partnerships, testimonials, and site settings).

Key references:
- `README.md` – basic setup, tech stack, and deployment instructions.
- Vite + React entrypoint: `src/main.tsx` and `src/App.tsx`.

The Vite and TypeScript configs define an alias so that imports using `@/` resolve to `src/`:
- `vite.config.ts` – `alias: { "@": path.resolve(__dirname, "./src") }`
- `tsconfig.json` – `paths: { "@/*": ["./src/*"] }`

## Tooling & Commands

All commands are intended to be run from the repository root.

### Install dependencies

```sh
npm install
```

### Start the development server

Vite dev server (configured to listen on all interfaces on port `8080`):

```sh
npm run dev
```

### Build for production

Standard production build:

```sh
npm run build
```

Development-mode build (uses Vite `--mode development`):

```sh
npm run build:dev
```

### Preview the production build locally

Build and serve the built assets with Vite preview:

```sh
npm run preview
```

### Linting

ESLint is configured via `eslint.config.js` using the `typescript-eslint` flat config and React-specific plugins.

Run lint across the project:

```sh
npm run lint
```

Notes:
- `dist/` is ignored by ESLint.
- The config extends `@eslint/js` and `typescript-eslint` recommended rules, enables `react-hooks` and `react-refresh` rules, and explicitly turns off `@typescript-eslint/no-unused-vars`.

### Tests

There is **no test runner or `npm test` script configured** in `package.json` and no `*.test.*` or `*.spec.*` files in the repo. To add tests, introduce a test framework (e.g., Vitest) and corresponding scripts before expecting test commands to work.

## High-Level Architecture

### Runtime & Routing

Top-level React composition:

- `src/main.tsx`
  - Bootstraps the app by rendering `<App />` into the `#root` DOM node.

- `src/App.tsx`
  - Creates a single `QueryClient` instance (TanStack Query) and wraps the app in:
    - `ErrorBoundary` – top-level error boundary for runtime errors.
    - `QueryClientProvider` – React Query client context.
    - `TooltipProvider` – Radix-based tooltip context.
    - `DataProvider` – application content data (team, news, events, partnerships, testimonials, site settings).
    - `AdminProvider` – admin authentication/session state.
    - UI infrastructure: `Toaster` and `Sonner` for toast notifications.
  - Sets up routing using `react-router-dom`:
    - Public routes:
      - `/` → `Index` (public marketing/landing page).
    - Admin routes:
      - `/admin/login` → `AdminLogin` (auth form, uses `AdminContext`).
      - `/admin` → `AdminLayout` (protected shell; wraps nested admin pages):
        - `/admin/dashboard` → `AdminDashboard` (overview and demo analytics).
        - `/admin/team` → `AdminTeam`.
        - `/admin/news` → `AdminNews`.
        - `/admin` index → `AdminDashboard` fallback.
    - Catch-all:
      - `*` → `NotFound` (simple 404 page that logs missing routes to the console).

Routing/guarding behavior:
- `AdminLayout` checks `isAuthenticated` from `AdminContext` and redirects unauthenticated users to `/admin/login` using `<Navigate />`.
- `AdminLogin` checks `isAuthenticated` and immediately redirects authenticated users to `/admin/dashboard`.

### Contexts & Client-Side Data Model

#### `DataContext` – Site Content & Settings

File: `src/contexts/DataContext.tsx`

Responsibilities:
- Defines the core data model for the public site and admin CMS:
  - `TeamMember`, `NewsArticle`, `Event`, `Partnership`, `Testimonial`, and `SiteSettings` interfaces.
- Maintains React state for each collection and the singleton `siteSettings`.
- Exposes a rich set of CRUD-style methods via context (`DataContextType`), including:
  - `add/update/delete` for team members, news articles, events, partnerships, and testimonials.
  - Selectors like `getTeamMember`, `getPublishedArticles`, `getUpcomingEvents`, `getFeaturedTestimonials`.
  - `updateSiteSettings` for organization-level metadata.
  - `saveData` / `loadData` to persist and hydrate data from `localStorage` under the `tujitume_admin_data` key.

Lifecycle/persistence:
- On mount, the provider calls `loadData()` in a `useEffect` to hydrate from `localStorage` if saved data exists.
- Mutating methods update state and then call `saveData()` to write the combined data back to `localStorage`.

Usage pattern:
- Components call `useData()` to access the context and must be children of `DataProvider`.
- `useData` throws if used outside the provider, which helps catch incorrect usage early.

Implications for future work:
- All new features that manipulate “content” (team, news, events, partnerships, testimonials, site settings) should ideally go through `DataContext` so that state, persistence, and selectors stay centralized.
- Any future backend integration will likely replace or augment the `localStorage`-based `saveData`/`loadData` implementation.

#### `AdminContext` – Admin Authentication State

File: `src/contexts/AdminContext.tsx`

Responsibilities:
- Defines an `AdminUser` model with `id`, `email`, `name`, and `role` (`super_admin` | `admin` | `editor`).
- Manages admin authentication state and exposes:
  - `user`: the current admin user or `null`.
  - `isLoading`: auth bootstrap state.
  - `isAuthenticated`: derived boolean.
  - `login(email, password)`: async demo login function.
  - `logout()`: clears admin session.

Auth/persistence behavior:
- On mount, `useEffect` reads `admin_user` and `admin_token` from `localStorage` and restores the session if both exist and parse correctly.
- The `login` function checks credentials against a hard-coded `demoUsers` list and, on success:
  - Stores a lightweight `admin_user` (without password) and a synthetic `admin_token` in `localStorage`.
- `logout` clears both `admin_user` and `admin_token` and resets `user` to `null`.

Usage pattern:
- Components call `useAdmin()` and must be descendants of `AdminProvider`.
- `AdminLayout` and `AdminLogin` use `useAdmin` to enforce route-level access control and drive UI (e.g., user info, role badge, logout button).

### UI & Page Composition

#### Public Marketing Site

- `src/pages/Index.tsx` composes the public site as a set of sections, each backed by a dedicated component under `src/components/`:
  - `Navigation`, `Hero`, `ValueProposition`, `About`, `Programs`, `Impact`, `Testimonials`, `Team`, `Partnerships`, `News`, `GetInvolved`, `Footer`, and a `ModalSystem` overlay.
- Each section is wrapped in a `<section>` with an `id` so that navigation and anchor links can scroll to the right part of the page.

This page is primarily presentational and consumes data (e.g., team, testimonials, news) that is conceptually owned by `DataContext`.

#### Admin Portal Shell

- `src/components/admin/AdminLayout.tsx` defines the overall frame for the admin portal:
  - Sidebar with navigation items for each admin section (Dashboard, Team Management, News & Events, Partnerships, Testimonials, Settings).
  - Top bar that shows the active section title/description and a small user greeting.
  - `Outlet` from `react-router-dom` where nested admin pages render.
  - Responsive behavior (collapsible sidebar on mobile) controlled via component-local `sidebarOpen` state.
  - Uses `useAdmin` to read the current user and logout, and to redirect to `/admin/login` if unauthenticated.

- Admin pages under `src/pages/` (`AdminDashboard`, `AdminTeam`, `AdminNews`, etc.)
  - `AdminDashboard` is a statistics and quick-actions overview page built with the design system components (cards, badges, buttons) and placeholder/demo data.
  - Other admin pages focus on specific entities and are expected to work with `DataContext` and `formService` as the main integration points.

#### UI Toolkit & Utilities

- `src/components/ui/` contains the shadcn-ui based component library (accordion, dialog, toast, table, etc.), forming the primary design system for both the public site and admin UI.
- `src/hooks/use-mobile.tsx` – small hook that exposes `useIsMobile()` (based on a `MOBILE_BREAKPOINT` media query) for responsive behavior.
- `src/hooks/use-toast.ts` and `src/components/ui/toast.tsx` / `toaster.tsx` – custom toast management; `App` renders both the toast infrastructure and `sonner` to enable notifications across the app.
- `src/lib/utils.ts` – `cn` helper combining `clsx` and `tailwind-merge` for Tailwind class composition.

### Forms, Validation & Submission Flow

The application centralizes form structure, validation, and submission logic for various user-facing flows (contact, program inquiry, partnerships, volunteering, donations, event registration, newsletter, feedback).

#### Form Types

File: `src/types/forms.ts`

- Defines TypeScript interfaces for each form’s data shape (`ContactFormData`, `ProgramInquiryFormData`, etc.).
- Provides a `FormData` union and shared response types:
  - `FormSubmissionResponse` – result contract for submit operations.
  - `FormValidationError` – used by validation helpers.

These types are intended to be the canonical source of truth for form data used across the UI, validators, and submit logic.

#### Validation Pipeline

File: `src/utils/formValidation.ts`

- Provides reusable low-level validators (`validateEmail`, `validatePhone`, `validateRequired`, `validateMinLength`, `validateMaxLength`, `validateAge`, `validateAmount`).
- Implements form-specific validators (`validateContactForm`, `validateProgramInquiryForm`, etc.) that return `FormValidationError[]`.
- Exposes `validateFormData(formType, data)` as the main routing function that selects the appropriate validator based on a string `formType`.

All form submissions should go through `validateFormData` so that rules are centralized and consistent.

#### Submission & Persistence

File: `src/services/formService.ts`

Core responsibilities:
- `submitForm(formType, data)` – orchestrates the full submission flow:
  1. Validates form data using `validateFormData`.
  2. If validation fails, builds a `Record<string, string>` error map keyed by field name and returns `success: false` with a user-facing message and `errors` map.
  3. If validation passes:
     - Persists the submission via `saveFormSubmission`.
     - Sends a notification email to an internal address based on `formType` using `getEmailTemplate` and `sendEmail`.
     - Optionally sends a confirmation email to the submitter (if `data.email` exists and `!data.isAnonymous`) via `getUserConfirmationEmail`.
  4. Returns `success: true`, a success message, and a `submissionId`.

- `saveFormSubmission(formType, data)` – currently writes submissions into `localStorage` under the `formSubmissions` key, augmenting each record with an `id`, `formType`, `submittedAt`, and `status`.
- `getFormSubmissions()` and `updateSubmissionStatus(id, status, adminNotes?)` – helper methods intended for admin usage to view and manage stored submissions.
- `sendEmail` – **mock** async email sender that logs payloads to the console and resolves after a timeout. It is the designated seam for integrating a real email provider or backend endpoint.

Forms in the UI (e.g., `src/components/forms/ContactForm.tsx`) typically:
- Manage local form state.
- Call `submitForm('contact', formData)` on submit.
- React to `FormSubmissionResponse` by updating UI state (`submitStatus`, `message`, `errors`), and optionally invoking callbacks (e.g., `onSuccess`).

When adding a new form type:
1. Add or update the form’s TypeScript interface in `src/types/forms.ts`.
2. Implement a dedicated validator in `src/utils/formValidation.ts` and register it in `validateFormData`’s switch.
3. Add an email template (and, if needed, user confirmation message) in `src/services/formService.ts`.
4. Build the UI component under `src/components/forms/` and wire it to `submitForm`.

## How Future Changes Should Fit In

When extending or refactoring this project, prefer to:
- Use the existing alias `@/` for imports from `src/` to keep import paths consistent.
- Mount new global providers or top-level concerns in `src/App.tsx` so the provider tree remains explicit.
- Centralize new content / CMS-like entities in `DataContext` if they follow the same pattern (CRUD + local persistence) instead of scattering local state.
- Reuse the shadcn-based components in `src/components/ui/` and helpers like `cn` to maintain a consistent UI.
- For new forms, go through the shared types, validators, and `formService` rather than implementing ad hoc validation or submission logic.
