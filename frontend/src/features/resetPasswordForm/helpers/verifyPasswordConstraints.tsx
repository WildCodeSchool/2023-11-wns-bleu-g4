export function hasOneUpper(password: string): boolean {
  const regexUpper = /[A-Z]/;
  return regexUpper.test(password);
}

export function hasOneLower(password: string): boolean {
  const regexLower = /[a-z]/;
  return regexLower.test(password);
}

export function hasOneNumber(password: string): boolean {
  const regexNumber = /[0-9]/;
  return regexNumber.test(password);
}

export function hasOneSpecial(password: string): boolean {
  const regexSpecial = /\D+\S+\W/;
  return regexSpecial.test(password);
}
