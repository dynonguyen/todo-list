<script setup lang="ts">
import { withAssets } from '~/utils/helper'
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <img :src="withAssets('no-todo.svg')" class="w-56" />
    <div class="flex flex-col gap-2.5">
      <h3 class="text-lg text-center">What do you want to do today?</h3>
      <span class="text-sm text-center">Tap + to add your tasks</span>
    </div>
  </div>
</template>
