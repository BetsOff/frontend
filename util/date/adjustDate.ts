export function adjustDate(dateStr: string, daysToAdd: number): string {
  // Split the date string into components (DD, MM, YYYY)
  const [day, month, year] = dateStr.split('-').map(Number);

  // Create a Date object with the provided date
  const date = new Date(year, month - 1, day); // Month is 0-based in Date constructor

  // Add or subtract days
  date.setDate(date.getDate() + daysToAdd);

  // Format the date back to 'DD-MM-YYYY'
  const adjustedDay = String(date.getDate()).padStart(2, '0');
  const adjustedMonth = String(date.getMonth() + 1).padStart(2, '0');
  const adjustedYear = date.getFullYear();

  return `${adjustedDay}-${adjustedMonth}-${adjustedYear}`;
}