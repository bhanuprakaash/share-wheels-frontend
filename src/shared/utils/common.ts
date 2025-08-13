export const convertISOtoLocalDate = (isoDate: string) => {
    if (!isoDate) return "N/A"; // or "" or some default value
    const date = new Date(isoDate);

    if (isNaN(date.getTime())) return "Invalid date";
    return date.getDate().toString().padStart(2, "0") + "/" +
        (date.getMonth() + 1).toString().padStart(2, "0") + "/" +
        date.getFullYear()
}

export const convertISOtoLocalTime = (isoDate: string) => {
    if (!isoDate) return "N/A";
    const dateObj = new Date(isoDate);
    if (isNaN(dateObj.getTime())) return "Invalid date";

    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
    }).format(dateObj);
}