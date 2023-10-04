<template>
  <div
    class="absolute w-1/3 h-12 z-50 left-1/2 -translate-x-1/2 bottom-2 duration-300 rounded-md p-2 flex justify-start items-center gap-2"
    :class="{
      'translate-y-0': notification.visible,
      'translate-y-60': !notification.visible,
      'bg-green-300 text-green-800': notification.type == 'Succes',
      'bg-red-300 text-red-800': notification.type == 'Error',
      'bg-blue-300 text-blue-800': notification.type == 'Info'
    }"
  >
    <div>
      <CheckCircleIcon class="w-7 h-7" v-show="notification.type == 'Succes'" />
      <ExclamationCircleIcon class="w-7 h-7" v-show="notification.type == 'Info'" />
      <ExclamationTriangleIcon class="w-7 h-7" v-show="notification.type == 'Error'" />
    </div>
    <div>{{ notification.message }}</div>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification-store'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

const notification = useNotificationStore()
</script>
