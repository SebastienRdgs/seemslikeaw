<template>
  <div class="relative">
    <c-input
      v-model="search"
      class="w-full"
      :placeholder="placeholder"
      custom-margin="mb-0"
      :closingIcon="search.length > 1"
      :error="error"
      :errors="errors"
      :autocomplete="autocomplete"
      @input="showItemsOrNot"
      @close="reset"
    />
    <aside
      v-if="showSearchItems"
      class="absolute w-full z-50 bg-white dark:bg-neutral-500 border max-h-64 border-neutral-300 overflow-hidden overflow-y-scroll rounded-md shadow-md"
      role="menu"
      aria-labelledby="menu-heading"
    >
      <ul class="flex flex-col w-full">
        <li
          v-for="(item, index) in filteredList"
          :key="index"
          class="px-2 py-3 space-x-2 hover:bg-neutral-400 hover:text-white focus:bg-neutral-400 focus:text-white focus:outline-none"
          @click="selectSearchItem(item)"
        >
          {{ itemName(item) }}
        </li>
      </ul>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps({
  modelValue: { type: [String, Object], default: null },
  list: { type: Array<Object | String>, default: [], required: true },
  clearInputWhenClicked: Boolean,
  openItemsWhenBlank: Boolean,
  disabled: { type: Boolean, default: false, required: false },
  placeholder: String,
  attributeName: { type: String, default: 'name', required: false },
  returnAttribute: { type: String, required: false },
  error: { type: Boolean, default: false },
  errors: { type: Array },
  autocomplete: { type: String, default: 'on' },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
  (e: 'changeSearch', value: string): void;
  (e: 'input', value: any): void;
}>();

const search = ref<string>('');
const showSearchItems = ref(false);

const filteredList = computed(() => {
  return props.list.filter((item: Object | string) => {
    return itemName(item)
      .toLowerCase()
      .includes(search.value?.toLowerCase());
  });
});

const itemName = (item: any) => {
  if (typeof item === 'string') return item;
  return item[props.attributeName as keyof typeof item];
};

const selectSearchItem = (item: string | object) => {
  showSearchItems.value = false;
  search.value = itemName(item);
  emit('update:modelValue', props.returnAttribute ? item[props.returnAttribute as keyof typeof item] : item);
  emit('input', props.returnAttribute ? item[props.returnAttribute as keyof typeof item] : item);

  if (props.clearInputWhenClicked) {
    reset();
  }
};

const reset = () => {
  search.value = '';
  emit('update:modelValue', null);
  showItemsOrNot();
};

const showItemsOrNot = () => {
  emit('changeSearch', search.value);
  emit('update:modelValue', search.value);

  showSearchItems.value = search.value.length === 0 ? !!props.openItemsWhenBlank : true;
};

onMounted(() => {
  if (props.openItemsWhenBlank) showSearchItems.value = true;
  if (props.modelValue) {
    search.value = itemName(props.modelValue);
  } else if (props.list.length === 1 && !props.openItemsWhenBlank) {
    selectSearchItem(props.list[0]);
  }
});
</script>
