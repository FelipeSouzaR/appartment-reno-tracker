
import React, { useEffect, useState } from 'react';

interface MobileAdProps {
  adType: 'banner' | 'rectangle' | 'leaderboard';
  position?: 'top' | 'bottom' | 'middle';
  className?: string;
}

const MobileAd: React.FC<MobileAdProps> = ({ adType, position, className = '' }) => {
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const loadMobileAd = async () => {
      try {
        // Quando você instalar o plugin AdMob, descomente e configure:
        /*
        const { AdMob } = await import('@capacitor-community/admob');
        
        const options = {
          adId: 'ca-app-pub-XXXXXXXXXX/XXXXXXXXXX', // Seu Ad Unit ID
          adSize: adType === 'banner' ? 'BANNER' : 'MEDIUM_RECTANGLE',
          position: position === 'top' ? 'TOP_CENTER' : 'BOTTOM_CENTER',
        };

        await AdMob.showBanner(options);
        setAdLoaded(true);
        */
        
        // Por enquanto, simula o carregamento
        setTimeout(() => setAdLoaded(true), 500);
      } catch (error) {
        console.error('Erro ao carregar anúncio móvel:', error);
      }
    };

    loadMobileAd();

    return () => {
      // Cleanup quando componente desmonta
      /*
      if (adLoaded) {
        AdMob.hideBanner();
      }
      */
    };
  }, [adType, position]);

  const getAdSize = () => {
    switch (adType) {
      case 'banner':
        return { width: '100%', height: '50px' };
      case 'rectangle':
        return { width: '300px', height: '250px' };
      case 'leaderboard':
        return { width: '100%', height: '90px' };
      default:
        return { width: '100%', height: '50px' };
    }
  };

  const { width, height } = getAdSize();

  return (
    <div 
      className={`flex justify-center items-center bg-gray-50 border ${className}`}
      style={{ width, height }}
    >
      {adLoaded ? (
        <div className="text-center text-gray-400 text-sm">
          <p>Anúncio Móvel</p>
          <p className="text-xs">AdMob - {adType}</p>
        </div>
      ) : (
        <div className="text-center text-gray-300 text-xs">
          Carregando anúncio...
        </div>
      )}
    </div>
  );
};

export default MobileAd;
