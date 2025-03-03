import { Download, Type, Palette, Image as ImageIcon, Settings2, Text, SwatchBook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ExtractedElement } from '@/lib/types';

interface ExtractedElementsProps {
  elements: ExtractedElement[];
  isProcessing: boolean;
}

export default function ExtractedElements({ elements, isProcessing }: ExtractedElementsProps) {
  const renderElementIcon = (type: string) => {
    switch (type) {
      case 'font':
        return <Type className="h-5 w-5 text-primary" />;
      case 'color':
        return <Palette className="h-5 w-5 text-primary" />;
      case 'shape':
        return <ImageIcon className="h-5 w-5 text-primary" />;
      case 'effect':
        return <Settings2 className="h-5 w-5 text-primary" />;
      case 'text':
        return <Text className="h-5 w-5 text-primary" />;
      case 'palette':
        return <SwatchBook className="h-5 w-5 text-primary" />;
      default:
        return <ImageIcon className="h-5 w-5 text-primary" />;
    }
  };

  const renderPaletteColors = (value: string) => {
    try {
      const colors = JSON.parse(value);
      return (
        <div className="flex gap-2 mt-2">
          {colors.map((color: { color: string; name: string }, index: number) => (
            <div key={index} className="text-center">
              <div 
                className="w-8 h-8 rounded-full border border-gray-200" 
                style={{ backgroundColor: color.color }}
                title={color.name}
              />
              <span className="text-xs text-gray-500 mt-1 block">
                {color.color}
              </span>
            </div>
          ))}
        </div>
      );
    } catch {
      return null;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-6">Extracted Elements</h2>

      {elements.length === 0 ? (
        <div className="text-center py-8">
          {isProcessing ? (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
              <p className="text-sm text-gray-500">Analyzing image...</p>
            </div>
          ) : (
            <div className="text-gray-500">
              <ImageIcon className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p>Upload an image to see extracted elements</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {elements.map((element, index) => (
            <div 
              key={index}
              className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="mr-3">
                {renderElementIcon(element.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900">{element.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{element.details}</p>
                {element.type === 'palette' && element.value && (
                  renderPaletteColors(element.value)
                )}
                {element.type === 'color' && element.value && (
                  <div className="flex items-center gap-2 mt-2">
                    <div 
                      className="w-6 h-6 rounded border border-gray-200"
                      style={{ backgroundColor: element.value }}
                    />
                    <span className="text-sm text-gray-500">{element.value}</span>
                  </div>
                )}
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="text-gray-500 hover:text-gray-700"
                asChild
              >
                <a href={element.downloadUrl} download>
                  <Download className="h-4 w-4" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
