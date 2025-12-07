import React from "react";

import type { TripDataWithWaypoints } from "../../../features/trip/types/trip.ts";
import Icon from "../basic/Icon.tsx";
import { convertISOtoLocalDate, convertISOtoLocalTime } from "../../utils/common.ts";
import type { SearchTripData, WaypointInSearch } from "../../../features/trip/types/search.ts";

interface TripCardProps {
    trip: TripDataWithWaypoints | SearchTripData,
    children?: React.ReactNode,
    onClick?: () => void,
    variant?: 'default' | 'search',
    bottomContent?: React.ReactNode
}

const TripCard: React.FC<TripCardProps> = ({ trip, children, onClick, variant = 'default', bottomContent }) => {

    const getDisplayLocations = () => {
        if (variant === 'search' && trip.waypoints && trip.waypoints.length >= 1) {
            let startLocation = trip.start_location_name;
            let endLocation = trip.end_location_name;

            trip.waypoints.forEach(waypoint => {
                const wp = waypoint as WaypointInSearch;
                if (wp.waypoint_purpose === 'pickup') {
                    startLocation = wp.location_name;
                }
                if (wp.waypoint_purpose === 'dropoff') {
                    endLocation = wp.location_name;
                }
            });

            return { startLocation, endLocation };
        }

        return {
            startLocation: trip.start_location_name,
            endLocation: trip.end_location_name
        };
    };

    const { startLocation, endLocation } = getDisplayLocations();

    const getWaypointsDisplay = () => {
        if (variant === 'search') {
            return `${trip.start_location_name}, ${trip.waypoints?.map((wp) => wp.location_name).join(', ') || ''}, ${trip.end_location_name}`;
        }
        return trip.waypoints?.map((wp) => wp.location_name).join(', ') || '';
    };

    const waypointsLabel = variant === 'search' ? 'Trip:' : 'Waypoints:';

    return (
        <div className="border-1 border-[#E8F2E8] rounded-md w-4/5 mx-auto">
            <div onClick={onClick}>
                <div className="flex justify-between items-center p-2">
                    <div className="flex gap-6 items-center p-2">
                        <h4 className='text-xl max-w-sm font-medium'>{startLocation}</h4>
                        <Icon icon="arrow_forward" />
                        <h4 className='text-xl max-w-sm font-medium'>{endLocation}</h4>
                    </div>
                    <p className="mr-6 border-1 border-[#E8F2E8] text-[#598C59] font-bold p-2 rounded-md">{trip.price_per_seat}</p>
                </div>
                <div className="p-2 flex px-4 gap-5">
                    <div>
                        <span className="text-[#598C59]">Date: </span>
                        <span>{convertISOtoLocalDate(trip?.departure_time)}</span>
                    </div>
                    <div>
                        <span className="text-[#598C59]">Time: </span>
                        <span>{convertISOtoLocalTime(trip?.departure_time)}</span>
                    </div>
                </div>
                <div className="p-2 px-4">
                    <span className="text-[#598C59]">{waypointsLabel}</span>
                    <span>{getWaypointsDisplay()}</span>
                </div>
            </div>
            <div className="p-2 px-4 flex justify-between items-start">
                <div>
                    <span className="text-[#598C59]">Available Seats: </span>
                    <span>{trip.available_seats}</span>
                </div>
                <div className="flex gap-5">
                    {children}
                </div>
            </div>
            {bottomContent && (
                <div className="p-2 px-4 border-t border-[#E8F2E8]">
                    {bottomContent}
                </div>
            )}
        </div>
    )
}

export default TripCard;