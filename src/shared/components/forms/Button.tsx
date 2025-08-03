import React from "react";

type buttonVariant = 'primary' | 'secondary';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    children?: React.ReactNode;
    variant?: buttonVariant;
    customClasses?:string;
}

const Button: React.FC<ButtonProps> = (props) => {
    const {children, type, onClick, disabled, variant = "primary",customClasses} = props;

    const baseClasses = `
        flex min-w-[84px] max-w-[480px] cursor-pointer items-center
        justify-center overflow-hidden rounded-xl p-3
        font-semi-bold leading-normal tracking-[0.015em]
    `;

    const variantClasses = {
        primary: 'bg-[#D6F2D6] text-[#598C59]',
        secondary: 'bg-[#e9f1e9] text-[#101910]',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${customClasses} `}
        >
            {children}
        </button>
    )
};

export default Button;