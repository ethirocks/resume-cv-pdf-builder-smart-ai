export interface Education {
  institution: string;
  degree: string;
  startDate: Date;
  endDate: Date;
  currently: boolean;
  description: string;
}

export interface Experience {
  company: string;
  role: string;
  startDate: Date;
  endDate: Date;
  currently: boolean;
  description: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  education: Education[];
  experience: Experience[];
  skills: string;
}
