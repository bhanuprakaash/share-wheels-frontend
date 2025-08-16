import React from "react";
import Icon from "../../../shared/components/basic/Icon.tsx";
import type {CreateWaypointPayload} from "../types/waypoints.ts";
import InputField from "../../../shared/components/forms/InputField.tsx";
import LocationSearchField from "../../../shared/components/forms/LocationSearchField.tsx";

interface WaypointsProps {
    waypoints: CreateWaypointPayload[];
    onWaypointsChange: (waypoints: CreateWaypointPayload[]) => void;
}

const AddWaypoints: React.FC<WaypointsProps> = ({waypoints, onWaypointsChange}) => {
    const addWaypoint = () => {
        const newWaypoint: CreateWaypointPayload = {
            location_name: '',
            address_line1: '',
            geopoint: {lat: 0, lng: 0},
            sequence_order: waypoints.length + 1
        };
        onWaypointsChange([...waypoints, newWaypoint]);
    };

    const removeWaypoint = (index: number) => {
        const filteredWaypoints = waypoints.filter((_, i) => i !== index);
        const reorderedWaypoints = filteredWaypoints.map((waypoint, i) => ({
            ...waypoint,
            sequence_order: i + 1
        }));
        onWaypointsChange(reorderedWaypoints);
    };

    const updateWaypoint = (
        index: number,
        field: 'location_name' | 'address_line1',
        value: string
    ) => {
        const updated = [...waypoints];
        updated[index] = {...updated[index], [field]: value};
        onWaypointsChange(updated);
    };

    const handleLocationValueChange = (index: number) => (_name: string, value: string) => {
        updateWaypoint(index, 'location_name', value);
    };

    const handleLocationSelect = (index: number) => (
        geoPointKey: string,
        position: { lat: number, lng: number },
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
        }
    ) => {
        const updated = [...waypoints];
        const locationName = address?.label?.split(',')[0].trim();

        updated[index] = {
            ...updated[index],
            location_name: locationName || address?.city || address?.state || address?.countryCode || '',
            [geoPointKey]: position,
            address_line1: address?.label?.substring(address?.label.indexOf(',') + 1).trim() || address?.city + ', ' + address?.state + ', ' + address?.countryCode,

        };
        onWaypointsChange(updated);
    };

    return (
        <div className="flex flex-col gap-4 max-w-[1000px]">
            <div className="flex items-center justify-between">
                <label className="font-light text-[#101910]">Waypoints (Optional)</label>
                <button
                    type="button"
                    onClick={addWaypoint}
                    className="flex items-center gap-2 px-4 py-2 bg-[#e9f1e9] text-[#5a8c5a] rounded-lg hover:bg-[#d4e7d4] transition-colors"
                >
                    <Icon icon="add"/>
                    Add Stop
                </button>
            </div>

            {waypoints.length === 0 ? (
                <div className="text-[#5a8c5a] text-sm font-light p-4 bg-[#f5f9f5] rounded-lg border border-[#e9f1e9]">
                    No waypoints added. Click "Add Stop" to add intermediate stops to your trip.
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {waypoints.map((waypoint, index) => (
                        <div key={index} className="p-4 rounded-lg border border-[#e9f1e9]">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-[#101910]">
                                    Stop {waypoint.sequence_order}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => removeWaypoint(index)}
                                    className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                                >
                                    <Icon icon="delete"/>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex flex-col gap-1">
                                    <LocationSearchField
                                        label="Location Name"
                                        id={`location_name_${index}`}
                                        name="location_name"
                                        value={waypoint.location_name}
                                        placeholder="e.g., Downtown Mall"
                                        onValueChange={handleLocationValueChange(index)}
                                        onLocationSelect={handleLocationSelect(index)}
                                        geoPointKey="geopoint"
                                        containerClassNames="max-w-full"
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <InputField
                                        name="address_line1"
                                        id={`address_line1_${index}`}
                                        label="Address"
                                        type="text"
                                        value={waypoint.address_line1}
                                        onChange={(e) =>
                                            updateWaypoint(index, 'address_line1', e.target.value)
                                        }
                                        placeholder="e.g., 123 Main St, City"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddWaypoints;