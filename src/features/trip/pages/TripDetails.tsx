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
import FullScreenLoader from "../../../shared/components/basic/FullScreenLoader.tsx";

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
    if (isTripLoading) return <FullScreenLoader />
    if (isTripError) return <div className="text-center text-gray-500 flex items-center justify-center">Error...</div>
    if (!tripData?.data) return <div>No trip found</div>

    const trip = tripData.data;
    const acceptedBookings = bookingsData?.data?.filter(b => b.bookings_status === 'ACCEPTED' || b.bookings_status === 'COMPLETED') || [];
    const firstName = user?.first_name || '';
    const lastName = user?.last_name || '';

    const passengerName = (firstName || lastName)
        ? `${firstName} ${lastName}`.trim()
        : 'Unknown Passenger';
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
                            name: passengerName,
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