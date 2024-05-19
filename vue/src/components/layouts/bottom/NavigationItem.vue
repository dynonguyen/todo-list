<script setup lang="ts">
import { RouterLink } from 'vue-router'

export type MenuItem = {
  to: string
  title: string
  icon: string
  activeIcon: string
  selected?: boolean
}

const props = defineProps<MenuItem>()
</script>

<template>
  <RouterLink
    :to="props.to"
    class="flex flex-col items-center justify-center gap-2 transition-all hover:text-base-content"
    :class="props.selected ? 'text-base-content' : 'text-base-content/75'"
  >
    <span :class="`${props.selected ? props.activeIcon : props.icon} w-6 h-6`"></span>
    <li class="text-xs">{{ props.title }}</li>
  </RouterLink>
</template>
