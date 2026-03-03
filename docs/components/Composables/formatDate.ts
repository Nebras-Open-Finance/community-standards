/** Format an ISO date string with date and time (e.g. "03/03/2026, 4:00 pm") */
export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-UK', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

/** Format an ISO date string with date only (e.g. "03/03/2026") */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('en-UK', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
}
