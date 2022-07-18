import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router';

import App from './App.vue';
import './assets/_defaults.scss';

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.base = import.meta.env.VITE_BASE;
  store.api = import.meta.env.VITE_API;
});

app.provide('base', import.meta.env.VITE_BASE);
app.provide('api', import.meta.env.VITE_API);

app.use(pinia);
app.use(router);
app.mount('#app');
