import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

import type {CombinedCreateTripPayload} from "../types/trip.ts";
import Icon from "../../../shared/components/basic/Icon.tsx";
import Title from "../../../shared/components/basic/Title.tsx";
import TripForm from "../components/TripForm.tsx";
import {selectUserId} from "../../user/selectors/userSelectors.ts";
import {useCreateTrip} from "../hooks/useTrip.ts";
import {useGetUserVehicles} from "../../vehicle/hooks/useVehicle.ts";

const ScheduleTrip = () => {
    const initialTrip: CombinedCreateTripPayload = {
        driver_id: "",
        vehicle_id: "",
        start_location_name: "",
        start_address_line1: "",
        start_geopoint: {lat: 0, lng: 0},
        end_location_name: "",
        end_address_line1: "",
        end_geopoint: {lat: 0, lng: 0},
        departure_time: "",
        available_seats: 0,
        price_per_seat: 0,
        trip_description: "",
        waypoints: [],
    };
    const [trip, setTrip] = useState<CombinedCreateTripPayload>(initialTrip);

    const navigate = useNavigate();
    const userId = useSelector(selectUserId);
    const createTripMutation = useCreateTrip({
        onSuccess: () => {
            setTrip(initialTrip);
            navigate(-1);
        }
    });
    const {data: userVehicles} = useGetUserVehicles(userId);

    const vehicleOptions = userVehicles?.data?.map(vehicle => ({
        label: `${vehicle.make} ${vehicle.model}`,
        value: vehicle.vehicle_id
    })) || [];

    const handleNavigateBack = () => {
        navigate(-1)
    }

    const handleCreateTrip = () => {
        const payload = {
            ...trip,
            driver_id: userId,
        } as CombinedCreateTripPayload;

        if (payload) {
            createTripMutation.mutate({
                tripPayload: payload
            });
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center p-2">
                <Icon icon="arrow_back_ios" customClassNames="cursor-pointer" onClick={handleNavigateBack}/>
                <Title title="Schedule a Trip"/>
            </div>
            <TripForm
                trip={trip}
                setTrip={setTrip}
                onSave={handleCreateTrip}
                vehicleOptions={vehicleOptions}
            />
        </div>
    )
}

export default ScheduleTrip;