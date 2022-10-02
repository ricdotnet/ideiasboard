<template>
  <template v-if="state.isErrored && !state.isAuthing">
    <div>
      Something went wrong and we could not authenticate you.
    </div>
  </template>
  <template v-else-if="state.isSuccess && !state.isAuthing">
    <div>
      Authenticated! Redirecting in 3 seconds.
    </div>
  </template>
  <template v-else-if="state.isAuthing">
    <div>
      Authenticating, please hold on...
    </div>
  </template>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useAuth, useLocalStorage } from '../composables';

  const state = reactive({
    isAuthing: true,
    isErrored: false,
    isSuccess: false,
    accessToken: '',
  });

  const { token } = useRoute().query;
  const { tokenAuth } = useAuth();
  const { store } = useLocalStorage();

  async function authenticate() {
    if ( !token ) {
      state.isAuthing = false;
      state.isErrored = true;
    } else {
      if ( typeof token !== 'string' ) throw new Error('The token has to be of type string.');

      const { error, data } = await tokenAuth(<string>token);
      state.isAuthing = false;

      if ( error !== undefined ) {
        return state.isErrored = true;
      }

      if ( data !== undefined ) {
        state.isSuccess = true;
        store('token', ref(data.token));
        return setTimeout(() => window.location.href = '/', 3000);
      }

      // for now if there is no error or data just fail
      state.isErrored = true;
    }
  }

  onMounted(() => {
    authenticate();
  });

</script>

<style scoped lang="scss">
</style>
