<template>
  <div>
    <label v-if="state.label" :for="state.id" class="label">{{ state.label }}</label>
    <input ref="input"
           :id="state.id"
           class="input"
           @keyup="onInputChange()"
           :disabled="state.disabled"
           :value="state.customValue"/>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, ref } from 'vue';
  // import { useDebounce } from '../../../hooks';

  const input = ref<HTMLInputElement | undefined>();

  const props = defineProps<{
    id: string;
    label?: string;
    disabled?: string;
    value?: string;
  }>();

  const state = reactive({
    id: props.id,
    label: computed(() => props.label),
    value: <string | undefined>'',
    disabled: computed(() => props.disabled),
    customValue: computed(() => props.value)
  });

  // TODO: useDebounce is not good here??
  // const onInputChange = useDebounce(() => {
  //   state.value = input.value?.value;
  // });
  function onInputChange() {
    state.value = input.value?.value;
  }

  function getValue() {
    return state.value;
  }

  function resetValue() {
    state.value = '';
    return input.value!.value = '';
  }

  defineExpose({ getValue, resetValue });
</script>

<style scoped lang="scss">
  .input {
    @apply px-5 py-2 border border-gray-300 w-full outline-none rounded-md;
  }

  .label {
    @apply pl-5
  }
</style>
