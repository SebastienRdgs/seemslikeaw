<template>
  <div class="flex-none flex justify-center items-center px-2 text-black dark:text-white">Version {{ version }}</div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const version = computed(() => runtimeConfig.public.version);
</script>
