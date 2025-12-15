<template>
  <div class="d-flex gap-3 align-center">
    <v-text-field
      :model-value="modelValue.styles.background"
      label="สีเส้น"
      density="comfortable"
      prepend-inner-icon="mdi-format-color-fill"
      @update:model-value="(val: string) => updateStyle({ background: val })"
    />
    <v-text-field
      :model-value="modelValue.styles.padding"
      label="Margin/Padding"
      density="comfortable"
      prepend-inner-icon="mdi-border-outside"
      @update:model-value="(val: string) => updateStyle({ padding: val })"
    />
  </div>
</template>

<script setup lang="ts">
import { BlockStyles, EmailBlock } from '~/types/email';

const props = defineProps<{ modelValue: EmailBlock }>();
const emit = defineEmits<{
  (event: 'update:modelValue', value: EmailBlock): void;
}>();

const updateStyle = (patch: Partial<BlockStyles>) => {
  emit('update:modelValue', { ...props.modelValue, styles: { ...props.modelValue.styles, ...patch } });
};
</script>
