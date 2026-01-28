import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}: ButtonProps) {
    const variants = {
        primary: 'bg-primary text-white hover:bg-primary-dark active:scale-95',
        secondary: 'bg-secondary text-primary hover:bg-accent active:scale-95',
        ghost: 'bg-transparent text-foreground hover:bg-secondary active:scale-95',
        outline: 'bg-transparent border border-stone-200 text-stone-700 hover:bg-stone-50 active:scale-95',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            className={`
        rounded-2xl font-medium
        transition-all duration-200 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
}
