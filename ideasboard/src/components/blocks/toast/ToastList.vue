<template>
  <div class="toast-list">
    <TransitionSlot type="group" name="fade">
      <div class="toast-list__toast"
           v-for="(toast) in state.toasts" :key="toast.id"
           @click="removeToast(toast.id)">
        <Icon :type="toast.type"/>
        <div>{{ toast.content }}</div>
      </div>
    </TransitionSlot>
  </div>
</template>

<script setup lang="ts">
  import { defineComponent, h, PropType, reactive } from 'vue';
  import { useToast } from '../../../composables';
  import { TransitionSlot } from '../../common';
  import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/vue/solid';
  import { ToastType } from '../../../types';

  const { getToasts, removeToast } = useToast();
  const state = reactive({
    toasts: getToasts() ?? [],
  });

  const Icon = defineComponent({
    props: {
      type: String as PropType<ToastType>,
    },
    setup(props) {
      return () => [
        (props.type === 'success') ? h(CheckCircleIcon, { class: 'w-5 text-green-500' })
          : (props.type === 'error') ? h(XCircleIcon, { class: 'w-5 text-red-500' })
            : h(ExclamationCircleIcon, { class: 'w-5 text-amber-500' })
      ];
    }
  });
</script>

<style scoped lang="scss">
  .toast-list {
    @apply fixed bottom-3 left-3;

    &__toast {
      @apply px-7 py-5 bg-white border border-gray-600;
      @apply rounded-md flex items-center space-x-2;

      &:not(:last-of-type) {
        @apply mb-5;
      }
    }
  }
</style>
