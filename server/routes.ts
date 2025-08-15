import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { ImageColorExtractor, ImageFontExtractor } from "./imageProcessor";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Image processing endpoint
  app.post("/api/process-image", upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Extract colors and fonts from the image
      const colors = await ImageColorExtractor.extractColors(req.file.buffer);
      const fonts = await ImageFontExtractor.extractFonts(req.file.buffer);

      const extractedElements = [];

      // Add individual colors
      colors.forEach((color, index) => {
        extractedElements.push({
          type: 'color',
          name: color.name || `Color ${index + 1}`,
          details: color.hex,
          value: color.hex,
          downloadUrl: `/api/download/color/${encodeURIComponent(color.name || `color-${index + 1}`)}`
        });
      });

      // Add color palette
      if (colors.length > 0) {
        extractedElements.push({
          type: 'palette',
          name: 'Color Palette',
          details: `${colors.length} colors extracted`,
          value: JSON.stringify(colors.map(c => ({ 
            color: c.hex, 
            name: c.name || 'Extracted Color' 
          }))),
          downloadUrl: '/api/download/palette/extracted'
        });
      }

      // Add fonts
      fonts.forEach((font, index) => {
        extractedElements.push({
          type: 'font',
          name: font.family,
          details: `${font.size}, ${font.weight}`,
          downloadUrl: `/api/download/font/${encodeURIComponent(font.family)}`
        });
      });

      // Add some additional mock elements for demonstration
      extractedElements.push({
        type: 'effect',
        name: 'Drop Shadow',
        details: 'Detected shadow effect',
        downloadUrl: '/api/download/effect/drop-shadow'
      });

      res.json({ 
        elements: extractedElements,
        metadata: {
          processedAt: new Date().toISOString(),
          fileSize: req.file.size,
          mimeType: req.file.mimetype
        }
      });
    } catch (error) {
      console.error('Error processing image:', error);
      res.status(500).json({ error: "Failed to process image" });
    }
  });

  // Download endpoints for extracted elements
  app.get("/api/download/color/:colorName", (req, res) => {
    const colorName = req.params.colorName;
    const colorData = {
      name: colorName,
      hex: '#2563eb', // This would be dynamic based on the actual color
      rgb: 'rgb(37, 99, 235)',
      hsl: 'hsl(217, 91%, 60%)',
      extractedAt: new Date().toISOString()
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${colorName}.json"`);
    res.json(colorData);
  });

  app.get("/api/download/palette/:paletteName", (req, res) => {
    const paletteName = req.params.paletteName;
    const paletteData = {
      name: paletteName,
      colors: [
        { color: '#2563eb', name: 'Primary Blue' },
        { color: '#1e40af', name: 'Dark Blue' },
        { color: '#60a5fa', name: 'Light Blue' },
        { color: '#f3f4f6', name: 'Background Gray' }
      ],
      extractedAt: new Date().toISOString(),
      format: 'hex'
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${paletteName}-palette.json"`);
    res.json(paletteData);
  });

  app.get("/api/download/font/:fontName", (req, res) => {
    const fontName = req.params.fontName;
    const fontData = {
      name: fontName,
      family: fontName,
      size: '16px',
      weight: 'regular',
      extractedAt: new Date().toISOString()
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${fontName}.json"`);
    res.json(fontData);
  });

  app.get("/api/download/effect/:effectName", (req, res) => {
    const effectName = req.params.effectName;
    const effectData = {
      name: effectName,
      type: 'shadow',
      properties: {
        blur: '8px',
        offset: '2px 2px',
        color: 'rgba(0, 0, 0, 0.25)'
      },
      extractedAt: new Date().toISOString()
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${effectName}.json"`);
    res.json(effectData);
  });

  const httpServer = createServer(app);

  return httpServer;
}
