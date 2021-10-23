import { parseISO, format } from "date-fns";
import formatRelative from "date-fns/formatRelative";
export const formatDate = (date: Date) => {
  const formatted: string = formatRelative(
    Date.parse(date.toString()),
    new Date()
  );

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const formatDateFromDB = (date: Date) => {
  const dt = parseISO(date.toString());
  const dtDateOnly = new Date(
    dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000
  );
  return format(dtDateOnly, "dd MMMM yyyy");
};

export const formatDateInput = (date: Date) => {
  const dt = parseISO(date.toString());
  const dtDateOnly = new Date(
    dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000
  );
  return format(dtDateOnly, "yyyy-MM-dd");
};
