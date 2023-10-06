<template>
  <div
    class="absolute min-w-[380px] -h-full bg-white dark:bg-slate-800 drop-shadow-xl z-50 duration-300 overflow-hidden"
    :class="{
      'top-0 right-0 h-full origin-right rounded-l-lg border-l-2 border-l-orange-400 ':
        props.from == 'right',
      'top-0 left-0 h-full origin-left': props.from == 'left',
      'scale-x-0': !props.show
    }"
  >
    <div class="w-full h-full">
      <div class="min-w-full h-7 flex justify-end items-center p-1">
        <XMarkIcon
          class="w-6 h-6 text-slate-700 dark:text-slate-200 cursor-pointer"
          @click="closeDrawer"
        />
      </div>
      <div class="min-w-full h-full p-2">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  show: { type: Boolean, required: true },
  from: { type: String, default: 'left' }
})

const emit = defineEmits(['close'])

function closeDrawer() {
  emit('close', false)
}
</script>
