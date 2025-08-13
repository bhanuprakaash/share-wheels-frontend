import React from "react";

interface IconProps {
    icon: string;
    customClassNames?: string;
    customStyles?: object;
    onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({icon, customClassNames, onClick, customStyles}) => {
    return (
        <span className={`${customClassNames} material-symbols-outlined `} onClick={onClick}
              style={customStyles}>{icon}</span>
    )
}

export default Icon;