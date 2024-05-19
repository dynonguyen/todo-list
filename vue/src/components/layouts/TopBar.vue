<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { PATH } from '~/constants/path'
import { withAssets } from '~/utils/helper'
import ThemeController from '../ThemeController.vue'
</script>

<template>
  <div class="flex justify-between p-4">
    <RouterLink :to="PATH.TODO">
      <div class="flex items-center justify-center gap-3">
        <img class="flex justify-center w-10" :src="withAssets('logo.png')" />
        <h1 class="text-2xl font-medium text-primary">Dodo</h1>
      </div>
    </RouterLink>

    <ThemeController />
  </div>
</template>
