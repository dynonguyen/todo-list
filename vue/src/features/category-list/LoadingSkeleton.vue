<template>
  <div class="grid grid-cols-4 gap-4 px-4">
    <div
      v-for="(_, index) in Array(12).fill(1)"
      :key="index"
      class="w-16 h-16 mx-auto rounded-lg bg-base-200 animate-pulse"
    ></div>
  </div>
</template>
