<template>
  <div
    class="fixed flex flex-col justify-start items-center min-w-[40%] min-h-[300px] bg-slate-100 border-t-2 border-t-orange-300 bottom-0 left-1/2 -translate-x-1/2 rounded-t-lg drop-shadow-xl duration-200 origin-bottom"
    :class="{
      'scale-y-0': !show
    }"
  >
    <div class="w-full flex justify-end p-1">
      <div
        @click.stop="emit('update:close', false)"
        class="p-1 text-slate-600 hover:text-red-400 cursor-pointer rounded-full"
      >
        <XMarkIcon class="w-6 h-6" />
      </div>
    </div>
    <div class="w-full h-auto px-2">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({ show: { type: Boolean, default: false } })
const emit = defineEmits(['update:close'])
</script>
