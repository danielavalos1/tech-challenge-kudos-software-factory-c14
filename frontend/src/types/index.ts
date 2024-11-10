export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  role?: "admin" | "user";
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Errors {
  row: number;
  details: Detail;
}

interface Detail {
  name?: DetailStructure;
  email?: DetailStructure;
  age?: DetailStructure;
  password?: DetailStructure;
  role?: DetailStructure;
}

interface DetailStructure {
  value: string;
  error: string;
}

export interface MyResponse {
  ok: boolean;
  data: {
    successCount: number;
    failedCount: number;
    success: Omit<User, "password">[];
    errors: Errors[];
  };
}
