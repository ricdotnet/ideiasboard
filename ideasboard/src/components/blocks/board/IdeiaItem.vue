<template>
  <div class="ideia-item">
    <div class="ideia-item__content scrollbar">{{ state.ideia.content }}</div>
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
  import { IIdea } from '../../../types';

  const api = inject('api');

  const props = defineProps<{
    ideia: IIdea;
    board: string;
    clientId: string;
  }>();

  const state = reactive({
    ideia: computed(() => props.ideia),
    board: props.board,
    clientId: props.clientId,
  });

  const emits = defineEmits<{
    (event: 'onLiked'): void;
  }>();

  async function onClickLikeIdeia() {
    await axios.patch(`${api}/api/ideia/like`, {
      ideia: state.ideia.id,
      board: state.board,
      clientId: state.clientId,
    }).then(() => {
      emits('onLiked');
    });
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/_defaults.scss";

  .ideia-item {
    @apply border border-gray-300 rounded-md shadow text-sm overflow-hidden;

    &__content {
      @apply h-[130px] overflow-y-scroll w-full p-2;
    }

    &__bottom {
      @apply flex items-center space-x-2 mt-2 p-2 shadow-top;
    }
  }
</style>
