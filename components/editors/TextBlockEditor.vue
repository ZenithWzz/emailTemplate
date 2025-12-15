<template>
  <div class="d-flex flex-column gap-3">
    <v-text-field
      :model-value="modelValue.title"
      label="ชื่อบล็อก"
      density="comfortable"
      prepend-inner-icon="mdi-format-title"
      @update:model-value="(val: string) => update({ title: val })"
    />
    <v-textarea
      :model-value="modelValue.content"
      label="ข้อความ (รองรับ HTML)"
      rows="5"
      auto-grow
      @update:model-value="(val: string) => update({ content: val })"
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
        :model-value="modelValue.styles.textColor"
        label="สีข้อความ"
        density="comfortable"
        prepend-inner-icon="mdi-palette"
        @update:model-value="(val: string) => updateStyle({ textColor: val })"
      />
    </div>
    <div class="d-flex gap-3">
      <v-text-field
        :model-value="modelValue.styles.background"
        label="พื้นหลัง"
        density="comfortable"
        prepend-inner-icon="mdi-format-color-fill"
        @update:model-value="(val: string) => updateStyle({ background: val })"
      />
      <v-text-field
        :model-value="modelValue.styles.padding"
        label="Padding"
        density="comfortable"
        prepend-inner-icon="mdi-border-inside"
        @update:model-value="(val: string) => updateStyle({ padding: val })"
      />
    </div>
    <div class="d-flex gap-3">
      <v-text-field
        :model-value="modelValue.styles.fontSize"
        type="number"
        label="ขนาดตัวอักษร"
        density="comfortable"
        prepend-inner-icon="mdi-format-size"
        @update:model-value="(val: number) => updateStyle({ fontSize: Number(val) })"
      />
      <v-select
        :model-value="modelValue.styles.fontWeight"
        label="น้ำหนักตัวอักษร"
        density="comfortable"
        :items="['300', '400', '500', '600', '700']"
        prepend-inner-icon="mdi-format-bold"
        @update:model-value="(val: BlockStyles['fontWeight']) => updateStyle({ fontWeight: val })"
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

const update = (patch: Partial<EmailBlock>) => {
  emit('update:modelValue', { ...props.modelValue, ...patch });
};

const updateStyle = (patch: Partial<BlockStyles>) => {
  emit('update:modelValue', { ...props.modelValue, styles: { ...props.modelValue.styles, ...patch } });
};
</script>
