import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'node:child_process'

function getGitCommitHash(): string {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim()
  } catch {
    return 'dev'
  }
}

function getGitCommitDate(): string {
  try {
    return execSync('git log -1 --format=%cs').toString().trim()
  } catch {
    return ''
  }
}

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(getGitCommitHash()),
    __APP_BUILD_DATE__: JSON.stringify(getGitCommitDate()),
  },
  base: '/',
  server: {
    port: 3000,
    open: true,
  },
})
