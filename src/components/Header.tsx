import type { ReactNode } from 'react';
import { Toolbar } from './Toolbar';
import { CartBadge } from './CartBadge';

interface HeaderProps {
  count?: number;
  children?: ReactNode;
}

export function Header({ count = 0, children }: HeaderProps) {
  return (
    <header className="header">
      <Toolbar>{children ?? <CartBadge count={count} />}</Toolbar>
    </header>
  );
}

