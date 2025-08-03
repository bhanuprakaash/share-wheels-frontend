import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

import {useMeQuery, useUpdateUser} from "../../hooks/useUser.ts";
import type {Gender, UpdateUserPayload} from "../../types/user.ts";
import {selectUserId} from "../../selectors/userSelectors.ts";
import InputField from "../../../../shared/components/forms/InputField.tsx";
import Title from "../../../../shared/components/basic/Title.tsx";
import Icon from "../../../../shared/components/basic/Icon.tsx";
import SelectField from "../../../../shared/components/forms/SelectField.tsx";
import TextAreaField from "../../../../shared/components/forms/TextareaField.tsx";
import Button from "../../../../shared/components/forms/Button.tsx";

const ProfileSettings = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UpdateUserPayload>({});
    const [initialProfile, setInitialProfile] = useState<UpdateUserPayload>({});
    const userId = useSelector(selectUserId);

    const {isLoading, isError, data: profileData} = useMeQuery();
    const updateUserMutation = useUpdateUser({
        onSuccess: () => {
            setProfile({});
            setInitialProfile({});
            navigate(-1);
        },
        onError: (_error, errorData) => {
            console.log(errorData?.message);
        }
    });

    useEffect(() => {
        if (profileData) {
            const responseData = profileData.data;
            const initialData = {
                email: responseData.email,
                phone_number: responseData.phone_number,
                first_name: responseData.first_name,
                last_name: responseData.last_name,
                profile_picture: responseData.profile_picture,
                date_of_birth: responseData.date_of_birth,
                gender: validateGender(responseData.gender),
                bio: responseData.bio,
            }
            setProfile(initialData);
            setInitialProfile(initialData);
        }
    }, [profileData]);

    const validateGender = (gender: string | undefined): Gender => {
        return (gender === "MALE" || gender === "FEMALE") ? gender : "MALE";
    };

    const handleNavigateBack = () => {
        navigate(-1);
    }

    const getChangedFields = (): Partial<UpdateUserPayload> => {
        const changes: Partial<UpdateUserPayload> = {};

        if (profile.email !== initialProfile.email) {
            changes.email = profile.email;
        }
        if (profile.phone_number !== initialProfile.phone_number) {
            changes.phone_number = profile.phone_number;
        }
        if (profile.first_name !== initialProfile.first_name) {
            changes.first_name = profile.first_name;
        }
        if (profile.last_name !== initialProfile.last_name) {
            changes.last_name = profile.last_name;
        }
        if (profile.profile_picture !== initialProfile.profile_picture) {
            changes.profile_picture = profile.profile_picture;
        }
        if (profile.date_of_birth !== initialProfile.date_of_birth) {
            changes.date_of_birth = profile.date_of_birth;
        }
        if (profile.gender !== initialProfile.gender) {
            changes.gender = profile.gender;
        }
        if (profile.bio !== initialProfile.bio) {
            changes.bio = profile.bio;
        }

        return changes;
    };

    const hasChanges = (): boolean => {
        return Object.keys(getChangedFields()).length > 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;

        if (name === 'gender') {
            setProfile(prevState => ({
                ...prevState,
                gender: validateGender(value),
            }));
        } else {
            setProfile(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!hasChanges()) {
            return;
        }
        const changes = getChangedFields();
        if (userId) {
            updateUserMutation.mutate({
                id: userId,
                payload: changes
            })
        }
    }

    if (isLoading) {
        return <p>Loading....</p>
    }

    if (isError) {
        return <p>Error....</p>
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center p-2">
                <Icon icon="arrow_back_ios" customClassNames="cursor-pointer" onClick={handleNavigateBack}/>
                <Title title="Account Settings"/>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 border-1 border-[#E8F2E8] w-full p-4 rounded-lg">
                <div className="flex gap-2">
                    <InputField
                        label="First name"
                        type="text"
                        value={profile.first_name || ''}
                        id="first_name"
                        name="first_name"
                        onChange={handleChange}
                        placeholder="Dwight"
                        containerClassNames="flex-1"
                    />
                    <InputField
                        label="Last name"
                        type="text"
                        value={profile.last_name || ''}
                        id="last_name"
                        name="last_name"
                        onChange={handleChange}
                        placeholder="Schrute"
                        containerClassNames="flex-1"
                    />
                </div>
                <div className="flex gap-2">
                    <InputField
                        name={"email"}
                        label={"Email"}
                        type={"text"}
                        value={profile?.email || ''}
                        placeholder={"example@mail.com"}
                        id={"email"}
                        required={true}
                        onChange={handleChange}
                        containerClassNames="flex-1"
                    />
                    <InputField
                        label="Phone"
                        type="tel"
                        value={profile.phone_number || ''}
                        id="phone_number"
                        name="phone_number"
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        containerClassNames="flex-1"
                    />
                </div>
                <div className="flex gap-2">
                    <InputField
                        name={"profile_picture"}
                        label={"Profile Picture"}
                        type={"text"}
                        value={profile?.profile_picture || ''}
                        placeholder={"https://example.com/profile.png"}
                        id={"profile_picture"}
                        onChange={handleChange}
                        containerClassNames="flex-1"
                    />
                    <InputField
                        name={"date_of_birth"}
                        label={"Date of Birth"}
                        type={"date"}
                        value={profile?.date_of_birth || ''}
                        placeholder={"12/01/2002"}
                        id={"date_of_birth"}
                        onChange={handleChange}
                        containerClassNames="flex-1"
                    />
                </div>
                <SelectField
                    id="gender"
                    options={[
                        {label: "Male", value: "MALE"},
                        {label: "Female", value: "FEMALE"}
                    ]}
                    name="gender"
                    value={validateGender(profile.gender)}
                    label="Gender"
                    onChange={handleChange}
                    containerClassNames="flex-1"
                />
                <TextAreaField
                    name={"bio"}
                    label={"Bio"}
                    value={profile?.bio || ''}
                    placeholder={"Describe something about yourself..."}
                    id={"bio"}
                    onChange={handleChange}
                    containerClassNames="flex-1"
                />
                <Button
                    type="submit"
                    variant="primary"
                    disabled={updateUserMutation.isPending}
                    customClasses={"text-base mt-3 font-semibold ml-2 flex items-center w-[150px]"}
                >
                    {updateUserMutation.isPending ? "Updating..." : "Update"}
                </Button>
            </form>
        </div>
    )
}

export default ProfileSettings;