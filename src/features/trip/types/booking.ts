import type { TripId } from "./trip.ts";
import type { UserID } from "../../user/types/user.ts";
import type { ApiResponse } from "../../../shared/types/global.ts";
import type { WaypointInSearch } from "./search.ts";

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface Booking {
  booking_id: string;
  trip_id: TripId;
  rider_id: UserID;
  booked_seats: number;
  bookings_status: BookingStatus;
  fare_amount: number;
  is_waypoint_booking: boolean;
  waypoint_data: WaypointInSearch[] | null;
  created_at: Date;
}

export type BookingId = Booking["booking_id"];

export type BookingPayload = Omit<
  Booking,
  "booking_id" | "created_at" | "bookings_status"
>;

export type BookingResponse = ApiResponse<Booking>;
