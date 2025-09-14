import moment from "moment";

export const formatDate = (timeStamp: any): Date => {
  if (!timeStamp) return new Date();
  const date = new Date(timeStamp);
  date.setHours(0, 0, 0, 0);
  return date;
}

export const formatDateForText = (date: Date | null | undefined) => {
  if (!date) return "Select Date";
  return moment(date).format('LL');
}

export const formatTime = (timeStamp: any) => {
  if (!timeStamp) return "Select Time";
  const date = new Date(timeStamp);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
