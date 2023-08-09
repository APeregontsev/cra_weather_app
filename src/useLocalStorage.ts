import { useState, useEffect } from "react";
import { TripListType } from "./useTrips";

function getStorageData(key: string, defaultValue: TripListType) {
  // Getting stored data
  const storedData = localStorage.getItem(key);

  if (!storedData) return defaultValue;

  // For case when we obtain [] - empty array
  if (storedData.length < 3) return defaultValue;

  const parsedData = JSON.parse(storedData);
  return parsedData;
}

export const useLocalStorage = (key: string, defaultValue: TripListType) => {
  const [value, setValue] = useState(() => {
    return getStorageData(key, defaultValue);
  });

  useEffect(() => {
    // Saving data to LocalStorage
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return { value, setValue };
};
