<template>
  <div class="w-full h-auto">
    <label
      v-if="props.label"
      class="flex text-xs pl-1 font-semibold"
      :class="{
        'text-slate-700 dark:text-slate-200': state == 'normal',
        'text-red-400 dark:text-red-700': state == 'error',
        'text-blue-600 dark:text-blue-800': state == 'focus'
      }"
      >{{ props.label }}<StarIcon v-if="required" class="w-2 h-2 fill-red-500 text-white"
    /></label>
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
        :readonly="readOnly"
        class="w-full border-0 dark:focus:bg-slate-600 text-slate-700 dark:text-slate-100 dark:placeholder:text-slate-400 rounded-md focus:border focus:border-blue-600 dark:border-blue-800"
        :class="{
          'pl-9': props.icon,
          'px-2 py-2': !props.icon,
          'bg-slate-200 dark:bg-slate-700': state == 'normal',
          ' border-2 border-red-500 dark:border-red-700 dark:bg-slate-700': state == 'error'
        }"
        @focus="state = 'focus'"
        @blur="
          (e) => {
            state = 'normal'
            checkIfValid(e)
          }
        "
        @change="(e) => sendVAlue(e)"
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
import { ref } from 'vue'
import ErrorIcon from '@/components/icons/ErrorIcon.vue'
import type { IValidator } from '@/utils/validators'

import { StarIcon } from '@heroicons/vue/24/outline'
const props = defineProps({
  label: String,
  placeholder: String,
  required: { type: Boolean, default: false },
  icon: { type: Boolean, default: false },
  validators: { type: Array<(v: string) => IValidator>, default: [] },
  value: { type: String, default: '' },
  readOnly: { type: Boolean, default: false }
})

const emit = defineEmits(['update:value', 'update:isValid'])

const state = ref<'normal' | 'focus' | 'error'>('normal')
const error = ref<string | null>()
const isValid = ref(props.validators.length == 0)

function sendVAlue(e: Event) {
  let value = (e.target as HTMLInputElement).value
  emit('update:value', value)
}

function checkIfValid(e: Event) {
  let value = (e.target as HTMLInputElement).value
  if (props.validators?.length > 0) {
    for (let i = 0; i < props.validators.length; i++) {
      let v = props.validators[i](value)
      if (!v.valid) {
        state.value = 'error'
        error.value = v.error
        isValid.value = false
        emit('update:isValid', isValid.value)
        break
      } else {
        state.value = 'normal'
        error.value = null
        isValid.value = true
        emit('update:isValid', isValid.value)
      }
    }
  } else {
    emit('update:value', value)
    emit('update:isValid', isValid.value)
  }
}
</script>
