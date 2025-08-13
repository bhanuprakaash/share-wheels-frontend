import React from "react";

import {useGetDriverTrips} from "../hooks/useTrip";
import type {TripDataWithWaypoints} from "../types/trip.ts";
import {convertISOtoLocalDate} from "../../../shared/utils/common.ts";
import type {UserID} from "../../user/types/user.ts";
import Title from "../../../shared/components/basic/Title.tsx";

interface TripHistoryTableProps {
    userId: UserID;
}

const TripHistoryTable: React.FC<TripHistoryTableProps> = ({userId}) => {
    const {isLoading, isError, data} = useGetDriverTrips(userId);

    if (isLoading) return <div className="p-4">Loading trip history...</div>;
    if (isError) return <div className="p-4 text-red-600">Error loading trip history</div>;

    const getStatusColor = (status: TripDataWithWaypoints['trip_status']) => {
        switch (status) {
            case 'COMPLETED':
                return 'bg-green-100 text-green-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            case 'SCHEDULED':
                return 'bg-blue-100 text-blue-800';
            case 'IN_PROGRESS':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatStatus = (status: TripDataWithWaypoints['trip_status']) => {
        return status.charAt(0) + status.slice(1).toLowerCase();
    };

    if (!data?.data || data.data.length === 0) {
        return (
            <div className="p-4 text-center text-gray-600">
                No trip history found
            </div>
        );
    }

    return (
        <div className="w-full mt-4">
            <Title title="Trip History"/>
            <div className="overflow-x-auto rounded-lg my-4">
                <table className="w-full border-collapse bg-white">
                    <thead>
                    <tr className="bg-[#E8F2E8]">
                        <th className="text-left p-3 text-sm font-bold text-[#0D141C]">Date</th>
                        <th className="text-left p-3 text-sm font-bold text-[#0D141C]">Route</th>
                        <th className="text-left p-3 text-sm font-bold text-[#0D141C]">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.data.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="p-4 text-center text-gray-500">
                                    No trips found
                                </td>
                            </tr>
                        ) : (
                            data.data.map((trip) => (
                                <tr key={trip.trip_id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="p-3 text-sm text-gray-800">
                                        {convertISOtoLocalDate(trip.departure_time)}
                                    </td>
                                    <td className="p-3">
                                        <div className="text-sm">
                                            <div className="text-gray-800">
                                                {trip.start_location_name} to {trip.end_location_name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-3">
                                    <span
                                        className={`inline-flex p-2 px-4 text-xs font-medium rounded-full ${getStatusColor(trip.trip_status)}`}>
                                        {formatStatus(trip.trip_status)}
                                    </span>
                                    </td>
                                </tr>
                            ))
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TripHistoryTable;