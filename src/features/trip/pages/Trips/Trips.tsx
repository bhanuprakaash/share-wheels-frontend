import ScheduledTrips from "./SheduledTrips.tsx";
import ActiveTrips from "./ActiveTrips.tsx";
import {useSelector} from "react-redux";
import {selectUserId} from "../../../user/selectors/userSelectors.ts";
import {useGetDriverTrips} from "../../hooks/useTrip.ts";

const Trips = () => {
    const userId = useSelector(selectUserId);
    const {isLoading, isError, data} = useGetDriverTrips(userId);

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error...</div>

    const scheduledTrips = data?.data?.filter(trip => trip.trip_status === 'SCHEDULED') || [];
    const activeTrips = data?.data?.filter(trip => trip.trip_status === 'IN_PROGRESS') || [];


    return (
        <div className="flex flex-col gap-6">
            {activeTrips.length > 0 && <ActiveTrips trips={activeTrips}/>}
            <ScheduledTrips trips={scheduledTrips}/>
        </div>
    )
}

export default Trips;