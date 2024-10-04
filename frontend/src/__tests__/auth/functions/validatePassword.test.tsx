import {validatePassword} from "@/features/auth/helpers/validatePassword";

let password1 = "Couc0u!"
let password2 = "Couc0u123156"
let passwordNotTheSame = "Majmin!!!123"


describe("ValidatePassword Function", () => {
    it("should not validate under 12 charachters", () => {
        let passIsOk = validatePassword(password1, password1)
        expect(passIsOk).toBe(false)
    })
    it("should not validate without special character", () => {
        let passIsOk =  validatePassword(password2, password2)
        expect(passIsOk).toBe(false)
    })
    it("should not validate 2 differents passwords", () => {
        let passIsOk = validatePassword(passwordNotTheSame, password1)
        expect(passIsOk).toBe(false)
    })
    it("should not validate without special character", () => {
        let passIsOk =  validatePassword(password2, password2)
        expect(passIsOk).toBe(false)
    })
})
