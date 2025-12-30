export const getDate = (date: string | null) => {
  return date?.split("T")[0];
};

export const getTime = (date: string | null) => {
  return date?.split("T")[1].split(".")[0].slice(0, 5);
};

export const getStartTime = (date: string | null) => {
  return date?.split("-")[0];
};

export const getEndTime = (date: string | null) => {
  return date?.split("-")[1];
};