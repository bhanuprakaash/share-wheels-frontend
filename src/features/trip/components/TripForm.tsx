import React from "react";
import InputField from "../../../shared/components/forms/InputField.tsx";
import TextAreaField from "../../../shared/components/forms/TextareaField.tsx";
import Button from "../../../shared/components/forms/Button.tsx";
import AddWaypoints from "./AddWaypoints.tsx";
import type {CreateWaypointPayload} from "../types/waypoints.ts";
import type {CombinedCreateTripPayload, UpdateTripPayload} from "../types/trip.ts";
import SelectField from "../../../shared/components/forms/SelectField.tsx";
import LocationSearchField from "../../../shared/components/forms/LocationSearchField.tsx";

export interface LocationOption {
    label: string;
    value: string;
    position: {
        lat: number;
        lng: number;
    },
    address: {
        countryCode?: string;
        countryName?: string;
        stateCode?: string;
        state?: string;
        county?: string;
        city?: string;
        district?: string;
        subdistrict?: string;
        street?: string;
        postalCode?: string;
        label?: string;
    };
}

interface TripFormProps<T extends CombinedCreateTripPayload | UpdateTripPayload> {
    trip: T,
    setTrip: React.Dispatch<React.SetStateAction<T>>,
    vehicleOptions: { label: string; value: string }[],
    onSave: () => void;
}

const TripForm = <T extends CombinedCreateTripPayload | UpdateTripPayload>(
    {trip, setTrip, vehicleOptions, onSave}: TripFormProps<T>
) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value, type} = e.target;
        setTrip(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleWaypointsChange = (waypoints: CreateWaypointPayload[]) => {
        setTrip(prev => ({
            ...prev,
            waypoints
        }));
    };

    const handleLocationValueChange = (name: string, value: string) => {
        setTrip(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="flex flex-col items-center w-full">

            <div className="w-full max-w-[1200px] mx-auto p-3 flex flex-col gap-6">

                <div className="flex flex-col gap-6 pb-3">
                    <div className="flex gap-6">
                        <LocationSearchField
                            label="Start Location"
                            id="start_location_name"
                            name="start_location_name"
                            value={trip.start_location_name}
                            placeholder="e.g., 123 Main St, City"
                            onValueChange={handleLocationValueChange}
                            onLocationSelect={(geoPointKey, position, address) => {
                                setTrip(prev => ({
                                    ...prev,
                                    [geoPointKey]: position,
                                    "start_address_line1": address?.label?.substring(address?.label.indexOf(',') + 1).trim() || address?.city + ', ' + address?.state + ', ' + address?.countryCode,
                                }));
                            }}
                            geoPointKey="start_geopoint"
                            required
                            containerClassNames="flex-1"
                        />

                        <InputField
                            label="Start Locationd Address"
                            type="text"
                            id="start_address_line1"
                            name="start_address_line1"
                            value={trip.start_address_line1}
                            placeholder="e.g., 123 Main St, City"
                            onChange={handleInputChange}
                            required
                            containerClassNames="flex-1"
                        />
                    </div>

                    <div className="flex gap-6">
                        <LocationSearchField
                            label="Destination Location Name"
                            id="end_location_name"
                            name="end_location_name"
                            value={trip.end_location_name}
                            placeholder="e.g., Airport Terminal"
                            onValueChange={handleLocationValueChange}
                            onLocationSelect={(geoPointKey, position, address) => {
                                setTrip(prev => ({
                                    ...prev,
                                    [geoPointKey]: position,
                                    "end_address_line1": address?.label?.substring(address?.label.indexOf(',') + 1).trim() || address?.city + ', ' + address?.state + ', ' + address?.countryCode,
                                }));
                            }}
                            geoPointKey="end_geopoint"
                            required
                            containerClassNames="flex-1"
                        />

                        <InputField
                            label="Destination Address"
                            type="text"
                            id="end_address_line1"
                            name="end_address_line1"
                            value={trip.end_address_line1}
                            placeholder="e.g., 456 Airport Rd, City"
                            onChange={handleInputChange}
                            required
                            containerClassNames="flex-1"
                        />
                    </div>
                </div>

                <hr className="border-t-[1px] border-[#E8F2E8] w-[1000px]"/>

                <div className="flex flex-col gap-6 pb-3">
                    <AddWaypoints
                        waypoints={trip?.waypoints || []}
                        onWaypointsChange={handleWaypointsChange}
                    />
                </div>

                <hr className="border-t-[1px] border-[#E8F2E8] w-[1000px]"/>

                <div className="flex flex-col gap-6 pb-3">
                    <div className="flex gap-6">
                        <InputField
                            label="Departure Time"
                            type="datetime-local"
                            id="departure_time"
                            name="departure_time"
                            value={trip.departure_time}
                            placeholder=""
                            onChange={handleInputChange}
                            required
                            containerClassNames="flex-1"
                        />
                        <InputField
                            label="Available Seats"
                            type="number"
                            id="available_seats"
                            name="available_seats"
                            value={(trip?.available_seats ?? "").toString()}
                            placeholder="e.g., 4"
                            onChange={handleInputChange}
                            required
                            containerClassNames="flex-1"
                        />
                    </div>

                    <div className="flex gap-6">
                        <InputField
                            label="Price per Seat"
                            type="number"
                            id="price_per_seat"
                            name="price_per_seat"
                            value={(trip?.price_per_seat ?? "").toString()}
                            placeholder="e.g., 25"
                            onChange={handleInputChange}
                            required
                            icon={true}
                            containerClassNames="flex-1"
                        />

                        <SelectField
                            id="vehicle_id"
                            options={vehicleOptions}
                            name="vehicle_id"
                            value={trip.vehicle_id}
                            label="Vehicle"
                            onChange={handleInputChange}
                            containerClassNames="flex-1"
                        />
                    </div>

                    <hr className="border-t-[1px] border-[#E8F2E8] w-[1000px]"/>

                </div>

                <TextAreaField
                    name={"trip_description"}
                    label={"About Trip"}
                    value={trip?.trip_description || ''}
                    placeholder={"Describe your trip, any special instructions, or preferences..."}
                    id={"trip_description"}
                    onChange={handleInputChange}
                    containerClassNames="w-full"
                />

                <hr className="border-t-[1px] border-[#E8F2E8] w-[1000px]"/>

                <Button
                    type="button"
                    variant={"primary"}
                    customClasses={"text-base mt-3 font-semibold mr-auto w-[200px]"}
                    onClick={onSave}
                >
                    Share Wheels
                </Button>

            </div>

        </div>
    );
};

export default TripForm;