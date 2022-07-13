<template>
  <div class="ideia-item">
    <div>{{ state.ideia.content }}</div>
    <div class="ideia-item__bottom">
      <IconButton color="plain" @click="onClickLikeIdeia()">
        <ThumbUpIcon class="w-3"/>
      </IconButton>
      <div>{{ state.ideia.likes }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, inject, reactive } from 'vue';
  import { IconButton } from '../../common';
  import { ThumbUpIcon } from '@heroicons/vue/solid';
  import axios from 'axios';

  const api = inject('api');

  const props = defineProps<{
    ideia: object;
    board: string;
    clientId: string;
  }>();

  const state = reactive({
    ideia: computed(() => props.ideia),
    board: props.board,
    clientId: props.clientId,
  });

  async function onClickLikeIdeia() {
    await axios.patch(`${api}/api/ideia/like`, {
      ideia: state.ideia.id,
      board: state.board,
      clientId: state.clientId,
    });
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/_defaults.scss";

  .ideia-item {
    @apply border border-gray-300 rounded-md shadow text-sm px-4 py-2 bg-white;

    &__bottom {
      @apply flex items-center space-x-2 mt-2;
    }
  }
</style>
