export function getFormattedDateTime(date = new Date()) {
  const time = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  const dayName = new Intl.DateTimeFormat("id-ID", {
    weekday: "short",
  }).format(date);

  const dayMonth = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
  }).format(date);

  return {
    time,
    date: `${dayName}, ${dayMonth}`,
  };
}
