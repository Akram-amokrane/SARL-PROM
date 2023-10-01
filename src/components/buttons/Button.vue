<template>
  <button
    class="w-fit flex justify-center items-center py-2 gap-1 rounded-lg disabled:saturate-0 drop-shadow-lg duration-100"
    :class="{
      'pr-8 pl-7': icon,
      'px-8': !icon,
    }"
    :disabled="disabled"
  >
    <div v-if="icon">
      <slot name="icon"></slot>
    </div>
    <div class="font-semibold capitalize">
      <slot></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
const { disabled } = defineProps({
  disabled: { type: Boolean, default: false },
  icon: { type: Boolean, default: false },
});
</script>
