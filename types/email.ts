export type BlockType = 'text' | 'image' | 'button' | 'divider';

export interface BlockStyles {
  align: 'left' | 'center' | 'right';
  textColor: string;
  background: string;
  padding: string;
  fontSize: number;
  fontWeight: '300' | '400' | '500' | '600' | '700';
  borderRadius: number;
}

export interface EmailBlock {
  id: string;
  type: BlockType;
  title: string;
  content: string;
  actionUrl?: string;
  imageAlt?: string;
  imageFullWidth?: boolean;
  styles: BlockStyles;
}

export interface EmailSettings {
  width: number;
  background: string;
  padding: number;
  fontFamily: string;
}
