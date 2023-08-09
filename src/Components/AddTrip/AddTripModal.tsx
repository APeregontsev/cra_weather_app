import style from "./style.module.scss";
import { FC, useState, useContext } from "react";
import Button from "../../UI/Button/Button";
import Select from "../../UI/Select/Select";
import { SelectOptionType } from "./../../UI/Select/Select";
import { selectData } from "../../startData";
import classNames from "classnames";
import { TripsContext } from "../../useTrips";

type AddTripModalProps = {
  onClose: () => void;
};

const AddTripModal: FC<AddTripModalProps> = ({ onClose }) => {
  const trips = useContext(TripsContext);

  // State for select
  const [selectValue, setSelectValue] = useState<SelectOptionType>({
    label: "Please select a city",
    value: 0,
  });

  // States for Date inputs
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Function for creation new Trip
  function saveTripHandler() {
    // Lets check weather all fields are filled
    const allFieldsValid = selectValue.value !== 0 && startDate && endDate;
    if (!allFieldsValid) return;

    // Lets prepare new Trip data for adding to TripList
    const newTripData = { id: 0, name: selectValue.label, startDate, endDate };

    // Lets update State
    trips.addTrip(newTripData);

    // Close Modal Window
    onClose();
  }

  // Calculation of Min and Max dates for selection in Inputs

  const minDate = new Date().toISOString().split("T")[0];

  const maxDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 15);
    return currentDate.toISOString().split("T")[0];
  };

  return (
    <>
      <div className={style.modal_header}>
        <div className={style.modal_title}>Create trip</div>
        <Button type={"close"} action={onClose}></Button>
      </div>

      <div className={style.modal_body}>
        <div className={style.input_wrapper}>
          <div className={style.input_name}>City</div>

          <Select options={selectData} value={selectValue} onChange={(option) => setSelectValue(option)} />
        </div>

        <div className={style.input_wrapper}>
          <div className={style.input_name}>Start date</div>
          <input
            value={startDate}
            min={minDate}
            max={maxDate()}
            required
            type="date"
            className={classNames(style.date_input, { [style.empty]: !startDate })}
            name="start_date"
            placeholder="Select date"
            onInput={(e) => setStartDate((e.target as HTMLInputElement).value)}
          />
        </div>

        <div className={style.input_wrapper}>
          <div className={style.input_name}>End date</div>
          <input
            value={endDate}
            min={minDate}
            max={maxDate()}
            required
            type="date"
            className={classNames(style.date_input, { [style.empty]: !endDate })}
            name="end_date"
            placeholder="Select date"
            onInput={(e) => setEndDate((e.target as HTMLInputElement).value)}
          />
        </div>
      </div>

      <div className={style.modal_footer}>
        <Button type={"cancel"} action={onClose}>
          Cancel
        </Button>
        <Button type={"save"} action={saveTripHandler}>
          Save
        </Button>
      </div>
    </>
  );
};

export default AddTripModal;
