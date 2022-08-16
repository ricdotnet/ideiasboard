<template>
  <template v-if="state.loading">Loading ...</template>
  <template v-else-if="!state.loading && !state.board">
    <BoardNotFound />
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
    <div v-if="!state.ideias.length">No ideias on this board yet.</div>
    <div class="grid grid-cols-2 xl:grid-cols-3 gap-2">
      <TransitionGroup name="ideia">
        <div v-for="(ideia, index) of state.ideias" :key="index">
          <IdeiaItem :ideia="ideia"
                     :board="state.board.key"
                     :client-id="sub.getClientId"
                     @on-liked="sortIdeias()"
          />
        </div>
      </TransitionGroup>
    </div>

    <ShareableLink :link="resolveShareableLink()"/>
  </template>
</template>

<!-- TODO: refactor this component... extract logic to services -->
<script setup lang="ts">
  import { inject, onBeforeMount, onUnmounted, reactive, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { Button, Input, Loading } from '../components/common';
  import { IdeiaItem, ShareableLink, BoardNotFound } from '../components/blocks';
  import { useSubscriptionStore } from '../stores';
  import axios from 'axios';

  interface IInput {
    getValue: () => void;
    resetValue: () => void;
  }

  const base = inject('base');
  const api = inject('api');
  const { params } = useRoute();
  const sub = useSubscriptionStore();
  const ideia = ref<IInput>();

  const state = reactive({
    loading: true,
    board: null,
    ideias: <any>[],
    isAddingIdeia: false,
  });

  onBeforeMount(async () => {
    axios.get(`${api}/api/board/${params['key']}`)
      .then(({ data }) => {
        state.board = data.boardData;
        state.ideias = data.ideias.sort((a: any, b: any) => b.likes - a.likes);
        sub.subscribe(params['key']);
        sub.getSub.addEventListener('ES_IDEIA', (e: any) => {
          addNote(JSON.parse(e.data));
        });
        sub.getSub.addEventListener('ES_IDEIA_LIKE', (e: any) => {
          const data = JSON.parse(e.data);
          // todo: maybe refactor this...
          state.ideias.map((i: any) => {
            if ( i.id === +data.ideia ) {
              i.likes++;
            }
          });
          state.ideias.sort((a: any, b: any) => b.likes - a.likes);
        });

        document.title = `Board: ${state.board.name}`;
      }).catch(({ response }) => {
      if ( response.status === 404 ) {
        console.error(response.data.error);
      }
    });

    state.loading = false;
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
      .then(({ data }) => {
        // console.log(data);
        ideia.value?.resetValue();
      }).catch(({ response }) => {
      // console.error(response.error);
    });
  }

  function addNote({ ideia }: any) {
    state.ideias.push({ id: ideia.id, content: ideia.content, likes: 0 });
  }

  function sortIdeias() {
    state.ideias = state.ideias.sort((a: any, b: any) => b.likes - a.likes);
  }

  function resolveShareableLink(): string {
    return `${base}/board/${params['key']}`;
  }
</script>

<style lang="scss" scoped>
  .ideia-enter-active,
  .ideia-leave-active {
    transition: transform 0.3s cubic-bezier(0, 1.82, .71, .76);
  }

  .ideia-enter-from,
  .ideia-leave-to {
    @apply scale-0;
  }
</style>
