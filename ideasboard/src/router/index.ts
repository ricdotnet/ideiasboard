import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { Auth, Board, BoardList, Home } from '../pages';

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/boards', component: BoardList },
  { path: '/board/:key', component: Board },
  { path: '/auth', component: Auth },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
