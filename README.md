# Image Template Extractor

A React application that identifies and extracts design elements from uploaded images.

## Features
- Upload images (PNG, JPG up to 10MB)
- Extract design elements including:
  - Fonts
  - Colors
  - Shapes
  - Effects
  - Text
  - Color Palettes
- Download extracted elements
- Responsive design

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/image-template-extractor.git
cd image-template-extractor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure
```
├── src/
│   ├── components/      # React components
│   ├── lib/            # Utility functions and types
│   ├── pages/          # Page components
│   └── App.tsx         # Main application component
├── public/             # Static assets
└── package.json        # Project dependencies
```

## Technologies Used
- React
- TypeScript
- Tailwind CSS
- Vite
- shadcn/ui components
- React Dropzone
