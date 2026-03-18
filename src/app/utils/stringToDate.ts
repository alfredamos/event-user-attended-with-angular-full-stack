export function stringToDate(date: string | Date) {
  return typeof date === "string" ? new Date(date) : date;
}
