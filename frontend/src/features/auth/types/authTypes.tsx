export interface SignupType {
  email: string;
  password: string;
  repeatPassword?: string;
  acceptConditions: boolean;
}

export interface LoginType {
  email: string;
  password: string;
}
