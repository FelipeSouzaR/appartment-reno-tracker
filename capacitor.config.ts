
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.25fbbd2ff9f549ea812776b34efe6727',
  appName: 'appartment-reno-tracker',
  webDir: 'dist',
  server: {
    url: 'https://25fbbd2f-f9f5-49ea-8127-76b34efe6727.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;
