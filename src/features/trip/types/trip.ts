import type {UserID} from "../../user/types/user.ts";
import type {VehicleId} from "../../vehicle/types/vehicle.ts";
import type {CreateWaypointPayload, Waypoints} from "./waypoints.ts";
import type {ApiResponse, ErrorResponse} from "../../../shared/types/global.ts";
import type {AxiosError} from "axios";

export interface Trip {
    trip_id: string,
    driver_id: UserID,
    vehicle_id: VehicleId,
    start_location_name: string,
    start_address_line1: string,
    start_geopoint: GeoPoint,
    end_location_name: string,
    end_address_line1: string,
    end_geopoint: GeoPoint,
    departure_time: string,
    estimated_arrival_time: string | null,
    available_seats: number,
    price_per_seat: number,
    trip_status: TripStatus,
    trip_description: string,
    actual_start_time: string | null,
    actual_end_time: string | null,
    created_at: string,
    updated_at: string,
    polyline_path: string,
}

export type TripId = Trip['trip_id'];
export type TripStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type GeoPoint = {
    lat: number,
    lng: number,
}
export type TripDataWithWaypoints = Trip & { waypoints: Waypoints };
export type TripResponse = ApiResponse<TripDataWithWaypoints>;
export type DriverTripsResponse = ApiResponse<TripDataWithWaypoints[]>;

// Create Trip
export type CreateTripPayload = Omit<Trip,
    'trip_id' |
    'actual_start_time' |
    'trip_status' |
    'estimated_arrival_time' |
    'actual_end_time' |
    'polyline_path' |
    'created_at' |
    'updated_at'
>;

export interface CreateTripOptions {
    onSuccess?: (data: TripDataWithWaypoints) => void;
    onError?: (error: AxiosError, errorData: ErrorResponse | null) => void;
}

export type CombinedCreateTripPayload = CreateTripPayload & {
    waypoints: CreateWaypointPayload[];
}

// Update Trip
export type UpdateTripPayload = Partial<Omit<Trip,
    'trip_id' |
    'driver_id' |
    'created_at' |
    'polyline_path'
>> & {
    waypoints?: CreateWaypointPayload[];
}

export interface UpdateTripOptions {
    onSuccess?: (data: TripDataWithWaypoints) => void;
    onError?: (error: AxiosError, errorData: ErrorResponse | null) => void;
}

// Update TripStatus
export type UpdateTripStatusPayload = {
    status: TripStatus,
}

export type UpdateTripStatusData = {
    trip_id: TripId,
    trip_status: TripStatus,
}

export interface UpdateTripStatusOptions {
    onSuccess?: (data: ApiResponse<UpdateTripStatusData>) => void;
    onError?: (error: AxiosError, errorData: ErrorResponse | null) => void;
}

// Delete Trip
export type DeleteTripResponse = ApiResponse<TripId>

export interface DeleteTripOptions {
    onSuccess?: (data: ApiResponse<TripId>) => void;
    onError?: (error: AxiosError, errorData: ErrorResponse | null) => void;
}