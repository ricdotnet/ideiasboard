<template>
  <Nav></Nav>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
  import { Nav } from './components/blocks';
</script>

<style lang="scss">
</style>
