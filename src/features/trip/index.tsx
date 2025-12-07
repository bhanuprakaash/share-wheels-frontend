import { lazy } from "react";

const TripsPage = lazy(() => import("./pages/my-trips/Trips.tsx"));
const ScheduleTrip = lazy(() => import("./pages/ScheduleTrip.tsx"));
const TripDetails = lazy(() => import("./pages/TripDetails.tsx"));
const EditTrip = lazy(() => import("./pages/EditTrip.tsx"));
const SearchTrips = lazy(() => import("./pages/search-trips/SearchTrips.tsx"));
const Rides = lazy(() => import("./pages/my-rides/Rides.tsx"));

// components
const TripHistoryTable = lazy(
  () => import("./components/TripHistoryTable.tsx")
);

export {
  TripsPage,
  ScheduleTrip,
  TripDetails,
  EditTrip,
  SearchTrips,
  Rides,

  //components
  TripHistoryTable,
};
