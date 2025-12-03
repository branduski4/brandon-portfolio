import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ViewTransitionLink({ to, children, className, onClick }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
    }

    // Check if browser supports View Transitions API
    if (!document.startViewTransition) {
      // Fallback for browsers that don't support View Transitions
      navigate(to);
      return;
    }

    // Use View Transitions API
    document.startViewTransition(() => {
      navigate(to);
    });
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
