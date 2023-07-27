import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'material-design-icons-iconfont';

const app = createApp(App);

app.config.errorHandler = (error,vm, info) => {
    alert('Произошла ошибка. Пожалуйста, повторите попытку.');
    console.error('Error occurred:', error, vm, info);
};

app.use(store).use(router).mount('#app');
