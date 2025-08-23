import React from "react";

import LocationSearchField from "../../../shared/components/forms/LocationSearchField.tsx";
import InputField from "../../../shared/components/forms/InputField.tsx";
import Button from "../../../shared/components/forms/Button.tsx";
import Icon from "../../../shared/components/basic/Icon.tsx";
import type {GeoPoint} from "../types/trip.ts";

interface SearchFormState {
    start_location_name: string;
    end_location_name: string;
    departure_date: string;
}

interface SearchTripFormProps {
    formState: SearchFormState;
    handleSearch: (event: React.FormEvent) => void;
    handleValueChange: (name: string, value: string) => void;
    handleLocationSelect: (geoPointKey: string, position: GeoPoint) => void;
}


const SearchTripForm: React.FC<SearchTripFormProps> = (
    {
        formState,
        handleSearch,
        handleValueChange,
        handleLocationSelect
    }) => {
    return (
        <form onSubmit={handleSearch} className="flex gap-2 justify-between items-center">
            <div className="flex gap-2 w-full">
                <LocationSearchField
                    label=""
                    id="start_location_name"
                    name="start_location_name"
                    value={formState.start_location_name}
                    placeholder="Schrute Farms"
                    onValueChange={handleValueChange}
                    onLocationSelect={handleLocationSelect}
                    geoPointKey="start_geopoint"
                    required
                    containerClassNames="flex-1"
                />
                <LocationSearchField
                    label=""
                    id="end_location_name"
                    value={formState.end_location_name}
                    name="end_location_name"
                    placeholder="Dunder Mufflin Paper Company"
                    onValueChange={handleValueChange}
                    onLocationSelect={handleLocationSelect}
                    geoPointKey="end_geopoint"
                    required
                    containerClassNames="flex-1"
                />
            </div>
            <InputField
                label=""
                id="departure_date"
                name="departure_date"
                type="date"
                value={formState.departure_date}
                onChange={(e) => handleValueChange("departure_date", e.target.value)}
                required
                containerClassNames="flex-1"
            />
            <Button
                type="submit"
                variant={"secondary"}
                customClasses="p-1 mt-auto"
            >
                <Icon icon="search"/>
            </Button>
        </form>
    );
};

export default SearchTripForm;