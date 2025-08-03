import React from "react";

interface IconProps {
    icon: string;
    customClassNames?: string;
    onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({icon, customClassNames, onClick}) => {
    return (
        <span className={`${customClassNames} material-symbols-outlined `} onClick={onClick}>{icon}</span>
    )
}

export default Icon;