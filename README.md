# Image Template Extractor

A functional web application that extracts design elements from uploaded images and creates downloadable templates for design consistency.

## Features

### 🎨 Image Processing
- **Drag & Drop Upload**: Easy image upload with support for PNG, JPG, JPEG, and GIF files (up to 10MB)
- **Real-time Processing**: Backend API processes uploaded images and extracts design elements
- **Visual Preview**: Immediate preview of uploaded images with processing indicators

### 🎯 Element Extraction
- **Color Analysis**: Extracts dominant colors from images with hex, RGB, and HSL values
- **Font Detection**: Identifies fonts and typography information (family, size, weight)
- **Color Palettes**: Groups extracted colors into cohesive palettes
- **Visual Effects**: Detects shadows and other design effects

### 📥 Download & Export
- **Individual Downloads**: Download specific colors, fonts, or effects as JSON files
- **Complete Templates**: Export comprehensive design templates with all extracted elements
- **Structured Data**: Well-formatted JSON with metadata and usage instructions

### 🔄 User Experience
- **Progress Indicators**: Real-time feedback during image processing
- **Toast Notifications**: Success and error messages for better user experience
- **Responsive Design**: Modern UI with Tailwind CSS and shadcn/ui components

## Use Cases

### 1. **Brand Consistency**
Upload a brand image or logo to extract the official color palette and fonts for maintaining consistency across designs.

### 2. **Design Inspiration**
Extract design elements from inspirational images to understand color schemes and typography choices.

### 3. **Asset Recreation**
When you need to recreate a design but only have an image, extract the colors and fonts to match the original.

### 4. **Style Guide Creation**
Generate style guides by extracting elements from existing designs and creating downloadable templates.

### 5. **Design Handoff**
Share extracted design elements with team members or clients for implementation.

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** for component library
- **React Hook Form** for form handling
- **React Dropzone** for file uploads
- **Wouter** for routing

### Backend
- **Express.js** with TypeScript
- **Multer** for file upload handling
- **Custom image processing** with color and font extraction
- **RESTful API** design

### Development
- **Vite** for build tooling
- **TSX** for development server
- **ESBuild** for production builds

## API Endpoints

### Upload & Processing
- `POST /api/process-image` - Upload and process image files

### Downloads
- `GET /api/download/color/:colorName` - Download individual color data
- `GET /api/download/palette/:paletteName` - Download color palette
- `GET /api/download/font/:fontName` - Download font information
- `GET /api/download/effect/:effectName` - Download effect data

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd ImageExtractor

# Install dependencies
npm install

# Start development server
npm run dev
```

### Usage
1. Open http://localhost:5000 in your browser
2. Upload an image by dragging & dropping or clicking to select
3. Wait for processing to complete (1-2 seconds)
4. Browse extracted elements (colors, fonts, effects)
5. Download individual elements or export complete template
6. Use exported data in your design projects

## File Formats

### Individual Element Downloads
Each element is downloaded as a JSON file with:
- Element metadata (name, type, extraction timestamp)
- Formatted values (hex, RGB, HSL for colors)
- Usage information

### Template Export
Complete templates include:
- All extracted elements
- Summary statistics
- Usage instructions
- Metadata (creation time, source image info)

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License
MIT License - see LICENSE file for details