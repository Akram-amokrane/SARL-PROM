<template>
  <button class="rounded-full hover:scale-105 disabled:saturate-0" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const { disabled } = defineProps({
  disabled: { type: Boolean, default: false }
})
</script>
