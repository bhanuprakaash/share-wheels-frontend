import React, { useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce.ts";
import type { LocationOption } from "../../../features/trip/components/TripForm.tsx";
import { searchLocationUsingGeoCode } from "../../api/mapsApi.ts";
import InputField from "./InputField.tsx";
import Loader from "../basic/Loader.tsx";

interface LocationSearchFieldProps {
    label: string;
    id: string;
    name: string;
    value?: string;
    placeholder: string;
    onValueChange: (name: string, value: string) => void;
    onLocationSelect: (
        name: string,
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
    ) =>
        void;
    geoPointKey?: string;
    required?: boolean;
    containerClassNames?: string;
    inputClassNames?: string;
}

const LocationSearchField: React.FC<LocationSearchFieldProps> = (
    {
        label,
        id,
        name,
        value,
        placeholder,
        onValueChange,
        onLocationSelect,
        geoPointKey,
        required,
        containerClassNames,
        inputClassNames
    }) => {
    const [options, setOptions] = useState<LocationOption[]>([]);
    const [showOptions, setShowOptions] = useState(false);
    const [loading, setLoading] = useState(false);
    const debouncedSearchTerm = useDebounce(value, 500);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        const fetchLocations = async () => {
            if (debouncedSearchTerm) {
                setLoading(true);
                try {
                    const data = await searchLocationUsingGeoCode(debouncedSearchTerm);
                    const newOptions = data.items?.map((item) => ({
                        label: item.address.label,
                        value: item.title,
                        position: item.position,
                        address: item.address
                    })) || [];
                    setOptions(newOptions);
                    setShowOptions(true);
                } catch (error) {
                    console.error("Failed to fetch locations:", error);
                    setOptions([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setOptions([]);
                setShowOptions(false);
            }
        };

        fetchLocations();
    }, [debouncedSearchTerm]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowOptions(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleSelect = (option: LocationOption) => {
        onValueChange(name, option.value);
        if (geoPointKey) {
            onLocationSelect(geoPointKey, option.position, option.address);
        }
        setShowOptions(false);
    };

    return (
        <div className={`relative max-w-[480px] ${containerClassNames}`} ref={wrapperRef}>
            <InputField
                label={label}
                type="text"
                id={id}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onValueChange(name, e.target.value)}
                required={required}
                containerClassNames={inputClassNames}
            />
            {showOptions && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                    {loading ? (
                        <li className="px-4 py-2 text-gray-500"><Loader /></li>
                    ) : options.length > 0 ? (
                        options.map((option, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelect(option)}
                            >
                                {option.label}
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2 text-gray-500">No results found</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default LocationSearchField;