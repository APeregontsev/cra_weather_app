import style from "./style.module.scss";
import { FC } from "react";

type DigitCardProps = {
  children: string;
  text: "Day" | "Hour" | "Minute" | "Second";
};

const TimerDigitCard: FC<DigitCardProps> = ({ children, text }) => {
  return (
    <div className={style.digit_card}>
      <div className={style.digit_value}>{children}</div>
      <div className={style.digit_name}>{text}s</div>
    </div>
  );
};

export default TimerDigitCard;
