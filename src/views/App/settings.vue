<template>
  <div>
    <button @click="appStore.toggleTheme">{{ appStore.theme }}</button>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app-store";

const appStore = useAppStore();
</script>
