import Title from "../../../../shared/components/basic/Title.tsx";
import { Link } from "react-router-dom";
import TripCard from "../../../../shared/components/cards/TripCard.tsx";
import Icon from "../../../../shared/components/basic/Icon.tsx";
import type { TripDataWithWaypoints } from "../../types/trip.ts";
import React from "react";

interface ActiveTripsProps {
    trips: TripDataWithWaypoints[]
}

const ActiveTrips: React.FC<ActiveTripsProps> = ({ trips }) => {

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center gap-2 p-2">
                <Title title="Active Trips" />
            </div>
            {trips?.length === 0 ? (
                <div className="text-center text-gray-500 flex items-center justify-center h-[75vh]">
                    No Active Trips.
                </div>
            ) : (
                trips.map((trip) => (
                    <TripCard key={trip.trip_id} trip={trip}>
                        {trip.trip_status === 'IN_PROGRESS' && (
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                In Progress
                            </span>
                        )}
                        <Link
                            to={`${trip.trip_id}`}
                            className="text-xl self-center flex"
                        >
                            <Icon
                                icon="arrow_forward_ios"
                                customClassNames="text-[#598C59]"
                                customStyles={{ fontWeight: "600" }}
                            />
                        </Link>
                    </TripCard>
                ))
            )}
        </div>
    )
}

export default ActiveTrips;