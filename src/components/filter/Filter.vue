<template>
  <div class="relative">
    <label
      for="filter-input"
      class="flex justify-center items-center p-2 rounded-lg bg-slate-200 cursor-pointer text-slate-600 hover:bg-orange-100 hover:text-orange-600 duration-200"
    >
      <FunnelIcon class="w-5 h-5" />
    </label>
    <input type="checkbox" id="filter-input" class="peer hidden" />
    <div
      class="absolute top-0 right-full hidden p-2 bg-slate-100 hover:bg-red-100 mr-1 rounded-full cursor-pointer peer-checked:block"
      @click.stop="reset"
    >
      <ArrowPathIcon class="w-5 h-5 text-red-500" />
    </div>
    <div
      class="absolute w-72 mt-1 p-1 z-50 bg-gray-100 right-0 scale-y-0 peer-checked:scale-y-100 duration-200 origin-top"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowPathIcon, FunnelIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits(['reset'])

function reset() {
  emit('reset')
}
</script>
