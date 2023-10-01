<template>
  <div class="">Dashboard -- {{ val }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const val = ref("");

onMounted(async () => {});
</script>
