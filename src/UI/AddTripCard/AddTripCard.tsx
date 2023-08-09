import style from "./style.module.scss";
import { FC } from "react";

type AddTripCardProps = {
  action: (arg: any) => void;
};

const AddTripCard: FC<AddTripCardProps> = ({ action }) => {
  return (
    <div className={style.add_trip_wrapper} onClick={action}>
      <div className={style.add_block}>
        <div className={style.add_plus}>+</div>
        <div className={style.add_text}>Add trip</div>
      </div>
    </div>
  );
};

export default AddTripCard;
