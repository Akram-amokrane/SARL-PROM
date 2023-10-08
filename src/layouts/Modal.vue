<template>
  <div>
    <div @click.stop.prevent="toggleModal">
      <slot name="toggle-button"></slot>
    </div>
    <Teleport to="body">
      <Transition name="fade" mode="out-in">
        <div
          v-show="show"
          @click.stop.self="toggleModal"
          class="fixed h-screen w-screen flex justify-center items-center top-0 left-0 bg-black/40 z-50"
        >
          <div class="relative w-96 h-auto max-w-lg max-h-[95%] bg-slate-100">
            <div class="w-full flex justify-end items-center p-1">
              <XMarkIcon
                @click.stop="toggleModal"
                class="w-5 h-5 text-slate-500 hover:text-red-500 duration-100 cursor-pointer"
              />
            </div>
            <div class="p-2">
              <slot></slot>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'

const show = ref(false)

function toggleModal() {
  show.value = !show.value
}
</script>
