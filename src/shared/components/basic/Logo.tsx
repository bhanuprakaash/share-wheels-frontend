import React from "react";

const Logo: React.FC<{ customClasses: string }> = ({customClasses}) => {
    return (
        <h2 className={`text-2xl text-[#101910] font-light ${customClasses}`}>Share <span
            className="text-[#5A8C5A]">Wheels</span></h2>
    )
}

export default Logo;