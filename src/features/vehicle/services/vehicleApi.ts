import axiosInstance from "../../../shared/api/axiosInstance.ts";
import type {
    AddNewVehiclePayload, DeleteVehicleResponse, GetUserVehicleResponse, GetVehicleByIdResponse,
    NewVehicleResponse,
    UpdateVehiclePayload, UpdateVehicleResponse,
    VehicleId
} from "../types/vehicle.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addNewVehicle = async (newVehiclePayload: AddNewVehiclePayload): Promise<NewVehicleResponse> => {
    const response = await axiosInstance.post(`${BASE_URL}/api/vehicle`, newVehiclePayload);
    return response.data;
}

export const getVehicleById = async (vehicleId: VehicleId): Promise<GetVehicleByIdResponse> => {
    const response = await axiosInstance.get(`${BASE_URL}/api/vehicle/${vehicleId}`);
    return response.data;
}

export const getMyVehicles = async (): Promise<GetUserVehicleResponse> => {
    const response = await axiosInstance.get(`${BASE_URL}/api/vehicle/my-vehicles`);
    return response.data;
}

export const updateVehicle = async (vehicleId: VehicleId, updateVehiclePayload: UpdateVehiclePayload): Promise<UpdateVehicleResponse> => {
    const response = await axiosInstance.patch(`${BASE_URL}/api/vehicle/${vehicleId}`, updateVehiclePayload);
    return response.data;
}

export const deleteVehicle = async (vehicleId: VehicleId): Promise<DeleteVehicleResponse> => {
    const response = await axiosInstance.delete(`${BASE_URL}/api/vehicle/${vehicleId}`);
    return response.data;
}