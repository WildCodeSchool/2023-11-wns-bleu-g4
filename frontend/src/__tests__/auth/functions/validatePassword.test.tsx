import validatePassword from "@/features/auth/helpers/validatePassword";

let password1 = "Couc0u!"
let password2 = "Couc0u123"

describe("ValidatePassword Function", () => {
    it("should not validate under 8 charachters", () => {
        let { validate, message } = validatePassword(password1, password1)
        expect(message).toBe("Password must be at least 8 chars long")
        expect(validate).toBe(false)
    })
    it("should not validate without special character", () => {
        let { validate, message } = validatePassword(password2, password2)
        expect(message).toBe("Password must contain at least 1 special character")
        expect(validate).toBe(false)
    })
})
