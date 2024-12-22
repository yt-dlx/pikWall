// Base types for image and color data
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type ColorValue = RGB | RGBA | HEX | string;

// Image metadata and related types
interface ImageMetadata {
  id: string;
  original_file_name: string;
  previewLink: string;
  downloadLink: string;
  primary: ColorValue;
  secondary: ColorValue;
  tertiary: ColorValue;
  created_at: string;
  updated_at: string;
}

interface EnvironmentEntry {
  id: string;
  environment_title: string;
  environment_prompt: string;
  environment_moral: string;
  images: ImageMetadata[];
  created_at: string;
  updated_at: string;
}

// Component props interfaces
interface SubImageProps {
  image: ImageMetadata;
  index: number;
  currentColors: ColorValue[];
  onImagePress: (previewLink: string, index: number) => void;
  environmentData: DownloadScreenProps;
}

interface SubImagesProps {
  images: DownloadScreenProps;
  currentColors: ColorValue[];
  onImagePress: (previewLink: string, index: number) => void;
}

interface CardTextProps {
  data: EnvironmentEntry;
  currentIndex: number;
}

interface CardProps {
  data: EnvironmentEntry;
}

interface AlphabetGroupProps {
  title: string;
  items: EnvironmentEntry[];
}

interface CategoryButtonProps {
  category: string;
}

interface DownloadScreenProps {
  environment_title: string;
  environment_prompt: string;
  environment_moral: string;
  data: ImageMetadata[];
}

// State types
type GroupedData = {
  [key: string]: EnvironmentEntry[];
};

interface AnimationState {
  opacity: number;
  translateX: number;
}

// Navigation params
interface DownloadScreenParams {
  data: string; // JSON stringified DownloadScreenProps
}

// Response types for API calls
interface APIResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Event handler types
type ImagePressHandler = (previewLink: string, index: number) => void;
type CategoryPressHandler = (category: string) => void;

// Utility types
type Optional<T> = {
  [P in keyof T]?: T[P];
};

type ReadOnly<T> = {
  readonly [P in keyof T]: T[P];
};

export type {
  RGB,
  RGBA,
  HEX,
  ColorValue,
  ImageMetadata,
  EnvironmentEntry,
  SubImageProps,
  SubImagesProps,
  CardTextProps,
  CardProps,
  AlphabetGroupProps,
  CategoryButtonProps,
  DownloadScreenProps,
  GroupedData,
  AnimationState,
  DownloadScreenParams,
  APIResponse,
  ImagePressHandler,
  CategoryPressHandler,
  Optional,
  ReadOnly
};
