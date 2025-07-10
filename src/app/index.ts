import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './providers'
import './styles/index.scss'
export const app = createApp(App)

app.use(router)
app.use(createPinia())
