
import React from 'react';
import { usePlatformDetection } from '@/hooks/usePlatformDetection';
import WebAd from './WebAd';
import MobileAd from './MobileAd';

interface AdContainerProps {
  adType: 'banner' | 'rectangle' | 'leaderboard';
  position?: 'top' | 'bottom' | 'middle';
  className?: string;
}

const AdContainer: React.FC<AdContainerProps> = ({ 
  adType, 
  position = 'middle',
  className = '' 
}) => {
  const { isNativeApp, isWeb, platform } = usePlatformDetection();

  // Don't render ads during development or if platform is not detected
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 p-4 text-center text-gray-500 ${className}`}>
        <p className="text-sm">
          [{platform.toUpperCase()}] Espaço para anúncio - {adType}
        </p>
        <p className="text-xs">Não exibido em desenvolvimento</p>
      </div>
    );
  }

  if (isWeb) {
    return <WebAd adType={adType} position={position} className={className} />;
  }

  if (isNativeApp) {
    return <MobileAd adType={adType} position={position} className={className} />;
  }

  return null;
};

export default AdContainer;
