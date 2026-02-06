import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
    className?: string;
    showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", showText = true }) => {
    return (
        <Link to="/" className={`flex items-center gap-2 group ${className}`}>
            <div className="w-8 h-8 bg-gradient-to-tr from-electric to-blue-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-navy-900">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
            </div>
            {showText && (
                <span className="text-2xl font-display font-bold tracking-tighter hover:text-electric transition-colors">
                    BIG WALL<span className="text-electric">.</span>
                </span>
            )}
        </Link>
    );
};

export default Logo;
