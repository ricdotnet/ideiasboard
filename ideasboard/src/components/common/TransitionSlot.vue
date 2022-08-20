<template>
  <template v-if="props.type === 'group'">
    <TransitionGroup :name="props.name">
      <slot></slot>
    </TransitionGroup>
  </template>
  <template v-if="props.type === 'single'">
    <Transition :name="props.name">
      <slot></slot>
    </Transition>
  </template>
</template>

<script setup lang="ts">
  interface Props {
    type: 'single' | 'group';
    name: 'bounce' | 'fade' | 'dialog';
  }

  const props = defineProps<Props>();
</script>

<style scoped lang="scss">
</style>
