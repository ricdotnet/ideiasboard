import { createApp } from 'vue';
import { StoreManager } from '@idevelopthings/vue-class-stores/vue';
import { router } from './router';

import App from './App.vue';
import './assets/_defaults.scss';

const app = createApp(App);

app.use(StoreManager, import.meta.glob('./stores/Generated/StoreLoader.ts', { eager: true }));

app.provide('base', import.meta.env.VITE_BASE);
app.provide('api', import.meta.env.VITE_API);

app.use(router);
app.mount('#app');
