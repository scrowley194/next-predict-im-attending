import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface PhotoUploaderProps {
  onPhotoSelect: (url: string) => void;
  currentPhoto: string | null;
}

export function PhotoUploader({ onPhotoSelect, currentPhoto }: PhotoUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const url = URL.createObjectURL(file);
      onPhotoSelect(url);
    }
  }, [onPhotoSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    multiple: false
  } as any);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#888]">Profile Photo</label>
      <div
        {...getRootProps()}
        className={cn(
          "relative cursor-pointer group flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden bg-[#0a0a0a]",
          isDragActive 
            ? "border-yellow-400 bg-yellow-400/5" 
            : "border-[#444] hover:border-yellow-500 hover:bg-[#111]"
        )}
      >
        <input {...getInputProps()} />
        
        {currentPhoto ? (
          <div className="absolute inset-0 w-full h-full bg-black">
            <img 
              src={currentPhoto} 
              alt="Preview" 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <UploadCloud className="w-8 h-8 text-white mb-2" />
              <p className="text-sm font-medium text-white">Click to change</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-[#666] group-hover:text-[#aaa]">
            <div className="w-12 h-12 mb-3 rounded-full bg-[#222] flex items-center justify-center group-hover:scale-110 transition-transform">
              <ImageIcon className="w-6 h-6 text-[#666] group-hover:text-yellow-400 transition-colors" />
            </div>
            <p className="text-sm font-medium text-center px-4">
              <span className="text-yellow-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-[#555] mt-1">PNG, JPG or WEBP (Max 5MB)</p>
          </div>
        )}
      </div>
    </div>
  );
}
