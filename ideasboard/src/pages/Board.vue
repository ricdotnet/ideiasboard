<template>
  <template v-if="state.loading">Loading ...</template>
  <template v-else>
    <div class="mb-5">
      {{ state.board.name }}
    </div>
    <div v-if="!state.notes.length">No notes on this board.</div>
    <template v-else>
      <div v-for="(note, index) of state.notes" :key="index">
        {{ note.content }}
      </div>
    </template>
  </template>
</template>

<script setup lang="ts">
  import { onBeforeMount, reactive } from 'vue';
  import { useRoute } from 'vue-router';

  import { usePocketbaseStore } from '../stores';

  const { params } = useRoute();
  const pocketbase = usePocketbaseStore();

  onBeforeMount(async () => {
    state.board = await pocketbase.getClient.Records.getOne('boards', <string>params['id']);

    const notes = await pocketbase.getClient.Records.getList('notes', 20, 10, { filter: `board='${params['id']}'`, sort: '+created' });
    state.notes = notes.items;

    pocketbase.subToCollection('notes');

    state.loading = false;
    // state.evtSource = new EventSource('http://localhost:3200/api/realtime', {
    //   withCredentials: false
    // });
    //
    // state.evtSource.onmessage = (e: any) => {
    //   console.log(e.data);
    // };
  });

  const state = reactive({
    loading: true,
    board: <any>'',
    notes: <any>[],
    evtSource: <any>'',
  });
</script>

<style lang="scss" scoped>
</style>
