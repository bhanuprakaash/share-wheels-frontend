import React from 'react';

interface ToggleFieldProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    id?: string;
}

const ToggleField: React.FC<ToggleFieldProps> = ({label, checked, onChange, disabled = false, id}) => {
    const handleToggle = () => {
        if (!disabled) {
            onChange(!checked);
        }
    };

    return (
        <div className="flex items-center gap-5 p-3">
            <span className="flex flex-col min-w-40 mb-1 font-light">
                {label}
            </span>

            <button
                type="button"
                role="switch"
                aria-checked={checked}
                aria-labelledby={id}
                onClick={handleToggle}
                disabled={disabled}
                className={`
                    relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                    transition-colors duration-200 ease-in-out focus:outline-none
                    ${checked ? 'bg-[#5a8c5a]' : 'bg-gray-200'}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
            >
                <span
                    className={`
                        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
                        transition duration-200 ease-in-out
                        ${checked ? 'translate-x-5' : 'translate-x-0'}
                    `}
                />
            </button>
        </div>
    );
};

export default ToggleField;