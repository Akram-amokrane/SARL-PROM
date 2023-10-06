<template>
  <td
    class="px-1 py-3 text-base"
    :class="{
      'text-left': align == 'left',
      'text-center': align == 'center',
      'text-right': align == 'right'
    }"
  >
    <slot></slot>
  </td>
</template>

<script setup lang="ts">
const props = defineProps({
  align: { type: String, default: 'left' }
})
</script>
