export interface SearchLocationItem {
    title: string;
    id: string;
    resultType: string;
    address: {
        label: string;
        countryCode: string;
        countryName: string;
        stateCode?: string;
        state?: string;
        county?: string;
        city?: string;
        district?: string;
        street?: string;
        postalCode?: string;
    };
    position: {
        lat: number;
        lng: number;
    };
    mapView?: {
        west: number;
        south: number;
        east: number;
        north: number;
    };
    scoring?: {
        queryScore: number;
        fieldScore?: {
            streets?: number[];
        };
    };
}

export interface SearchLocationResponse {
    items: SearchLocationItem[]
}