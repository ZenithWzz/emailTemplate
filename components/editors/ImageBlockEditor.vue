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
      label="ลิงก์รูปภาพ"
      density="comfortable"
      prepend-inner-icon="mdi-link"
      @update:model-value="(val: string) => update({ content: val })"
    />
    <div class="d-flex gap-3">
      <v-text-field
        :model-value="modelValue.imageAlt"
        label="ข้อความ Alt"
        density="comfortable"
        prepend-inner-icon="mdi-comment-text"
        @update:model-value="(val: string) => update({ imageAlt: val })"
      />
      <v-switch
        inset
        hide-details
        label="เต็มความกว้าง"
        color="primary"
        :model-value="modelValue.imageFullWidth"
        @update:model-value="(val: boolean) => update({ imageFullWidth: val })"
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

const update = (patch: Partial<EmailBlock>) => emit('update:modelValue', { ...props.modelValue, ...patch });
const updateStyle = (patch: Partial<BlockStyles>) => emit('update:modelValue', { ...props.modelValue, styles: { ...props.modelValue.styles, ...patch } });
</script>
