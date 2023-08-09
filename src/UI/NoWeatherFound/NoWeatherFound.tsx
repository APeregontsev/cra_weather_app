import style from "./style.module.scss";

const NoWeatherFound = () => {
  return (
    <div className={style.trip_card_wrapper}>
      <div className={style.not_found_text}>Please select a trip first</div>
    </div>
  );
};

export default NoWeatherFound;
