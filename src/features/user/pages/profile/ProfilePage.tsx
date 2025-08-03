import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {selectUser} from "../../selectors/userSelectors.ts";
import UserPreferences from "../../components/UserPreferences.tsx";
import FormattedStyle from "../../../../shared/components/basic/FormattedStyle.tsx";
import ProfilePicture from "../../../../assets/profile-picture.png"
import Title from "../../../../shared/components/basic/Title.tsx";
import Icon from "../../../../shared/components/basic/Icon.tsx";
import {useLogoutUser} from "../../hooks/useUser.ts";


interface SettingsTabProps {
    setting: string,
    navigateTo: string,
}

const SettingsTab: React.FC<SettingsTabProps> = ({setting, navigateTo}) => {
    return (
        <Link to={navigateTo}
              className="flex justify-between items-center gap-2 cursor-pointer py-3 hover:text-[#598C59]">
            <p>{setting}</p>
            <Icon icon="arrow_forward_ios"/>
        </Link>
    )
}

const ProfilePage = () => {
    const user = useSelector(selectUser);
    const {logout} = useLogoutUser();


    const firstName = user?.first_name;
    const lastName = user?.last_name ? user?.last_name : "";
    const fullName = firstName + " " + lastName;

    const date = new Date(user?.created_at || Date.now());
    const memberSinceYear = date.getFullYear();

    const handleLogout = () => {
        logout();
    }

    return (
        <div>
            <Title title="Profile" customClassName="p-2 mb-2"/>
            <div className="flex flex-col gap-2 p-2">
                <section className="flex items-center justify-between">
                    <div className="flex gap-5 items-center">
                        <img src={user?.profile_picture || ProfilePicture} alt="avatar"/>
                        <div className="flex flex-col gap-1 justify-center">
                            <Title title={fullName}/>
                            <p className="font-light">Member since {memberSinceYear}</p>
                        </div>
                    </div>
                    <p className="mr-6 border-1 border-[#E8F2E8] text-[#598C59] font-bold p-2 rounded-md">{user?.wallet}</p>
                </section>
                <section>
                    <Title title="About" customClassName="mb-2"/>
                    <FormattedStyle label="Email" value={user?.email}/>
                    <FormattedStyle label="Phone" value={user?.phone_number}/>
                    <FormattedStyle label="Bio" value={user?.bio || "Your Bio"}/>
                </section>
                {user?.user_id && <UserPreferences user_id={user.user_id}/>}
                <section>
                    <Title title="Settings" customClassName="mt-2 mb-3"/>
                    <SettingsTab setting="Account Settings" navigateTo="account-settings"/>
                    <SettingsTab setting="Preference Settings" navigateTo="preference-settings"/>
                    <SettingsTab setting="Privacy and Security Settings" navigateTo="privacy-and-security-settings"/>
                    <div
                        className="text-red-600 bg-red-50 cursor-pointer w-full p-4 rounded-lg mt-4"
                        onClick={handleLogout}
                    >
                        Logout
                    </div>
                </section>
            </div>
        </div>
    )
};

export default ProfilePage;