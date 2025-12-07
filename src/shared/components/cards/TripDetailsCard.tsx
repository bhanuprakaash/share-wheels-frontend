import profilePicture from "../../../assets/profile-picture.png";
import FormattedStyle from "../basic/FormattedStyle.tsx";
import { convertISOtoLocalDate, convertISOtoLocalTime } from "../../utils/common.ts";
import type { TripDataWithWaypoints } from "../../../features/trip/types/trip.ts";
import React from "react";

interface TripDetailsCardProps {
    trip: TripDataWithWaypoints,
    vehicleDetails: string,
    showVehicle: boolean,
    driver: {
        name: string,
        profile_picture: string | undefined,
    },
    passengers?: React.ReactNode
}

const TripDetailsCard: React.FC<TripDetailsCardProps> = (
    {
        trip,
        vehicleDetails,
        showVehicle,
        driver,
        passengers
    }) => {

    const {
        start_location_name,
        end_location_name,
        waypoints,
        available_seats,
        departure_time,
        price_per_seat
    } = trip;

    const waypointsString = waypoints?.map(wp => wp.location_name).join(", ") || "No waypoints";

    return (
        <div className="flex flex-col gap-2">
            <div>
                <div className="flex gap-2">
                    <FormattedStyle label="Departure" value={start_location_name} customClassName="flex-1" />
                    <FormattedStyle label="Arrival" value={end_location_name} customClassName="flex-1" />
                </div>
                <FormattedStyle label="Trip" value={waypointsString} />
                <div className="flex gap-2">
                    <FormattedStyle label="Available Seats" value={available_seats} customClassName="flex-1" />
                    <FormattedStyle label="Departure Date" value={convertISOtoLocalDate(departure_time)}
                        customClassName="flex-1" />
                    <FormattedStyle label="Departure Time" value={convertISOtoLocalTime(departure_time)}
                        customClassName="flex-1" />
                </div>
                <div className="flex gap-2">
                    <FormattedStyle
                        label="Price Per Seat"
                        value={price_per_seat ? `$${price_per_seat}` : "N/A"}
                        customClassName="flex-1"
                    />
                    <FormattedStyle
                        label="Distance"
                        value={"42.3KM"}
                        customClassName="flex-1"
                    />
                    {showVehicle && (
                        <div className="flex-1">
                            <FormattedStyle
                                label="Vehicle"
                                value={vehicleDetails}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div>
                <p className="text-xl font-semibold">Driver</p>
                <div className="flex items-center gap-2 p-2 px-0">
                    <img src={driver.profile_picture || profilePicture} alt="profile-picture"
                        className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <p className="text-sm">{driver.name}</p>
                        <p className="text-xs text-[#598C59]">Driver</p>
                    </div>
                </div>
            </div>
            {passengers && (
                <div>
                    <p className="text-xl font-semibold">Passengers</p>
                    <div className="flex flex-col gap-2">
                        {passengers}
                    </div>
                </div>
            )}
        </div>
    )
}

export default TripDetailsCard;