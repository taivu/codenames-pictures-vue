export const appConfig = {
  name: import.meta.env.VITE_APP_NAME ?? 'Codenames Pictures',
  url: import.meta.env.VITE_APP_URL ?? '',
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
} as const

export type AppConfig = typeof appConfig
