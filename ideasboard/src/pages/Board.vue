<template>
  <template v-if="state.loading">Loading ...</template>
  <template v-else-if="!state.loading && !state.board.key">
    <BoardNotFound/>
  </template>
  <template v-else>
    <div class="flex items-center space-x-2">
      <Input class="w-full" ref="ideia" id="ideia"/>
      <Button label="Add"
              color="plain"
              text="blue"
              @click="onClickAddIdeia()"
              :disabled="state.isAddingIdeia">
        <Loading :is-loading="state.isAddingIdeia"/>
      </Button>
    </div>
    <div class="mb-5">
      {{ state.board.name }}
    </div>
    <template v-if="!state.ideias.length">No ideias on this board yet.</template>
    <div class="grid grid-cols-2 laptop:grid-cols-4 wide:grid-cols-5 gap-2">
      <TransitionSlot type="group" name="bounce">
        <div v-for="(ideia, index) of state.ideias" :key="index">
          <IdeiaItem :ideia="ideia"
                     :board="state.board.key"
                     :client-id="sub.getClientId"
                     @on-liked="sortIdeias()"
          />
        </div>
      </TransitionSlot>
    </div>

    <ShareableLink :link="resolveShareableLink()"/>
  </template>
</template>

<script setup lang="ts">
  import { inject, onBeforeMount, onUnmounted, reactive, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import { Button, Input, Loading, TransitionSlot } from '../components/common';
  import { BoardNotFound, IdeiaItem, ShareableLink } from '../components/blocks';
  import { useSubscriptionStore } from '../stores';
  import { IBoard, IBoardPageState, IIdea } from '../types';
  import { processBoard } from '../services';

  interface IInput {
    getValue: () => void;
    resetValue: () => void;
  }

  const base = inject('base');
  const api = inject('api');
  const { params } = useRoute();
  const sub = useSubscriptionStore();
  const ideia = ref<IInput>();

  const state = reactive<IBoardPageState>({
    loading: true,
    board: {} as IBoard,
    ideias: [],
    isAddingIdeia: false,
  });

  onBeforeMount(async () => {
    axios.get(`${api}/api/board/${params['key']}`)
      .then((response) => processBoard(state, sub, params)(response.data.board))
      .catch(() => {
        console.error('Could not fetch board.');
        state.loading = false;
      });
  });

  onUnmounted(() => {
    sub.unsub();
  });

  function onClickAddIdeia() {
    if ( !ideia.value?.getValue() ) return;

    axios.post(`${api}/api/ideia`, {
      board: params['key'],
      clientId: sub.getClientId,
      content: ideia.value?.getValue(),
    })
      .then(() => {
        ideia.value?.resetValue();
      }).catch(() => console.error('Could not add ideia.'));
  }

  function sortIdeias() {
    state.ideias = state.ideias.sort((a: IIdea, b: IIdea) => b.likes - a.likes);
  }

  function resolveShareableLink(): string {
    return `${base}/board/${params['key']}`;
  }
</script>

<style lang="scss" scoped>
</style>
