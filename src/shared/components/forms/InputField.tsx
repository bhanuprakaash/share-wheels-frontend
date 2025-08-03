import React from "react";

interface InputFieldProps {
    label: string,
    type: string,
    value: string,
    placeholder: string,
    id: string,
    required?: boolean,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    icon?: boolean,
    containerClassNames?: string,
}

const InputField: React.FC<InputFieldProps> = (props) => {
    const {label, type, id, value, placeholder, required, name, onChange, icon = false, containerClassNames} = props;
    return (
        <div className={`flex max-w-[480px] flex-wrap flex-col gap-4 ${containerClassNames}`}>
            <label htmlFor={id} className="flex flex-col min-w-40 flex-1 mb-1 font-light">{label}</label>
            <div className="flex w-full flex-1 items-stretch rounded-xl">
                <input
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101910] focus:outline-0
                focus:ring-0 border-none bg-[#e9f1e9] focus:border-none h-12 placeholder:text-[#5a8c5a] placeholder:font-light p-4 pr-2
                text-base font-normal leading-normal rounded-r-none"
                    type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    name={name}
                />
                <div
                    className="text-[#5a8c5a] flex border-none bg-[#e9f1e9] items-center justify-center pr-4 rounded-r-xl border-l-0"
                    data-icon="CurrencyDollar"
                    data-size="24px"
                    data-weight="regular"
                >
                    {
                        icon ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor"
                                     viewBox="0 0 256 256">
                                    <path
                                        d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z"
                                    ></path>
                                </svg>
                            ) :
                            null
                    }
                </div>
            </div>
        </div>
    )
};

export default InputField;