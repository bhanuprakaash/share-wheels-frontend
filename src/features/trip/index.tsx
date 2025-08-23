import {lazy} from "react";

const TripsPage = lazy(() => import('./pages/Trips/Trips.tsx'));
const ScheduleTrip = lazy(() => import('./pages/ScheduleTrip.tsx'));
const TripDetails = lazy(() => import('./pages/TripDetails.tsx'));
const EditTrip = lazy(() => import('./pages/EditTrip.tsx'));
const SearchTrips = lazy(() => import('./pages/SearchTrips.tsx'));

// components
const TripHistoryTable = lazy(() => import('./components/TripHistoryTable.tsx'));

export {
    TripsPage,
    ScheduleTrip,
    TripDetails,
    EditTrip,
    SearchTrips,

    //components
    TripHistoryTable,
};