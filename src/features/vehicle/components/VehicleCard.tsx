import React from "react";

import type {Vehicle, VehicleId} from "../types/vehicle.ts";
import OneSeatCar from "../../../assets/one-seat-car.png";
import TwoSeatCar from "../../../assets/two-seat-car.png";
import ThreeSeatCar from "../../../assets/three-seat-car.png";
import FourSeatCar from "../../../assets/four-seat-car.png";
import FiveSeatCar from "../../../assets/five-seat-car.png";
import Icon from "../../../shared/components/basic/Icon.tsx";


interface VehicleCardProps {
    vehicle: Vehicle,
    isEditable?: boolean,
    onUpdate?: (vehicle: Vehicle) => void,
    onDelete?: (vehicleId: VehicleId) => void,
}

const seatingCapacityImages: { [key: number]: string } = {
    1: OneSeatCar,
    2: TwoSeatCar,
    3: ThreeSeatCar,
    4: FourSeatCar,
    5: FiveSeatCar,
};

const FeatureLabel: React.FC<{ label: string, value: string | number }> = ({label, value}) => (
    <p>
        <span className="text-[#598C59] text-sm">{label + ": "}</span>
        <span className="text-[#0D141C] text-sm">{value}</span>
    </p>
)

const VehicleCard: React.FC<VehicleCardProps> = (
    {
        vehicle,
        isEditable = false,
        onUpdate,
        onDelete
    }) => {

    const {make, model, color, year, license_plate, seating_capacity, vehicle_id} = vehicle;
    const carImage = seating_capacity >= 5
        ? seatingCapacityImages[5]
        : seatingCapacityImages[seating_capacity] || seatingCapacityImages[1];

    const handleUpdate = () => {
        if (onUpdate) {
            onUpdate(vehicle);
        }
    };

    const handleDelete = () => {
        if (onDelete && vehicle_id) {
            onDelete(vehicle_id);
        }
    };

    return (
        <div className="border-1 border-[#E8F2E8] p-4 rounded-xl space-y-4 flex flex-col gap-4 w-fit h-[400px]">
            <div className="relative group">
                <img src={carImage} alt="car-image" className="w-[300px] h-[200px] object-contain"/>
                {isEditable && (
                    <div
                        className="absolute inset-0 bg-black/40 flex justify-end items-start p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md">
                        <div className="flex gap-2">
                            <button
                                className="text-white hover:text-blue-400 cursor-pointer"
                                onClick={handleUpdate}
                            >
                                <Icon icon="edit_square"/>
                            </button>
                            <button
                                className="text-white hover:text-red-400 mr-2 cursor-pointer"
                                onClick={handleDelete}
                            >
                                <Icon icon="delete"/>
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <div>
                    <h4 className="font-bold">{make}</h4>
                    <p className="text-sm">{model + ' ' + year}</p>
                </div>
                <FeatureLabel label="Licence Plate" value={license_plate}/>
                <FeatureLabel label="Color" value={color}/>
                <FeatureLabel label="Seating Capacity" value={seating_capacity}/>
            </div>
        </div>
    )
}

export default VehicleCard;