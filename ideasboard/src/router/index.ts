import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import { Home, Boards, Board } from '../pages';

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/boards', component: Boards },
  { path: '/board/:id', component: Board },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export { router };
