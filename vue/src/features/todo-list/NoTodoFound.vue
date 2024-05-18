<script setup lang="ts">
import { withAssets } from '~/utils/helper'
</script>

<template>
  <div className="flex flex-col items-center justify-center">
    <img :src="withAssets('no-todo.svg')" className="w-56" />
    <div className="flex flex-col gap-2.5">
      <h3 className="text-lg text-center">What do you want to do today?</h3>
      <span className="text-sm text-center">Tap + to add your tasks</span>
    </div>
  </div>
</template>
