import axiosInstance from "../../../shared/api/axiosInstance.ts";
import type {
  BookingListResponse,
  BookingPayload,
  BookingResponse,
  UpdateBookingStatusByDriverPayload,
  UpdateBookingStatusByRiderPayload,
} from "../types/booking.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BOOKING_URL = `${BASE_URL}/api/booking`;

export const createBooking = async (
  bookingPayload: BookingPayload
): Promise<BookingResponse> => {
  const response = await axiosInstance.post<BookingResponse>(
    BOOKING_URL,
    bookingPayload
  );
  return response.data;
};

export const getBookingsByRiderId = async (
  riderId: string
): Promise<BookingListResponse> => {
  const res = await axiosInstance.get(`${BOOKING_URL}/${riderId}`);
  return res.data;
};

export const getBookingsByTripId = async (
  tripId: string
): Promise<BookingListResponse> => {
  const res = await axiosInstance.get(`${BOOKING_URL}/trip/${tripId}`);
  return res.data;
};

export const updateBookingStatusByDriver = async ({
  booking_id,
  booking_status,
}: UpdateBookingStatusByDriverPayload): Promise<BookingResponse> => {
  const res = await axiosInstance.patch(
    `${BOOKING_URL}/driver/status/${booking_id}`,
    { booking_status }
  );
  return res.data;
};

export const updateBookingStatusByRider = async ({
  booking_id,
  statusRequestedByUser,
}: UpdateBookingStatusByRiderPayload): Promise<BookingResponse> => {
  const res = await axiosInstance.patch(
    `${BOOKING_URL}/rider/status/${booking_id}`,
    { statusRequestedByUser }
  );
  return res.data;
};
