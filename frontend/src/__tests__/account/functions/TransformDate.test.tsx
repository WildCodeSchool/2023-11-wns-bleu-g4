import transformToDate from "../../../features/account/helpers/TransformDate";

describe("TransformToDate", ()=> {
    it('returns the date with the month in letter', ()=> {
        let today = new Date("2024/06/17")
        expect(transformToDate(today)).toBe('17 juin 2024')
    })
})