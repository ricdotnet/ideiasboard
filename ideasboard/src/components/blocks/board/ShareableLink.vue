<template>
  <div class="shareable-container">
    <div class="shareable-container__description">Share this link with your team and start
      brainstorming.
    </div>
    <div class="shareable-container__link">
      <Input class="shareable-container__link-input" id="link" disabled="true" :value="state.link"/>
      <IconButton color="plain" @click="copyLinkToClipboard()">
        <ClipboardCopyIcon class="shareable-container__link-icon"/>
      </IconButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { useToast } from '../../../composables';
  import { IconButton, Input } from '../../common';
  import { ClipboardCopyIcon } from '@heroicons/vue/solid';

  const { addToast } = useToast();

  const props = defineProps<{
    link: string;
  }>();

  const state = reactive({
    link: props.link,
  });

  function copyLinkToClipboard() {
    addToast('success', 'Link copied to your clipboard.');
    return navigator.clipboard.writeText(state.link);
  }
</script>

<style scoped lang="scss">
  .shareable-container {
    @apply p-6 fixed bottom-0 left-0 bg-white w-full;

    &__description {
      @apply text-lg pl-3;
    }

    &__link {
      @apply flex items-center space-x-2;

      &-input {
        @apply w-full;
      }

      &-icon {
        @apply w-5;
      }
    }
  }
</style>
