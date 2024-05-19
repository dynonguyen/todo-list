<script setup lang="ts">
import { DEFAULT } from '~/constants/default'
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="(_, index) in Array(DEFAULT.PAGE_LIMIT).fill(1)"
      :key="index"
      class="rounded-lg animate-pulse bg-base-200 h-16"
    ></div>
  </div>
</template>
