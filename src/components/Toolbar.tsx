import type { ReactNode } from 'react';

interface ToolbarProps {
  children?: ReactNode;
}

export function Toolbar({ children }: ToolbarProps) {
  return (
    <div className="toolbar">
      <div className="brand">
        <span className="brand-icon">🛒</span>
        <h1 className="brand-title">ShopCart</h1>
      </div>
      <div className="toolbar-actions">{children}</div>
    </div>
  );
}

