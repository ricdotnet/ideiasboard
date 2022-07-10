<template>
  <Dialog title="Create Board"
          :show-actions="true"
          :is-open="state.isCreatingBoard"
          :is-actioning="state.isSavingBoard"
          @on-close="onCreateBoardClose()"
          @on-submit="onCreateBoardSave()">
    <form class="flex flex-col space-y-3">
      <Input ref="name" id="name" :label="`Name (${key})`"/>
      <Input ref="secret" id="secret" label="Secret (optional)"/>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
  import { computed, inject, reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Dialog, Input } from '../../common';
  import { v4 } from 'uuid';
  import axios from 'axios';

  interface IInput {
    getValue: () => void;
  }

  const api = inject('api');
  const router = useRouter();
  const name = ref<IInput>();
  const secret = ref<IInput>();
  const key = computed(() => v4());

  const state = reactive({
    isCreatingBoard: false,
    isSavingBoard: false,
    form: {
      name: computed(() => name.value?.getValue()),
      key: key,
      secret: computed(() => secret.value?.getValue()),
    },
  });

  function onCreateBoardOpen() {
    return state.isCreatingBoard = true;
  }

  async function onCreateBoardSave() {
    state.isSavingBoard = true;

    try {
      await axios.post(`${api}/api/board`, state.form);
      router.push(`/board/${key.value}`);
    } catch (error) {
      // handle error
    }

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
