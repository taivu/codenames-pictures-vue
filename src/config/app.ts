export const appConfig = {
  name: import.meta.env.VITE_APP_NAME ?? 'Codenames Pictures',
  url: import.meta.env.VITE_APP_URL ?? '',
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
  // Google Analytics 4 - env var takes priority, fallback to hardcoded value
  gaTrackingId: import.meta.env.VITE_GA_TRACKING_ID ?? '',
} as const

export type AppConfig = typeof appConfig
