import React from 'react';
import { useGetUser } from '../../user/hooks/useUser';
import profilePicture from '../../../assets/profile-picture.png';

interface PassengerItemProps {
    riderId: string;
    seats: number;
}

const PassengerItem: React.FC<PassengerItemProps> = ({ riderId, seats }) => {
    const { data: user, isLoading } = useGetUser(riderId);

    if (isLoading) return <div className="flex items-center gap-2 p-2 px-0"><p className="text-xs">Loading...</p></div>;

    const userData = user?.data;
    const name = userData ? `${userData.first_name} ${userData.last_name}` : 'Unknown Passenger';
    const pic = userData?.profile_picture || profilePicture;

    return (
        <div className="flex items-center gap-2 p-2 px-0">
            <img src={pic} alt="passenger" className="w-12 h-12 rounded-full object-cover" />
            <div>
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-[#598C59]">{seats} Seat(s)</p>
            </div>
        </div>
    );
};

export default PassengerItem;
