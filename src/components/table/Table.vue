<template>
  <table class="table-auto w-full">
    <thead class="border-b font-medium dark:border-gray-900 text-left">
      <tr>
        <th class="px-2">
          <input
            type="checkbox"
            class="rounded-md outline-none dark:bg-slate-500"
            v-model="allChecked"
            :checked="all"
            @change="$emit('checkedAll', allChecked)"
          />
        </th>
        <slot name="header"> </slot>
      </tr>
    </thead>
    <tbody>
      <slot name="body"></slot>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref } from "vue";
const { all } = defineProps({ all: Boolean });
const allChecked = ref(all);
</script>
