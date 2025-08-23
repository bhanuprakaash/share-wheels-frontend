import type {Waypoint} from "./waypoints.ts";
import type {ApiResponse} from "../../../shared/types/global.ts";

type WaypointPurpose = 'pickup' | 'dropoff' | 'intermediate';

export interface TripSearchQuery {
    driver_id?: string;
    trip_status?: string;
    departure_date?: string;
    limit?: string;
    offset?: string;
    start_lat?: string;
    start_lng?: string;
    end_lat?: string;
    end_lng?: string;
    radius_km?: string;
}

export interface WaypointInSearch extends Waypoint {
    waypoint_purpose: WaypointPurpose;
}

interface WaypointStatsInSearch {
    total_waypoints: number;
    relevant_waypoints: number;
}

export interface SearchTripData {
    trip_id: string;
    driver_id: string;
    start_location_name: string;
    end_location_name: string;
    trip_status: string;
    departure_time: string;
    price_per_seat: number;
    available_seats: number;
    waypoints: WaypointInSearch[];
    waypoint_stats: WaypointStatsInSearch;
}

interface Pagination {
    limit: number;
    offset: number;
    total: number;
}

export interface SearchResultData {
    trips: SearchTripData[];
    pagination: Pagination;
}

export type SearchResultsResponse = ApiResponse<SearchResultData>;