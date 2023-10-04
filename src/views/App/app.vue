<template>
  <div class="w-screen h-screen relative flex bg-white rounded-lg overflow-hidden drop-shadow-2xl">
    <div>
      <NavBar />
    </div>
    <div
      class="absolute w-[calc(100%-56px)] right-0 top-0 h-screen bg-slate-50 dark:bg-gray-900 rounded-l-2xl overflow-hidden origin-right duration-300"
      :class="{ 'scale-x-[0.78] xl:scale-x-[0.82]': appStore.menuOpen }"
    >
      <WindowBar />
      <div class="w-full h-[calc(100%-32px)] p-2 overflow-y-auto overflow-x-hidden">
        <Notification />
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import WindowBar from '@/components/WindowBar.vue'
import Notification from '@/components/notification/Notification.vue'
import { useAppStore } from '@/stores/app-store'
import { useDbStore } from '@/stores/db-store'
import { onMounted } from 'vue'

const appStore = useAppStore()
</script>
