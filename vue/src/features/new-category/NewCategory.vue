<script setup lang="ts">
import { ref } from 'vue'
import NewCategoryForm from './NewCategoryForm.vue'

const open = ref(false)
</script>

<template>
  <div class="flex flex-col gap-2">
    <button class="w-16 h-16 mx-auto border-dashed btn btn-square btn-outline" @click="open = true">
      <span class="icon-[ph--plus] w-6 h-6"></span>
    </button>
    <div class="max-w-full text-sm text-center truncate text-base-content/80">Add new</div>
  </div>

  <dialog class="modal" :class="{ 'modal-open': open }">
    <div class="relative w-80 modal-box -top-20">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold">New category</h3>
        <button class="btn btn-sm btn-circle btn-ghost" @click="open = false">✕</button>
      </div>

      <NewCategoryForm @success="open = false" />
    </div>
  </dialog>
</template>
