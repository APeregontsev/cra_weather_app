import style from "./style.module.scss";
import { FC } from "react";

type DayCardProps = { date: string; img: string; tempDay: number; tempNight: number };

const DayCard: FC<DayCardProps> = ({ date, img, tempDay, tempNight }) => {
  const weekday = new Date(date).toLocaleString("en-US", { weekday: "long" });

  return (
    <div className={style.day_card}>
      <div className={style.day_title}>{weekday}</div>
      <div className={style.day_img}>
        <img src={`./img/${img}.png`} alt={img} />
      </div>
      <div className={style.day_temp}>
        <span>{tempDay}&deg;</span>/ <span>{tempNight}&deg;</span>
      </div>
    </div>
  );
};

export default DayCard;
