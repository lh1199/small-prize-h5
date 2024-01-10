import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {router} from "./router.js";
import vant from 'vant';
import 'vant/lib/index.css';

createApp(App)
    .use(router)
    .use(vant)
    .mount('#app')

