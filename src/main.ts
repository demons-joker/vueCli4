import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { createApp } from 'vue';
import 'ant-design-vue/dist/antd.css';
const app = createApp(App);
app.use(Antd).use(store).use(router);
app.mount('#app');
