import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Vue3TouchEvents from "vue3-touch-events";

const app = createApp(App)
app.use(Vue3TouchEvents,{
	disableClick: true,
	swipeTolerance: 20,
});
app.mount('#app')