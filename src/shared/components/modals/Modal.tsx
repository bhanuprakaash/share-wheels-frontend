import React from "react";
import Button from "../forms/Button.tsx";
import Icon from "../basic/Icon.tsx";

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    title: string;
    children: React.ReactNode;
    saveText?: string;
    saveDisabled?: boolean;
    cancelText?: string;
}

const Modal: React.FC<CustomModalProps> = (
    {
        isOpen,
        onClose,
        onSave,
        title,
        children,
        saveDisabled = false,
        saveText = 'Save',
        cancelText = 'Cancel',
    }) => {
    if (!isOpen) return null;

    const handleSave = () => {
        onSave();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    onClick={onClose}
                />

                {/* Modal */}
                <div
                    className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-2xl">
                    {/* Header with buttons */}
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {title}
                        </h3>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-4 max-h-96 overflow-y-auto">
                        {children}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 cursor-pointer"
                    >
                        <Icon icon="close"/>
                    </button>
                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <div className="flex space-x-3">
                            <Button
                                type="button"
                                onClick={onClose}
                                customStyles={{padding: '0.5rem 1rem'}}
                                variant="secondary"
                            >
                                {cancelText}
                            </Button>
                            <Button
                                type="button"
                                onClick={handleSave}
                                customStyles={{padding: '0.5rem 1rem'}}
                                disabled={saveDisabled}
                            >
                                {saveText}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;