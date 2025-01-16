import React from 'react';
import { cn } from '../../utils/cn';

const Button = React.forwardRef(({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className, 
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
  };

  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3',
    lg: 'h-12 px-8',
    icon: 'h-10 w-10'
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };