import React from "react";

interface FormattedStyleProps {
    label: string;
    value: string | number | boolean | null | undefined;
    customClassName?: string;
}

const FormattedStyle: React.FC<FormattedStyleProps> = ({label, value, customClassName}) => {
    return (
        <div className={`border-t-1 border-t-[#E8F2E8] p-4 px-0 flex flex-col space-y-1 ${customClassName}`}>
            <p className="text-[#598C59] text-sm">{label}</p>
            <p className="text-[#0D141C] text-sm">{value}</p>
        </div>
    )
}

export default FormattedStyle;