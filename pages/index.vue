<template>
  <v-container class="py-8" fluid>
    <v-row class="mb-6" justify="space-between" align="center">
      <v-col cols="12" md="8">
        <div class="d-flex align-center gap-3">
          <v-icon color="primary" size="36">mdi-email-edit-outline</v-icon>
          <div>
            <h1 class="text-h4 font-weight-bold mb-1">Email Template Builder</h1>
            <p class="text-body-1 text-medium-emphasis mb-0">สร้างและจัดการเทมเพลตอีเมลด้วยตัวเอง พร้อมปรับแต่งสไตล์และจัดวางองค์ประกอบได้อย่างอิสระ</p>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="4" class="d-flex justify-end align-center">
        <v-btn color="primary" class="mr-3" @click="copyHtml">
          <v-icon start>mdi-content-copy</v-icon>
          คัดลอก HTML
        </v-btn>
        <v-btn color="secondary" variant="outlined" @click="downloadHtml">
          <v-icon start>mdi-download</v-icon>
          ดาวน์โหลดไฟล์
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-card elevation="1" class="mb-4">
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-view-dashboard</v-icon>
            เลย์เอาต์ & การตั้งค่า
          </v-card-title>
          <v-divider />
          <v-card-text class="d-flex flex-column gap-4">
            <div>
              <div class="text-subtitle-1 font-weight-medium mb-1">ความกว้างอีเมล</div>
              <v-slider
                v-model="emailSettings.width"
                min="480"
                max="900"
                step="10"
                thumb-label
              />
              <div class="text-caption text-medium-emphasis">{{ emailSettings.width }}px</div>
            </div>

            <div class="d-flex gap-3">
              <v-text-field
                v-model="emailSettings.padding"
                type="number"
                label="ระยะขอบภายนอก (px)"
                density="comfortable"
                prepend-inner-icon="mdi-border-outside"
              />
              <v-text-field
                v-model="emailSettings.background"
                label="สีพื้นหลัง"
                density="comfortable"
                prepend-inner-icon="mdi-format-color-fill"
              />
            </div>

            <v-select
              v-model="emailSettings.fontFamily"
              :items="fontOptions"
              label="ฟอนต์"
              density="comfortable"
              prepend-inner-icon="mdi-format-text"
            />
          </v-card-text>
        </v-card>

        <v-card elevation="1" class="mb-4">
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-shape-rectangle-plus</v-icon>
            เพิ่มบล็อกใหม่
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-btn block class="mb-2" color="primary" variant="tonal" @click="addBlock('text')">
              <v-icon start>mdi-text-subject</v-icon>
              ข้อความ
            </v-btn>
            <v-btn block class="mb-2" color="secondary" variant="tonal" @click="addBlock('image')">
              <v-icon start>mdi-image-area</v-icon>
              รูปภาพ
            </v-btn>
            <v-btn block class="mb-2" color="accent" variant="tonal" @click="addBlock('button')">
              <v-icon start>mdi-gesture-tap-button</v-icon>
              ปุ่มกด
            </v-btn>
            <v-btn block color="grey" variant="tonal" @click="addBlock('divider')">
              <v-icon start>mdi-minus</v-icon>
              เส้นคั่น
            </v-btn>
          </v-card-text>
        </v-card>

        <v-card elevation="1">
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-palette</v-icon>
            Custom CSS
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-textarea
              v-model="customCss"
              label="เพิ่ม CSS เฉพาะ"
              rows="6"
              auto-grow
              hint="สไตล์เหล่านี้จะถูกเพิ่มเข้าไปในอีเมล"
              persistent-hint
            />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card elevation="1" class="mb-4">
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-format-list-bulleted</v-icon>
            โครงสร้างบล็อก
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-alert type="info" variant="tonal" class="mb-4">
              จัดเรียง ลบ หรือปรับรายละเอียดของบล็อกแต่ละส่วนได้ทันที พร้อมพรีวิวแบบสด
            </v-alert>

            <v-expansion-panels multiple>
              <v-expansion-panel
                v-for="(block, index) in blocks"
                :key="block.id"
                :value="block.id"
                elevation="0"
              >
                <v-expansion-panel-title class="d-flex align-center">
                  <div class="d-flex align-center gap-3 flex-1">
                    <v-avatar size="32" color="primary" variant="tonal">
                      <v-icon>{{ blockIcon(block.type) }}</v-icon>
                    </v-avatar>
                    <div class="text-subtitle-1">{{ block.title }}</div>
                    <div class="text-caption text-medium-emphasis">{{ block.type.toUpperCase() }}</div>
                  </div>
                  <div class="d-flex align-center gap-1">
                    <v-btn size="small" icon variant="text" @click.stop="moveBlock(index, -1)" :disabled="index === 0">
                      <v-icon>mdi-arrow-up</v-icon>
                    </v-btn>
                    <v-btn size="small" icon variant="text" @click.stop="moveBlock(index, 1)" :disabled="index === blocks.length - 1">
                      <v-icon>mdi-arrow-down</v-icon>
                    </v-btn>
                    <v-btn size="small" icon variant="text" @click.stop="duplicateBlock(block)">
                      <v-icon>mdi-content-duplicate</v-icon>
                    </v-btn>
                    <v-btn size="small" icon variant="text" color="error" @click.stop="removeBlock(block.id)">
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <component :is="blockEditorComponent(block)" v-model="blocks[index]" />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>

        <v-card elevation="2" class="preview-card">
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-monitor-eye</v-icon>
            พรีวิวอีเมล
          </v-card-title>
          <v-divider />
          <v-card-text>
            <div class="d-flex justify-center">
              <div class="email-preview" :style="emailContainerStyles">
                <component :is="'style'" id="custom-css-block" v-if="customCss">
                  {{ customCss }}
                </component>
                <div v-for="block in blocks" :key="block.id" class="mb-4">
                  <div :style="blockStyles(block)" class="preview-block">
                    <template v-if="block.type === 'text'">
                      <div v-html="block.content" />
                    </template>
                    <template v-else-if="block.type === 'image'">
                      <div class="text-center">
                        <v-img :src="block.content" :alt="block.imageAlt || 'image block'" class="rounded" :width="block.imageFullWidth ? '100%' : 'auto'" max-width="100%" />
                        <div v-if="block.imageAlt" class="text-caption text-medium-emphasis mt-2">{{ block.imageAlt }}</div>
                      </div>
                    </template>
                    <template v-else-if="block.type === 'button'">
                      <div :class="`text-${block.styles.align}`">
                        <v-btn
                          :href="block.actionUrl || '#'"
                          color="primary"
                          size="large"
                          :style="{ borderRadius: `${block.styles.borderRadius}px` }"
                          target="_blank"
                        >
                          {{ block.content || 'Action' }}
                        </v-btn>
                      </div>
                    </template>
                    <template v-else-if="block.type === 'divider'">
                      <v-divider thickness="2" />
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar.open" :timeout="2500" color="success" location="bottom right">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { v4 as uuid } from 'uuid';
import ButtonBlockEditor from '~/components/editors/ButtonBlockEditor.vue';
import DividerBlockEditor from '~/components/editors/DividerBlockEditor.vue';
import ImageBlockEditor from '~/components/editors/ImageBlockEditor.vue';
import TextBlockEditor from '~/components/editors/TextBlockEditor.vue';
import { BlockStyles, BlockType, EmailBlock, EmailSettings } from '~/types/email';

const fontOptions = [
  'Inter, Arial, sans-serif',
  'Prompt, sans-serif',
  'Kanit, sans-serif',
  'Noto Sans Thai, sans-serif',
  'Montserrat, sans-serif'
];

const defaultStyles = (): BlockStyles => ({
  align: 'left',
  textColor: '#1F2933',
  background: '#ffffff',
  padding: '16px',
  fontSize: 16,
  fontWeight: '400',
  borderRadius: 8
});

const blocks = ref<EmailBlock[]>([
  {
    id: uuid(),
    type: 'text',
    title: 'Hero Message',
    content: '<h2 style="margin:0 0 8px">ยินดีต้อนรับสู่แคมเปญใหม่ของคุณ</h2><p style="margin:0">เริ่มปรับแต่งข้อความและรูปภาพเพื่อสร้างอีเมลที่ใช่สำหรับทุกแคมเปญได้เลย</p>',
    styles: defaultStyles()
  },
  {
    id: uuid(),
    type: 'button',
    title: 'Primary CTA',
    content: 'เริ่มต้นใช้งาน',
    actionUrl: 'https://example.com',
    styles: { ...defaultStyles(), align: 'center', borderRadius: 12 }
  }
]);

const emailSettings = ref<EmailSettings>({
  width: 720,
  background: '#f7f8fa',
  padding: 24,
  fontFamily: fontOptions[0]
});

const customCss = ref<string>('.preview-block p { margin: 0; }');
const snackbar = ref({ open: false, message: '' });

const emailContainerStyles = computed(() => ({
  width: `${emailSettings.value.width}px`,
  margin: '0 auto',
  background: emailSettings.value.background,
  padding: `${emailSettings.value.padding}px`,
  fontFamily: emailSettings.value.fontFamily,
  borderRadius: '18px',
  boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
}));

const blockStyles = (block: EmailBlock) => ({
  textAlign: block.styles.align,
  color: block.styles.textColor,
  background: block.styles.background,
  padding: block.styles.padding,
  fontSize: `${block.styles.fontSize}px`,
  fontWeight: block.styles.fontWeight,
  borderRadius: `${block.styles.borderRadius}px`,
  lineHeight: 1.6,
  border: '1px solid rgba(0,0,0,0.04)'
});

const blockIcon = (type: BlockType) => {
  switch (type) {
    case 'text':
      return 'mdi-text-box-outline';
    case 'image':
      return 'mdi-image';
    case 'button':
      return 'mdi-gesture-tap-button';
    case 'divider':
      return 'mdi-minus';
    default:
      return 'mdi-shape';
  }
};

const blockEditorComponent = (block: EmailBlock) => {
  switch (block.type) {
    case 'text':
      return TextBlockEditor;
    case 'image':
      return ImageBlockEditor;
    case 'button':
      return ButtonBlockEditor;
    case 'divider':
      return DividerBlockEditor;
    default:
      return TextBlockEditor;
  }
};

const addBlock = (type: BlockType) => {
  const newBlock: EmailBlock = {
    id: uuid(),
    type,
    title: `${type.charAt(0).toUpperCase()}${type.slice(1)} block`,
    content: type === 'text' ? 'ใส่ข้อความของคุณที่นี่' : type === 'button' ? 'คลิกที่นี่' : '',
    actionUrl: type === 'button' ? 'https://example.com' : undefined,
    imageAlt: type === 'image' ? 'ภาพใหม่' : undefined,
    styles: defaultStyles()
  };
  blocks.value.push(newBlock);
};

const moveBlock = (index: number, direction: number) => {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= blocks.value.length) return;
  const updated = [...blocks.value];
  const [item] = updated.splice(index, 1);
  updated.splice(newIndex, 0, item);
  blocks.value = updated;
};

const duplicateBlock = (block: EmailBlock) => {
  const copy: EmailBlock = {
    ...block,
    id: uuid(),
    title: `${block.title} (คัดลอก)`
  };
  blocks.value.push(copy);
};

const removeBlock = (id: string) => {
  const index = blocks.value.findIndex((b) => b.id === id);
  if (index !== -1) {
    blocks.value.splice(index, 1);
  }
};

const generateHtml = () => {
  const styles = customCss.value ? `<style>${customCss.value}</style>` : '';
  const blocksHtml = blocks.value
    .map((block) => {
      const styleString = `text-align:${block.styles.align};color:${block.styles.textColor};background:${block.styles.background};padding:${block.styles.padding};font-size:${block.styles.fontSize}px;font-weight:${block.styles.fontWeight};border-radius:${block.styles.borderRadius}px;line-height:1.6;border:1px solid rgba(0,0,0,0.04);margin-bottom:16px;`;
      if (block.type === 'text') return `<div style="${styleString}">${block.content}</div>`;
      if (block.type === 'image') return `<div style="${styleString};text-align:center;"><img src="${block.content}" alt="${block.imageAlt || ''}" style="max-width:100%;border-radius:${block.styles.borderRadius}px;" /></div>`;
      if (block.type === 'button') return `<div style="${styleString};text-align:${block.styles.align};"><a href="${block.actionUrl || '#'}" style="background:#1E88E5;color:#fff;padding:12px 18px;text-decoration:none;border-radius:${block.styles.borderRadius}px;display:inline-block;">${block.content || 'Action'}</a></div>`;
      return `<hr style="${styleString} border:none;border-bottom:2px solid #e0e0e0;" />`;
    })
    .join('');

  return `<!doctype html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />${styles}</head><body style="margin:0;padding:0;background:${emailSettings.value.background};font-family:${emailSettings.value.fontFamily};"><div style="max-width:${emailSettings.value.width}px;margin:0 auto;padding:${emailSettings.value.padding}px;">${blocksHtml}</div></body></html>`;
};

const copyHtml = async () => {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    snackbar.value = { open: true, message: 'ไม่สามารถคัดลอกได้ในสภาพแวดล้อมนี้' };
    return;
  }
  await navigator.clipboard.writeText(generateHtml());
  snackbar.value = { open: true, message: 'คัดลอก HTML แล้ว' };
};

const downloadHtml = () => {
  const blob = new Blob([generateHtml()], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'email-template.html';
  link.click();
  URL.revokeObjectURL(link.href);
  snackbar.value = { open: true, message: 'ดาวน์โหลดไฟล์แล้ว' };
};
</script>

<style scoped>
.email-preview {
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.email-preview:hover {
  box-shadow: 0 12px 38px rgba(0, 0, 0, 0.14);
  transform: translateY(-2px);
}

.preview-block {
  overflow: hidden;
}

.gap-1 {
  gap: 4px;
}

.gap-3 {
  gap: 12px;
}
</style>
