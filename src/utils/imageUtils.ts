export const compressImage = async (file: File): Promise<File> => {
  const imageCompression = (await import('browser-image-compression')).default;
  
  const options = {
    maxSizeMB: 0.2, // 200KB max
    maxWidthOrHeight: 600, // 600px max dimension
    useWebWorker: true,
    fileType: 'image/jpeg', // Convert to JPG for better compression
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Image compression failed:', error);
    return file; // Return original if compression fails
  }
};

export const validateImageSize = (file: File): { valid: boolean; message?: string } => {
  const maxSize = 2 * 1024 * 1024; // 2MB before compression
  
  if (file.size > maxSize) {
    return {
      valid: false,
      message: 'Image is too large. Please choose an image smaller than 2MB.'
    };
  }
  
  return { valid: true };
};

export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.width, height: img.height });
    };
    
    img.src = url;
  });
};