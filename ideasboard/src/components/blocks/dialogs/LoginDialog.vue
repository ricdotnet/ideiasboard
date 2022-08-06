<template>
  <Dialog title="Login with OTP"
          :show-actions="true"
          :is-open="state.isSignInOpen"
          :is-actioning="state.isSigningIn"
          submit-label="Login"
          @on-close="onLoginClose()"
          @on-submit="onLoginSubmit()">
    <template v-if="state.isError">
      <ErrorMessage message="Could not login. Please try again."/>
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

  // TODO: This should filter emails only too
  async function onLoginSubmit() {
    if ( !email.value?.getValue() ) return;
    state.isSigningIn = true;
    const { error, data } = await doAuth(email.value?.getValue<string>());

    if ( error !== undefined ) {
      state.isError = true;
      setTimeout(() => state.isError = false, 10000);
    }

    if ( data !== undefined ) {
      emits('onLoginSuccess');
    }

    state.isSigningIn = false;
  }

  defineExpose({ onLoginOpen });
</script>

<style scoped lang="scss">
</style>
