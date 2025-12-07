import React, { useState, useEffect } from "react";

export interface TabItem {
    id: string;
    label: string;
    content: React.ReactNode;
    count?: number;
}

interface TabsProps {
    items: TabItem[];
    defaultActiveId?: string;
    onTabChange?: (id: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ items, defaultActiveId, onTabChange }) => {
    const [activeTabId, setActiveTabId] = useState<string>(
        defaultActiveId || items[0]?.id
    );

    const handleTabClick = (id: string) => {
        setActiveTabId(id);
        if (onTabChange) {
            onTabChange(id);
        }
    };

    useEffect(() => {
        if (defaultActiveId) {
            setActiveTabId(defaultActiveId);
        }
    }, [defaultActiveId]);

    const activeContent = items.find((item) => item.id === activeTabId)?.content;

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full bg-white border-b border-gray-100 mb-4">
                {items.map((item) => {
                    const isActive = activeTabId === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleTabClick(item.id)}
                            className={`flex-1 py-3 text-sm font-medium text-center border-b-2 transition-colors duration-200 cursor-pointer focus:outline-none ${isActive
                                ? "border-[#598C59] text-[#598C59]"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                        >
                            {item.label}

                            {item.count !== undefined && item.count > 0 && (
                                <span
                                    className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full ${isActive
                                        ? "bg-green-100 text-green-800"
                                        : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {item.count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="w-full min-h-[50vh] transition-opacity duration-300 ease-in-out">
                {activeContent}
            </div>
        </div>
    );
};

export default Tabs;