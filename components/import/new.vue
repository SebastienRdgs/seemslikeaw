<template>
  <div>
    <c-button @click="openFilePicker">Import</c-button>
    <c-button class="ml-2" @click="pasteFromClipboard">Paste</c-button>
    <input
      ref="fileInput"
      type="file"
      multiple
      accept="application/json"
      style="display: none"
      @change="handleFilesSelected"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Transaction } from '@/types/data';
import { useDataStore } from '@/stores/data.store';

const fileInput = ref<HTMLInputElement | null>(null);
const dataStore = useDataStore();

const openFilePicker = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFilesSelected = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    for (const file of input.files) {
      if (file.type === 'application/json') {
        const reader = new FileReader();

        reader.onload = (e) => {
          const jsonContent = e.target?.result as string;
          try {
            const parsedData: Transaction[][] = JSON.parse(jsonContent);
            dataStore.addUniqueAccounts(parsedData);
            dataStore.updateData();
          } catch (error) {
            console.error('Error adding account:', error);
          }
        };

        reader.readAsText(file);
      } else {
        console.error('Selected file is not a JSON file.');
      }
    }
  }
};

const pasteFromClipboard = async () => {
  try {
    const clipboardData = await navigator.clipboard.readText();
    const parsedData: Transaction[][] = JSON.parse(clipboardData);
    dataStore.addUniqueAccounts(parsedData);
  } catch (error) {
    console.error('Error pasting from clipboard:', error);
  }
};
</script>
