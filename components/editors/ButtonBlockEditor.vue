<template>
  <div class="d-flex flex-column gap-3">
    <v-text-field
      :model-value="modelValue.title"
      label="ชื่อบล็อก"
      density="comfortable"
      prepend-inner-icon="mdi-format-title"
      @update:model-value="(val: string) => update({ title: val })"
    />
    <v-text-field
      :model-value="modelValue.content"
      label="ป้ายกำกับปุ่ม"
      density="comfortable"
      prepend-inner-icon="mdi-gesture-tap-button"
      @update:model-value="(val: string) => update({ content: val })"
    />
    <v-text-field
      :model-value="modelValue.actionUrl"
      label="ลิงก์ปลายทาง"
      density="comfortable"
      prepend-inner-icon="mdi-link"
      @update:model-value="(val: string) => update({ actionUrl: val })"
    />
    <div class="d-flex gap-3">
      <v-select
        :model-value="modelValue.styles.align"
        label="การจัดวาง"
        density="comfortable"
        :items="alignOptions"
        item-title="title"
        item-value="value"
        prepend-inner-icon="mdi-format-align-left"
        @update:model-value="(val: BlockStyles['align']) => updateStyle({ align: val })"
      />
      <v-text-field
        :model-value="modelValue.styles.borderRadius"
        type="number"
        label="มุมโค้ง"
        density="comfortable"
        prepend-inner-icon="mdi-radius-outline"
        @update:model-value="(val: number) => updateStyle({ borderRadius: Number(val) })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BlockStyles, EmailBlock } from '~/types/email';

const props = defineProps<{ modelValue: EmailBlock }>();
const emit = defineEmits<{
  (event: 'update:modelValue', value: EmailBlock): void;
}>();

const alignOptions = [
  { title: 'ซ้าย', value: 'left' },
  { title: 'กึ่งกลาง', value: 'center' },
  { title: 'ขวา', value: 'right' }
];

const update = (patch: Partial<EmailBlock>) => emit('update:modelValue', { ...props.modelValue, ...patch });
const updateStyle = (patch: Partial<BlockStyles>) => emit('update:modelValue', { ...props.modelValue, styles: { ...props.modelValue.styles, ...patch } });
</script>
