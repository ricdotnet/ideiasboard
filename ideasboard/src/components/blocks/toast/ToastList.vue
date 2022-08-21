<template>
  <div class="toast-list">
    <TransitionSlot type="group" name="fade">
      <div class="toast-list__toast"
           v-for="(toast) in state.toasts" :key="toast.id"
           @click="removeToast(toast.id)">
        {{ toast }}
      </div>
    </TransitionSlot>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useToast } from '../../../composables';
  import { TransitionSlot } from '../../common';

  const { getToasts, removeToast } = useToast();
  const state = reactive({
    toasts: getToasts() ?? [],
  });
</script>

<style scoped lang="scss">
  .toast-list {
    @apply absolute bottom-3 left-3;

    &__toast {
      @apply px-7 py-5 bg-white border border-gray-600;

      &:not(:last-of-type) {
        @apply mb-5;
      }
    }
  }
</style>
