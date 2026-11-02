import type { ReactNode } from 'react';
import { Toolbar } from './Toolbar';
import { CartBadge } from './CartBadge';

interface HeaderProps {
  children?: ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="header">
      <Toolbar>{children ?? <CartBadge />}</Toolbar>
    </header>
  );
}
