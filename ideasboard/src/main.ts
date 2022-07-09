import { createApp } from 'vue';
import {createPinia} from 'pinia';
import { router } from './router';

import App from './App.vue';
import './assets/_defaults.scss';

import dialogActions from './directives/DialogActions';

const app = createApp(App);
const pinia = createPinia();

app.directive('actions', dialogActions);

app.use(pinia);
app.use(router);
app.mount('#app');
