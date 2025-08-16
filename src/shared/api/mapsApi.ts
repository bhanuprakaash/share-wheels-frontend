import axios from "axios";
import type {SearchLocationResponse} from "../types/maps.ts";

const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

export const searchLocationUsingGeoCode = async (address: string): Promise<SearchLocationResponse> => {
    try {
        const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&in=countryCode:IND&apiKey=${mapApiKey}`;

        const response = await axios.get<SearchLocationResponse>(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching geocode data:", error);
        throw error;
    }
};
