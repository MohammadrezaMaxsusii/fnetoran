import { useState } from "react";

// ----------------------------------------------------------------------

export const useBoolean = (defaultValue = false) => {
  const [value, setValue] = useState(defaultValue);

  const onTrue = () => setValue(true);

  const onFalse = () => setValue(false);

  return {
    value,
    onTrue,
    onFalse,
  };
};
