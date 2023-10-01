<template>
  <tr
    class="hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer border-b dark:border-b-gray-900 dark:text-gray-50 odd:bg-slate-50 dark:odd:bg-slate-900/40"
    @click="$emit('toggleRowChecked')"
  >
    <td class="px-2">
      <input
        type="checkbox"
        class="row-check peer rounded-md outline-none dark:bg-slate-500"
        :id="`row-${id}`"
        :checked="selected"
      />
    </td>
    <slot></slot>
  </tr>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { id, selected } = defineProps({ id: String, selected: Boolean })
</script>
