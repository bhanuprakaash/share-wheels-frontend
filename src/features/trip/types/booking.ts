import type { TripId } from "./trip.ts";
import type { UserID } from "../../user/types/user.ts";
import type { ApiResponse } from "../../../shared/types/global.ts";

export type BookingStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED" | "COMPLETED";

export interface WaypointData {
  waypoint_id: string;
  location_name: string;
  waypoint_type?: string;
  waypoint_purpose: string;
  end_location_name?: string;
  start_location_name?: string;
  estimated_arrival_time?: string | null;
}

export interface Booking {
  booking_id: string;
  trip_id: TripId;
  rider_id: UserID;
  booked_seats: number;
  bookings_status: BookingStatus;
  fare_amount: number;
  is_waypoint_booking: boolean;
  waypoint_data: WaypointData | WaypointData[] | null;
  created_at: Date;
}

export type BookingId = Booking["booking_id"];

export type BookingPayload = Omit<
  Booking,
  "booking_id" | "created_at" | "bookings_status"
>;

export type BookingResponse = ApiResponse<Booking>;
export type BookingListResponse = ApiResponse<Booking[]>;

export interface UpdateBookingStatusByDriverPayload {
  booking_id: string;
  booking_status: BookingStatus;
}

export interface UpdateBookingStatusByRiderPayload {
  booking_id: string;
  statusRequestedByUser: BookingStatus;
}
