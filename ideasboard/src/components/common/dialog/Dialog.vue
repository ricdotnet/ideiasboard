<template>
  <TransitionSlot name="dialog" type="single">
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
                      :disabled="state.isActioning"
                      @click="onClickDialogClose()">
              </Button>
              <Button :label="state.submitLabel"
                      color="plain"
                      text="blue"
                      :disabled="state.isActioning"
                      :form="state.formId"
                      @click="onClickDialogSubmit()">
                <Loading :is-loading="state.isActioning"/>
              </Button>
            </div>
          </template>
        </div>
      </div>
    </template>
  </TransitionSlot>
</template>

<script setup lang="ts">
  import { computed, onBeforeMount, onBeforeUnmount, reactive } from 'vue';
  import { XIcon } from '@heroicons/vue/solid';
  import { Button, IconButton, Loading, TransitionSlot } from '../';

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
    title: string;
    isOpen: boolean;
    submitLabel?: string;
    isActioning?: boolean;
    showActions?: boolean;
    formId?: string;
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
    formId: computed(() => props.formId || null),
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
    @apply w-full h-full bg-slate-900 fixed top-0 bg-opacity-20 left-0;

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
    @extend .fade-enter-active, .fade-leave-active;
  }

  .dialog-enter-from,
  .dialog-leave-to {
    @extend .fade-enter-from, .fade-leave-to;
  }

  // === dialog transition === //
  .dialog-enter-active .dialog,
  .dialog-leave-active .dialog {
    @extend .fadeInDown-enter-active, .fadeInDown-leave-active;
  }

  .dialog-enter-from .dialog,
  .dialog-leave-to .dialog {
    @extend .fadeInDown-enter-from, .fadeInDown-leave-to;
  }
</style>
