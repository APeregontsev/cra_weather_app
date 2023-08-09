import style from "./style.module.scss";
import { FC } from "react";
import classNames from "classnames";
import { TripType } from "../../useTrips";

type TripCardProps = {
  tripData: TripType;
  active?: boolean;
  onClick: () => void;
  onRemove: () => void;
};

const TripCard: FC<TripCardProps> = ({ tripData, active, onClick, onRemove }) => {
  // Function for Date format transform 09/01/2023 -> 01.09.2023

  function dateTransform(date: string) {
    return new Date(date).toLocaleString("ru-RU", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }

  // Remove Trip handler
  function removeTrip(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    onRemove();
  }

  return (
    <div className={classNames(style.trip_card_wrapper, { [style.active]: active })} onClick={onClick}>
      <div className={style.remove} onClick={removeTrip}></div>
      <div className={style.img_conteiner}>
        <img src={`./img/cities/${tripData.name.toLowerCase()}.jpg`} alt="" />
      </div>
      <div className={style.text_block}>
        <div className={style.text_title}>{tripData.name}</div>
        <div className={style.text_dates}>
          {dateTransform(tripData.startDate)} - {dateTransform(tripData.endDate)}
        </div>
      </div>
    </div>
  );
};

export default TripCard;
