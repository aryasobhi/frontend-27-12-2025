import React from 'react';
import { cn } from './utils';

export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({ className, children, ...rest }) => (
  <div className={cn('overflow-x-auto', className || '')}>
    <table className="w-full" {...rest}>
      {children}
    </table>
  </div>
);

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ children, className }) => <thead className={cn('bg-white/5', className || '')}>{children}</thead>;
export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ children, className }) => <tbody className={className}>{children}</tbody>;
export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ children, className, ...rest }) => (
  <tr className={cn('border-white/10 hover:bg-white/5 transition-colors', className || '')} {...rest}>{children}</tr>
);
export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...rest }) => (
  <th className={cn('text-left py-3 px-4 text-gold font-medium', className || '')} {...rest}>{children}</th>
);
export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...rest }) => (
  <td className={cn('py-4 px-4 text-rosary', className || '')} {...rest}>{children}</td>
);

export default Table;

