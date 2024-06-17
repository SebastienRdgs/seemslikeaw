<template>
  <div>
    <div class="w-full flex justify-end items-center relative">
      <input
        ref="input"
        :type="type"
        :value="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        :checked="modelValue === true"
        class="border rounded px-2 pt-4 pb-2 outline-neutral-500 w-full bg-inherit dark:text-white dark:border-neutral-500"
        :class="[
          error ? 'border-red-500' : 'border-neutral-300',
          disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer',
        ]"
        @input="emitValue($event.target?.value)"
        @click="clickInput"
      />
      <slot />
      <span
        :class="[
          'absolute left-1 flex items-center pointer-events-none opacity-40 transition-all',
          isFocusStyle || forceFocusPlaceholder ? 'text-[9px] top-1 px-1 left-0.5' : 'text-md',
        ]"
      >
        {{ placeholder }}
      </span>

      <span v-if="closingIcon" class="absolute mr-1 w-10 text-bold" @click="$emit('close')">X</span>
    </div>
    <span v-if="error" class="text-xs text-red-500">{{ errors?.join(',') }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: [String, Number, Boolean] },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  forceFocusPlaceholder: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  closingIcon: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  errors: { type: Array },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: String | Number | Boolean): void;
  (e: 'close'): void;
}>();

const focus = ref(false);
const isFocusStyle = computed(() => {
  return props.modelValue || focus.value || props.type === 'number';
});

const emitValue = (value: string) => {
  if (props.type === 'checkbox') return emit('update:modelValue', !props.modelValue);
  if (props.type === 'number') return emit('update:modelValue', +value);
  emit('update:modelValue', value);
};
const clickInput = () => {
  focus.value = true;
};
</script>
