import {useNavigate, useParams} from "react-router-dom";

import Title from "../../../shared/components/basic/Title.tsx";
import Icon from "../../../shared/components/basic/Icon.tsx";
import {useGetTrip} from "../hooks/useTrip.ts";
import type {TripId} from "../types/trip.ts";
import {useGetVehicleById} from "../../vehicle/hooks/useVehicle.ts";
import TripDetailsCard from "../../../shared/components/cards/TripDetailsCard.tsx";
import {useSelector} from "react-redux";
import {selectUser} from "../../user/selectors/userSelectors.ts";
import PlaceholderMap from "../../../assets/map.png";

const TripDetails = () => {

    const navigate = useNavigate();
    const {tripId} = useParams<{ tripId: TripId }>();
    const {isLoading: isTripLoading, isError: isTripError, data: tripData} = useGetTrip(tripId ?? "");
    const vehicleId = tripData?.data?.vehicle_id;
    const {
        isLoading: isVehicleLoading,
        isError: isVehicleError,
        data: vehicleData,
    } = useGetVehicleById(vehicleId, {enabled: !!vehicleId});
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

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center p-2">
                <Icon icon="arrow_back_ios" customClassNames="cursor-pointer" onClick={handleNavigateBack}/>
                <Title title="Trip Details"/>
            </div>
            <div className="w-full">
                <div className="w-4/5 flex flex-col gap-3 mx-auto">
                    <img src={PlaceholderMap} alt="placeholder map" className="w-full"/>
                    <TripDetailsCard
                        trip={trip}
                        vehicleDetails={getVehicleDetails()}
                        showVehicle={!!vehicleId}
                        driver={{
                            name: user?.first_name + ' ' + user?.last_name,
                            profile_picture: user?.profile_picture,
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default TripDetails;