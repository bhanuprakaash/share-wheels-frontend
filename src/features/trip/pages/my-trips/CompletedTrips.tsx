import React from "react";

import Title from "../../../../shared/components/basic/Title.tsx";
import { useNavigate } from "react-router-dom";
import TripCard from "../../../../shared/components/cards/TripCard.tsx";
import type { TripDataWithWaypoints } from "../../types/trip.ts";
import TripBookings from "../../components/TripBookings";

interface CompletedTripsProps {
    trips: TripDataWithWaypoints[]
}

const CompletedTrips: React.FC<CompletedTripsProps> = ({ trips }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center gap-2 p-2">
                <Title title="Completed trips" />
            </div>
            {trips.length === 0 ? (
                <div className="text-center">No trips completed</div>
            ) : (
                trips.map((trip) => (
                    <TripCard
                        key={trip.trip_id}
                        trip={trip}
                        onClick={() => navigate(`${trip.trip_id}`)}
                        bottomContent={<TripBookings tripId={trip.trip_id} />}
                    >
                    </TripCard>
                ))
            )}
        </div>
    )
}

export default CompletedTrips;