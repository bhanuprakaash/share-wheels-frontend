import { useNavigate, useParams } from "react-router-dom";

import Title from "../../../shared/components/basic/Title.tsx";
import Icon from "../../../shared/components/basic/Icon.tsx";
import { useGetTrip } from "../hooks/useTrip.ts";
import type { TripId } from "../types/trip.ts";
import { useGetVehicleById } from "../../vehicle/hooks/useVehicle.ts";
import TripDetailsCard from "../../../shared/components/cards/TripDetailsCard.tsx";
import { useSelector } from "react-redux";
import { selectUser } from "../../user/selectors/userSelectors.ts";
import TripMapCard from "../../../shared/components/cards/TripMapCard.tsx";
import PassengerItem from "../components/PassengerItem.tsx";
import { useBookingsByTrip } from "../hooks/useBooking.ts";

const TripDetails = () => {

    const navigate = useNavigate();
    const { tripId } = useParams<{ tripId: TripId }>();
    const { isLoading: isTripLoading, isError: isTripError, data: tripData } = useGetTrip(tripId ?? "");
    const { data: bookingsData } = useBookingsByTrip(tripId ?? "", !!tripId);

    const vehicleId = tripData?.data?.vehicle_id;
    const {
        isLoading: isVehicleLoading,
        isError: isVehicleError,
        data: vehicleData,
    } = useGetVehicleById(vehicleId, { enabled: !!vehicleId });
    const user = useSelector(selectUser);

    const handleNavigateBack = () => {
        navigate(-1)
    }

    const getVehicleDetails = () => {
        if (!vehicleId) return "No vehicle selected";
        if (isVehicleLoading) return "Loading vehicle info...";
        if (isVehicleError) return "Failed to load vehicle details";
        if (vehicleData?.data) {
            return `${vehicleData.data.make} ${vehicleData.data.model} (${vehicleData.data.year})`;
        }
        return "Vehicle info unavailable";
    };

    if (!tripId) {
        return <div>Invalid trip ID</div>;
    }
    if (isTripLoading) return <div>Loading...</div>
    if (isTripError) return <div>Error...</div>
    if (!tripData?.data) return <div>No trip found</div>

    const trip = tripData.data;
    const acceptedBookings = bookingsData?.data?.filter(b => b.bookings_status === 'ACCEPTED') || [];

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center p-2">
                <Icon icon="arrow_back_ios" customClassNames="cursor-pointer" onClick={handleNavigateBack} />
                <Title title="Trip Details" />
            </div>
            <div className="w-full">
                <div className="w-4/5 flex flex-col gap-3 mx-auto">
                    {/*<img src={PlaceholderMap} alt="placeholder map" className="w-full"/>*/}
                    <div className="w-full rounded-lg">
                        <TripMapCard trip={trip} />
                    </div>
                    <TripDetailsCard
                        trip={trip}
                        vehicleDetails={getVehicleDetails()}
                        showVehicle={!!vehicleId}
                        driver={{
                            name: user?.first_name + ' ' + user?.last_name,
                            profile_picture: user?.profile_picture,
                        }}
                        passengers={
                            acceptedBookings.length > 0 ? (
                                acceptedBookings.map(booking => (
                                    <PassengerItem
                                        key={booking.booking_id}
                                        riderId={booking.rider_id}
                                        seats={booking.booked_seats}
                                    />
                                ))
                            ) : null
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default TripDetails;