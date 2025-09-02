import axiosInstance from "../../../shared/api/axiosInstance.ts";
import type {BookingPayload, BookingResponse} from "../types/booking.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BOOKING_URL = `${BASE_URL}/api/booking`;


export const createBooking = async (bookingPayload: BookingPayload): Promise<BookingResponse> => {
    const response = await axiosInstance.post<BookingResponse>(BOOKING_URL, bookingPayload);
    return response.data;
};