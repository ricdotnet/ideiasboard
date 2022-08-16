<template>
  <div class="text-3xl">boards page....</div>
  <template v-if="!state.boards">
    You have not created or interacted with any board.
  </template>
  <template v-else>
    <div>
      {{ state.boards }}
    </div>
  </template>
</template>

<script setup lang="ts">
  import { computed, reactive } from 'vue';
  import { useUserStore } from '../stores';

  const userStore = useUserStore();

  const state = reactive({
    boards: computed(() => userStore.boards ?? null)
  });

  defineExpose({ state });
</script>

<style scoped lang="scss">
</style>
