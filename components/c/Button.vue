<template>
  <button
    class="bg-black dark:bg-white text-white dark:text-black rounded-md font-bold hover:bg-gray-800 dark:hover:bg-neutral-100 py-2 px-4 text-xs"
    :class="[disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer']"
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps(['type', 'disabled']);
defineEmits(['click']);
</script>
