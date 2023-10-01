<template>
  <div
    class="fixed flex flex-col justify-start items-center min-w-[40%] min-h-[300px] bg-slate-200 bottom-0 left-1/2 -translate-x-1/2 rounded-t-lg drop-shadow-xl duration-200 origin-bottom"
    :class="{
      'scale-y-0': !show
    }"
  >
    <div class="w-full flex justify-end p-1">
      <XMarkIcon
        class="w-6 h-6 text-slate-600 hover:text-red-400 cursor-pointer"
        @click.self="emit('update:close', false)"
      />
    </div>
    <div class="w-full h-auto">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({ show: { type: Boolean, default: false } })
const emit = defineEmits(['update:close'])
</script>
