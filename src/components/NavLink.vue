<template>
  <div class="relative">
    <input type="radio" :id="toName" :name="group" class="peer hidden" :checked="checked" />
    <label
      @click="$router.push({ name: toName })"
      :for="toName"
      class="block p-2 rounded-2xl hover:bg-orange-700/40 peer-checked:bg-orange-600 cursor-pointer"
    >
      <slot></slot>
      <div
        class="absolute top-0 pl-3 h-full flex justify-start items-center left-full w-56 text-lg font-semibold"
      >
        {{ title ?? '' }}
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import DashboardIcon from './icons/dashboardIcon.vue'

const { toName, group, checked, title } = defineProps(['toName', 'group', 'checked', 'title'])
</script>
