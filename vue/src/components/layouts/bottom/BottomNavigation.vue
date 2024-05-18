<script setup lang="ts">
import { PATH } from '~/constants/path';
import type { MenuItem } from './NavigationItem.vue';
import NavigationItem from './NavigationItem.vue';

const leftMenu: MenuItem[] = [
  {
    title: 'Todo',
    to: PATH.TODO,
    icon: 'icon-[ph--check-circle]',
    activeIcon: 'icon-[ph--check-circle-fill]'
  },
  {
    title: 'Category',
    to: PATH.CATEGORY,
    icon: 'icon-[ph--shapes]',
    activeIcon: 'icon-[ph--shapes-fill]'
  }
];

const rightMenu: MenuItem[] = [
  {
    title: 'Calendar',
    to: PATH.CALENDAR,
    icon: 'icon-[ph--calendar]',
    activeIcon: 'icon-[ph--calendar-fill]'
  },
  { title: 'Focus', to: PATH.FOCUS, icon: 'icon-[ph--timer]', activeIcon: 'icon-[ph--timer-fill]' }
];
</script>

<template>
  <ul className="flex items-center justify-between gap-2 py-2 bg-base-200 px-7">
    <NavigationItem v-for="item in leftMenu" :key="item.to" :="item" />

    <div>+</div>

    <NavigationItem v-for="item in rightMenu" :key="item.to" :="item" />
  </ul>
</template>
