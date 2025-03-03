export interface ExtractedElement {
  type: 'font' | 'color' | 'shape' | 'effect' | 'text' | 'palette';
  name: string;
  details: string;
  value?: string;
  downloadUrl: string;
}
