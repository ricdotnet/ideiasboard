<template>
  <template v-if="state.loading">
    Loading...
  </template>
  <template v-else>
    <ToastList/>
    <Nav></Nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </template>
</template>

<script setup lang="ts">
  import { onBeforeMount, reactive } from 'vue';
  import { Nav, ToastList } from './components/blocks';
  import { useAuth, useLocalStorage } from './composables';
  import { unwrap } from './utils';
  import { userStore } from './stores/UserStore';

  const { value, remove } = useLocalStorage();
  const { authenticate } = useAuth();

  const state = reactive({
    loading: true,
  });

  onBeforeMount(async () => {
    // if there is no token we kill it straight away
    const token = unwrap<string>(value('token'));
    if ( !token ) return state.loading = false;

    // if there is a token we should authenticate and grab the current user email
    const { error, data } = await authenticate(token);

    if ( error ) {
      remove('token');
      state.loading = false;
    }

    if ( data ) {
      userStore.$patch({
        email: data.email
      });
      state.loading = false;
    }
  });
</script>
