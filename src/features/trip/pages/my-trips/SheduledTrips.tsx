import React from "react";

import Title from "../../../../shared/components/basic/Title.tsx";
import {Link, useNavigate} from "react-router-dom";
import TripCard from "../../../../shared/components/cards/TripCard.tsx";
import Button from "../../../../shared/components/forms/Button.tsx";
import type {TripDataWithWaypoints, TripId} from "../../types/trip.ts";
import DropdownMenu, {type DropdownItem} from "../../../../shared/components/modals/DropdownMenu.tsx";
import {useUpdateTripStatus} from "../../hooks/useTrip.ts";
import {useSelector} from "react-redux";
import {selectUserId} from "../../../user/selectors/userSelectors.ts";

interface ScheduledTripsProps {
    trips: TripDataWithWaypoints[]
}

const ScheduledTrips: React.FC<ScheduledTripsProps> = ({trips}) => {
    const navigate = useNavigate();
    const userId = useSelector(selectUserId);
    const updateTripStatusMutation = useUpdateTripStatus();

    const cancelTrip = (tripId: TripId) => {
        if (userId) {
            updateTripStatusMutation.mutate({
                driverId: userId,
                tripId: tripId,
                tripPayload: {
                    status: 'CANCELLED'
                }
            })
        }
    }

    const getTripMenuItems = (trip: TripDataWithWaypoints): DropdownItem[] => [
        {
            id: 'view',
            label: 'View Details',
            icon: 'visibility',
            iconColor: 'text-[#598C59]',
            onClick: () => navigate(`${trip.trip_id}`)
        },
        {
            id: 'edit',
            label: 'Edit Trip',
            icon: 'edit',
            iconColor: 'text-[#2563eb]',
            onClick: () => navigate(`edit/${trip.trip_id}`)
        },
        {
            id: 'cancel',
            label: 'Cancel Trip',
            icon: 'cancel',
            iconColor: 'text-[#dc2626]',
            onClick: () => cancelTrip(trip.trip_id)
        }
    ];

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center gap-2 p-2">
                <Title title="Scheduled trips"/>
                <Link
                    to="schedule-trip"
                    className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-3xl px-6 py-2 leading-normal tracking-[0.015em] bg-[#E8F2E8] text-[#0F1A0F]"
                >
                    <span className="font-bold self-center text-sm">Schedule a Trip</span>
                </Link>
            </div>
            {trips.length === 0 ? (
                <div className="text-center">No trips scheduled</div>
            ) : (
                trips.map((trip) => (
                    <TripCard key={trip.trip_id} trip={trip} onClick={() => navigate(`${trip.trip_id}`)}>
                        <Button
                            type="button"
                            variant={"secondary"}
                            customClasses={"text-sm font-bold px-6 py-2"}
                        >
                            Start Trip
                        </Button>

                        <DropdownMenu
                            items={getTripMenuItems(trip)}
                            position="right"
                        />
                    </TripCard>
                ))
            )}
        </div>
    )
}

export default ScheduledTrips;