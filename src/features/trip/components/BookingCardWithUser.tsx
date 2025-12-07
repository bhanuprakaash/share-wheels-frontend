import React from "react";
import { useGetUser } from "../../user/hooks/useUser";
import BookingCard from "../../../shared/components/cards/BookingCard";
import type { Booking } from "../types/booking";
import profilePicture from "../../../assets/profile-picture.png";

interface BookingCardWithUserProps {
    booking: Booking;
    onAccept?: () => void;
    onReject?: () => void;
    onComplete?: () => void;
    compact?: boolean;
    children?: React.ReactNode;
}

const BookingCardWithUser: React.FC<BookingCardWithUserProps> = ({ booking, onAccept, onReject, onComplete, compact, children }) => {
    const { data: user } = useGetUser(booking.rider_id);

    const userData = user?.data;
    const passengerName = userData ? `${userData.first_name} ${userData.last_name}` : 'Unknown Passenger';
    const passengerPic = userData?.profile_picture || profilePicture;

    return (
        <BookingCard
            booking={booking}
            onAccept={onAccept}
            onReject={onReject}
            onComplete={onComplete}
            compact={compact}
            passenger={compact ? { name: passengerName, image: passengerPic } : undefined}
        >
            {children}
        </BookingCard>
    );
};

export default BookingCardWithUser;
