import type {AxiosError} from "axios";
import type {ErrorResponse} from "../../../shared/types/global.ts";

export interface Vehicle {
    vehicle_id: string,
    driver_id: string,
    make: string,
    model: string,
    year: number,
    license_plate: string,
    color: string,
    vehicle_ai_image: string,
    seating_capacity: number,
    is_verified: boolean,
    created_at: string,
    updated_at: string,
}

export type VehicleId = Vehicle['vehicle_id'];

export interface VehicleResponse<T> {
    success: boolean,
    message: string,
    data: T
}

// create vehicle
export type AddNewVehiclePayload = Omit<Vehicle, 'vehicle_id' | 'driver_id' | 'is_verified' | 'created_at' | 'updated_at'>

export type NewVehicleResponse = VehicleResponse<Vehicle>;

export interface NewUserVehicleOptions {
    onSuccess?: (data: Vehicle) => void;
    onError?: (error: AxiosError, errorData: ErrorResponse | null) => void;
}

// get vehicle
export type GetVehicleByIdResponse = VehicleResponse<Vehicle>;
export type GetUserVehicleResponse = VehicleResponse<Vehicle[]>;

// update vehicle
export type UpdateVehiclePayload = Partial<Vehicle>;
export type UpdateVehicleResponse = VehicleResponse<Vehicle>;

// delete Vehicle
export type DeleteVehicleResponse = VehicleResponse<Pick<Vehicle, 'vehicle_id'>>
