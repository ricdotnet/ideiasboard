<template>
  <Dialog title="Create Board"
          :show-actions="true"
          :is-open="state.isCreatingBoard"
          :is-actioning="state.isSavingBoard"
          @on-close="onCreateBoardClose()"
          @on-submit="onCreateBoardSave()">
    <form class="flex flex-col space-y-3">
      <Input ref="name" id="name" label="Name"/>
      <Input ref="key" id="key" label="Key (optional)"/>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
  import { computed, reactive, ref } from 'vue';
  import { Dialog, Input } from '../../common';

  import { usePocketbaseStore } from '../../../stores';
  const pocketbase = usePocketbaseStore();

  interface IInput {
    getValue: () => void;
  }
  const name = ref<IInput>();
  const key = ref<IInput>();

  const state = reactive({
    isCreatingBoard: false,
    isSavingBoard: false,
    form: {
      name: computed(() => name.value?.getValue()),
      key: computed(() => key.value?.getValue()),
    }
  });

  function onCreateBoardOpen() {
    return state.isCreatingBoard = true;
  }

  async function onCreateBoardSave() {
    state.isSavingBoard = true;
    const record = await pocketbase.getClient.Records.create('boards', {
      name: state.form.name,
    });
    state.isSavingBoard = false;
    state.isCreatingBoard = false;
  }

  function onCreateBoardClose() {
    return state.isCreatingBoard = false;
  }

  defineExpose({ onCreateBoardOpen });
</script>

<style scoped lang="scss">
</style>
