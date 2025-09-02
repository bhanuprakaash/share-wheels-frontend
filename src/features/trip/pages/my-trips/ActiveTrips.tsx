import Title from "../../../../shared/components/basic/Title.tsx";
import {Link} from "react-router-dom";
import TripCard from "../../../../shared/components/cards/TripCard.tsx";
import Button from "../../../../shared/components/forms/Button.tsx";
import Icon from "../../../../shared/components/basic/Icon.tsx";
import type {TripDataWithWaypoints} from "../../types/trip.ts";
import React from "react";

interface ActiveTripsProps {
    trips: TripDataWithWaypoints[]
}

const ActiveTrips: React.FC<ActiveTripsProps> = ({trips}) => {

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center gap-2 p-2">
                <Title title="Active Trips"/>
            </div>
            {trips?.length === 0 ? (
                <div className="text-center">No Active Trips</div>
            ) : (
                trips.map((trip) => (
                    <TripCard key={trip.trip_id} trip={trip}>
                        <Button
                            type="button"
                            variant={"primary"}
                            customClasses={"text-sm font-bold px-6 py-2"}
                        >
                            Cancel Trip
                        </Button>
                        <Button
                            type="button"
                            variant={"secondary"}
                            customClasses={"text-sm font-bold px-6 py-2"}
                        >
                            Start Trip
                        </Button>
                        <Link
                            to={`${trip.trip_id}`}
                            className="text-xl self-center flex"
                        >
                            <Icon
                                icon="arrow_forward_ios"
                                customClassNames="text-[#598C59]"
                                customStyles={{fontWeight: "600"}}
                            />
                        </Link>
                    </TripCard>
                ))
            )}
        </div>
    )
}

export default ActiveTrips;