export const getDate = (date: string) => {
  const dateObj = new Date(date);

  return dateObj.toISOString().split("T")[0];
};

export const getTime = (date: string) => {
    const dateObj = new Date(date);

    return dateObj.toTimeString().split(" ")[0];
}
