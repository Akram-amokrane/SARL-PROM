import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notificationStore', () => {
  const type = ref<'Error' | 'Succes' | 'Info'>('Succes');
  const message = ref<string>("")
  const visible = ref(false)

  function show(msg: string, t: 'Error' | 'Succes' | 'Info') {
    type.value = t
    message.value = msg
    visible.value = true

    setTimeout(() => {
      hide()
    }, 2000)
  }

  function hide() {
    visible.value = false
  }

  return { type, message, visible, hide, show }
})
