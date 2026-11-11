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
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]';

  const variants = {
    primary:
      'bg-gradient-to-r from-[#1A759F] to-[#184E77] hover:from-[#168AAD] hover:to-[#1E6091] text-white shadow-sm shadow-[#184E77]/25 hover:shadow-md hover:shadow-[#184E77]/30 focus:ring-[#34A0A4]',
    secondary:
      'bg-[#184E77] hover:bg-[#1E6091] text-[#D9ED92] shadow-sm focus:ring-[#168AAD]',
    success:
      'bg-gradient-to-r from-[#52B69A] to-[#34A0A4] hover:from-[#76C893] hover:to-[#52B69A] text-white shadow-sm shadow-[#52B69A]/30 hover:shadow-md focus:ring-[#52B69A]',
    outline:
      'bg-white hover:bg-[#D9ED92]/30 text-[#184E77] border border-[#99D98C] hover:border-[#52B69A] shadow-sm focus:ring-[#34A0A4]',
    subtle:
      'bg-[#D9ED92]/50 hover:bg-[#B5E48C]/70 text-[#184E77] border border-[#99D98C] focus:ring-[#52B69A]',
    ghost:
      'bg-transparent hover:bg-[#D9ED92]/35 text-[#1E6091] hover:text-[#184E77] focus:ring-[#76C893]',
    danger:
      'bg-[#184E77] hover:bg-[#1E6091] text-[#D9ED92] shadow-sm focus:ring-[#1A759F]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-5 py-3 text-sm sm:text-base gap-2',
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
