<template>
  <div class="relative flex justify-end items-center">
    <input
      type="text"
      name="search"
      @keyup.enter="updateSearch($event)"
      @blur="updateSearch($event)"
      class="w-64 h-8 p-2 rounded-lg border-none text-slate-900 dark:text-slate-50 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600"
    />
    <SearchIcon class="w-6 h-6 absolute right-1 fill-slate-500" />
  </div>
</template>

<script setup lang="ts">
import SearchIcon from './icons/SearchIcon.vue'

const emit = defineEmits(['search'])

function updateSearch(e: Event) {
  emit('search', (e.target as HTMLInputElement).value.trim().toLowerCase())
}
</script>
