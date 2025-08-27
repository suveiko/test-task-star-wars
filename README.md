# Star Wars Characters Explorer

Test assignment: SPA application for viewing and editing Star Wars character information.

## Task Description

Using Star Wars API (https://swapi.py4e.com/) as a data source, implement a SPA application with React and TypeScript consisting of two pages:

1. **Main page** - list/cards of characters with pagination and search through API
2. **Character page** - detailed information with local editing capability

## Technology Stack

### Core
- **React 18** - UI library
- **TypeScript** - type safety
- **Vite** - bundler and dev server

### Architecture
- **Feature-Sliced Design (FSD)** - architectural methodology
- Layers: app, pages, widgets, features, entities, shared

### UI/UX
- **Mantine v8** - component library
- Responsive design
- Dark/light themes

### State & Data
- **TanStack Query v5** - server state and caching
- **React Router v6** - routing
- **LocalStorage** - local changes persistence
- **openapi-fetch** - typed API client

### Code Quality
- **ESLint** - linting
- **Prettier** - formatting
- **Husky** - git hooks
- **lint-staged** - staged files checks

### Testing
- **Vitest** - unit tests
- **Playwright** - e2e tests

### CI/CD
- **GitHub Actions** - automation
- Type checking, tests, build

## Features

### Characters List
- Display character cards
- API pagination
- Name search with debounce
- Local changes indicator
- Loading states

### Detail Page
- Full character information
- Field editing
- Save changes locally
- Reset changes
- Navigation back to list

## Installation & Running

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test:unit
pnpm test:e2e
```

## Project Structure

```
src/
├── app/              # Application initialization
├── pages/            # Application pages
│   ├── people-list/  # Characters list
│   └── person-view/  # Detail page
├── widgets/          # Composite blocks
│   └── people-grid/  # Cards grid
├── features/         # Business features
│   └── edit-person-local/ # Character editing
├── entities/         # Business entities
│   └── person/       # Person model
│       ├── api/      # API requests
│       └── model/    # Types and hooks
└── shared/           # Reusable code
    ├── api/          # API client
    ├── config/       # Configuration
    ├── lib/          # Utilities
    ├── providers/    # React providers
    └── ui/           # UI components
```

## Implementation Details

- **Request optimization**: caching via TanStack Query
- **Search debounce**: 500ms delay for request optimization
- **State persistence**: local changes preserved on navigation
- **Type-safety**: full typing including API responses
- **Responsive design**: adaptive card grid