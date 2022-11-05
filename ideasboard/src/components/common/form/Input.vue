<template>
  <div>
    <label v-if="state.label" :for="state.id" class="label">{{ state.label }}</label>
    <input ref="input"
           class="input"
           :id="state.id"
           :type="state.type"
           :disabled="state.disabled"
           :value="state.customValue"
           :required="state.required"
           @keyup="onInputChange()"/>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, ref } from 'vue';
  // import { useDebounce } from '../../../composables';

  const input = ref<HTMLInputElement>();

  const props = defineProps<{
    id: string;
    label?: string;
    disabled?: boolean;
    value?: string;
    type?: string;
    required?: boolean;
  }>();

  const state = reactive({
    id: props.id,
    label: computed(() => props.label),
    value: <string | undefined>'',
    disabled: props.disabled ?? false,
    customValue: computed(() => props.value),
    type: computed(() => props.type || 'text'),
    required: computed(() => props.required || false),
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

    &:focus-visible {
      @apply outline outline-black;
    }

    @apply px-5 py-2 border border-gray-300 w-full outline-none rounded-md;
  }

  .label {
    @apply pl-5
  }
</style>
