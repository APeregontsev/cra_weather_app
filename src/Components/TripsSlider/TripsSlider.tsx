import style from "./style.module.scss";
import { FC, useContext, useEffect, useRef, useState } from "react";
import Button from "../../UI/Button/Button";
import TripCard from "../../UI/TripCard/TripCard";
import NoTripFound from "../../UI/NoTripFound/NoTripFound";
import { TripsContext } from "../../useTrips";

const TripsSlider: FC = () => {
  const trips = useContext(TripsContext);

  // Logic for slider
  const [currentIndex, setCurrentIndex] = useState(3);

  const nextPage = currentIndex < trips.tripsList.length;
  const prevPage = currentIndex > 3;

  const sliderBody = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sliderBody.current) return;
    sliderBody.current.style.transform = `translateX(-${(currentIndex - 3) * 240}px)`;
  }, [currentIndex]);

  // Lets reset slider if we changed TripList
  useEffect(() => {
    setCurrentIndex(3);
  }, [trips.tripsList]);

  return (
    <div className={style.slider_conteiner}>
      <div className={style.slider_wrapper}>
        <div className={style.slider_body} ref={sliderBody}>
          {trips.tripsList.map((trip) => {
            return (
              <TripCard
                key={trip.id}
                tripData={trip}
                active={trip.id === trips.activeTripID}
                onClick={() => trips.setActiveTripID(trip.id)}
                onRemove={() => trips.deleteTrip(trip.id)}
              />
            );
          })}

          {trips.tripsList.length === 0 && <NoTripFound />}
        </div>
      </div>

      <div className={style.slider_control_wrapper}>
        <Button type={"slider"} disabled={!prevPage} action={() => setCurrentIndex(currentIndex - 1)}>
          {"<"}
        </Button>

        <Button type={"slider"} disabled={!nextPage} action={() => setCurrentIndex(currentIndex + 1)}>
          {">"}
        </Button>
      </div>
    </div>
  );
};

export default TripsSlider;
