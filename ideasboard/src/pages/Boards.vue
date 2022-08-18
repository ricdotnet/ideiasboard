<template>
  <template v-if="state.loading">
    Loading boards...
  </template>
  <template v-else-if="!state.boards">
    You have not created or interacted with any board.
  </template>
  <template v-else>
    <div class="list">
      My Boards
      <div v-for="({key, name}, index) in state.boards.owned" :key="index">
        <router-link :to="'/board/' + key">{{ key }}</router-link>
        :: {{ name }}
      </div>
    </div>
    <div class="list">
      Other Boards
      <div v-for="({board, name}, index) in state.boards.other" :key="index">
        <router-link :to="'/board/' + board">{{ board }}</router-link>
        :: {{ name }}
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
  import { computed, ComputedRef, onBeforeMount, reactive } from 'vue';
  import { useUserStore } from '../stores';
  import { useBoard } from '../composables';
  import { IUserBoards } from '../types';

  const userStore = useUserStore();
  const { getAllBoards } = useBoard();

  interface IState {
    loading: boolean;
    boards: ComputedRef<IUserBoards>;
  }

  const state = reactive<IState>({
    loading: true,
    boards: computed(() => userStore.boards ?? null)
  });

  onBeforeMount(async () => {
    await getAllBoards();
    state.loading = false;
  });

  defineExpose({ state });
</script>

<style scoped lang="scss">
  .list {
    &:last-of-type {
      @apply mt-10;
    }
  }
</style>
