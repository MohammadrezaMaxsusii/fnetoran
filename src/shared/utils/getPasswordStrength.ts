export const getPasswordStrength = (password: string) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/\d/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score;
};

export const getPasswordStyles = [
  {
    color: "#dc2626",
    width: "w-1/5",
  },
  {
    color: "#ea580c",
    width: "w-2/5",
  },
  {
    color: "#ca8a04",
    width: "w-3/5",
  },
  {
    color: "#16a34a",
    width: "w-4/5",
  },
  {
    color: "#15803d",
    width: "w-full",
  },
];
