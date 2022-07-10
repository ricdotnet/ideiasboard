<template>
  <div class="mt-16">
    <div class="text-lg pl-3">Share this link with your team and start brainstorming.</div>
    <div class="flex items-center space-x-2">
      <Input class="w-full" id="link" disabled="true" :value="state.link"/>
      <IconButton color="plain">
        <ClipboardCopyIcon class="w-5" @click="copyLinkToClipboard()"/>
      </IconButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { IconButton, Input } from '../../common';
  import { ClipboardCopyIcon } from '@heroicons/vue/solid';

  const props = defineProps<{
    link: string;
  }>();

  const state = reactive({
    link: props.link,
  });

  function copyLinkToClipboard() {
    return navigator.clipboard.writeText(state.link);
  }
</script>

<style scoped lang="scss">
</style>
