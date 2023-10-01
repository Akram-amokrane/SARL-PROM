<template>
  <div
    data-tauri-drag-region
    class="w-full h-8 flex justify-end items-center cursor-move"
  >
    <div class="flex">
      <div
        @click="appWindow.minimize"
        class="w-8 h-8 hover:bg-slate-100 dark:hover:bg-slate-700 flex justify-center items-center duration-300 cursor-pointer"
      >
        <MinusIcon class="w-6 h-6 dark:text-white" />
      </div>
      <div
        @click="appWindow.toggleMaximize"
        class="w-8 h-8 hover:bg-slate-100 dark:hover:bg-slate-700 flex justify-center items-center duration-300 cursor-pointer"
      >
        <WindowIcon class="w-5 h-5 dark:text-white" />
      </div>
      <div
        @click="appWindow.close"
        class="w-8 h-8 text-red-500 hover:bg-red-100 dark:hover:bg-red-300 hover:text-red-600 flex justify-center items-center duration-300 cursor-pointer"
      >
        <XMarkIcon class="w-6 h-6" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon, WindowIcon, MinusIcon } from "@heroicons/vue/24/outline";
import { appWindow } from "@tauri-apps/api/window";

function closeWindow() {
  appWindow.close();
}
</script>
