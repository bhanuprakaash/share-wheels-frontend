import { useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";

import Title from "../../../../shared/components/basic/Title";
import { selectUserId } from "../../../user/selectors/userSelectors";
import { useBookingsByRider, useUpdateBookingStatusByRider } from "../../hooks/useBooking";

import BookingCard from "../../../../shared/components/cards/BookingCard";
import ConfirmationModal from "../../../../shared/components/modals/ConfirmationModal";
import type { TabItem } from "../../../../shared/components/basic/Tabs";
import Tabs from "../../../../shared/components/basic/Tabs";
import type { Booking } from "../../types/booking";
import FullScreenLoader from "../../../../shared/components/basic/FullScreenLoader";

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

  const handleCancel = useCallback((bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsCancelModalOpen(true);
  }, []);

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

  const handleComplete = useCallback((bookingId: string) => {
    updateBookingStatus({
      booking_id: bookingId,
      statusRequestedByUser: "COMPLETED",
    });
  }, [updateBookingStatus]);

  const BookingList = ({ list, showActions = false }: { list: Booking[], showActions?: boolean }) => {
    if (list.length === 0) return <p className="text-gray-500 py-4 text-center text-center text-gray-500 flex items-center justify-center h-[75vh]">No rides found.</p>;
    return (
      <div className="flex flex-col gap-4 p-2">
        {list.map((booking) => (
          <BookingCard
            key={booking.booking_id}
            booking={booking}
            onCancel={showActions ? () => handleCancel(booking.booking_id) : undefined}
            onComplete={showActions ? () => handleComplete(booking.booking_id) : undefined}
          >
            <p className={`text-xs font-bold px-2 py-1 rounded w-fit ${booking.bookings_status === 'ACCEPTED' ? 'bg-green-100 text-green-700' :
              booking.bookings_status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-600'
              }`}>
              {booking.bookings_status}
            </p>
          </BookingCard>
        ))}
      </div>
    );
  };

  const { tabItems, defaultTab } = useMemo(() => {
    const allBookings = bookings?.data || [];

    const activeBookings = allBookings.filter((b) =>
      ["PENDING", "ACCEPTED"].includes(b.bookings_status)
    );

    const historyBookings = allBookings.filter((b) =>
      ["COMPLETED", "CANCELLED", "REJECTED"].includes(b.bookings_status)
    );

    const items: TabItem[] = [
      {
        id: "active",
        label: "Active",
        count: activeBookings.length,
        content: <BookingList list={activeBookings} showActions={true} />,
      },
      {
        id: "history",
        label: "History",
        content: <BookingList list={historyBookings} showActions={false} />,
      },
    ];

    return {
      tabItems: items,
      defaultTab: activeBookings.length > 0 ? "active" : "history"
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookings, handleCancel, handleComplete]);

  if (isLoading) return <FullScreenLoader />;
  if (error) return <div className="text-center text-gray-500 flex items-center justify-center">Error fetching rides</div>;

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center gap-2 p-2">
        <Title title="My Rides" />
      </div>

      <div className="w-full">
        <Tabs items={tabItems} defaultActiveId={defaultTab} />
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