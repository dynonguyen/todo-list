<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeMode } from '~/stores/theme'

const themeStore = useThemeMode()
const { toggleTheme } = themeStore

const mode = storeToRefs(themeStore).mode
</script>

<template>
  <label className="swap swap-rotate">
    <input type="checkbox" className="theme-controller" @change="toggleTheme" />
    <span v-if="mode === 'dark'" className="icon-[ph--sun-fill] w-6 h-6 text-base-content"></span>
    <span v-else className="icon-[ph--moon-fill] w-6 h-6 text-base-content"></span>
  </label>
</template>
