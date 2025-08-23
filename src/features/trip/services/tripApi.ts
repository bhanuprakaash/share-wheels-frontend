import type {
    CombinedCreateTripPayload,
    DeleteTripResponse, DriverTripsResponse,
    TripId,
    TripResponse,
    UpdateTripPayload, UpdateTripStatusData, UpdateTripStatusPayload
} from "../types/trip.ts";
import type {UserID} from "../../user/types/user.ts";
import axiosInstance from "../../../shared/api/axiosInstance.ts";
import type {ApiResponse} from "../../../shared/types/global.ts";
import type {SearchResultsResponse, TripSearchQuery} from "../types/search.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TRIP_URL = `${BASE_URL}/api/trip`;

export const createTrip = async (tripPayload: CombinedCreateTripPayload): Promise<TripResponse> => {
    const response = await axiosInstance.post(`${TRIP_URL}`, tripPayload);
    return response.data;
}

export const getTripByTripId = async (tripId: TripId): Promise<TripResponse> => {
    const response = await axiosInstance.get(`${TRIP_URL}/${tripId}`);
    return response.data;
}

export const searchTripsByFilters = async (filters: TripSearchQuery): Promise<SearchResultsResponse> => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) {
            params.append(key, value.toString());
        }
    }

    const response = await axiosInstance.get(`${TRIP_URL}?${params.toString()}`);
    return response.data;
}

export const getTripsByDriverId = async (driverId: UserID): Promise<DriverTripsResponse> => {
    const response = await axiosInstance.get(`${TRIP_URL}/driver/${driverId}`);
    return response.data;
}

export const updateTrip = async (tripId: TripId, tripPayload: UpdateTripPayload): Promise<TripResponse> => {
    const response = await axiosInstance.patch(`${TRIP_URL}/${tripId}`, tripPayload);
    return response.data;
}

export const updateTripStatus = async (tripId: TripId, updateTripStatusPayload: UpdateTripStatusPayload): Promise<ApiResponse<UpdateTripStatusData>> => {
    const response = await axiosInstance.patch(`${TRIP_URL}/${tripId}/status`, updateTripStatusPayload);
    return response.data;
}

export const deleteTrip = async (tripId: TripId): Promise<DeleteTripResponse> => {
    const response = await axiosInstance.delete(`${TRIP_URL}/${tripId}`);
    return response.data;
}