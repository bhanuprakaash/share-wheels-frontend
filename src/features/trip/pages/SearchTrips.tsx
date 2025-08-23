import React, {useEffect, useState} from "react";

import Title from "../../../shared/components/basic/Title.tsx";
import type {SearchTripData, TripSearchQuery} from "../types/search.ts";
import {useSearchTrips} from "../hooks/useTrip.ts";
import type {GeoPoint} from "../types/trip.ts";
import SearchTripForm from "../components/SearchTripForm.tsx";
import TripCard from "../../../shared/components/cards/TripCard.tsx";
import type {AxiosError} from "axios";
import Button from "../../../shared/components/forms/Button.tsx";

const LoadingState = () => (
    <div className="text-center text-gray-500 flex items-center justify-center h-[75vh]">
        Loading trips...
    </div>
);

const ErrorState = ({error}: { error: AxiosError | null }) => (
    <div className="text-center text-red-500 flex items-center justify-center h-[75vh]">
        Error fetching trips: {error?.message}
    </div>
);

const EmptyState = () => (
    <div className="text-center text-gray-500 flex items-center justify-center h-[75vh]">
        No trips found.
    </div>
);

const TripResults = ({trips}: { trips: SearchTripData[] }) => (
    <div className="flex flex-col gap-4">
        {trips.map((trip) => (
            <TripCard trip={trip} variant="search" key={trip.trip_id}>
                <Button>
                    Book Trip
                </Button>
            </TripCard>
        ))}
    </div>
);

const SearchResults = ({isLoading, isError, error, trips}: {
    isLoading: boolean;
    isError: boolean;
    error: AxiosError | null;
    trips?: SearchTripData[];
}) => {
    if (isError) {
        return <ErrorState error={error}/>;
    }

    if (isLoading) {
        return <LoadingState/>;
    }

    if (!trips || trips.length <= 0) {
        return <EmptyState/>;
    }

    return (
        <div className="overflow-y-auto h-[75vh]">
            <TripResults trips={trips}/>
        </div>
    )
};

const SearchTrips = () => {
    const [formState, setFormState] = useState({
        start_location_name: '',
        end_location_name: '',
        start_geopoint: null as GeoPoint | null,
        end_geopoint: null as GeoPoint | null,
        departure_date: new Date().toISOString().split("T")[0],
    });
    const [shouldFetch, setShouldFetch] = useState(false);

    const filters: TripSearchQuery = {
        start_lat: formState.start_geopoint?.lat.toString(),
        start_lng: formState.start_geopoint?.lng.toString(),
        end_lat: formState.end_geopoint?.lat.toString(),
        end_lng: formState.end_geopoint?.lng.toString(),
        departure_date: formState.departure_date,
        radius_km: "5"
    };

    const {data, isLoading, isError, error, isSuccess} = useSearchTrips(filters, shouldFetch);

    useEffect(() => {
        if (isSuccess) {
            setShouldFetch(false);
        }
    }, [isSuccess])

    const handleValueChange = (name: string, value: string) => {
        setFormState(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(formState)
        if (formState.start_geopoint && formState.end_geopoint) {
            setShouldFetch(true);
        }
    };

    const handleLocationSelect = (geoPointKey: string, position: GeoPoint) => {
        if (geoPointKey === "start_geopoint") {
            setFormState(prev => ({
                ...prev,
                start_geopoint: position
            }));
        } else if (geoPointKey === "end_geopoint") {
            setFormState(prev => ({
                ...prev,
                end_geopoint: position
            }));
        }
    };

    console.log(filters)
    const trips = data?.data?.trips;
    return (
        <div className="flex flex-col gap-2 p-2">
            <Title title="Search trips"/>
            <SearchTripForm
                formState={formState}
                handleSearch={handleSearch}
                handleValueChange={handleValueChange}
                handleLocationSelect={handleLocationSelect}
            />
            <div className="border-t-1 border-t-[#E8F2E8] mt-3"/>
            <div className="mt-3 space-y-4 rounded-lg">
                <SearchResults
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                    trips={trips}
                />
            </div>
        </div>
    )
}

export default SearchTrips;