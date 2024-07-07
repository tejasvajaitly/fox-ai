export interface ToBeExperience {
  companyName: string;
  role: string;
  context: string;
  project: string;
  metrics: string;
  userId: string;
}

export interface Experience extends ToBeExperience {
  id: number;
  userId: string;
}
