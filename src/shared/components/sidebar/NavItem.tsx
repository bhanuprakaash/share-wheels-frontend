import React from "react";
import {NavLink} from "react-router-dom";

import Icon from "../basic/Icon.tsx";

interface NavItem {
    path: string;
    name: string;
    icon: string;
}

interface NavItemProps {
    navItem: NavItem;
}

const NavItem: React.FC<NavItemProps> = ({navItem}) => {
    return (
        <li>
            <NavLink
                to={navItem.path}
                className={({isActive}) => `
                  flex navItems-center p-2 px-4 rounded-2xl text-sm
                  ${isActive
                    ? 'bg-[#E8F2E8] text-[#0D141C]'
                    : 'text-[#0D141C]'
                }
                `}
            >
                {navItem.icon && <Icon icon={navItem.icon} customClassNames="mr-2 text-lg"/>}
                <span className="font-normal self-center">{navItem.name}</span>
            </NavLink>
        </li>
    )
};

export default NavItem;