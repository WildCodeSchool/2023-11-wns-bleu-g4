import { ToastConfigLogin } from "@/config/ToastConfig";
import { toast } from "react-toastify";

export function validatePassword(password: string, repeatPassword: string): boolean {
  if (password.length < 1) {
    toast.error("Password can't be empty", ToastConfigLogin);
    return false;
  }

  if (password.search(/[a-z]/) < 0) {
    toast.error("Password must contain a lowercase", ToastConfigLogin);
    return false;
  }

  if (password.search(/[A-Z]/) < 0) {
    toast.error("Password must contain an uppercase letter", ToastConfigLogin);
    return false;
  }

  if (password.search(/[0-9]/) < 0) {
    toast.error("Password must contain a number", ToastConfigLogin);
    return false;
  }

  if (password.search(/\D+\S+\W/) < 0) {
    toast.error("Password must contain at least 1 special character", ToastConfigLogin);
    return false;
  }

  if (password.length < 8) {
    toast.error("Password must be at least 12 chars long", ToastConfigLogin);
    return false;
  }

  if (password !== repeatPassword && password !== "") {
    toast.error("Passwords must be the same", ToastConfigLogin);
    return false;
  }

  return true;
}
