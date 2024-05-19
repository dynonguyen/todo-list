import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import App from './App.vue'
import { queryPluginOptions } from './configs/query-client'
import { router } from './routes/router'

import 'vue-toastification/dist/index.css'
import { toastOptions } from './configs/toastification'
import './index.css'

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin, queryPluginOptions)
app.use(createPinia())
app.use(Toast, toastOptions)

app.mount('#app')
