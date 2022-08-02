<template>
  <div>
    The Board you tried to join does not exist.
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';

  const state = reactive({});

  defineExpose({ state });
</script>

<style scoped lang="scss">
</style>
