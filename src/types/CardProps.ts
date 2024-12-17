import type { CardData } from "./CardData";
type CardProps = {
  card: CardData;
  cardIdx: number;
  autoImageIndex: Record<number, number>;
  hoveredImage: Record<number, number | null>;
  handleMouseEnter: (cardIdx: number, imgIdx: number) => void;
  handleMouseLeave: (cardIdx: number) => void;
  setSelectedCard: React.Dispatch<React.SetStateAction<number | null>>;
};
export type { CardProps };
