export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string; // Date string from JSON
  time: string;
  location: string;
  image: string;
  category: string;
  featured: boolean;
  link: string | null;
}

export interface Invite {
  _id: string;
  token: string;
  email: string;
  name: string;
  position: "President" | "Vice President" | "Treasurer" | "Secretary" | "Public Relations Officer" | "Web Developer" | "Social Media Manager" | "Member";
  memberType: "General Member" | "Executive Board";
  isUsed: boolean;
  expiresAt: string;
}

export interface ProfileLinks {
  github?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  website?: string | null;
}

export interface ProfileAbout {
  year?: "Freshman" | "Sophomore" | "Junior" | "Senior" | "Graduate" | null;
  major?: string | null;
  minor?: string | null;
  personal_goals?: string | null;
}

export interface Profile {
  _id: string;
  name: string;
  position: "President" | "Vice President" | "Treasurer" | "Secretary" | "Public Relations Officer" | "Web Developer" | "Social Media Manager" | "Member";
  Member: "Executive Board" | "General Member";
  image: string | null;
  link: ProfileLinks | null;
  about: ProfileAbout | null;
}

export interface User {
  _id: string;
  email: string;
  memberId: Profile | string; // Can be populated or just ID
  token?: string; // Optional for auth response
}
