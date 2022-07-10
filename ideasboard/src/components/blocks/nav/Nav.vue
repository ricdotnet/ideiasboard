<template>
  <div class="nav">
    <div class="nav__container">
      <div class="nav__logo">IdeiasBoard</div>
      <div class="nav__links">
        <router-link to="/">Home</router-link>
        <Button v-if="!isInBoard()"
                label="Create"
                color="plain"
                text="blue"
                @click="onCreateBoardClick()">
        </Button>
      </div>
    </div>
  </div>

  <CreateBoardDialog ref="createBoardDialog"/>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { Button } from '../../common';
  import { CreateBoardDialog } from '../';

  // TODO: Extract types / interfaces
  interface ICBD {
    onCreateBoardOpen: () => void;
  }

  const route = useRoute();
  const createBoardDialog = ref<ICBD | null>(null);

  const state = reactive({});

  function isInBoard(): boolean {
    return route.path.includes('/board/');
  }

  function onCreateBoardClick() {
    return createBoardDialog.value?.onCreateBoardOpen();
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
