import type { CapacitorConfig } from '@capacitor/cli';


const config: CapacitorConfig = {
  appId: 'cl.valdevergara.HyperLinkRide',
  appName: 'Hyper LinkRide',
  webDir: 'src',
  plugins: {
    Geolocation: {
      // Permisos para Android
      permissions: {
        android: ['android.permission.ACCESS_COARSE_LOCATION', 'android.permission.ACCESS_FINE_LOCATION']
      }
    }
  }
};

export default config;
