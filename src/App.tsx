import style from "./App.module.scss";
import HeaderLogo from "./UI/HeaderLogo/HeaderLogo";
import SearchInput from "./UI/SearchInput/SearchInput";
import AddTripCard from "./UI/AddTripCard/AddTripCard";
import Sidebar from "./Components/Sidebar/Sidebar";
import TripsSlider from "./Components/TripsSlider/TripsSlider";
import DaysSlider from "./Components/DaysSlider/DaysSlider";
import ModalWindow from "./UI/ModalWindow/ModalWindow";
import { useState } from "react";
import AddTripModal from "./Components/AddTrip/AddTripModal";
import { TripsContext, useTrips } from "./useTrips";

function App() {
  // State for SearchQuery
  const [searchQuery, setSearchQuery] = useState("");

  // Getting data and actions from custom hook to use in Context (initial data retrieved from LocalStorage if exists)
  // Obtaining SORTED and SEARCHED data
  const trips = useTrips(searchQuery);

  // For modal window
  const [modalAddTrip, setModalAddTrip] = useState(false);

  console.log("tripsList", trips.tripsList);
  console.log("activeTrip", trips.activeTripID);

  return (
    <TripsContext.Provider value={trips}>
      <div className={style.wrapper}>
        <div className={style.mainblock_wrapper}>
          <HeaderLogo />
          <SearchInput onSearch={setSearchQuery} />

          <div className={style.trips_wrapper}>
            <TripsSlider />
            <AddTripCard action={() => setModalAddTrip(!modalAddTrip)} />
          </div>

          <div className={style.week_wrapper}>
            <div className={style.week_title}>Period</div>
            <DaysSlider />
          </div>
        </div>

        <Sidebar />

        <ModalWindow showModal={modalAddTrip} action={() => setModalAddTrip(!modalAddTrip)}>
          <AddTripModal onClose={() => setModalAddTrip(false)} />
        </ModalWindow>
      </div>
    </TripsContext.Provider>
  );
}

export default App;
