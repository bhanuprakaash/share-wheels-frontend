import { useState } from "react";
import type { AxiosError } from "axios";
import { useSelector } from "react-redux";

import type { SearchTripData } from "../../types/search";
import { useBooking } from "../../hooks/useBooking";
import { selectUserId } from "../../../user/selectors/userSelectors";
import type { BookingPayload } from "../../types/booking";
import TripCard from "../../../../shared/components/cards/TripCard";
import Button from "../../../../shared/components/forms/Button";
import Modal from "../../../../shared/components/modals/Modal";
import InputField from "../../../../shared/components/forms/InputField";
import { useNavigate } from "react-router-dom";

const LoadingState = () => (
  <div className="text-center text-gray-500 flex items-center justify-center h-[75vh]">
    Loading trips...
  </div>
);

const ErrorState = ({ error }: { error: AxiosError | null }) => (
  <div className="text-center text-red-500 flex items-center justify-center h-[75vh]">
    Error fetching trips: {error?.message}
  </div>
);

const EmptyState = () => (
  <div className="text-center text-gray-500 flex items-center justify-center h-[75vh]">
    No trips found.
  </div>
);

const TripResults = ({ trips }: { trips: SearchTripData[] }) => {
  const [selectedTrip, setSelectedTrip] = useState<SearchTripData | null>(null);
  const [bookedSeats, setBookedSeats] = useState<number>(1);
  const navigate = useNavigate();

  const handleOpenModal = (trip: SearchTripData) => {
    setSelectedTrip(trip);
    setBookedSeats(1); // reset each time
  };

  const createBookingMutation = useBooking({
    onSuccess: (data) => {
      console.log("Booking successful");
      console.log(data);
      navigate("/rides")
    },
    onError: (error) => {
      console.error("Booking failed:", error);
    },
  });

  const userId = useSelector(selectUserId);

  console.log(selectedTrip);

  const handleCreateBooking = () => {
    if (!selectedTrip || !userId) return;

    if (bookedSeats > selectedTrip.available_seats) {
      alert("You cannot book more seats than available!");
      return;
    }

    const waypoints = Array.isArray(selectedTrip.waypoints)
      ? selectedTrip.waypoints
      : [];

    const isWaypointBooking = waypoints.length > 0;
    let waypointData = null;

    if (waypoints.length === 0) {
      // 🚀 Case 0: No waypoints
      waypointData = null;
    } else if (waypoints.length >= 2) {
      // 🚀 Case 1: Multiple waypoints
      waypointData = waypoints;
    } else if (waypoints.length === 1) {
      // 🚀 Case 2: Exactly one waypoint
      const wp = waypoints[0];

      // Build enriched data with additional info
      waypointData = {
        ...wp,
        waypoint_type: wp.waypoint_purpose === "dropoff" ? "dropoff" : "pickup",
        start_location_name: selectedTrip.start_location_name,
        end_location_name: selectedTrip.end_location_name,
      };
    }

    const payload: BookingPayload = {
      trip_id: selectedTrip.trip_id,
      rider_id: userId,
      booked_seats: bookedSeats,
      fare_amount: selectedTrip.price_per_seat * bookedSeats,
      is_waypoint_booking: isWaypointBooking,
      waypoint_data: {
        waypoints: waypoints || [],
        start_location_name: selectedTrip.start_location_name,
        end_location_name: selectedTrip.end_location_name,
      },
    };

    createBookingMutation.mutate({ bookingPayload: payload });
  };

  return (
    <div className="flex flex-col gap-4">
      {trips.map((trip) => (
        <TripCard trip={trip} variant="search" key={trip.trip_id}>
          <Button onClick={() => handleOpenModal(trip)}>Book Trip</Button>
        </TripCard>
      ))}

      <Modal
        isOpen={!!selectedTrip}
        onClose={() => setSelectedTrip(null)}
        onSave={handleCreateBooking}
        title="Book Trip"
        saveText="Confirm Booking"
        saveDisabled={bookedSeats > (selectedTrip?.available_seats || 0)}
      >
        {selectedTrip && (
          <div className="flex flex-col gap-4">
            <p>
              Price per seat: <strong>₹{selectedTrip.price_per_seat}</strong>
            </p>
            <p>
              Available seats: <strong>{selectedTrip.available_seats}</strong>
            </p>

            <InputField
              label="Number of Seats"
              type="number"
              id="bookedSeats"
              name="bookedSeats"
              value={bookedSeats.toString()}
              onChange={(e) => setBookedSeats(Number(e.target.value))}
              placeholder="Enter seats"
              required
            />

            <p>
              Total fare:{" "}
              <strong>₹{selectedTrip.price_per_seat * bookedSeats}</strong>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

const SearchResults = ({
  isLoading,
  isError,
  error,
  trips,
}: {
  isLoading: boolean;
  isError: boolean;
  error: AxiosError | null;
  trips?: SearchTripData[];
}) => {
  if (isError) {
    return <ErrorState error={error} />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (!trips || trips.length <= 0) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-y-auto h-[75vh]">
      <TripResults trips={trips} />
    </div>
  );
};

export default SearchResults;
