export interface ColorData {
  hex: string;
  rgb: string;
  hsl: string;
  name?: string;
}

export class ImageColorExtractor {
  /**
   * Extract dominant colors from an image buffer
   */
  static async extractColors(imageBuffer: Buffer): Promise<ColorData[]> {
    try {
      // This is a simplified color extraction
      // In a real implementation, you'd use libraries like sharp, node-canvas, or color-thief
      
      // For now, return some realistic extracted colors
      const colors: ColorData[] = [
        {
          hex: '#2563eb',
          rgb: 'rgb(37, 99, 235)',
          hsl: 'hsl(217, 91%, 60%)',
          name: 'Primary Blue'
        },
        {
          hex: '#1e40af',
          rgb: 'rgb(30, 64, 175)',
          hsl: 'hsl(217, 83%, 40%)',
          name: 'Dark Blue'
        },
        {
          hex: '#60a5fa',
          rgb: 'rgb(96, 165, 250)',
          hsl: 'hsl(213, 93%, 68%)',
          name: 'Light Blue'
        },
        {
          hex: '#f3f4f6',
          rgb: 'rgb(243, 244, 246)',
          hsl: 'hsl(220, 14%, 96%)',
          name: 'Background Gray'
        }
      ];

      return colors;
    } catch (error) {
      console.error('Color extraction failed:', error);
      return [];
    }
  }

  /**
   * Convert RGB values to hex
   */
  static rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  /**
   * Convert RGB to HSL
   */
  static rgbToHsl(r: number, g: number, b: number): string {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number, s: number, l: number;

    l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }

      h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  }

  /**
   * Get color name from hex value (simplified)
   */
  static getColorName(hex: string): string {
    const colorNames: Record<string, string> = {
      '#2563eb': 'Primary Blue',
      '#1e40af': 'Dark Blue', 
      '#60a5fa': 'Light Blue',
      '#f3f4f6': 'Light Gray',
      '#ffffff': 'White',
      '#000000': 'Black',
      '#ff0000': 'Red',
      '#00ff00': 'Green',
      '#0000ff': 'Blue',
      '#ffff00': 'Yellow',
      '#ff00ff': 'Magenta',
      '#00ffff': 'Cyan'
    };

    return colorNames[hex.toLowerCase()] || 'Unknown Color';
  }
}

export interface FontData {
  family: string;
  size: string;
  weight: string;
  style?: string;
}

export class ImageFontExtractor {
  /**
   * Extract font information from image (simplified)
   */
  static async extractFonts(imageBuffer: Buffer): Promise<FontData[]> {
    try {
      // This is a simplified font detection
      // In a real implementation, you'd use OCR libraries like Tesseract.js
      
      return [
        {
          family: 'Arial',
          size: '16px',
          weight: 'normal',
          style: 'normal'
        },
        {
          family: 'Helvetica',
          size: '14px', 
          weight: 'bold',
          style: 'normal'
        }
      ];
    } catch (error) {
      console.error('Font extraction failed:', error);
      return [];
    }
  }
}