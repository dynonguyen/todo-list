<script setup lang="ts">
import { RouterLink } from 'vue-router';

export type MenuItem = {
  to: string;
  title: string;
  icon: string;
  activeIcon: string;
  selected?: boolean;
};

const { to, title, icon, activeIcon, selected } = defineProps<MenuItem>();
</script>

<template>
  <RouterLink
    :to="to"
    class="flex flex-col items-center justify-center gap-2 transition-all hover:text-base-content"
    :class="selected ? 'text-base-content' : 'text-base-content/75'"
  >
    <span :class="`${selected ? activeIcon : icon} w-6 h-6`"></span>
    <li class="text-xs">{{ title }}</li>
  </RouterLink>
</template>
