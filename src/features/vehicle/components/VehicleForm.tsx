import React from "react";

import type {AddNewVehiclePayload, UpdateVehiclePayload} from "../types/vehicle.ts";
import InputField from "../../../shared/components/forms/InputField.tsx";

interface VehicleFormProps<T extends AddNewVehiclePayload | UpdateVehiclePayload> {
    vehicle: T;
    setVehicle: React.Dispatch<React.SetStateAction<T>>;
}

const VehicleForm = <T extends AddNewVehiclePayload | UpdateVehiclePayload>({
                                                                                vehicle,
                                                                                setVehicle
                                                                            }: VehicleFormProps<T>) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type} = e.target;

        setVehicle(prev => ({
            ...prev,
            [name]: type === 'number' ? parseInt(value) || 0 : value
        } as T));
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                    label="Make"
                    type="text"
                    id="make"
                    name="make"
                    value={vehicle?.make ?? ''}
                    placeholder="Toyota, Ford"
                    onChange={handleInputChange}
                    required
                />

                <InputField
                    label="Model"
                    type="text"
                    id="model"
                    name="model"
                    value={vehicle?.model ?? ''}
                    placeholder="Camry, F-150"
                    onChange={handleInputChange}
                    required
                />

                <InputField
                    label="Year"
                    type="number"
                    id="year"
                    name="year"
                    value={vehicle?.year?.toString() ?? String(new Date().getFullYear())}
                    placeholder="2022"
                    onChange={handleInputChange}
                    required
                />

                <InputField
                    label="License Plate"
                    type="text"
                    id="license_plate"
                    name="license_plate"
                    value={vehicle?.license_plate ?? ''}
                    placeholder="DS 51SF 2222"
                    onChange={handleInputChange}
                    required
                />

                <InputField
                    label="Color"
                    type="text"
                    id="color"
                    name="color"
                    value={vehicle?.color ?? ''}
                    placeholder="Silver"
                    onChange={handleInputChange}
                    required
                />

                <InputField
                    label="Seating Capacity"
                    type="number"
                    id="seating_capacity"
                    name="seating_capacity"
                    value={vehicle?.seating_capacity?.toString() ?? "2"}
                    placeholder="2"
                    onChange={handleInputChange}
                    required
                />
            </div>
        </div>
    );
};

export default VehicleForm;