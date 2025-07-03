export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  subscriptionStatus: 'active' | 'inactive' | 'cancelled';
  subscriptionExpiry: string;
  joinDate: string;
  savedJobs: string[];
  lastLogin: string;
  emailVerified: boolean;
}

export interface Job {
  id: string;
  title: string;
  agency: string;
  location: string;
  payRate: string;
  jobType: string;
  startDate: string;
  endDate: string;
  experienceLevel: string;
  description: string;
  requirements: string[];
  applicationMethod: string;
  contactEmail: string;
  postedDate: string;
  isActive: boolean;
  views: number;
  applications: number;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'failed' | 'pending';
  paymentDate: string;
  subscriptionPeriodStart: string;
  subscriptionPeriodEnd: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isSubscribed: boolean;
  isAdmin: boolean;
  updateUser: (updates: Partial<User>) => void;
}

export interface JobFilter {
  location: string;
  jobType: string;
  payRate: string;
  experienceLevel: string;
  search: string;
}