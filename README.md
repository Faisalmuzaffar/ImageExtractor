# Image Template Extractor

A React-based application for extracting design elements from images using AI.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Type checking
npm run check
```

## Code Quality

### Unused Code Detection

This project includes a tool to detect unused code and dead files:

```bash
# Check for unused UI components and files
npm run check-unused
```

The detection tool helps maintain a clean codebase by identifying:
- Unused UI components in `client/src/components/ui/`
- Potentially dead files
- Suggestions for further analysis tools

### Recent Cleanup

The following unused code was recently removed to improve maintainability:

- **Removed entire `attached_assets/` folder** - contained template files not used by the application
- **Removed 43 unused UI components** - cleaned up shadcn/ui components that weren't being imported
- **Reduced bundle size** - CSS reduced from 25.59 kB to 18.83 kB (26% smaller)

Only the following UI components are currently in use:
- `button.tsx` - Primary interactive element
- `card.tsx` - Content containers  
- `toast.tsx` - Notification system
- `toaster.tsx` - Toast notification provider

## Architecture

- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build**: Vite for frontend, esbuild for backend