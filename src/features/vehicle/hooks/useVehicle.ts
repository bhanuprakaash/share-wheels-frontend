import {useMutation} from "@tanstack/react-query";
import {addNewVehicle} from "../services/vehicleApi.ts";
import type {AddNewVehiclePayload, NewUserVehicleOptions, NewVehicleResponse, VehicleId} from "../types/vehicle.ts";
import type {AxiosError} from "axios";
import type {UserID} from "../../user/types/user.ts";
import queryClient from "../../../shared/api/tanstackQueryClient.ts";
import type {ErrorResponse} from "../../../shared/types/global.ts";


export const vehicleKeys = {
    all: ['vehicle'] as const,
    vehicle: (id: VehicleId) => [...vehicleKeys.all, id],
    user_vehicle: (id: UserID) => [...vehicleKeys.all, id],
}

export const useAddVehicle = (options?: NewUserVehicleOptions) => {
    return useMutation<NewVehicleResponse, AxiosError, { newVehiclePayload: AddNewVehiclePayload }>({
        mutationFn: ({newVehiclePayload}) => addNewVehicle(newVehiclePayload),
        onSuccess: (data) => {
            const responseData = data.data;
            void queryClient.invalidateQueries({queryKey: vehicleKeys.user_vehicle(responseData.driver_id!)});
            options?.onSuccess?.(responseData);
        },
        onError: (error) => {
            console.log(error);
            const errorData = (error.response?.data as ErrorResponse) ?? null;
            options?.onError?.(error, errorData)
        }
    })
}