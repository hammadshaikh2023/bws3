import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
    children: React.ReactNode;
    to?: string;
    variant?: 'primary' | 'outline' | 'ghost';
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
    children, 
    to, 
    variant = 'primary', 
    onClick, 
    className = "", 
    type = 'button',
    disabled = false
}) => {
    const baseStyles = "inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "bg-electric text-navy-900 hover:bg-white hover:scale-105 shadow-lg shadow-electric/20",
        outline: "border border-gray-600 text-white hover:border-electric hover:text-electric",
        ghost: "text-white hover:text-electric bg-transparent"
    };

    const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

    if (to) {
        return (
            <Link to={to} className={combinedClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={combinedClasses} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
