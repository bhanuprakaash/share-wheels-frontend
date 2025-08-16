import {GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer, Marker} from '@react-google-maps/api';
import React, {useCallback, useMemo, useState} from "react";
import type {TripDataWithWaypoints} from "../../../features/trip/types/trip.ts";
import {getDirectionsServiceParams} from "../../utils/common.ts";

const containerStyle = {
    width: '100%',
    height: '500px'
};

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

const TripMapCard: React.FC<{ trip: TripDataWithWaypoints }> = ({trip}) => {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: googleMapsApiKey
    });
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const {origin, destination, waypoints} = useMemo(() => getDirectionsServiceParams(trip), [trip]);

    const originIcon = useMemo(() => isLoaded ? {
        path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
        fillColor: '#4CAF50', // Green for origin
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 2,
        anchor: new google.maps.Point(12, 24), // Access google.maps.Point only when loaded
    } : undefined, [isLoaded]);

    const destinationIcon = useMemo(() => isLoaded ? {
        path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
        fillColor: '#F44336', // Red for destination
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 2,
        anchor: new google.maps.Point(12, 24),
    } : undefined, [isLoaded]);

    const waypointIcon = useMemo(() => isLoaded ? {
        path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
        fillColor: '#FFC107', // Amber/Yellow for waypoints
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 1.5,
        anchor: new google.maps.Point(12, 24),
    } : undefined, [isLoaded]);

    const directionsCallback = useCallback((result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
        if (status === 'OK' && result) {
            setDirections(result);
        } else {
            console.error(`Error fetching directions: ${status}`);
        }
    }, []);

    const center = useMemo(() => origin || {lat: 12.9, lng: 77.6}, [origin]);

    const directionsServiceOptions = useMemo(() => {
        if (!isLoaded || !origin || !destination) {
            return null;
        }
        return {
            origin: origin,
            destination: destination,
            waypoints: waypoints,
            travelMode: google.maps.TravelMode.DRIVING,
        };
    }, [origin, destination, waypoints, isLoaded]);

    function isLatLngLiteral(location: unknown): location is google.maps.LatLngLiteral {
        return (
            typeof location === 'object' &&
            location !== null &&
            'lat' in location &&
            'lng' in location
        );
    }


    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
            {directionsServiceOptions && (
                <DirectionsService
                    options={directionsServiceOptions}
                    callback={directionsCallback}
                />
            )}

            {directions && (
                <DirectionsRenderer
                    options={{
                        directions: directions,
                        suppressMarkers: true,
                        polylineOptions: {
                            strokeColor: '#4285F4',
                            strokeOpacity: 0.8,
                            strokeWeight: 5,
                        },
                    }}
                />
            )}

            {/* Custom Markers */}
            {origin && <Marker position={origin} icon={originIcon}/>}
            {destination && <Marker position={destination} icon={destinationIcon}/>}
            {waypoints.map((waypoint, index) => {
                if (waypoint.location && isLatLngLiteral(waypoint?.location)) {
                    return (
                        <Marker
                            key={index}
                            position={waypoint.location}
                            icon={waypointIcon}
                        />
                    );
                }
                return null;
            })}
        </GoogleMap>
    ) : (
        <div>Loading Map...</div>
    );
};

export default TripMapCard;