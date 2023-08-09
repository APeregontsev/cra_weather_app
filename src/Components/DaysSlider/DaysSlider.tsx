import style from "./style.module.scss";
import { FC, useContext, useEffect, useRef, useState } from "react";
import Button from "../../UI/Button/Button";
import DayCard from "../../UI/DayCard/DayCard";
import { TripsContext } from "../../useTrips";
import { useFetching } from "../../useFetching";
import Loading from "../../UI/Loader/Loader";
import { apiKey } from "../../startData";
import NoWeatherFound from "../../UI/NoWeatherFound/NoWeatherFound";

type DaysSliderProps = {};

const DaysSlider: FC<DaysSliderProps> = () => {
  // Obtaining data
  const trips = useContext(TripsContext);

  // Loading data from the API
  const [fetchWeather, isLoading, error] = useFetching(async () => {
    if (!trips.activeTrip.name) return;

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${trips.activeTrip.name}/${trips.activeTrip.startDate}/${trips.activeTrip.endDate}?unitGroup=metric&key=${apiKey}&contentType=json`
    );

    const responseData = await response.json();

    const preparedData = responseData.days.map((day: any) => {
      return {
        date: day.datetime,
        tempMax: Math.trunc(day.tempmax),
        tempMin: Math.trunc(day.tempmin),
        icon: day.icon,
      };
    });

    trips.setWeatherList(preparedData);
  });

  useEffect(() => {
    fetchWeather();
  }, [trips.activeTripID]);

  // Logic for slider
  const [currentIndex, setCurrentIndex] = useState(9);

  const nextPage = currentIndex < trips.weatherList.length;
  const prevPage = currentIndex > 9;

  const sliderBody = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sliderBody.current) return;
    sliderBody.current.style.transform = `translateX(-${(currentIndex - 9) * 100}px)`;
  }, [currentIndex]);

  // Lets reset slider if we changed Wheather Data
  useEffect(() => {
    setCurrentIndex(9);
  }, [trips.weatherList]);

  return (
    <div className={style.week_days_wrapper}>
      <div className={style.slider_wrapper}>
        <div className={style.slider_body} ref={sliderBody}>
          {isLoading ? (
            <Loading />
          ) : (
            trips.weatherList.map((day) => {
              return (
                <DayCard
                  key={day.date}
                  date={day.date}
                  img={day.icon}
                  tempDay={day.tempMax}
                  tempNight={day.tempMin}
                />
              );
            })
          )}

          {trips.weatherList.length === 0 && <NoWeatherFound />}
        </div>
      </div>

      <div className={style.slider_control_wrapper}>
        <Button type={"slider"} disabled={!prevPage} action={() => setCurrentIndex(currentIndex - 9)}>
          {"<"}
        </Button>

        <Button type={"slider"} disabled={!nextPage} action={() => setCurrentIndex(currentIndex + 9)}>
          {">"}
        </Button>
      </div>
    </div>
  );
};

export default DaysSlider;
