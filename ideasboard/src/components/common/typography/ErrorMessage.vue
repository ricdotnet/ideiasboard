<template>
  <div class="text-red-600">
    {{ props.message }}
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    message: string;
  }>();
</script>

<style scoped lang="scss">
</style>
