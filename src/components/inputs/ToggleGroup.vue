<template>
  <div
    class="flex justify-center items-center rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 h-8"
  >
    <label
      v-for="opt in options"
      :for="`${opt.toString()}-${group}`"
      class="block h-full"
    >
      <input
        type="radio"
        :name="group"
        :id="`${opt.toString()}-${group}`"
        class="peer hidden"
        @change="sendValue($event)"
        :checked="opt == init"
        :value="opt.toString()"
      />
      <div
        class="px-2 py-1 h-full flex justify-center items-center peer-checked:bg-slate-300 dark:peer-checked:bg-slate-900 text-slate-700 dark:text-slate-200 fill-slate-700 dark:fill-slate-200 cursor-pointer"
      >
        <slot :name="opt"></slot>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { provide } from "vue";

const emit = defineEmits(["update:selected"]);
const { group, options, init } = defineProps({
  group: { type: String, required: true },
  options: { type: Array<String>, required: true },
  init: { type: String, required: true },
});

function sendValue(e: Event) {
  emit("update:selected", (e.target as HTMLInputElement).value);
}

provide("group", group);
</script>
