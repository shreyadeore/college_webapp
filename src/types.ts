export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  department?: string;
}

export interface DashboardStat {
  title: string;
  value: number;
  icon: string;
  change: number;
}

export interface NavigationItem {
  name: string;
  path: string;
  icon: string;
}