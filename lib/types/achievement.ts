export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  requirement_type: string;
  requirement_value: number;
  points: number;
  rarity: string;
  unlocked?: boolean;
  unlocked_at?: string;
  progress?: number;
  total?: number;
}