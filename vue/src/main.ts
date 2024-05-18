import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { queryPluginOptions } from './configs/query-client'
import { router } from './routes/router'

import './index.css'

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin, queryPluginOptions)
app.use(createPinia())

app.mount('#app')
