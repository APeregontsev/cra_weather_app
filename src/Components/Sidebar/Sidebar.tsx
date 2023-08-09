import style from "./style.module.scss";
import { FC, useContext, useEffect, useState } from "react";
import classNames from "classnames";
import Button from "../../UI/Button/Button";
import TimerDigitCard from "../../UI/TimerDigitCard/TimerDigitCard";
import { useCountdown } from "../../useCountdown";
import { TripsContext } from "../../useTrips";
import { apiKey } from "../../startData";
import { useFetching } from "../../useFetching";
import jwt_decode from "jwt-decode";

type SidebarProps = {};

const Sidebar: FC<SidebarProps> = ({}) => {
  // Google LOGIN CODE

  const [user, setUser] = useState<any>();

  function handleCallbackResponse(response: any) {
    const userObject = jwt_decode(response.credential);
    setUser(userObject);

    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!! Credentials", userObject);
  }

  function handleSignOut() {
    setUser(null);
  }

  useEffect(() => {
    /* global google */

    window.google.accounts.id.initialize({
      client_id: "661424951133-rmmo17jfcpvesav4mjhs4g2fijjts3a6.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    const parent = document.getElementById("signInDiv");

    window.google.accounts.id.renderButton(parent as HTMLElement, {
      type: "standard",
      size: "medium",
    });
  }, [user]);

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
        {!user && <div id="signInDiv"></div>}

        {user && (
          <div className={style.googleLoginContainer} onClick={() => handleSignOut()}>
            <img className={style.googleImg} src={user.picture} />
            <p className={style.googleName}>{user.name}</p>
          </div>
        )}
        {/*   <Button type={"login"} disabled action={() => console.log("Click")}>
          Login
        </Button> */}
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
