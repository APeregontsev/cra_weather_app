import { SelectOptionType } from "./UI/Select/Select";
import { TripType } from "./useTrips";

// Starting data for TripsList
export const startData: TripType = { id: 1, name: "Berlin", startDate: "2023-08-22", endDate: "2023-08-23" };

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
// export const apiKey = "TYKNEVLH4Y9XGZG354FYJG9RT";
// "homepage": "https://aperegontsev.github.io/cra_weather_app",
