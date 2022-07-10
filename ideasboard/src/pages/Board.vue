<template>
  <template v-if="state.loading">Loading ...</template>
  <template v-else-if="!state.loading && !state.board">
    The board you are looking for does not exist.
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
    <template v-else>
      <div class="grid grid-cols-4 gap-2">
        <div v-for="(ideia, index) of state.ideias" :key="index">
          <IdeiaItem :ideia="ideia"/>
        </div>
      </div>
    </template>

    <!-- shareable link -->
    <div class="mt-16">
      <div class="text-lg pl-3">Share this link with your team and start brainstorming.</div>
      <div class="flex items-center space-x-2">
        <Input class="w-full" id="link" disabled="true" :value="resolveShareableLink()"/>
        <IconButton color="plain">
          <ClipboardCopyIcon class="w-5"/>
        </IconButton>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
  import { inject, onBeforeMount, reactive, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { Button, IconButton, Input, Loading } from '../components/common';
  import { IdeiaItem } from '../components/blocks';
  import { useSubscriptionStore } from '../stores/SubscriptionStore';
  import { ClipboardCopyIcon } from '@heroicons/vue/solid';
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

  onBeforeMount(async () => {
    axios.get(`${api}/api/board/${params['key']}`)
      .then(({ data }) => {
        state.board = data.boardData;
        state.ideias = [...data.ideias];
        sub.subscribe(params['key']);
        sub.getSub.addEventListener('ES_IDEIA', (e: any) => {
          addNote(JSON.parse(e.data));
        });
      }).catch(({ response }) => {
      if ( response.status === 404 ) {
        console.error(response.data.error);
      }
    });

    state.loading = false;
  });

  const state = reactive({
    loading: true,
    board: {},
    ideias: <any>[],
    isAddingIdeia: false,
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

  function addNote(ideia: any) {
    state.ideias.push(ideia);
  }

  function resolveShareableLink(): string {
    return `${base}/#/board/${params['key']}`;
  }
</script>

<style lang="scss" scoped>
</style>
