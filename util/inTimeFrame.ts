export default function todayInTimeFrame(start_date: string, end_date: string): boolean {
  const today = new Date()
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  return (today >= startDate && today <= endDate);
}