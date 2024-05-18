import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'
import { LS_KEY } from '~/constants/key'

type Mode = 'light' | 'dark'

export const useThemeMode = defineStore('themeMode', () => {
  const mode = ref<Mode>(localStorage.getItem(LS_KEY.THEME) === 'light' ? 'light' : 'dark')

  onMounted(() => {
    document.documentElement.setAttribute('data-theme', mode.value)
  })

  function setTheme(newMode: Mode) {
    if (newMode === mode.value) return

    mode.value = newMode

    localStorage.setItem(LS_KEY.THEME, newMode)
    document.documentElement.setAttribute('data-theme', newMode)
  }

  function toggleTheme() {
    setTheme(mode.value === 'light' ? 'dark' : 'light')
  }

  return { mode, setTheme, toggleTheme }
})
