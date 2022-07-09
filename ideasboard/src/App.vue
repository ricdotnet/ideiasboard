<template>
  <Nav></Nav>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
  import { Nav } from './components/blocks';
  import { usePocketbaseStore } from './stores/PocketbaseStore';

  const pocketbase = usePocketbaseStore();
  pocketbase.initClient();
</script>

<style lang="scss">
</style>
