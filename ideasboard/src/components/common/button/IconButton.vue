<template>
  <button class="icon-button" :class="state.color">
    <slot/>
  </button>
</template>

<script setup lang="ts">
  import { computed, reactive } from 'vue';

  const props = defineProps<{
    color: 'plain';
  }>();

  const state = reactive({
    color: computed(() => props.color),
  });

  defineExpose({ state });
</script>

<style scoped lang="scss">
  @import "../../../assets/defaults";

  .icon-button {
    @apply p-2 cursor-pointer rounded-md fast;

    &.plain {
      @apply hover:bg-gray-200 active:bg-gray-100;
    }
  }
</style>
