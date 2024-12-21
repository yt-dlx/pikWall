import type { ImageMetadata } from "./ImageMetadata";
type EnvironmentEntry = {
  environment_title: string;
  environment_moral: string;
  environment_prompt: string;
  images: ImageMetadata[];
};
export type { EnvironmentEntry };
