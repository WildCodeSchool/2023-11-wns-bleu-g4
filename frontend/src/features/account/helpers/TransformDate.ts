export default function transformToDate(dateToTransform: string, locale?: string | undefined) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const newDate = new Date(dateToTransform)
  return newDate.toLocaleDateString(locale, options)
}