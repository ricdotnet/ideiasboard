<template>
  <div class="text-3xl">home page...</div>
</template>

<script setup lang="ts">
  import { reactive, onMounted } from 'vue';
  import {usePocketbaseStore} from '../stores/PocketbaseStore';

  const pocketbase = usePocketbaseStore();

  onMounted(async () => {
    // const records = await pocketbase.getClient.Records.getList('boards');
    // console.log(records.items);
  });

  const state = reactive({});

  defineExpose({ state });
</script>

<style scoped lang="scss">
</style>
