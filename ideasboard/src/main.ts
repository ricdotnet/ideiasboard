import { createApp } from 'vue';
import { StoreManager } from '@idevelopthings/vue-class-stores/vue';
import { router } from './router';

import App from './App.vue';
import './assets/_defaults.scss';

const app = createApp(App);

StoreManager.extend(() => {
  return {
    api: import.meta.env.VITE_API,
    base: import.meta.env.VITE_BASE,
  };
});
app.use(StoreManager.boot());

app.provide('base', import.meta.env.VITE_BASE);
app.provide('api', import.meta.env.VITE_API);

app.use(router);
app.mount('#app');
