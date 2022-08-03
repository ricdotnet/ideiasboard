<template>
  <Dialog title="Login with OTP"
          :show-actions="true"
          :is-open="state.isSignInOpen"
          :is-actioning="state.isSigningIn"
          submit-label="Login"
          @on-close="onLoginClose()"
          @on-submit="onLoginSubmit()">
    <form class="flex flex-col space-y-3">
      <Input ref="email" id="email" label="Email"/>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { Dialog, Input } from '../../common';
  import { useAuth } from '../../../hooks';

  const { doAuth } = useAuth();

  interface IInput {
    getValue: () => void;
  }

  const email = ref<IInput>();

  const state = reactive({
    isSignInOpen: false,
    isSigningIn: false,
  });

  function onLoginOpen() {
    state.isSignInOpen = true;
  }

  function onLoginClose() {
    state.isSignInOpen = false;
  }

  function onLoginSubmit() {
    state.isSigningIn = true;
    doAuth('me@rrocha.uk');
    state.isSigningIn = false;
  }

  defineExpose({ onLoginOpen });
</script>

<style scoped lang="scss">
</style>
