import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import { setupFontAwesome } from './plugins/fontawesome'
import { setupAnalytics } from './plugins/analytics'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
setupFontAwesome(app)
setupAnalytics(app, router)

app.mount('#app')
