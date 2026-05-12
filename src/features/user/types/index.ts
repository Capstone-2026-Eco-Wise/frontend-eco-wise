import type { ReactNode } from "react";

export interface DashboardLayoutProps {
  children: ReactNode;
}

export interface ScanHistoryItem {
  id: number;
  item: string;
  date: string;
  points: string;
  status: string;
}
