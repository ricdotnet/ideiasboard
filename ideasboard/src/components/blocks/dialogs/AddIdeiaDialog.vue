<template>
  <Dialog title="Add a new ideia"
          :show-actions="true"
          :is-open="state.isAddingNewIdeia"
          :is-actioning="state.isPostingNewIdeia"
          submit-label="Add"
          form-id="ideia-form"
          @on-close="onAddIdeiaClose">
    <template v-if="state.isError">
      <ErrorMessage message="Could not add ideia. Please try again."/>
    </template>
    <form id="ideia-form"
          enctype="application/x-www-form-urlencoded"
          class="flex flex-col space-y-3"
          @submit="onSubmitIdeia">
      <Input ref="ideia" id="ideia" label="Ideia" type="text" :required="true"/>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
  import { inject, reactive, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { subscriptionStore } from '../../../stores/SubscriptionStore';
  import { Dialog, ErrorMessage, Input } from '../../common';
  import axios from 'axios';

  interface IInput {
    getValue: () => void;
    resetValue: () => void;
  }

  const api = inject('api');
  const { params } = useRoute();
  const ideia = ref<IInput>();

  const state = reactive({
    isAddingNewIdeia: false,
    isPostingNewIdeia: false,
    isError: false,
  });

  function onAddIdeiaOpen() {
    state.isAddingNewIdeia = true;
  }

  function onAddIdeiaClose() {
    state.isAddingNewIdeia = false;
    state.isPostingNewIdeia = false;
    state.isError = false;
  }

  function onSubmitIdeia(e: any) {
    e.preventDefault();
    e.stopPropagation();

    state.isPostingNewIdeia = true;
    if ( !ideia.value?.getValue() ) return;

    axios.post(`${api}/api/ideia`, {
      board: params['key'],
      clientId: subscriptionStore.$clientId,
      content: ideia.value?.getValue(),
    })
      .then(() => {
        ideia.value?.resetValue();
        onAddIdeiaClose();
      }).catch(() => console.error('Could not add ideia.'));
  }

  defineExpose({ onAddIdeiaOpen });
</script>

<style scoped lang="scss">
</style>
