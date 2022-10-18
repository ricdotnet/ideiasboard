<template>
  <div class="h-auto pb-[118px] mb-10">
    <template v-if="state.loading">Loading ...</template>
    <template v-else-if="!state.loading && !state.board.key">
      <BoardNotFound/>
    </template>
    <template v-else>
      <BoardHeader :board="state.board"/>
      <template v-if="!state.ideias.length">No ideias on this board yet.</template>
      <div class="grid grid-cols-2 laptop:grid-cols-4 wide:grid-cols-5 gap-2">
        <TransitionSlot type="group" name="bounce">
          <div v-for="(ideia, index) of state.ideias" :key="index">
            <IdeiaItem :ideia="ideia"
                       :board="state.board.key"
                       :client-id="subscriptionStore.$clientId"
                       @on-liked="sortIdeias()"
            />
          </div>
        </TransitionSlot>
      </div>
    </template>

    <ShareableLink id="shareable-link" :link="resolveShareableLink()"/>
  </div>
</template>

<script setup lang="ts">
  import { inject, onBeforeMount, onUnmounted, reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import { TransitionSlot } from '../components/common';
  import { BoardHeader, BoardNotFound, IdeiaItem, ShareableLink } from '../components/blocks';
  import { subscriptionStore } from '../stores/SubscriptionStore';
  import { IBoard, IBoardPageState, IIdea } from '../types';
  import { processBoard } from '../services';

  const base = inject('base');
  const api = inject('api');
  const { params } = useRoute();

  const state = reactive<IBoardPageState>({
    loading: true,
    board: {} as IBoard,
    ideias: [],
    isAddingIdeia: false,
  });

  onBeforeMount(async () => {
    axios.get(`${api}/board/${params['key']}`)
      .then((response) => processBoard(state, subscriptionStore, params)(response.data.board))
      .catch(() => {
        console.error('Could not fetch board.');
        state.loading = false;
      });
  });

  onUnmounted(() => {
    subscriptionStore.unsub();
  });

  function sortIdeias() {
    state.ideias = state.ideias.sort((a: IIdea, b: IIdea) => b.likes - a.likes);
  }

  function resolveShareableLink(): string {
    return `${base}/board/${params['key']}`;
  }
</script>

<style lang="scss" scoped>
</style>
