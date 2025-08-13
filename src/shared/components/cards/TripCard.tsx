import React from "react";

import type {TripDataWithWaypoints} from "../../../features/trip/types/trip.ts";
import Icon from "../basic/Icon.tsx";
import {convertISOtoLocalDate, convertISOtoLocalTime} from "../../utils/common.ts";

interface TripCardProps {
    trip: TripDataWithWaypoints,
    children?: React.ReactNode,
    onClick?: () => void,
}

const TripCard: React.FC<TripCardProps> = ({trip, children, onClick}) => {
    return (
        <div className="border-1 border-[#E8F2E8] rounded-md w-4/5 mx-auto">
            <div onClick={onClick}>
                <div className="flex justify-between items-center p-2">
                    <div className="flex gap-6 items-center p-2">
                        <h4 className='text-xl max-w-sm font-medium'>{trip.start_location_name}</h4>
                        <Icon icon="arrow_forward"/>
                        <h4 className='text-xl max-w-sm font-medium'>{trip.end_location_name}</h4>
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
                    <span className="text-[#598C59]">Waypoints: </span>
                    <span>{trip.waypoints.map((wp) => wp.location_name).join(', ')}</span>
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
        </div>
    )
}

export default TripCard;