<template>
  <Dialog title="Check your Email"
          :is-open="state.isLoginActionMessageDialogOpen"
          :is-actioning="state.isLoginActionMessageDialogOpen"
          @on-close="onLoginActionMessageDialogClose()">
    Please check your email for a Login link. Click on it and you should be logged into the app.
  </Dialog>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { Dialog } from '../../common';

  const state = reactive({
    isLoginActionMessageDialogOpen: false,
  });

  function onLoginActionMessageDialogClose() {
    state.isLoginActionMessageDialogOpen = false;
  }

  function onLoginActionMessageDialogOpen() {
    state.isLoginActionMessageDialogOpen = true;
  }

  defineExpose({ onLoginActionMessageDialogOpen });
</script>

<style scoped lang="scss">
</style>
