import { useState } from "react";

export const useFetching = (callback: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const fetching: Awaited<ReturnType<typeof callback>> = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (error) {
      setError((error as any).message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
