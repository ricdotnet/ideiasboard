import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { Home, Boards, Board } from '../pages';

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/boards', component: Boards },
  { path: '/board/:key', component: Board },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
