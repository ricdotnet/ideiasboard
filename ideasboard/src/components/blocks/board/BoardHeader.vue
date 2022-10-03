<template>
  <AddIdeiaDialog ref="addIdeiaDialog"/>
  <div class="board-header">
    <div class="board-header__name">{{ props.board.name }}</div>
    <Button label="New Ideia"
            color="plain"
            text="blue"
            @click="onClickAddIdeia()"
            :disabled="state.isAddingIdeia">
      <Loading :is-loading="state.isAddingIdeia"/>
    </Button>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { IAddIdeiaDialog, IBoard } from '../../../types';
  import { Button, Loading } from '../../common';
  import { AddIdeiaDialog } from '../../blocks';

  const addIdeiaDialog = ref<IAddIdeiaDialog>();

  const props = defineProps<{
    board: IBoard;
  }>();

  const state = reactive({
    isAddingIdeia: false,
  });

  function onClickAddIdeia() {
    addIdeiaDialog.value?.onAddIdeiaOpen();
  }
</script>

<style scoped lang="scss">
  .board-header {
    @apply flex justify-between mb-8;

    &__name {
      @apply text-2xl;
    }
  }

</style>
