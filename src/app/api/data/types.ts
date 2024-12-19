// src/app/api/data/types.ts
type ImageMetadata = {
  original_file_name: string;
  format: string;
  mode: string;
  file_size_bytes: number;
  file_size_megabytes: number;
  width: number;
  height: number;
  primary: string;
  secondary: string;
  tertiary: string;
  [key: string]: string | number;
  downloadLink: string;
  previewLink: string;
};
type EnvironmentEntry = {
  environment_title: string;
  environment_prompt: string;
  environment_moral: string;
  images: ImageMetadata[];
};
export type { EnvironmentEntry };
