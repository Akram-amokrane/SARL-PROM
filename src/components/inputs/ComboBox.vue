<template>
  <div role="combobox" class="w-full">
    <label
      v-if="props.label"
      class="flex text-xs pl-1 font-semibold"
      :class="{
        'text-slate-700 dark:text-slate-200': state == 'normal',
        'text-red-400 dark:text-red-700': state == 'error',
        'text-blue-600 dark:text-blue-800': state == 'focus'
      }"
      >{{ props.label }} <StarIcon v-if="required" class="w-2 h-2 fill-red-500 text-white"
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
        :readonly="true"
        :required="required"
        class="w-full border-0 placeholder:text-left dark:focus:bg-slate-600 text-slate-700 dark:text-slate-100 dark:placeholder:text-slate-400 rounded-md focus:border focus:border-blue-600 dark:border-blue-800"
        :class="{
          'pl-9': props.icon,
          'px-2 py-2': !props.icon,
          'bg-slate-200 dark:bg-slate-700': state == 'normal',
          ' border-2 border-red-500 dark:border-red-700 dark:bg-slate-700': state == 'error'
        }"
        @focus="
          () => {
            state = 'focus'
            showSelection = true
          }
        "
        @blur="
          () => {
            state = 'normal'
            showSelection = false
          }
        "
        :value="selectedOpt?.label"
      />
      <div
        class="absolute flex justify-center items-center h-full right-1 hover:text-slate-900 cursor-pointer"
        @click.stop="showSelection = !showSelection"
      >
        <ChevronDownIcon
          class="w-6 h-6 duration-300 origin-center"
          :class="{ 'rotate-180': showSelection }"
        />
      </div>

      <div
        class="absolute z-30 w-[98%] max-h-40 overflow-y-auto bg-slate-300 top-full left-1/2 origin-top duration-200 -translate-x-1/2 rounded-b-md"
        :class="{
          'scale-y-0': !showSelection,
          'scale-y-100': showSelection
        }"
      >
        <div
          class="w-full p-2 text-sm hover:bg-slate-200 cursor-pointer"
          v-for="opt in opts"
          :key="opt.value ? opt.value : opt.label"
          @click.stop="setSelectedOpt(opt)"
          role="option"
        >
          <p>{{ opt.label }}</p>
        </div>
      </div>
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
import { ChevronDownIcon, StarIcon } from '@heroicons/vue/24/outline'
import ComboOption from '@/models/ComboOption'
import { onMounted, ref, toRef } from 'vue'
import ErrorIcon from '../icons/ErrorIcon.vue'

const props = defineProps({
  options: { type: Array<ComboOption>, required: true },
  label: { type: String },
  placeholder: String,
  icon: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  val: { type: Number },
  valstr: { type: String }
})

const emit = defineEmits(['update:value', 'update:isValid'])

const state = ref<'normal' | 'focus' | 'error'>('normal')
const error = ref<string | null>()
const opts = toRef(props, 'options') //ref<Array<ComboOption>>(props.options)
const selectedOpt = ref<ComboOption>()
const showSelection = ref(false)

function setSelectedOpt(opt: ComboOption) {
  selectedOpt.value = opt
  showSelection.value = false
  emit('update:value', selectedOpt.value.value ? selectedOpt.value.value : selectedOpt.value.label)
  emit('update:isValid', true)
}

onMounted(() => {
  if (props.val) {
    let x = opts.value.find((o) => o.value == props.val)
    x ? setSelectedOpt(x) : null
  }
  if (props.valstr) {
    let x = opts.value.find((o) => o.label == props.valstr)
    x ? setSelectedOpt(x) : null
  }
})
</script>
