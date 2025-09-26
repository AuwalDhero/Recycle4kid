export interface User {
  id: string;
  email: string;
  name: string;
  role: 'child' | 'family' | 'school' | 'admin';
  points: number;
  badges: Badge[];
  created_at: string;
  school_name?: string;
  parent_email?: string;
}

export interface WasteLog {
  id: string;
  user_id: string;
  waste_type: 'plastic' | 'cans' | 'ewaste' | 'paper' | 'glass';
  weight: number;
  points_earned: number;
  created_at: string;
  impact_message?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  points_required: number;
  earned_at?: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  rank: number;
  type: 'individual' | 'family' | 'school';
  total_waste: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  points_cost: number;
  category: 'airtime' | 'school_supplies' | 'health';
  image_url: string;
  available: boolean;
}

export interface ImpactStats {
  total_waste_collected: number;
  co2_saved: number;
  children_impacted: number;
  bottles_saved: number;
  trees_equivalent: number;
}