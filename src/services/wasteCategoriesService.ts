export interface WasteCategory {
  id: string;
  categoryCode: string;
  categoryName: string;
  description: string | null;
  handlingTips: string | null;
  colorHex: string | null;
  pointsReward: number;
}
