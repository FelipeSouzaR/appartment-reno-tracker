
export const ADS_CONFIG = {
  // Configurações AdSense (Web)
  ADSENSE: {
    PUBLISHER_ID: 'ca-pub-XXXXXXXXXX', // Substitua pelo seu Publisher ID
    AD_SLOTS: {
      BANNER: 'XXXXXXXXXX',           // Substitua pelos seus Ad Slot IDs
      RECTANGLE: 'XXXXXXXXXX',
      LEADERBOARD: 'XXXXXXXXXX',
    }
  },
  
  // Configurações AdMob (Mobile)
  ADMOB: {
    APP_ID: {
      IOS: 'ca-app-pub-XXXXXXXXXX~XXXXXXXXXX',     // iOS App ID
      ANDROID: 'ca-app-pub-XXXXXXXXXX~XXXXXXXXXX'  // Android App ID
    },
    AD_UNITS: {
      BANNER: {
        IOS: 'ca-app-pub-XXXXXXXXXX/XXXXXXXXXX',
        ANDROID: 'ca-app-pub-XXXXXXXXXX/XXXXXXXXXX'
      },
      INTERSTITIAL: {
        IOS: 'ca-app-pub-XXXXXXXXXX/XXXXXXXXXX',
        ANDROID: 'ca-app-pub-XXXXXXXXXX/XXXXXXXXXX'
      },
      REWARDED: {
        IOS: 'ca-app-pub-XXXXXXXXXX/XXXXXXXXXX',
        ANDROID: 'ca-app-pub-XXXXXXXXXX/XXXXXXXXXX'
      }
    }
  },
  
  // Configurações gerais
  ENABLED: process.env.NODE_ENV === 'production', // Só exibe em produção
  TEST_MODE: false // Ative para usar anúncios de teste
};
