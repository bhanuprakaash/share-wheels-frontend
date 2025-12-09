import React from "react";
import type { Booking, WaypointData } from "../../../features/trip/types/booking";
import Icon from "../basic/Icon";
import { convertISOtoLocalDate, convertISOtoLocalTime } from "../../utils/common";
import { useGetTrip } from "../../../features/trip/hooks/useTrip";
import Loader from "../basic/Loader";

interface BookingCardProps {
  booking: Booking;
  children?: React.ReactNode;
  onClick?: () => void;
  onCancel?: () => void;
  onComplete?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  compact?: boolean;
  passenger?: {
    name: string;
    image: string;
  };
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  children,
  onClick,
  onCancel,
  onComplete,
  onAccept,
  onReject,
  compact = false,
  passenger
}) => {


  const { waypoint_data } = booking;

  const { data: trip, isLoading } = useGetTrip(booking.trip_id);

  if (isLoading) return <Loader />;

  let startLocation = "Trip Start";
  let endLocation = "Trip End";

  if (trip) {
    startLocation = trip?.data?.start_location_name || "Trip Start";
    endLocation = trip?.data?.end_location_name || "Trip End";
  }

  if (waypoint_data) {
    const wp: WaypointData = Array.isArray(waypoint_data)
      ? waypoint_data[0]
      : waypoint_data;

    if (wp.start_location_name) startLocation = wp.start_location_name;
    if (wp.end_location_name) endLocation = wp.end_location_name;

    if (wp.waypoint_purpose === 'pickup') {
      startLocation = wp.location_name;
    } else if (wp.waypoint_purpose === 'dropoff') {
      endLocation = wp.location_name;
    }
  }

  return (
    <div className={`border-1 border-[#E8F2E8] rounded-md ${compact ? 'w-full' : 'w-4/5'} mx-auto`}>
      <div onClick={onClick}>
        <div className="flex flex-col p-2">
          {compact && passenger && (
            <div className="flex items-center gap-2 mb-1 px-2">
              <img src={passenger.image} alt="passenger" className="w-6 h-6 rounded-full object-cover" />
              <span className="text-sm font-medium text-gray-700">{passenger.name}</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <div className="flex gap-6 items-center p-2">
              <h4 className={`${compact ? 'text-sm' : 'text-xl'} max-w-sm font-medium`}>{startLocation}</h4>
              <Icon icon="arrow_forward" />
              <h4 className={`${compact ? 'text-sm' : 'text-xl'} max-w-sm font-medium`}>{endLocation}</h4>
            </div>
            <p className="mr-6 border-1 border-[#E8F2E8] text-[#598C59] font-bold p-2 rounded-md">
              {booking.fare_amount}
            </p>
          </div>
        </div>
        {!compact && (
          <div className="p-2 flex px-4 gap-5">
            <div>
              <span className="text-[#598C59]">Booked Date: </span>
              <span>{convertISOtoLocalDate(String(booking.created_at))}</span>
            </div>
            <div>
              <span className="text-[#598C59]">Time: </span>
              <span>{convertISOtoLocalTime(String(booking.created_at))}</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-2 px-4 flex justify-between items-center">
        <div>
          <span className="text-[#598C59]">Booked Seats: </span>
          <span>{booking.booked_seats}</span>
        </div>
        <div className="flex gap-5 items-center">
          {children}
          {onCancel && booking.bookings_status === 'PENDING' && (
            <button
              onClick={(e) => { e.stopPropagation(); onCancel(); }}
              className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
            >
              Cancel
            </button>
          )}
          {onComplete && booking.bookings_status === 'ACCEPTED' && trip?.data?.trip_status === 'IN_PROGRESS' && (
            <button
              onClick={(e) => { e.stopPropagation(); onComplete(); }}
              className="px-3 py-1 text-sm text-green-600 border border-green-600 rounded hover:bg-green-50 cursor-pointer"
            >
              Complete
            </button>
          )}
          {onAccept && booking.bookings_status === 'PENDING' && (
            <button
              onClick={(e) => { e.stopPropagation(); onAccept(); }}
              className="px-3 py-1 text-sm text-green-600 border border-green-600 rounded hover:bg-green-50 cursor-pointer"
            >
              Accept
            </button>
          )}
          {onReject && booking.bookings_status === 'PENDING' && (
            <button
              onClick={(e) => { e.stopPropagation(); onReject(); }}
              className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 cursor-pointer"
            >
              Reject
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
