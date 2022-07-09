<template>
  <div>
    <label v-if="state.label" :for="state.id" class="label">{{ state.label }}</label>
    <input ref="input" :id="state.id" class="input" @keyup="onInputChange()" />
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, ref } from 'vue';
  import { useDebounce } from '../../../hooks';

  const input = ref<HTMLInputElement | undefined>();

  const props = defineProps<{
    id: string;
    label?: string;
  }>();

  const state = reactive({
    id: props.id,
    label: computed(() => props.label),
    value: <string | undefined>'',
  });

  const onInputChange = useDebounce(() => {
    const value = input.value?.value;
    state.value = value;
  });

  function getValue() {
    return state.value;
  }

  defineExpose({ getValue });
</script>

<style scoped lang="scss">
  .input {
    @apply px-5 py-2 border border-gray-300 w-full outline-none rounded-md;
  }

  .label {
    @apply pl-5
  }
</style>
