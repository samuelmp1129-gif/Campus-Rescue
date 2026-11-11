import React from 'react';

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  icon: Icon,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]';

  const variants = {
    primary:
      'bg-[#2878B5] hover:bg-[#202B38] text-[#FFFFFF] shadow-sm shadow-[#202B38]/15 hover:shadow-md focus:ring-[#2878B5]',
    secondary:
      'bg-[#202B38] hover:bg-[#34495E] text-[#FFFFFF] shadow-sm focus:ring-[#34495E]',
    success:
      'bg-[#2878B5] hover:bg-[#34495E] text-[#FFFFFF] shadow-sm shadow-[#2878B5]/20 hover:shadow-md focus:ring-[#2878B5]',
    outline:
      'bg-[#FFFFFF] hover:bg-[#E8EDF2] text-[#202B38] border border-[#34495E]/25 hover:border-[#2878B5] shadow-sm focus:ring-[#2878B5]',
    subtle:
      'bg-[#E8EDF2] hover:bg-[#34495E] text-[#202B38] hover:text-[#FFFFFF] border border-[#34495E]/15 focus:ring-[#2878B5]',
    ghost:
      'bg-transparent hover:bg-[#E8EDF2] text-[#34495E] hover:text-[#202B38] focus:ring-[#34495E]',
    danger:
      'bg-[#202B38] hover:bg-[#34495E] text-[#FFFFFF] shadow-sm focus:ring-[#2878B5]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-sm sm:text-base gap-2',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      } ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
}
