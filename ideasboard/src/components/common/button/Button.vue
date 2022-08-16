<template>
  <button class="button" :class="`${state.color} ${state.text}`" :form="state.form">
    <div>{{ state.label }}</div>
    <slot/>
  </button>
</template>

<script setup lang="ts">
  import { computed, reactive } from 'vue';

  const props = defineProps<{
    label?: string;
    color?: 'plain' | 'slate' | 'sky' | 'red' | 'green';
    text?: 'blue' | 'black' | 'white' | 'red';
    form?: string;
  }>();

  const state = reactive({
    label: computed(() => props.label),
    color: computed(() => 'b-' + props.color),
    text: computed(() => 't-' + props.text),
    form: computed(() => props.form),
  });

  defineExpose({ state });
</script>

<style scoped lang="scss">
  @import "../../../assets/defaults";

  .button {
    @apply px-5 py-2 font-bold rounded-md fast text-white outline-none flex space-x-1 items-center;

    &.b-plain {
      @apply hover:bg-gray-200 active:bg-gray-100;
    }

    &.b-slate {
      @apply bg-slate-500 hover:bg-slate-600 active:bg-slate-700;
    }

    &.b-sky {
      @apply bg-sky-400 hover:bg-sky-500 active:bg-sky-600;
    }

    &.b-red {
      @apply bg-red-400 hover:bg-red-500 active:bg-red-600;
    }

    &.b-green {
      @apply bg-green-400 hover:bg-green-500 active:bg-green-600 disabled:bg-green-200;
    }

    &.t-blue {
      @apply text-blue-600;
    }

    &.t-black {
      @apply text-black;
    }

    &.t-white {
      @apply text-white;
    }

    &.t-red {
      @apply text-red-600;
    }
  }
</style>
