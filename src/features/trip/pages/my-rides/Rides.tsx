import { useState } from "react";
import { useSelector } from "react-redux";

import Title from "../../../../shared/components/basic/Title";
import { selectUserId } from "../../../user/selectors/userSelectors";
import { useBookingsByRider, useUpdateBookingStatusByRider } from "../../hooks/useBooking";

import BookingCard from "../../../../shared/components/cards/BookingCard";
import ConfirmationModal from "../../../../shared/components/modals/ConfirmationModal";

const Rides = () => {
  const riderId = useSelector(selectUserId);
  const {
    data: bookings,
    isLoading,
    error,
  } = useBookingsByRider(riderId!, !!riderId);

  const { mutate: updateBookingStatus } = useUpdateBookingStatusByRider();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  const handleCancel = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsCancelModalOpen(true);
  };

  const confirmCancel = () => {
    if (selectedBookingId) {
      updateBookingStatus({
        booking_id: selectedBookingId,
        statusRequestedByUser: "CANCELLED",
      });
      setIsCancelModalOpen(false);
      setSelectedBookingId(null);
    }
  };

  const handleComplete = (bookingId: string) => {
    updateBookingStatus({
      booking_id: bookingId,
      statusRequestedByUser: "COMPLETED",
    });
  };

  if (isLoading) return <p className="p-4">Loading rides...</p>;
  if (error) return <p className="p-4 text-red-500">Error fetching rides</p>;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center gap-2 p-2">
        <Title title="Rides" />
      </div>

      <div className="flex flex-col gap-4 p-4">
        {bookings?.data?.length === 0 && (
          <p className="text-gray-500">No rides booked yet</p>
        )}

        {bookings?.data?.map((booking) => (
          <BookingCard
            key={booking.booking_id}
            booking={booking}
            onCancel={() => handleCancel(booking.booking_id)}
            onComplete={() => handleComplete(booking.booking_id)}
          >
            <p className="text-sm text-[#598C59] font-medium">
              Status: {booking.bookings_status}
            </p>
          </BookingCard>
        ))}
      </div>

      <ConfirmationModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={confirmCancel}
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking? This action cannot be undone."
        type="danger"
        confirmText="Yes, Cancel"
        cancelText="No, Keep it"
      />
    </div>
  );
};

export default Rides;
