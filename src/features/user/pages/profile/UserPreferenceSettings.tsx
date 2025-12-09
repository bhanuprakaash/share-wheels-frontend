import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

import Icon from "../../../../shared/components/basic/Icon.tsx";
import Title from "../../../../shared/components/basic/Title.tsx";
import {selectUserId} from "../../selectors/userSelectors.ts";
import {useGetUserPreferences, useUpdateUserPreferences} from "../../hooks/useUserPreferences.ts";
import type {UpdateUserPreferencePayload} from "../../types/userPreferences.ts";
import ToggleField from "../../../../shared/components/forms/ToggleField.tsx";
import ArrayStringInput from "../../../../shared/components/forms/ArrayStringInput.tsx";
import SelectField from "../../../../shared/components/forms/SelectField.tsx";
import InputField from "../../../../shared/components/forms/InputField.tsx";
import Button from "../../../../shared/components/forms/Button.tsx";

const UserPreferenceSettings = () => {
    const [preferenceData, setPreferenceData] = useState<UpdateUserPreferencePayload>({});

    const navigate = useNavigate();
    const userId = useSelector(selectUserId);

    const {isLoading, isError, data: userPreferenceData} = useGetUserPreferences(userId);
    const userPreferencesMutation = useUpdateUserPreferences({
        onSuccess: () => {
            setPreferenceData({})
            navigate(-1);
        },
        onError: (_error, errorData) => {
            console.log(errorData?.message);
        }
    });

    const handleNavigateBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        if (userPreferenceData) {
            const responseData = userPreferenceData.data;
            const initialData = {
                allow_smoking: responseData.allow_smoking,
                music_genre: responseData.music_genre,
                has_pets: responseData.has_pets,
                is_pet_friendly: responseData.is_pet_friendly,
                communication_preference: responseData.communication_preference,
                seat_preference: responseData.seat_preference,
            }
            setPreferenceData(initialData);
        }
    }, [userPreferenceData]);

    const handleToggle = (fieldName: string, checked: boolean) => {
        setPreferenceData(prev => ({
            ...prev,
            [fieldName]: checked
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setPreferenceData(prev => ({
            ...prev,
            [name]: value,
        }))
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userId) {
            userPreferencesMutation.mutate({id: userId, payload: preferenceData})
        }
    }

    if (isLoading) {
        return <p>Loading....</p>
    }

    if (isError) {
        return <div className="text-center text-gray-500 flex items-center justify-center">Error...</div>
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center p-2">
                <Icon icon="arrow_back_ios" customClassNames="cursor-pointer" onClick={handleNavigateBack}/>
                <Title title="Preference Settings"/>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 border-1 border-[#E8F2E8] w-full p-4 rounded-lg">
                <ArrayStringInput
                    label="Music Genre"
                    values={preferenceData?.music_genre || []}
                    onChange={(values) => setPreferenceData(prev => ({
                        ...prev,
                        music_genre: values
                    }))}
                    maxItems={10}
                    allowDuplicates={false}
                    name="music_genre"
                />
                <SelectField
                    id="communication_preference"
                    options={[
                        {label: "Chatty", value: "CHATTY"},
                        {label: "Quiet", value: "QUIET"}
                    ]}
                    name="communication_preference"
                    value={preferenceData.communication_preference ?? "CHATTY"}
                    label="Are you a Chatty or Queit Person?"
                    onChange={handleChange}
                />
                <InputField
                    type="text"
                    value={preferenceData.seat_preference ?? ""}
                    label="Your Seat Preferences"
                    id="seat_preference"
                    name="seat_preference"
                    placeholder="Ex: Window"
                    onChange={handleChange}
                />
                <ToggleField
                    label="Rider can smoke in you trip?"
                    id="allow_smoking"
                    checked={preferenceData.allow_smoking ?? false}
                    onChange={(checked) => handleToggle('allow_smoking', checked)}
                />
                <ToggleField
                    label="Do you have Pets?"
                    id="has_pets"
                    checked={preferenceData.has_pets ?? false}
                    onChange={(checked) => handleToggle('has_pets', checked)}
                />
                <ToggleField
                    label="Allow Pets for Trip?"
                    id="is_pet_friendly"
                    checked={preferenceData.is_pet_friendly ?? false}
                    onChange={(checked) => handleToggle('is_pet_friendly', checked)}
                />
                <Button
                    type="submit"
                    variant={"primary"}
                    customClasses={"text-base mt-3 font-semibold ml-2 flex items-center w-[150px]"}
                    disabled={userPreferencesMutation.isPending}
                >
                    {userPreferencesMutation.isPending ? "Updating..." : "Update"}
                </Button>
            </form>
        </div>
    )
}

export default UserPreferenceSettings;