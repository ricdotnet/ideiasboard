<template>
  <div class="nav">
    <div class="nav__container">
      <div class="nav__logo">IdeiasBoard</div>
      <div class="nav__links">
        <router-link to="/">Home</router-link>
        <template v-if="!userStore.email">
          <a href="javascript:;" @click="onLoginClick()">Login</a>
        </template>
        <template v-else>
          <a href="#">My Boards</a>
          <a href="javascript:;" @click="logout()">Logout</a>
        </template>
        <Button v-if="!isInBoard()"
                label="Create"
                color="plain"
                text="blue"
                @click="onCreateBoardClick()">
        </Button>
      </div>
    </div>
  </div>

  <LoginDialog ref="loginDialog"
               @on-login-success="onLoginSuccess"/>
  <LoginActionMessageDialog ref="loginActionMessageDialog"/>
  <CreateBoardDialog ref="createBoardDialog"/>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useUserStore } from '../../../stores';
  import { useAuth } from '../../../composables';
  import { Button } from '../../common';
  import { CreateBoardDialog, LoginActionMessageDialog, LoginDialog } from '../';
  import { ICreateBoardDialog, ILoginActionMessageDialog, ILoginDialog } from '../../../types';

  const route = useRoute();
  const userStore = useUserStore();
  const createBoardDialog = ref<ICreateBoardDialog>();
  const loginDialog = ref<ILoginDialog>();
  const loginActionMessageDialog = ref<ILoginActionMessageDialog>();
  const { logout } = useAuth();

  function isInBoard(): boolean {
    return route.path.includes('/board/');
  }

  function onCreateBoardClick() {
    return createBoardDialog.value?.onCreateBoardOpen();
  }

  function onLoginClick() {
    return loginDialog.value?.onLoginOpen();
  }

  function onLoginSuccess() {
    loginDialog.value?.onLoginClose();
    return loginActionMessageDialog.value?.onLoginActionMessageDialogOpen();
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/defaults";

  .nav {
    @apply h-16 w-full;

    &__container {
      @apply container flex items-center justify-between;
    }

    &__logo {
      @apply text-2xl font-extrabold tracking-wide;
    }

    &__links {
      @apply flex items-center space-x-4;
    }
  }
</style>
