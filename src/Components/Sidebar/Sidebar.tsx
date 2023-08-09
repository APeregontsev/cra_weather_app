import style from "./style.module.scss";
import { FC, useContext, useEffect } from "react";
import classNames from "classnames";
import Button from "../../UI/Button/Button";
import TimerDigitCard from "../../UI/TimerDigitCard/TimerDigitCard";
import { useCountdown } from "../../useCountdown";
import { TripsContext } from "../../useTrips";
import { apiKey } from "../../startData";
import { useFetching } from "../../useFetching";

type SidebarProps = {};

const Sidebar: FC<SidebarProps> = ({}) => {
  // Obtaining data from States
  const trips = useContext(TripsContext);

  // Countdown

  const startDate = trips.activeTrip != undefined ? trips.activeTrip.startDate : "0";
  const timer = useCountdown(startDate);

  // Loading data from the API
  const [fetchWeather, isLoading, error] = useFetching(async () => {
    if (!trips.activeTrip.name) return;

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${trips.activeTrip.name}/today?unitGroup=metric&key=${apiKey}&contentType=json`
    );

    const responseData = await response.json();
    const preparedData = { date: "", tempMax: 0, tempMin: 0, icon: "" };
    responseData.days.forEach((day: any) => {
      preparedData.date = day.datetime;
      preparedData.tempMax = Math.trunc(day.tempmax);
      preparedData.tempMin = Math.trunc(day.tempmin);
      preparedData.icon = day.icon;
    });
    trips.setTodayWeather(preparedData);
  });

  useEffect(() => {
    fetchWeather();
  }, [trips.activeTripID]);

  const currentWeekday = new Date().toLocaleString("en-US", { weekday: "long" });

  return (
    <div className={style.sidebar_wrapper}>
      <div className={style.login_wrapper}>
        <Button type={"login"} disabled action={() => console.log("Click")}>
          Login
        </Button>
      </div>

      <div className={style.today_view_card}>
        <div className={style.weekday}>{currentWeekday}</div>

        <div className={style.today_weather}>
          <img src={`./img/${trips.todayWeather?.icon}.png`} alt={trips.todayWeather?.icon} />
          <div className={style.today_temp}>{trips.todayWeather?.tempMax}</div>
          <div className={style.today_degree}>&deg;C</div>
        </div>

        <div className={style.today_city}>{trips.activeTrip?.name}</div>
      </div>

      <div className={style.countdown_wrapper}>
        <TimerDigitCard text={"Day"}>{timer.days}</TimerDigitCard>
        <TimerDigitCard text={"Hour"}>{timer.hours}</TimerDigitCard>
        <TimerDigitCard text={"Minute"}>{timer.minutes}</TimerDigitCard>
        <TimerDigitCard text={"Second"}>{timer.seconds}</TimerDigitCard>
      </div>
    </div>
  );
};

export default Sidebar;
