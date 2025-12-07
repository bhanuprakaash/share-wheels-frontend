import React, { useState } from "react";

import Title from "../../../../shared/components/basic/Title.tsx";
import type { TripSearchQuery } from "../../types/search.ts";
import { useSearchTrips } from "../../hooks/useTrip.ts";
import type { GeoPoint } from "../../types/trip.ts";
import SearchTripForm from "../../components/SearchTripForm.tsx";
import SearchResults from "./SearchResults.tsx";

const SearchTrips = () => {
  const [formState, setFormState] = useState({
    start_location_name: "",
    end_location_name: "",
    start_geopoint: null as GeoPoint | null,
    end_geopoint: null as GeoPoint | null,
    departure_date: new Date().toISOString().split("T")[0],
  });

  const filters: TripSearchQuery = {
    start_lat: formState.start_geopoint?.lat.toString(),
    start_lng: formState.start_geopoint?.lng.toString(),
    end_lat: formState.end_geopoint?.lat.toString(),
    end_lng: formState.end_geopoint?.lng.toString(),
    departure_date: formState.departure_date,
    radius_km: "50",
  };

  const { data, isLoading, isError, error, refetch } = useSearchTrips(
    filters,
    false
  );

  const handleValueChange = (name: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (formState.start_geopoint && formState.end_geopoint) {
      refetch();
    }
  };

  const handleLocationSelect = (geoPointKey: string, position: GeoPoint) => {
    if (geoPointKey === "start_geopoint") {
      setFormState((prev) => ({
        ...prev,
        start_geopoint: position,
      }));
    } else if (geoPointKey === "end_geopoint") {
      setFormState((prev) => ({
        ...prev,
        end_geopoint: position,
      }));
    }
  };

  console.log(filters);
  const trips = data?.data?.trips;
  return (
    <div className="flex flex-col gap-2 p-2">
      <Title title="Search trips" />
      <SearchTripForm
        formState={formState}
        handleSearch={handleSearch}
        handleValueChange={handleValueChange}
        handleLocationSelect={handleLocationSelect}
      />
      <div className="border-t-1 border-t-[#E8F2E8] mt-3" />
      <div className="mt-3 space-y-4 rounded-lg">
        <SearchResults
          isLoading={isLoading}
          isError={isError}
          error={error}
          trips={trips}
        />
      </div>
    </div>
  );
};

export default SearchTrips;
