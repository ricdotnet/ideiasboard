<template>
  <template v-if="state.loading">Loading ...</template>
  <template v-else-if="!state.loading && !state.board">
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

<!-- TODO: refactor this component... extract logic to services -->
<script setup lang="ts">
  import { inject, onBeforeMount, onUnmounted, reactive, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { Button, Input, Loading, TransitionSlot } from '../components/common';
  import { BoardNotFound, IdeiaItem, ShareableLink } from '../components/blocks';
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
</style>
