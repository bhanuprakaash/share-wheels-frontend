import React from "react";

interface TextAreaFieldProps {
    label: string,
    value: string,
    placeholder: string,
    id: string,
    required?: boolean,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    rows?: number,
    containerClassNames?: string,
}

const TextAreaField: React.FC<TextAreaFieldProps> = (props) => {
    const {label, id, value, placeholder, required, name, onChange, rows = 4,containerClassNames} = props;
    return (
        <div className={`flex max-w-[480px] flex-wrap flex-col gap-4 ${containerClassNames}`}>
            <label htmlFor={id} className="flex flex-col min-w-40 flex-1 mb-1 font-light">{label}</label>
            <textarea
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101910] focus:outline-0
                focus:ring-0 border-none bg-[#e9f1e9] focus:border-none placeholder:text-[#5a8c5a] placeholder:font-light p-4
                text-base font-normal leading-normal"
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                name={name}
                rows={rows}
            />
        </div>
    )
};

export default TextAreaField;