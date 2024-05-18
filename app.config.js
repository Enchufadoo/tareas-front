import * as dotenv from 'dotenv'

dotenv.config()

module.exports = {
  name: 'tareas',
  slug: 'tareas',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  scheme: 'com.ariel.tareas',
  extra: {
    web: {
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
    }
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true
  },
  android: {
    package: 'com.ariel.tareas',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF'
    }
  },
  web: {
    favicon: './assets/favicon.png'
  }
}
