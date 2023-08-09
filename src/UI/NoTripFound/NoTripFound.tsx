import style from "./style.module.scss";

const NoTripFound = () => {
  return (
    <div className={style.trip_card_wrapper}>
      <div className={style.not_found_text}>No trips found</div>
    </div>
  );
};

export default NoTripFound;
