<template>
  <div
    class="flex flex-col overflow-x-hidden overflow-y-hidden h-screen max-h-screen bg-white text-neutral-600 dark:bg-neutral-700 dark:text-white md:divide-y divide-gray-300"
  >
    <navigation-header />

    <div class="flex-1 flex flex-col overflow-y-hidden md:divide-y divide-gray-300">
      <div class="flex-1 flex overflow-x-auto overflow-y-auto p-2">
        <slot />
      </div>
    </div>

    <navigation-footer />
  </div>
</template>

<script setup lang="ts"></script>
