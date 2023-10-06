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
      <input
        type="date"
        class="w-full p-2 border-0 dark:focus:bg-slate-600 text-slate-700 appearance-none dark:text-slate-100 dark:placeholder:text-slate-400 rounded-md focus:border focus:border-blue-600 dark:border-blue-800"
        :class="{
          'bg-slate-200 dark:bg-slate-700': state == 'normal',
          'bg-red-50 border-2 border-red-500 ': state == 'error'
        }"
        @focus="state = 'focus'"
        @blur="
          (e) => {
            state = 'normal'
            checkIfValid(e)
          }
        "
        :required="props.required"
        :value="v"
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
import { onMounted, ref, toRef } from 'vue'
import ErrorIcon from '@/components/icons/ErrorIcon.vue'
import type { IValidator } from '@/utils/validators'
import moment from 'moment'
import { StarIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  label: String,
  required: { type: Boolean, default: false },
  validators: { type: Array<(v: Date) => IValidator> },
  val: String
})

const emit = defineEmits(['update:value', 'update:isValid'])

const state = ref<'normal' | 'focus' | 'error'>('normal')
const error = ref<string | null>()
const v = ref('')

function checkIfValid(e: Event) {
  let input = new Date((e.target as HTMLInputElement).value)
  let value = moment(input).format('DD/MM/YYYY')
  emit('update:value', value)
  emit('update:isValid', true)
  // if (props.validators) {
  //   for (let i = 0; i < props.validators.length; i++) {
  //     let v = props.validators[i](value.toDate());
  //     if (!v.valid) {
  //       state.value = "error";
  //       error.value = v.error;
  //       break;
  //     } else {
  //       state.value = "normal";
  //       error.value = null;
  //     }
  //     console.log(value);
  //   }
  // } else if (value.toString().length >= 8) {
  //   emit("update:value");
  // }
}

onMounted(() => {
  if (props.val) {
    v.value = moment(props.val).format('YYYY-MM-DD')
  }
})
</script>
