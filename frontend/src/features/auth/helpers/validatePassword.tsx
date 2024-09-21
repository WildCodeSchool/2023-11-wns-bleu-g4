type ValidationResult = {
    validate: boolean;
    message: string;
};

export default function validatePassword(password: string, repeatPassword: string): ValidationResult {
    let message: string = ""
    let validate: boolean = true;

    if (password !== repeatPassword) {
        message = "Passwords must be the same"
        return { validate: false, message };
    }
    if (password.length < 8) {
        message = "Password must be at least 8 chars long"
        return { validate: false, message };
    }
    if (password.search(/[a-z]/) < 0) {
        message = "Password must contain a lowercase"
        return { validate: false, message };
    }
    if (password.search(/[A-Z]/) < 0) {
        message = "Password must contain an uppercase letter"
        return { validate: false, message };
    }
    if (password.search(/[0-9]/) < 0) {
        message = "Password must contain a number"
        return { validate: false, message };
    }

    if (password.search(/\D+\S+\W/) < 0) {
        message = "Password must contain at least 1 special character"
        return { validate: false, message };
    }

    return { validate, message };
}