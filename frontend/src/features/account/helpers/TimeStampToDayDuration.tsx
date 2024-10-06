export default function TimeStampToDayDuration(startDate: Date, endDate: Date) {
  let dayFrom: Date = new Date(startDate)
  let dayTo: Date = new Date(endDate)

  let dateFrom: number = dayFrom.getTime()
  let dateTo: number = dayTo.getTime()

  // milliseconds to days
  let result = Math.floor((dateTo - dateFrom) / 86400000)

  // Only one day 
  if (result === 0) return 1

  return result
}
