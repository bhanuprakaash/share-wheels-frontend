import {useNavigate, useParams} from "react-router-dom";

import Icon from "../../../shared/components/basic/Icon.tsx";
import Title from "../../../shared/components/basic/Title.tsx";
import {useEffect, useState} from "react";
import type {TripId, UpdateTripPayload} from "../types/trip.ts";
import {useGetTrip, useUpdateTrip} from "../hooks/useTrip.ts";
import TripForm from "../components/TripForm.tsx";
import {useGetUserVehicles} from "../../vehicle/hooks/useVehicle.ts";
import {useSelector} from "react-redux";
import {selectUserId} from "../../user/selectors/userSelectors.ts";
import FullScreenLoader from "../../../shared/components/basic/FullScreenLoader.tsx";

const EditTrip = () => {
    const [trip, setTrip] = useState<UpdateTripPayload>({});

    const navigate = useNavigate();
    const {tripId} = useParams<{ tripId: TripId }>();
    const userId = useSelector(selectUserId);

    const {data: tripDataResponse, isLoading, isError, isSuccess} = useGetTrip(tripId ?? '');
    const editTripMutation = useUpdateTrip({
        onSuccess: () => {
            navigate(-1);
        }
    })
    const {data: userVehicles} = useGetUserVehicles(userId);

    const vehicleOptions = userVehicles?.data?.map(vehicle => ({
        label: `${vehicle.make} ${vehicle.model}`,
        value: vehicle.vehicle_id
    })) || [];

    useEffect(() => {
        if (isSuccess && tripDataResponse) {
            const tripData = tripDataResponse.data;
            const formattedData = {
                waypoints: tripData.waypoints,
                start_location_name: tripData.start_location_name,
                start_address_line1: tripData.start_address_line1,
                end_location_name: tripData.end_location_name,
                end_address_line1: tripData.end_address_line1,
                departure_time: tripData.departure_time.split(':').slice(0, 2).join(':'),
                available_seats: tripData.available_seats,
                price_per_seat: tripData.price_per_seat,
                vehicle_id: tripData.vehicle_id,
                trip_description: tripData.trip_description,
            }
            setTrip(formattedData);
        }
    }, [isSuccess, tripDataResponse]);

    const handleNavigateBack = () => {
        navigate(-1)
    }

    const handleEditTrip = () => {
        if (tripId) {
            const payload = {
                ...trip,
                driver_id: userId,
            } as UpdateTripPayload;

            editTripMutation.mutate({
                tripId: tripId,
                tripPayload: payload
            });
        }
    }

    if (isLoading) return (
        <FullScreenLoader />
    )
    if (isError) return (
        <div className="text-center text-gray-500 flex items-center justify-center">Error...</div>
    )
    if (!tripDataResponse?.data) return (
        <div>No trip found</div>
    )

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center p-2">
                <Icon icon="arrow_back_ios" customClassNames="cursor-pointer" onClick={handleNavigateBack}/>
                <Title title="Edit Trip"/>
            </div>
            {
                Object.keys(trip).length > 0 &&
                <TripForm trip={trip} setTrip={setTrip} vehicleOptions={vehicleOptions} onSave={handleEditTrip}/>
            }
        </div>
    )
}

export default EditTrip;