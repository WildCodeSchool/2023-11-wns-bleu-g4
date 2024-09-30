export default function TimeStampToDayDuration(startDate: Date, endDate: Date) {

    let dateFrom: number = startDate.getTime()
    let dateTo: number = endDate.getTime()

    // milliseconds to days
    let result = Math.floor((dateTo - dateFrom) / 86400000)

    // Only one day 
    if (result === 0) return 1

    // if negative value
    if (result < 0) return result * -1

    return result
}