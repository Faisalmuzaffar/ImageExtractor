import { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import UploadSection from '@/components/UploadSection';
import ExtractedElements from '@/components/ExtractedElements';
import type { ExtractedElement } from '@/lib/types';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedElements, setExtractedElements] = useState<ExtractedElement[]>([]);
  const { toast } = useToast();

  const handleImageUpload = useCallback(async (file: File) => {
    if (!file) {
      setSelectedImage(null);
      setExtractedElements([]);
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    
    reader.onloadend = async () => {
      setSelectedImage(reader.result as string);
      
      try {
        // Upload and process image via API
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('/api/process-image', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to process image');
        }

        const data = await response.json();
        setExtractedElements(data.elements || []);
        
        toast({
          title: "Image processed successfully!",
          description: `Extracted ${data.elements?.length || 0} design elements.`,
        });
      } catch (error) {
        console.error('Error processing image:', error);
        toast({
          title: "Processing failed",
          description: "Failed to process the image. Please try again.",
          variant: "destructive",
        });
        
        // Fallback to mock data if API fails
        setExtractedElements([
          {
            type: 'color',
            name: 'Error - Using Mock Data',
            details: 'API processing failed',
            downloadUrl: '#'
          }
        ]);
      } finally {
        setIsProcessing(false);
      }
    };

    reader.readAsDataURL(file);
  }, []);

  const handleExportTemplate = () => {
    if (!extractedElements.length) {
      toast({
        title: "No elements to export",
        description: "Please upload and process an image first.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create a comprehensive template with all extracted elements
      const template = {
        name: 'Extracted Design Template',
        createdAt: new Date().toISOString(),
        sourceImage: selectedImage ? 'uploaded_image' : null,
        elements: extractedElements,
        summary: {
          totalElements: extractedElements.length,
          colors: extractedElements.filter(e => e.type === 'color').length,
          fonts: extractedElements.filter(e => e.type === 'font').length,
          effects: extractedElements.filter(e => e.type === 'effect').length,
          palettes: extractedElements.filter(e => e.type === 'palette').length
        },
        usage: {
          description: 'This template contains design elements extracted from your uploaded image.',
          instructions: [
            'Use the colors for maintaining brand consistency',
            'Apply the fonts for typography matching',
            'Implement effects for visual enhancements',
            'Use palettes for complete color schemes'
          ]
        }
      };

      // Create and download the template file
      const templateJson = JSON.stringify(template, null, 2);
      const blob = new Blob([templateJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `design-template-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Template exported!",
        description: "Your design template has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export failed",
        description: "Failed to export the template. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Upload className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Image Template Extractor
              </h1>
            </div>
            <Button 
              onClick={handleExportTemplate}
              disabled={!selectedImage || extractedElements.length === 0}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
            >
              Export Template
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <UploadSection
              selectedImage={selectedImage}
              onImageUpload={handleImageUpload}
              isProcessing={isProcessing}
            />
          </Card>

          <Card className="p-6">
            <ExtractedElements 
              elements={extractedElements}
              isProcessing={isProcessing}
            />
          </Card>
        </div>
      </main>
    </div>
  );
}
