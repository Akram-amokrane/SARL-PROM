<template>
  <button
    class="hover:scale-105 disabled:saturate-0"
    :class="{ 'rounded-full': circle }"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const { disabled } = defineProps({
  disabled: { type: Boolean, default: false },
  circle: { type: Boolean, default: false }
})
</script>
