import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'



export const useAppStore = defineStore('appStore', () => {
  const menuOpen = ref(false)
  const theme = ref("light")

  function toggleTheme() {
    theme.value = theme.value == "dark" ? "light" : "dark"
  }

  watch(theme, () => {
    document.documentElement.className = theme.value
  })

  return { menuOpen, theme, toggleTheme }
})
