// * this function is used to format the date to MM/DD/YYYY
// export const formatToMMDDYYYY = (date: Date): string => {
// 	if (!date) return "";
//   const options: Intl.DateTimeFormatOptions = {
//     month: "2-digit",
//     day: "2-digit",
//     year: "numeric",
//   };
//   return new Intl.DateTimeFormat("en-US", options).format(date);
// };

// * this function is used to format the date to MM-DD-YYYY
export const formatToMMDDYYYY = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};

export const getFormattedDate = () => {
  const date = new Date();
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Use toLocaleDateString for a custom date format
  return date.toLocaleDateString("en-US", {
    weekday: "long", // e.g. 'Monday'
    year: "numeric",
    month: "long", // e.g. 'February'
    day: "numeric",
  });
}

