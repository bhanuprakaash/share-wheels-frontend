import React from "react";

interface TitleProps {
    title: string;
    customClassName?: string;
}

const Title: React.FC<TitleProps> = ({title, customClassName}) => {
    return (
        <h2 className={`font-bold text-xl ${customClassName}`}>{title}</h2>
    )
}

export default Title;