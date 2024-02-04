import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap";

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//API
import axios from 'axios';
import VueAxios from 'vue-axios';

const app = createApp(App)

app.config.globalProperties.$axios = axios.create({
    baseURL: 'https://ec-course-api.hexschool.io/v2/api/joooker',
})

app.use(VueAxios, axios);
app.use(createPinia())
app.use(router)

app.mount('#app')
