import { useState } from "react";
import axios from "axios";
export const useError = () => {
  const [error, setError] = useState<String | undefined>();
  const checkError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      setError(err.response?.data);
    } else if (err instanceof Error) {
      setError(err.message);
    } else if (err instanceof String) {
      setError(err);
    }
  };
  return [error, checkError] as const;
};
