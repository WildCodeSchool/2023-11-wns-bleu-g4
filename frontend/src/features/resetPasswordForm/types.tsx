export interface resetPasswordType {
  password: string;
  repeatPassword: string;
  token: string;
}

export interface PasswordCriteriaType {
  password: string;
  secondPassword: string;
}
