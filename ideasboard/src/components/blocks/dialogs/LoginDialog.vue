<template>
  <Dialog title="Login with Email"
          :show-actions="true"
          :is-open="state.isSignInOpen"
          :is-actioning="state.isSigningIn"
          submit-label="Login"
          form-id="login-form"
          @on-close="onLoginClose()">
    <template v-if="state.isError">
      <ErrorMessage message="Could not login. Please try again."/>
    </template>
    <form id="login-form"
          enctype="application/x-www-form-urlencoded"
          class="flex flex-col space-y-3"
          @submit="onLoginSubmit">
      <Input ref="email" id="email" label="Email" type="email" :required="true"/>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { Dialog, ErrorMessage, Input } from '../../common';
  import { useAuth } from '../../../composables';

  interface IInput {
    getValue: <T>() => T;
  }

  const { emailAuth } = useAuth();
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

  async function onLoginSubmit(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    if ( !email.value?.getValue() ) return;
    state.isSigningIn = true;
    const { error, data } = await emailAuth(email.value?.getValue<string>());

    if ( error !== undefined ) {
      state.isError = true;
      setTimeout(() => state.isError = false, 10000);
    }

    if ( data !== undefined ) {
      emits('onLoginSuccess');
    }

    state.isSigningIn = false;
  }

  defineExpose({ onLoginOpen, onLoginClose });
</script>

<style scoped lang="scss">
</style>
