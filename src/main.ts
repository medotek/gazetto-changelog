import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import BootstrapVueNext from 'bootstrap-vue-next'

// The main.scss already contains bootstrap for overriding styles
import './assets/main.scss'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

const app = createApp(App)
const pinia = createPinia()
app.use(BootstrapVueNext)
app.use(pinia)
app.mount('#app')
