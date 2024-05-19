<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import Loading from '~/components/Loading.vue'
const NewTodoForm = defineAsyncComponent({ loader: () => import('./NewTodoForm.vue'), loadingComponent: Loading })

const open = ref(false)
</script>

<template>
  <button class="relative w-16 h-16 drawer-button -top-11 btn btn-circle btn-primary" @click="open = true">
    <span class="icon-[ph--plus] w-8 h-8 text-gray-300"></span>
  </button>

  <dialog class="modal" :class="{ 'modal-open': open }">
    <div class="relative w-80 modal-box -top-20">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold">New task</h3>
        <button class="btn btn-sm btn-circle btn-ghost" @click="open = false">✕</button>
      </div>

      <NewTodoForm v-if="open" @success="open = false" />
    </div>
  </dialog>
</template>
