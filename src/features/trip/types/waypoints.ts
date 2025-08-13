import type {GeoPoint, TripId} from "./trip.ts";

export interface Waypoint {
    waypoint_id: string;
    trip_id: TripId;
    location_name: string;
    address_line1: string;
    geopoint: GeoPoint;
    sequence_order: number;
    estimated_arrival_time: string | null;
    actual_arrival_time: string | null;
    created_at: string;
    updated_at: string;
}

export type WaypointId = Waypoint['waypoint_id'];

export type Waypoints = Waypoint[];

// Create
export type CreateWaypointPayload = Omit<Waypoint,
    'trip_id' |
    'waypoint_id' |
    'estimated_arrival_time' |
    'actual_arrival_time' |
    'created_at' |
    'updated_at'
>;