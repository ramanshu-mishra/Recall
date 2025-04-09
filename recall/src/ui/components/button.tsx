import React from 'react';
import { combine } from '../utilities/functions';


type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

const baseStyles = 'inline-flex items-center justify-center font-medium rounded-2xl transition-all focus:outline-none';

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-800 text-white hover:bg-red-900',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
  ghost: 'text-gray-700 hover:bg-gray-100',
};

const sizes = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-5 py-3',
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className= {combine( baseStyles,
            variants[variant],
            sizes[size],
            disabled ? 'opacity-50 cursor-not-allowed' : '',
            className)}
    >
      {children}
    </button>
  );
};

export default Button;


