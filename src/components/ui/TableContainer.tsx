import React from 'react';
import { cn } from './utils';

interface TableContainerProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const TableContainer: React.FC<TableContainerProps> = ({ children, className, title }) => {
  return (
    <div className={cn('bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-glow-black', className)} dir="rtl">
      {title && (
        <div className="px-6 py-4 border-b border-white/5 bg-white/5">
          <h3 className="text-gold font-bold tracking-tight">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          {children}
        </table>
      </div>
    </div>
  );
};

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ children, className, ...rest }) => (
  <thead className={cn('bg-white/5 border-b border-white/10', className || '')} {...rest}>
    {children}
  </thead>
);

export const TableBody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <tbody className="divide-y divide-white/5">
    {children}
  </tbody>
);

export const TableRow: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <tr className={cn('hover:bg-white/5 transition-colors group', className)}>
    {children}
  </tr>
);

export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...rest }) => (
  <th className={cn('px-6 py-4 text-gold font-bold text-sm tracking-wider uppercase', className || '')} {...rest}>
    {children}
  </th>
);

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...rest }) => (
  <td className={cn('px-6 py-4 text-rosary/80 text-sm font-medium', className || '')} {...rest}>
    {children}
  </td>
);
