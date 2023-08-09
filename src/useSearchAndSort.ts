import { useMemo } from "react";
import { TripListType, TripType } from "./useTrips";

// Function for Sorting by START_DATE
export const useSort = (data: TripListType) => {
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [data]);

  return sortedData;
};

// Function for Searching
export const useSearch = (data: TripListType, searchQuery: string) => {
  const sortedData = useSort(data);

  function searchCallback(trip: TripType) {
    if (trip.name.toString().toLowerCase().includes(searchQuery.toLowerCase())) return true;
  }

  const filteredData = useMemo(() => {
    if (searchQuery) {
      return sortedData.filter(searchCallback);
    } else {
      return sortedData;
    }
  }, [data, searchQuery]);

  return filteredData;
};
