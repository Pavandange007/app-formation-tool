
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.46827b0d769c4b8491c875474c8c6b59',
  appName: 'Todo List App',
  webDir: 'dist',
  server: {
    url: 'https://46827b0d-769c-4b84-91c8-75474c8c6b59.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    }
  }
};

export default config;
