import { UserRole } from '../enums/UserRole';

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  phone?: string;
  is_active: boolean;
  date_joined?: string;
  biography?: string;
  country?: string;
  birth_date?: string;
  avatar?: string | null;
  professional_title?: string;
  specialty?: string;
  linkedin_url?: string;
}
