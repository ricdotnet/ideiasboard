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
      <div v-for="({key, name, ideias, created_at}, index) in state.boards.owned" :key="index">
        <router-link :to="'/board/' + key">{{ key }}</router-link>
        :: {{ name }} :: {{ ideias }} :: {{ new Date(created_at).toDateString() }}
      </div>
    </div>
    <div class="list">
      Other Boards
      <div v-for="({key, name, ideias, created_at}, index) in state.boards.other" :key="index">
        <router-link :to="'/board/' + key">{{ key }}</router-link>
        :: {{ name }} :: {{ ideias }} :: {{ new Date(created_at).toDateString() }}
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
  import { computed, ComputedRef, onBeforeMount, reactive } from 'vue';
  import { userStore } from '../stores/UserStore';
  import { useBoard } from '../composables';
  import { IUserBoards } from '../types';

  const { getAllBoards } = useBoard();

  interface IState {
    loading: boolean;
    boards: ComputedRef<IUserBoards | null>;
  }

  const state = reactive<IState>({
    loading: true,
    boards: computed(() => userStore.$boards ?? null)
  });

  onBeforeMount(async () => {
    await getAllBoards();
    state.loading = false;
  });
</script>

<style scoped lang="scss">
  .list {
    &:last-of-type {
      @apply mt-10;
    }
  }
</style>
