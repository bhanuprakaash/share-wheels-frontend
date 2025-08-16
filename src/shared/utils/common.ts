import type {GeoPoint, TripDataWithWaypoints} from "../../features/trip/types/trip.ts";

export const convertISOtoLocalDate = (isoDate: string) => {
    if (!isoDate) return "N/A"; // or "" or some default value
    const date = new Date(isoDate);

    if (isNaN(date.getTime())) return "Invalid date";
    return date.getDate().toString().padStart(2, "0") + "/" +
        (date.getMonth() + 1).toString().padStart(2, "0") + "/" +
        date.getFullYear()
}

export const convertISOtoLocalTime = (isoDate: string) => {
    if (!isoDate) return "N/A";
    const dateObj = new Date(isoDate);
    if (isNaN(dateObj.getTime())) return "Invalid date";

    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
    }).format(dateObj);
}


// maps
export const getDirectionsServiceParams = (tripData: TripDataWithWaypoints) => {
    const origin = tripData.start_geopoint;
    const destination = tripData.end_geopoint;

    const waypoints: google.maps.DirectionsWaypoint[] = [];
    if (tripData.waypoints && tripData.waypoints.length > 0) {
        tripData.waypoints.sort((a, b) => a.sequence_order - b.sequence_order).forEach(waypoint => {
            if (waypoint.geopoint) {
                waypoints.push({
                    location: waypoint.geopoint,
                    stopover: true,
                });
            }
        });
    }
    return {origin, destination, waypoints};
};

export const parseLineStringWKT = (lineStringWKT: string): GeoPoint[] => {
    if (!lineStringWKT) {
        console.warn("Invalid or empty LINESTRING WKT provided.");
        return [];
    }

    // Remove "LINESTRING(" and ")" and split by comma
    const coordinatesString = lineStringWKT.replace("LINESTRING(", "").replace(")", "");
    const coordinatePairs = coordinatesString.split(',');

    const geoPoints: GeoPoint[] = [];

    for (const pair of coordinatePairs) {
        const [lngStr, latStr] = pair.trim().split(' ');
        const lng = parseFloat(lngStr);
        const lat = parseFloat(latStr);

        if (!isNaN(lat) && !isNaN(lng)) {
            geoPoints.push({lat, lng});
        } else {
            console.warn(`Could not parse coordinate pair: ${pair}`);
        }
    }

    return geoPoints;
};