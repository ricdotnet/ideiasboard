<template>
  <Transition name="dialog">
    <template v-if="state.isOpen">
      <div class="dialog-full">
        <div class="dialog-full__box dialog">
          <div class="header">
            <div class="header__title">{{ state.title }}</div>
            <IconButton color="plain" @click="onClickDialogClose()" :disabled="state.isActioning">
              <XIcon class="header__close"/>
            </IconButton>
          </div>
          <div class="body">
            <slot></slot>
          </div>
          <template v-if="state.showActions">
            <div class="footer">
              <Button label="Cancel"
                      color="plain"
                      text="red"
                      @click="onClickDialogClose()"
                      :disabled="state.isActioning">
              </Button>
              <Button :label="state.submitLabel"
                      color="plain"
                      text="blue"
                      @click="onClickDialogSubmit()"
                      :disabled="state.isActioning">
                <Loading :is-loading="state.isActioning"/>
              </Button>
            </div>
          </template>
        </div>
      </div>
    </template>
  </Transition>
</template>

<script setup lang="ts">
  import { computed, onBeforeMount, onBeforeUnmount, reactive } from 'vue';
  import { XIcon } from '@heroicons/vue/solid';
  import { Button, IconButton, Loading } from '../';

  onBeforeMount(() => {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if ( e.key === 'Escape' && !state.isActioning ) {
        doDialogClose();
      }
    });
  });

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', () => {
      // nothing
    });
  });

  const props = defineProps<{
    showActions?: boolean;
    isActioning: boolean;
    isOpen: boolean;
    title: string;
    submitLabel: string;
  }>();

  const emits = defineEmits<{
    (event: 'onSubmit'): void,
    (event: 'onClose'): void,
  }>();

  const state = reactive({
    showActions: computed(() => props.showActions || false),
    isActioning: computed(() => props.isActioning),
    isOpen: computed(() => props.isOpen),
    title: props.title || 'Dialog',
    submitLabel: computed(() => props.submitLabel),
  });

  function onClickDialogSubmit() {
    return doDialogSubmit();
  }

  function doDialogSubmit() {
    return emits('onSubmit');
  }

  function onClickDialogClose() {
    return doDialogClose();
  }

  function doDialogClose() {
    return emits('onClose');
  }

  defineExpose({ state });
</script>

<style scoped lang="scss">
  @import "../../../assets/defaults";

  .dialog-full {
    @apply w-full h-full bg-slate-900 absolute top-0 bg-opacity-20;

    &__box {
      @apply w-auto h-auto bg-white px-10 py-5 shadow-sm min-w-[450px] rounded-md;
      @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;

      .header {
        @apply flex justify-between items-center border-b border-gray-300 pb-3;

        &__title {
          @apply text-xl;
        }

        &__close {
          @apply w-5;
        }
      }

      .body {
        @apply pt-3;
      }

      .footer {
        @apply pt-5 flex space-x-4 justify-end items-center;
      }
    }
  }

  // === background transition === //
  .dialog-enter-active,
  .dialog-leave-active {
    @apply transition duration-300 ease-in-out;
  }

  .dialog-enter-from,
  .dialog-leave-to {
    @apply opacity-0;
  }

  // === dialog transition === //
  .dialog-enter-active .dialog,
  .dialog-leave-active .dialog {
    @apply transition duration-300 ease-in-out;
  }

  .dialog-enter-from .dialog,
  .dialog-leave-to .dialog {
    @apply -translate-y-40;
  }
</style>
