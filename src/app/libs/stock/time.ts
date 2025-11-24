import { formatDate } from "date-fns";

export const getFidInputHour = () => {
  return formatDate(Date.now(), "HHmmss");
};
