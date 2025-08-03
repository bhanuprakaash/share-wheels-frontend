import React from "react";

import type {UserID} from "../types/user.ts";
import {useGetUserPreferences} from "../hooks/useUserPreferences.ts";
import Title from "../../../shared/components/basic/Title.tsx";

interface UserPreferencesProps {
    user_id: UserID;
}

interface PreferenceLabelProps {
    label: string;
    value: string;
}

const PreferenceLabel: React.FC<PreferenceLabelProps> = ({label, value}) => {
    return (
        <p className="text-[#598C59]">{label}: <span className="text-[#000]">{value}</span></p>
    )
}

const UserPreferences: React.FC<UserPreferencesProps> = ({user_id}) => {
    const {isLoading, isError, data} = useGetUserPreferences(user_id);

    if (isLoading) {
        return <div>Loading User Preferences</div>
    }
    if (isError) {
        return <div>Error Loading User Preferences</div>
    }

    return (
        <div className="border-1 border-[#E8F2E8] p-4 rounded-xl space-y-4">
            <Title title="Preferences"/>
            <div className="flex space-x-4 text-sm">
                <div className="flex-1/2 flex flex-col space-y-2">
                    <PreferenceLabel label="Allow Smoking" value={data?.data?.allow_smoking ? "Yes" : "No"}/>
                    <PreferenceLabel label="Music Genre" value={data?.data?.music_genre?.join(", ") || "None"}/>
                    <PreferenceLabel label="Has Pets" value={data?.data?.has_pets ? "Yes" : "No"}/>
                </div>
                <div className="flex-1/2 flex flex-col space-y-2">
                    <PreferenceLabel label="Pets Friendly" value={data?.data?.is_pet_friendly ? "Yes" : "No"}/>
                    <PreferenceLabel label="Communication Preferences" value={data?.data?.communication_preference || 'QUIET'}/>
                    <PreferenceLabel label="Seats Preferences" value={data?.data?.seat_preference || 'NONE'}/>
                </div>
            </div>
        </div>
    )
};

export default UserPreferences;