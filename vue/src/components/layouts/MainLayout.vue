<script setup lang="ts">
import { RouterView } from 'vue-router'
import BottomNavigation from './bottom/BottomNavigation.vue'
import TopBar from './TopBar.vue'
</script>

<template>
  <div className="max-w-[375px] mx-auto my-8 overflow-hidden shadow-lg rounded-2xl bg-base-300">
    <TopBar />

    <div className="flex-grow h-[500px] my-4 overflow-auto">
      <RouterView />
    </div>

    <BottomNavigation />
  </div>
</template>
