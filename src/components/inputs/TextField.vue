<template>
  <div class="w-full h-auto">
    <label
      v-if="props.label"
      class="text-xs pl-1 font-semibold"
      :class="{
        'text-slate-700 dark:text-slate-200': state == 'normal',
        'text-red-400 dark:text-red-700': state == 'error',
        'text-blue-600 dark:text-blue-800': state == 'focus',
      }"
      >{{ props.label }}</label
    >
    <div class="relative flex justify-start items-center">
      <div
        v-if="props.icon"
        class="absolute h-full w-10 flex justify-center items-center fill-slate-600 dark:fill-slate-200 dark:text-slate-200 text-slate-600"
      >
        <slot name="icon"></slot>
      </div>
      <input
        type="text"
        :placeholder="props.placeholder"
        class="w-full border-0 dark:focus:bg-slate-600 text-slate-700 dark:text-slate-100 dark:placeholder:text-slate-400 rounded-md focus:border focus:border-blue-600 dark:border-blue-800"
        :class="{
          'pl-9': props.icon,
          'bg-slate-200 dark:bg-slate-700': state == 'normal',
          ' border-2 border-red-500 dark:border-red-700 dark:bg-slate-700':
            state == 'error',
        }"
        @focus="state = 'focus'"
        @blur="
          (e) => {
            state = 'normal';
            checkIfValid(e);
          }
        "
        :required="props.required"
        :value="value"
      />
    </div>
    <div
      class="flex justify-start items-center gap-1 pl-1 pt-1 text-xs text-red-600"
      v-show="state == 'error'"
    >
      <ErrorIcon class="w-4 h-4 fill-red-600" /> {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import ErrorIcon from "@/components/icons/ErrorIcon.vue";
import type { IValidator } from "@/utils/validators";

const props = defineProps({
  label: String,
  placeholder: String,
  required: { type: Boolean, default: false },
  icon: { type: Boolean, default: false },
  validators: { type: Array<(v: string) => IValidator> },
  value: { type: String, default: "" },
});

const emit = defineEmits(["update:value"]);

const state = ref<"normal" | "focus" | "error">("normal");
const error = ref<string | null>();

function checkIfValid(e: Event) {
  let value = (e.target as HTMLInputElement).value;
  if (props.validators && value.length > 0) {
    for (let i = 0; i < props.validators.length; i++) {
      let v = props.validators[i](value);
      if (!v.valid) {
        state.value = "error";
        error.value = v.error;
        break;
      } else {
        state.value = "normal";
        error.value = null;
      }
    }
    if (state.value == "normal") {
      emit("update:value", value);
    }
  }
}
</script>
