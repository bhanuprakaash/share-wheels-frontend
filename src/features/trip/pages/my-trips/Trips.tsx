import { useMemo } from "react";
import ScheduledTrips from "./SheduledTrips.tsx";
import ActiveTrips from "./ActiveTrips.tsx";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../user/selectors/userSelectors.ts";
import { useGetDriverTrips } from "../../hooks/useTrip.ts";
import type { TabItem } from "../../../../shared/components/basic/Tabs.tsx";
import Tabs from "../../../../shared/components/basic/Tabs.tsx";
import CompletedTrips from "./CompletedTrips.tsx";
import Title from "../../../../shared/components/basic/Title.tsx";
import { Link } from "react-router-dom";
import FullScreenLoader from "../../../../shared/components/basic/FullScreenLoader.tsx";

const Trips = () => {
    const userId = useSelector(selectUserId);
    const { isLoading, isError, data } = useGetDriverTrips(userId);

    const { tabItems, defaultTab } = useMemo(() => {
        const rawTrips = data?.data || [];

        const scheduled = rawTrips.filter(trip => trip.trip_status === 'SCHEDULED');
        const active = rawTrips.filter(trip => trip.trip_status === 'IN_PROGRESS');
        const completed = rawTrips.filter(trip => trip.trip_status === 'COMPLETED');

        const items: TabItem[] = [
            {
                id: 'active',
                label: 'Active',
                count: active.length,
                content: <ActiveTrips trips={active} />
            },
            {
                id: 'scheduled',
                label: 'Scheduled',
                count: scheduled.length,
                content: <ScheduledTrips trips={scheduled} />
            },
            {
                id: 'completed',
                label: 'Completed',
                count: completed.length,
                content: <CompletedTrips trips={completed} />
            }
        ];

        const initialTab = active.length > 0 ? 'active' : 'scheduled';

        return { tabItems: items, defaultTab: initialTab };
    }, [data]);

    if (isLoading) return <FullScreenLoader />;
    if (isError) return <div className="text-center text-gray-500 flex items-center justify-center">Error loading trips</div>;

    return (
        <div className="w-full">
            <div className="flex justify-between items-center gap-2 p-2">
                <Title title="My Trips" />
                <Link
                    to="schedule-trip"
                    className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-3xl px-6 py-2 leading-normal tracking-[0.015em] bg-[#E8F2E8] text-[#0F1A0F]"
                >
                    <span className="font-bold self-center text-sm">Schedule a Trip</span>
                </Link>
            </div>
            <Tabs
                items={tabItems}
                defaultActiveId={defaultTab}
            />
        </div>
    )
}

export default Trips;