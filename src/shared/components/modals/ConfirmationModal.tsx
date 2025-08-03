import React from "react";
import Icon from "../basic/Icon.tsx";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    type?: 'danger' | 'warning' | 'success' | 'info';
    confirmText?: string;
    cancelText?: string;
    showIcon?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = (
    {
        isOpen,
        onClose,
        onConfirm,
        title,
        message,
        type = 'warning',
        confirmText = 'Confirm',
        cancelText = 'Cancel',
        showIcon = true
    }) => {
    if (!isOpen) return null;

    const typeConfig = {
        danger: {
            icon: "dangerous",
            iconColor: 'text-red-500',
            bgColor: 'bg-red-50',
            buttonColor: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
            borderColor: 'border-red-200',
        },
        warning: {
            icon: "warning",
            iconColor: 'text-yellow-500',
            bgColor: 'bg-yellow-50',
            buttonColor: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
            borderColor: 'border-yellow-200',
        },
        success: {
            icon: "check_circle",
            iconColor: 'text-green-500',
            bgColor: 'bg-green-50',
            buttonColor: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
            borderColor: 'border-green-200',
        },
        info: {
            icon: "info",
            iconColor: 'text-blue-500',
            bgColor: 'bg-blue-50',
            buttonColor: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
            borderColor: 'border-blue-200',
        },
    };

    const config = typeConfig[type];

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-5 transition-opacity"
                    onClick={onClose}
                />

                {/* Modal */}
                <div
                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-center">
                            {showIcon && (
                                <div
                                    className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${config.bgColor} sm:mx-0 sm:h-10 sm:w-10`}>
                                    <Icon icon={config.icon} customClassNames={`h-6 w-6 ${config.iconColor}`}/>
                                </div>
                            )}
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3 className="text-base font-semibold leading-6 text-gray-900">
                                    {title}
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        {message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                            type="button"
                            onClick={handleConfirm}
                            className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${config.buttonColor} focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto cursor-pointer`}
                        >
                            {confirmText}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:w-auto cursor-pointer"
                        >
                            {cancelText}
                        </button>
                    </div>

                    {/* Close button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 cursor-pointer"
                    >
                        <Icon icon="close"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;