import type { CardData } from "./CardData";
type CardProps = {
  card: CardData;
  cardIdx: number;
  autoImageIndex: Record<number, number>;
  handleMouseLeave: (cardIdx: number) => void;
  hoveredImage: Record<number, number | null>;
  handleMouseEnter: (cardIdx: number, imgIdx: number) => void;
};
export type { CardProps, CardData };
