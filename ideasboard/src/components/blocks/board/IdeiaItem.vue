<template>
  <div class="ideia-item">
    {{ ideia.content }}
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive } from 'vue';

  const props = defineProps<{
    ideia: object,
  }>();

  const state = reactive({
    ideia: computed(() => props.ideia),
  });
</script>

<style scoped lang="scss">
  @import "../../../assets/_defaults.scss";

  .ideia-item {
    @apply border border-gray-300 rounded-md shadow text-sm px-4 py-2;
  }
</style>
