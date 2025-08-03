import React, {useState} from 'react';
import type {KeyboardEvent} from "react";

interface ArrayStringInputProps {
    label: string;
    values: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
    disabled?: boolean;
    maxItems?: number;
    allowDuplicates?: boolean;
    id?: string;
    name?: string;
}

const ArrayStringInput: React.FC<ArrayStringInputProps> = ({
                                                               label,
                                                               values,
                                                               onChange,
                                                               placeholder = "Type and press Enter to add",
                                                               disabled = false,
                                                               maxItems,
                                                               allowDuplicates = false,
                                                               id,
                                                               name
                                                           }) => {
    const [inputValue, setInputValue] = useState('');

    const addItem = () => {
        const trimmedValue = inputValue.trim();

        if (!trimmedValue) return;

        if (!allowDuplicates && values.includes(trimmedValue)) {
            setInputValue('');
            return;
        }

        if (maxItems && values.length >= maxItems) return;

        onChange([...values, trimmedValue]);
        setInputValue('');
    };

    const removeItem = (index: number) => {
        if (disabled) return;
        const newValues = values.filter((_, i) => i !== index);
        onChange(newValues);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addItem();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div className={`flex max-w-[480px] flex-wrap flex-col gap-4`}>
            <label className="flex min-w-40 flex-1 mb-1 font-light">
                {label}
                {maxItems && (
                    <span className="text-gray-500 ml-1">
                        ({values.length}/{maxItems})
                    </span>
                )}
            </label>

            {/* Input field */}
            <div className="flex gap-2">
                <input
                    type="text"
                    id={id}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholder}
                    disabled={disabled || (maxItems ? values.length >= maxItems : false)}
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101910] focus:outline-0
                focus:ring-0 border-none bg-[#e9f1e9] focus:border-none h-12 placeholder:text-[#5a8c5a] placeholder:font-light p-4 pr-2
                text-base font-normal leading-normal"
                />
                {/*<button*/}
                {/*    type="button"*/}
                {/*    onClick={addItem}*/}
                {/*    disabled={disabled || !inputValue.trim() || (maxItems ? values.length >= maxItems : false)}*/}
                {/*    className="px-4 py-2 bg-[#5a8c5a] text-white rounded-md*/}
                {/*             focus:outline-none focus:ring-2*/}
                {/*             cursor-pointer*/}
                {/*             disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"*/}
                {/*>*/}
                {/*    Add*/}
                {/*</button>*/}
            </div>

            {values.length > 0 && (
                <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="inline-flex items-center gap-2 px-3 py-1 border-[#e9f1e9]
                                         text-gray-800 rounded-full text-sm border"
                            >
                                <span>{value}</span>
                                {!disabled && (
                                    <button
                                        type="button"
                                        onClick={() => removeItem(index)}
                                        className="text-gray-500 hover:text-red-600 focus:outline-none
                                                 transition-colors ml-1 mb-1 cursor-pointer"
                                        aria-label={`Remove ${value}`}
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Hidden input for form submission */}
            {name && (
                <input
                    type="hidden"
                    name={name}
                    value={JSON.stringify(values)}
                />
            )}
        </div>
    );
};

export default ArrayStringInput;