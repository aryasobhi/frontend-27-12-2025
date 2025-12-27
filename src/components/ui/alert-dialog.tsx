import React from 'react';

export const AlertDialog: React.FC<{ open?: boolean; onOpenChange?: (open: boolean) => void } & React.HTMLAttributes<HTMLDivElement>> = ({ children }) => (
  <div>{children}</div>
);

export const AlertDialogContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className }) => (
  <div className={className}>{children}</div>
);
export const AlertDialogHeader: React.FC<{ children?: React.ReactNode }> = ({ children }) => <div className="mb-2">{children}</div>;
export const AlertDialogTitle: React.FC<{ children?: React.ReactNode }> = ({ children }) => <h3 className="font-medium">{children}</h3>;
export const AlertDialogDescription: React.FC<{ children?: React.ReactNode }> = ({ children }) => <p className="text-sm text-gray-500">{children}</p>;
export const AlertDialogFooter: React.FC<{ children?: React.ReactNode }> = ({ children }) => <div className="mt-4 flex justify-end gap-2">{children}</div>;
export const AlertDialogAction: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode }> = ({ children, ...rest }) => (
  <button {...rest} className="px-3 py-2 bg-red-600 text-white rounded-md">{children}</button>
);
export const AlertDialogCancel: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode }> = ({ children, ...rest }) => (
  <button {...rest} className="px-3 py-2 border border-gray-200 rounded-md">{children}</button>
);

export default AlertDialog;
