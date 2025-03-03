import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadSectionProps {
  selectedImage: string | null;
  onImageUpload: (file: File) => void;
  isProcessing: boolean;
}

export default function UploadSection({ 
  selectedImage, 
  onImageUpload,
  isProcessing 
}: UploadSectionProps) {
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxSize: 10485760, // 10MB
    multiple: false,
    disabled: isProcessing
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Upload Image</h2>
        {selectedImage && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onImageUpload(new File([], ""))}
            className="text-gray-500 hover:text-gray-700"
          >
            <Settings2 className="h-4 w-4 mr-2" />
            Change Image
          </Button>
        )}
      </div>

      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg transition-colors
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}
          ${selectedImage ? 'p-4' : 'p-8'}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary/70'}
        `}
      >
        <input {...getInputProps()} />
        
        {!selectedImage ? (
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-sm font-medium text-gray-900 mb-1">
              {isDragActive ? 'Drop the image here' : 'Drag & drop image here'}
            </p>
            <p className="text-sm text-gray-500">or click to select</p>
            <p className="mt-2 text-xs text-gray-400">PNG, JPG up to 10MB</p>
          </div>
        ) : (
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="w-full h-auto rounded-lg"
            />
            {isProcessing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
