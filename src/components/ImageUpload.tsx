import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, X, Image as ImageIcon, Loader2, CheckCircle } from 'lucide-react';

interface AnalysisResult {
  breed: string;
  confidence: number;
  characteristics: string[];
  marketDemand: string;
  priceRange: string;
  healthScore: number;
  recommendations: string[];
  image: string;
  timestamp: Date;
}

interface ImageUploadProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  onBack: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onAnalysisComplete, onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    if (imageFile) {
      processImageFile(imageFile);
    }
  }, []);

  const processImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context?.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');
      setSelectedImage(imageData);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    // Simulate API call
    setTimeout(() => {
      setProgress(100);
      clearInterval(progressInterval);
      
      // Mock analysis result
      const mockResult: AnalysisResult = {
        breed: 'Holstein Friesian',
        confidence: 94.2,
        characteristics: [
          'Black and white spotted pattern',
          'Large body frame (600-700 kg)',
          'High milk production capacity',
          'Docile temperament',
          'Strong udder attachment'
        ],
        marketDemand: 'High',
        priceRange: '₹45,000 - ₹75,000',
        healthScore: 87,
        recommendations: [
          'Suitable for dairy farming operations',
          'Requires high-quality feed for optimal milk production',
          'Regular health monitoring recommended',
          'Best suited for temperate climate regions'
        ],
        image: selectedImage,
        timestamp: new Date()
      };

      setTimeout(() => {
        setIsAnalyzing(false);
        onAnalysisComplete(mockResult);
      }, 1000);
    }, 3000);
  };

  if (showCamera) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <div className="p-4 flex justify-between items-center bg-black bg-opacity-50">
          <button
            onClick={stopCamera}
            className="text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-white font-semibold">Capture Photo</h2>
          <div className="w-10" />
        </div>
        
        <div className="flex-1 relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={capturePhoto}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
            >
              <Camera className="w-8 h-8 text-gray-800" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-spin"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Image</h2>
            <p className="text-gray-600 mb-6">Our AI is identifying the breed and gathering characteristics...</p>
            
            <div className="space-y-4">
              <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-500">{Math.round(progress)}% complete</div>
              
              <div className="space-y-2 text-left">
                <AnalysisStep completed={progress > 20} text="Processing image..." />
                <AnalysisStep completed={progress > 50} text="Identifying breed characteristics..." />
                <AnalysisStep completed={progress > 80} text="Gathering market insights..." />
                <AnalysisStep completed={progress >= 100} text="Finalizing results..." />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            ← Back to Home
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Image for Classification</h1>
          <p className="text-gray-600">Upload a clear image of cattle or buffalo for breed identification</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!selectedImage ? (
            <div
              className={`border-3 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                isDragOver 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Drag & drop your image here
                  </h3>
                  <p className="text-gray-600 mb-6">or choose from the options below</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-colors duration-200"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Choose from Gallery
                  </button>
                  
                  <button
                    onClick={startCamera}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-colors duration-200"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Take Photo
                  </button>
                </div>

                <div className="text-sm text-gray-500">
                  Supported formats: JPG, PNG, WebP (Max: 10MB)
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full max-h-96 object-contain rounded-lg shadow-lg"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center space-y-4">
                <div className="text-green-600 flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Image ready for analysis</span>
                </div>
                
                <button
                  onClick={analyzeImage}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Analyze Breed
                </button>

                <div className="text-sm text-gray-500">
                  Our AI will analyze the image and provide detailed breed information
                </div>
              </div>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};

const AnalysisStep: React.FC<{ completed: boolean; text: string }> = ({ completed, text }) => (
  <div className="flex items-center gap-3">
    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
      completed ? 'bg-green-500' : 'bg-gray-200'
    }`}>
      {completed && <CheckCircle className="w-3 h-3 text-white" />}
    </div>
    <span className={`text-sm ${completed ? 'text-green-700' : 'text-gray-500'}`}>
      {text}
    </span>
  </div>
);

export default ImageUpload;