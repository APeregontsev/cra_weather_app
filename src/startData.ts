import { SelectOptionType } from "./UI/Select/Select";
import { TripType } from "./useTrips";

// Starting data for TripsList

// Lets calculate start and end Dates for future periods, because past dates cost 30X in API-requests..
const startDate = new Date(new Date().setDate(new Date().getDate() + 1));
const endDate = new Date(new Date().setDate(new Date().getDate() + 5));

const startDateString =
  startDate.getFullYear() +
  "-" +
  (startDate.getMonth() + 1).toString().padStart(2, "0") +
  "-" +
  startDate.getDate().toString().padStart(2, "0");

const endDateString =
  endDate.getFullYear() +
  "-" +
  (endDate.getMonth() + 1).toString().padStart(2, "0") +
  "-" +
  endDate.getDate().toString().padStart(2, "0");

// Starting data for TripsList

export const startData: TripType = {
  id: 1,
  name: "Berlin",
  startDate: startDateString,
  endDate: endDateString,
};

//Starting data for Select
export const selectData: SelectOptionType[] = [
  {
    label: "Barcelona",
    value: 1,
  },
  {
    label: "Berlin",
    value: 2,
  },
  {
    label: "Kyiv",
    value: 3,
  },
  {
    label: "London",
    value: 4,
  },
  {
    label: "Paris",
    value: 5,
  },
  {
    label: "Tokyo",
    value: 6,
  },
  {
    label: "Washington",
    value: 7,
  },
];

// API key

export const apiKey = "MESYLPREKWZD9EZSQMFGDNE2V";
