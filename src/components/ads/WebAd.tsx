
import React, { useEffect, useRef } from 'react';

interface WebAdProps {
  adType: 'banner' | 'rectangle' | 'leaderboard';
  position?: 'top' | 'bottom' | 'middle';
  className?: string;
}

const WebAd: React.FC<WebAdProps> = ({ adType, position, className = '' }) => {
  const adRef = useRef<HTMLElement>(null);

  const getAdSize = () => {
    switch (adType) {
      case 'banner':
        return { width: 320, height: 50 };
      case 'rectangle':
        return { width: 300, height: 250 };
      case 'leaderboard':
        return { width: 728, height: 90 };
      default:
        return { width: 320, height: 50 };
    }
  };

  const { width, height } = getAdSize();

  useEffect(() => {
    // Load AdSense script if not already loaded
    if (!document.querySelector('script[src*="adsbygoogle"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    // Initialize ad when component mounts
    const initializeAd = () => {
      try {
        if ((window as any).adsbygoogle && adRef.current) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        }
      } catch (error) {
        console.log('AdSense not ready yet');
      }
    };

    // Delay to ensure AdSense script is loaded
    const timer = setTimeout(initializeAd, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ 
          display: 'inline-block',
          width: `${width}px`,
          height: `${height}px`
        }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default WebAd;
