import { useEffect, useState } from "react";

interface Props {
  value: string;
  delay: number;
}

export const useDebunce = ({ value, delay = 500 }: Props) => {
  const [debuncedValue, setDebuncedValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebuncedValue(value), delay);

    () => clearTimeout(timer);
  }, []);

  return {
    debuncedValue,
  };
};
