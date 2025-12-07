import React, { useState } from "react";
import { useBookingsByTrip, useUpdateBookingStatusByDriver } from "../hooks/useBooking";
import BookingCardWithUser from "./BookingCardWithUser";
import Icon from "../../../shared/components/basic/Icon";

interface TripBookingsProps {
    tripId: string;
}

const TripBookings: React.FC<TripBookingsProps> = ({ tripId }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { data: bookings, isLoading } = useBookingsByTrip(tripId, isExpanded);
    const { mutate: updateStatus } = useUpdateBookingStatusByDriver();


    const handleAccept = (bookingId: string) => {
        updateStatus({ booking_id: bookingId, booking_status: "ACCEPTED" });
    };

    const handleComplete = (bookingId: string) => {
        updateStatus({ booking_id: bookingId, booking_status: "COMPLETED" });
    };

    const handleReject = (bookingId: string) => {
        if (window.confirm("Are you sure you want to reject this booking?")) {
            updateStatus({ booking_id: bookingId, booking_status: "REJECTED" });
        }
    };

    return (
        <div className="w-4/5 mt-2">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                }}
                className="flex items-center gap-2 text-[#598C59] font-medium text-sm focus:outline-none cursor-pointer"
            >
                <div className="flex gap-2 items-center align-center">
                    <Icon icon={isExpanded ? "expand_less" : "expand_more"} />
                    {isExpanded ? "Hide Bookings" : "Show Bookings"}
                </div>
            </button>

            {isExpanded && (
                <div className="mt-2 flex flex-col gap-2 pl-4 border-l-2 border-[#E8F2E8] max-h-[250px] overflow-y-scroll hide-scrollbar">
                    {isLoading && <p className="text-sm text-gray-500">Loading bookings...</p>}
                    {!isLoading && bookings?.data?.length === 0 && (
                        <p className="text-sm text-gray-500">No bookings for this trip.</p>
                    )}
                    {bookings?.data?.map((booking) => (
                        <BookingCardWithUser
                            key={booking.booking_id}
                            booking={booking}
                            onAccept={() => handleAccept(booking.booking_id)}
                            onReject={() => handleReject(booking.booking_id)}
                            onComplete={() => handleComplete(booking.booking_id)}
                            compact={true}
                        >
                            <p className="text-xs text-gray-500">
                                Status: {booking.bookings_status}
                            </p>
                        </BookingCardWithUser>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TripBookings;
