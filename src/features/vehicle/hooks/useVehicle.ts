import { skipToken, useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { addNewVehicle, deleteVehicle, getMyVehicles, getVehicleById, updateVehicle } from "../services/vehicleApi.ts";
import type {
    AddNewVehiclePayload, DeleteVehicleOptions, DeleteVehicleResponse, GetUserVehicleResponse,
    GetVehicleByIdResponse,
    NewUserVehicleOptions,
    NewVehicleResponse, UpdateVehicleOptions, UpdateVehiclePayload, UpdateVehicleResponse, UseVehicleOptions,
    VehicleId
} from "../types/vehicle.ts";
import type { UserID } from "../../user/types/user.ts";
import queryClient from "../../../shared/api/tanstackQueryClient.ts";
import type { ErrorResponse } from "../../../shared/types/global.ts";
import { toastError, toastSuccess } from "../../../shared/utils/toast.ts";


export const vehicleKeys = {
    all: ['vehicle'] as const,
    vehicle: (id: VehicleId) => [...vehicleKeys.all, id] as const,
    user_vehicle: (id: UserID) => [...vehicleKeys.all, id] as const,
}

export const useAddVehicle = (options?: NewUserVehicleOptions) => {
    return useMutation<NewVehicleResponse, AxiosError, { newVehiclePayload: AddNewVehiclePayload }>({
        mutationFn: ({ newVehiclePayload }) => addNewVehicle(newVehiclePayload),
        onSuccess: (data) => {
            toastSuccess("Vehicle added successfully")
            const responseData = data.data;
            void queryClient.invalidateQueries({ queryKey: vehicleKeys.user_vehicle(responseData.driver_id!) });
            options?.onSuccess?.(responseData);
        },
        onError: (error) => {
            toastError(error)
            const errorData = (error.response?.data as ErrorResponse) ?? null;
            options?.onError?.(error, errorData)
        }
    })
}

export const useGetVehicleById = (id: VehicleId | undefined, options: UseVehicleOptions) => {
    return useQuery<GetVehicleByIdResponse, AxiosError, GetVehicleByIdResponse, readonly ['vehicle', VehicleId]>({
        queryKey: vehicleKeys.vehicle(id!),
        queryFn: id ? () => getVehicleById(id!) : skipToken,
        enabled: !!id && options.enabled !== false,
    })
}

export const useGetUserVehicles = (userId: UserID | undefined) => {
    return useQuery<GetUserVehicleResponse, AxiosError, GetUserVehicleResponse, readonly ['vehicle', UserID]>({
        queryKey: vehicleKeys.user_vehicle(userId!),
        queryFn: () => getMyVehicles(),
        enabled: true,
        staleTime: Infinity,
    })
}

export const useUpdateVehicle = (options?: UpdateVehicleOptions) => {
    return useMutation<UpdateVehicleResponse, AxiosError, {
        vehicleId: VehicleId,
        vehiclePayload: UpdateVehiclePayload
    }>({
        mutationFn: ({ vehicleId, vehiclePayload }) => updateVehicle(vehicleId, vehiclePayload),
        onSuccess: (data) => {
            const responseData = data.data;
            toastSuccess("Vehicle updated successfully")
            void queryClient.invalidateQueries({ queryKey: vehicleKeys.vehicle(responseData.vehicle_id) });
            void queryClient.invalidateQueries({ queryKey: vehicleKeys.user_vehicle(responseData.driver_id!) });
            options?.onSuccess?.(responseData);
        },
        onError: (error) => {
            toastError(error)
            const errorData = (error.response?.data as ErrorResponse) ?? null;
            options?.onError?.(error, errorData)
        }
    })
}

export const useDeleteVehicle = (options?: DeleteVehicleOptions) => {
    return useMutation<DeleteVehicleResponse, AxiosError, { vehicleId: VehicleId, userId: UserID }>({
        mutationFn: ({ vehicleId }) => deleteVehicle(vehicleId),
        onSuccess: (data, variables) => {
            const responseData = data.data;
            toastSuccess("Vehicle deleted successfully")
            void queryClient.invalidateQueries({ queryKey: vehicleKeys.vehicle(responseData.vehicle_id) });
            void queryClient.invalidateQueries({ queryKey: vehicleKeys.user_vehicle(variables.userId) });
            options?.onSuccess?.(data);
        },
        onError: (error) => {
            toastError(error)
            const errorData = (error.response?.data as ErrorResponse) ?? null;
            options?.onError?.(error, errorData)
        }
    })
}