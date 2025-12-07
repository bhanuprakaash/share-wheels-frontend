import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBooking,
  getBookingsByRiderId,
  getBookingsByTripId,
  updateBookingStatusByDriver,
  updateBookingStatusByRider,
} from "../services/bookingApi.ts";
import type {
  BookingListResponse,
  BookingPayload,
  BookingResponse,
  UpdateBookingStatusByDriverPayload,
  UpdateBookingStatusByRiderPayload,
} from "../types/booking.ts";
import type { AxiosError } from "axios";
import type { CreateBookingOptions } from "../types/search.ts";
import type { ErrorResponse } from "../../../shared/types/global.ts";

export const useBooking = (options?: CreateBookingOptions) => {
  const queryClient = useQueryClient();
  return useMutation<
    BookingResponse,
    AxiosError,
    { bookingPayload: BookingPayload }
  >({
    mutationFn: ({ bookingPayload }) => createBooking(bookingPayload),
    onSuccess: (data) => {
      const responseData = data.data;
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      options?.onSuccess?.(responseData);
    },
    onError: (err) => {
      console.log(err);
      const errorData = (err.response?.data as ErrorResponse) ?? null;
      options?.onError?.(err, errorData);
    },
  });
};

export const useBookingsByRider = (
  riderId: string,
  enabled: boolean = true
) => {
  return useQuery<BookingListResponse, AxiosError>({
    queryKey: ["bookings", riderId],
    queryFn: () => getBookingsByRiderId(riderId),
    enabled: !!riderId && enabled,
  });
};

export const useBookingsByTrip = (
  tripId: string,
  enabled: boolean = true
) => {
  return useQuery<BookingListResponse, AxiosError>({
    queryKey: ["bookings", "trip", tripId],
    queryFn: () => getBookingsByTripId(tripId),
    enabled: !!tripId && enabled,
  });
};

export const useUpdateBookingStatusByDriver = () => {
  const queryClient = useQueryClient();
  return useMutation<
    BookingResponse,
    AxiosError,
    UpdateBookingStatusByDriverPayload
  >({
    mutationFn: (payload) => updateBookingStatusByDriver(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
};

export const useUpdateBookingStatusByRider = () => {
  const queryClient = useQueryClient();
  return useMutation<
    BookingResponse,
    AxiosError,
    UpdateBookingStatusByRiderPayload
  >({
    mutationFn: (payload) => updateBookingStatusByRider(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
};

