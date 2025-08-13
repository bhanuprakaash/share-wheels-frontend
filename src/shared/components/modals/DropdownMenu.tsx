import {type ReactNode, useEffect, useRef, useState} from "react";
import Icon from "../basic/Icon.tsx";

export interface DropdownItem {
    id: string;
    label: string;
    icon?: string;
    iconColor?: string;
    onClick: () => void;
    href?: string;
    disabled?: boolean;
}

interface DropdownMenuProps {
    trigger?: ReactNode;
    triggerIcon?: string;
    triggerClassName?: string;
    items: DropdownItem[];
    position?: 'left' | 'right';
    menuClassName?: string;
}

const DropdownMenu = (
    {
        trigger,
        triggerIcon = "more_horiz",
        triggerClassName = "flex items-center justify-center p-2 hover:bg-gray-100 rounded-full transition-colors",
        items,
        position = 'right',
        menuClassName = "w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
    }: DropdownMenuProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeMenu();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleItemClick = (item: DropdownItem) => {
        if (!item.disabled) {
            item.onClick();
            closeMenu();
        }
    };

    const positionClasses = {
        left: 'left-0',
        right: 'right-0'
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger */}
            <button
                type="button"
                className={triggerClassName}
                onClick={toggleMenu}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {trigger || (
                    <Icon
                        icon={triggerIcon}
                        customClassNames="text-[#598C59]"
                        customStyles={{fontWeight: "600"}}
                    />
                )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className={`absolute top-full mt-1 z-20 ${positionClasses[position]} ${menuClassName}`}
                    role="menu"
                >
                    <div className="py-1">
                        {items.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                className={`flex items-center w-full px-4 py-2 text-sm text-left transition-colors ${
                                    item.disabled
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-gray-700 hover:bg-gray-100 cursor-pointer'
                                }`}
                                onClick={() => handleItemClick(item)}
                                disabled={item.disabled}
                                role="menuitem"
                            >
                                {item.icon && (
                                    <Icon
                                        icon={item.icon}
                                        customClassNames={`mr-3 ${item.iconColor || 'text-gray-500'}`}
                                    />
                                )}
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;