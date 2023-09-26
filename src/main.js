import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import router from './router'
import { createPinia } from 'pinia'

const pinia = createPinia()

createApp(App).use(pinia).use(router).use(Quasar, quasarUserOptions).mount('#app')
