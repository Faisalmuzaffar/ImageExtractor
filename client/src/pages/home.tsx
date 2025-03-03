import { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import UploadSection from '@/components/UploadSection';
import ExtractedElements from '@/components/ExtractedElements';
import type { ExtractedElement } from '@/lib/types';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedElements, setExtractedElements] = useState<ExtractedElement[]>([]);

  const handleImageUpload = useCallback((file: File) => {
    setIsProcessing(true);
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      // Simulate AI processing
      setTimeout(() => {
        setExtractedElements([
          {
            type: 'font',
            name: 'Helvetica Neue',
            details: '24px, Bold',
            downloadUrl: '#'
          },
          {
            type: 'color',
            name: 'Primary Blue',
            details: '#2563eb',
            value: '#2563eb',
            downloadUrl: '#'
          },
          {
            type: 'shape',
            name: 'Logo Icon',
            details: 'Vector Graphic',
            downloadUrl: '#'
          },
          {
            type: 'effect',
            name: 'Drop Shadow',
            details: '8px blur, 25% opacity',
            downloadUrl: '#'
          },
          {
            type: 'palette',
            name: 'Color Scheme',
            details: 'Brand Colors',
            value: JSON.stringify([
              { color: '#2563eb', name: 'Primary Blue' },
              { color: '#1e40af', name: 'Dark Blue' },
              { color: '#60a5fa', name: 'Light Blue' },
              { color: '#f3f4f6', name: 'Background Gray' }
            ]),
            downloadUrl: '#'
          }
        ]);
        setIsProcessing(false);
      }, 2000);
    };

    reader.readAsDataURL(file);
  }, []);

  const handleExportTemplate = () => {
    // In a real app, this would generate and download a complete design template
    alert('Template exported!');
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
              disabled={!selectedImage}
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
