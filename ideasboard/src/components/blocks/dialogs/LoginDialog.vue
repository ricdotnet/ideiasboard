<template>
  <Dialog title="Login with OTP"
          :show-actions="true"
          :is-open="state.isSignInOpen"
          :is-actioning="state.isSigningIn"
          submit-label="Login"
          @on-close="onLoginClose()"
          @on-submit="onLoginSubmit()">
    <template v-if="state.isError">
      <ErrorMessage message="Could not login. Please try again." />
    </template>
    <form class="flex flex-col space-y-3">
      <Input ref="email" id="email" label="Email" type="email"/>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { Dialog, ErrorMessage, Input } from '../../common';
  import { useAuth } from '../../../hooks';

  interface IInput {
    getValue: <T>() => T;
  }

  const { doAuth } = useAuth();
  const email = ref<IInput>();

  const emits = defineEmits<{
    (event: 'onLoginSuccess'): void;
    (event: 'onLoginError'): void;
  }>();

  const state = reactive({
    isSignInOpen: false,
    isSigningIn: false,
    isError: false,
  });

  function onLoginOpen() {
    state.isSignInOpen = true;
  }

  function onLoginClose() {
    state.isSignInOpen = false;
  }

  function successCb() {
    emits('onLoginSuccess');
  }

  function errorCb() {
    // emits('onLoginError');
    state.isError = true;
    setTimeout(() => state.isError = false, 5000);
  }

  // TODO: This should filter emails only too
  function onLoginSubmit() {
    if ( !email.value?.getValue() ) return;
    state.isSigningIn = true;
    doAuth(email.value?.getValue<string>(), successCb, errorCb);
    state.isSigningIn = false;
  }

  defineExpose({ onLoginOpen });
</script>

<style scoped lang="scss">
</style>
