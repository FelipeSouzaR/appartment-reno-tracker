
import { useEffect, useState } from 'react';

export interface PlatformInfo {
  isNativeApp: boolean;
  isWeb: boolean;
  platform: 'web' | 'ios' | 'android';
}

export const usePlatformDetection = (): PlatformInfo => {
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo>({
    isNativeApp: false,
    isWeb: true,
    platform: 'web'
  });

  useEffect(() => {
    const checkPlatform = () => {
      // Check if running in Capacitor native app
      const isNativeApp = !!(window as any).Capacitor?.isNativePlatform?.();
      const isWeb = !isNativeApp;
      
      let platform: 'web' | 'ios' | 'android' = 'web';
      
      if (isNativeApp) {
        // Detect specific mobile platform
        const capacitor = (window as any).Capacitor;
        if (capacitor?.getPlatform) {
          const detectedPlatform = capacitor.getPlatform();
          platform = detectedPlatform === 'ios' ? 'ios' : 'android';
        }
      }

      setPlatformInfo({
        isNativeApp,
        isWeb,
        platform
      });

      console.log('Platform detected:', { isNativeApp, isWeb, platform });
    };

    checkPlatform();
  }, []);

  return platformInfo;
};
