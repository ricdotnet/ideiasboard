<template>
  <div class="nav">
    <div class="nav__container">
      <div class="nav__logo">IdeiasBoard</div>
      <div class="nav__links">
<!--         <router-link to="/">Home</router-link>-->
<!--         <router-link to="/boards">Create</router-link>-->
<!--         <a href="javascript:void(0)" @click="onCreateBoardClick()">Create</a>-->
        <Button label="Create" color="plain" text="blue" @click="onCreateBoardClick()"></Button>
      </div>
    </div>
  </div>

  <CreateBoardDialog ref="createBoardDialog"/>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { Button } from '../../common';
  import { CreateBoardDialog } from '../';

  // TODO: Extract types / interfaces
  interface ICBD {
    onCreateBoardOpen: () => void;
  }

  const createBoardDialog = ref<ICBD | null>(null);

  const state = reactive({});

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
      @apply space-x-4;
    }
  }
</style>
