import { skipToken, useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type {
    CombinedCreateTripPayload,
    CreateTripOptions, DeleteTripOptions, DeleteTripResponse, DriverTripsResponse,
    TripId,
    TripResponse, UpdateTripOptions,
    UpdateTripPayload, UpdateTripStatusData, UpdateTripStatusOptions, UpdateTripStatusPayload
} from "../types/trip.ts";
import {
    createTrip,
    deleteTrip,
    getTripByTripId,
    getTripsByDriverId, searchTripsByFilters,
    updateTrip,
    updateTripStatus
} from "../services/tripApi.ts";
import type { ApiResponse, ErrorResponse } from "../../../shared/types/global.ts";
import type { UserID } from "../../user/types/user.ts";
import queryClient from "../../../shared/api/tanstackQueryClient.ts";
import type { SearchResultsResponse, TripSearchQuery } from "../types/search.ts";
import { toastError, toastSuccess } from "../../../shared/utils/toast.ts";

export const tripKeys = {
    all: ['trip'] as const,

    details: () => [...tripKeys.all, 'details'] as const,
    detail: (id: TripId) => [...tripKeys.details(), id] as const,

    driverTrips: () => [...tripKeys.all, 'driver_trips'] as const,
    driverTrip: (id: UserID) => [...tripKeys.driverTrips(), id] as const,

    list: (filters: TripSearchQuery) => [...tripKeys.all, { filters }] as const,

};

export const useCreateTrip = (options?: CreateTripOptions) => {
    return useMutation<TripResponse, AxiosError, { tripPayload: CombinedCreateTripPayload }>({
        mutationFn: ({ tripPayload }) => createTrip(tripPayload),
        onSuccess: (data) => {
            toastSuccess("Trip created successfully")
            const responseData = data.data;
            void queryClient.invalidateQueries({ queryKey: tripKeys.driverTrip(responseData.driver_id!) });
            options?.onSuccess?.(responseData);
        },
        onError: (err) => {
            toastError(err)
            const errorData = (err.response?.data as ErrorResponse) ?? null;
            options?.onError?.(err, errorData)
        }
    })
}

export const useGetTrip = (id: TripId) => {
    return useQuery<TripResponse, AxiosError, TripResponse, readonly ['trip', 'details', TripId]>({
        queryKey: tripKeys.detail(id!),
        queryFn: id ? () => getTripByTripId(id) : skipToken,
        enabled: !!id
    })
}

export const useSearchTrips = (filters: TripSearchQuery, enabled: boolean = true) => {
    return useQuery<SearchResultsResponse, AxiosError, SearchResultsResponse, ReturnType<typeof tripKeys.list>>({
        queryKey: tripKeys.list(filters),
        queryFn: () => searchTripsByFilters(filters),
        enabled: enabled,
    });
};

export const useGetDriverTrips = (id: UserID | undefined) => {
    return useQuery<DriverTripsResponse, AxiosError, DriverTripsResponse, readonly ['trip', 'driver_trips', UserID]>({
        queryKey: tripKeys.driverTrip(id!),
        queryFn: id ? () => getTripsByDriverId(id!) : skipToken,
        enabled: !!id,
        staleTime: Infinity,
    })
}

export const useUpdateTrip = (options?: UpdateTripOptions) => {
    return useMutation<TripResponse, AxiosError, { tripId: TripId, tripPayload: UpdateTripPayload }>({
        mutationFn: ({ tripId, tripPayload }) => updateTrip(tripId, tripPayload),
        onSuccess: (data) => {
            const responseData = data.data;
            toastSuccess("Trip updated successfully")
            void queryClient.invalidateQueries({ queryKey: tripKeys.detail(responseData.trip_id) });
            void queryClient.invalidateQueries({ queryKey: tripKeys.driverTrip(responseData.driver_id!) });
            options?.onSuccess?.(responseData);
        },
        onError: (err) => {
            toastError(err)
            const errorData = (err.response?.data as ErrorResponse) ?? null;
            options?.onError?.(err, errorData)
        }
    })
}

export const useUpdateTripStatus = (options?: UpdateTripStatusOptions) => {
    return useMutation<ApiResponse<UpdateTripStatusData>, AxiosError, {
        driverId: UserID,
        tripId: TripId,
        tripPayload: UpdateTripStatusPayload
    }>({
        mutationFn: ({ tripId, tripPayload }) => updateTripStatus(tripId, tripPayload),
        onSuccess: (data, variables) => {
            const responseData = data.data;
            toastSuccess("Trip status updated successfully")
            void queryClient.invalidateQueries({ queryKey: tripKeys.detail(responseData.trip_id) });
            void queryClient.invalidateQueries({ queryKey: tripKeys.driverTrip(variables.driverId!) })
            options?.onSuccess?.(data);
        },
        onError: (err) => {
            toastError(err)
            const errorData = (err.response?.data as ErrorResponse) ?? null;
            options?.onError?.(err, errorData)
        }
    })
}

export const useDeleteTrip = (options?: DeleteTripOptions) => {
    return useMutation<DeleteTripResponse, AxiosError, { tripId: TripId, driverId: UserID }>({
        mutationFn: ({ tripId }) => deleteTrip(tripId),
        onSuccess: (data, variables) => {
            toastSuccess("Trip deleted successfully")
            void queryClient.invalidateQueries({ queryKey: tripKeys.detail(variables.tripId) });
            void queryClient.invalidateQueries({ queryKey: tripKeys.driverTrip(variables.driverId!) });
            options?.onSuccess?.(data);
        },
        onError: (err) => {
            toastError(err)
            const errorData = (err.response?.data as ErrorResponse) ?? null;
            options?.onError?.(err, errorData)
        }
    })
}
