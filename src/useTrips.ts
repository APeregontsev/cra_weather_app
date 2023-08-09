import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { startData } from "./startData";
import { useSearch } from "./useSearchAndSort";

export type TripType = { id: number; name: string; startDate: string; endDate: string };
export type TripListType = TripType[];

type TripManager = {
  tripsList: TripListType;
  activeTrip: TripType;
  activeTripID: number;
  addTrip: (newTripData: TripType) => void;
  deleteTrip: (id: number) => void;
  setActiveTripID: (id: number) => void;
  weatherList: WeatherTypeList;
  setWeatherList: (arg: WeatherTypeList) => void;
  todayWeather: WeatherType | null;
  setTodayWeather: (arg: WeatherType) => void;
};

type WeatherType = {
  date: string;
  tempMax: number;
  tempMin: number;
  icon: string;
};

type WeatherTypeList = WeatherType[];

// General states and action in custom hook
// (this time I decided to make it with custom hook instead of using Redux or useReducer hook)
export function useTrips(searchQuery: string): TripManager {
  // Getting data from LocalStorage if it exist otherwise lets use starting data
  const localStorageData = useLocalStorage("Trips_List", [startData]);

  // States
  const [tripsList, setTripsList] = useState<TripListType>(localStorageData.value);
  const [activeTripID, setActiveTripID] = useState<number>(1);
  const [weatherList, setWeatherList] = useState<WeatherTypeList>([]);
  const [todayWeather, setTodayWeather] = useState<WeatherType | null>(null);

  //Data after applying search
  const filteredData = useSearch(tripsList, searchQuery);

  // Saving Data to LocalStorage if TripsList is changed
  useEffect(() => {
    localStorageData.setValue(tripsList);
  }, [tripsList]);

  return {
    // 1) List of Trips
    tripsList: filteredData,

    // 2) To add Trip to TripList
    addTrip: (newTripData: TripType) => {
      setTripsList((currentState) => {
        // Lets calculate possible ID for new entry
        const newID = currentState.length > 0 ? currentState[currentState.length - 1].id + 1 : 1;
        newTripData.id = newID;

        return [...currentState, newTripData];
      });
    },

    // 3) To set Active Trip
    setActiveTripID: (id) => setActiveTripID(id),

    // 4) To get Active Trip ID
    activeTripID: activeTripID,

    // 5) To get Active Trip
    activeTrip: tripsList.find((trip) => trip.id === activeTripID)!,

    // 6) To remove Trip from TripLIst
    deleteTrip: (id) => {
      setTripsList((oldState) => [...oldState.filter((trip) => trip.id !== id)]);
    },

    // 7) Weather List (for period)
    weatherList: weatherList,

    // 8) To set Weather List
    setWeatherList: (list) => setWeatherList(list),

    // 9) Today weather for selected Trip
    todayWeather: todayWeather,

    // 10) To set Today weather for selected Trip
    setTodayWeather: (day) => setTodayWeather(day),
  };
}

//Lets create Context for useContext
export const TripsContext = createContext<TripManager>({
  tripsList: [],
  activeTripID: 1,
  activeTrip: { id: 1, name: "", startDate: "", endDate: "" },
  weatherList: [],
  setWeatherList: () => {},
  addTrip: () => {},
  setActiveTripID: () => {},
  deleteTrip: () => {},
  todayWeather: null,
  setTodayWeather: () => {},
});
