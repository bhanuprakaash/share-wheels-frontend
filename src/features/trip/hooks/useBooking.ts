import {useMutation} from "@tanstack/react-query";
import {createBooking} from "../services/bookingApi.ts";
import type {BookingPayload, BookingResponse} from "../types/booking.ts";
import type {AxiosError} from "axios";
import type {CreateBookingOptions} from "../types/search.ts";
import type {ErrorResponse} from "../../../shared/types/global.ts";

export const useBooking = (options?: CreateBookingOptions) => {
    return useMutation<BookingResponse, AxiosError, { bookingPayload: BookingPayload }>({
        mutationFn: ({bookingPayload}) => createBooking(bookingPayload),
        onSuccess: (data) => {
            const responseData = data.data;
            options?.onSuccess?.(responseData);
        },
        onError: (err) => {
            console.log(err);
            const errorData = (err.response?.data as ErrorResponse) ?? null;
            options?.onError?.(err, errorData)
        }
    })
}