import React from 'react';

export const EmptyState: React.FC<{ icon?: any; title?: string; description?: string } & React.HTMLAttributes<HTMLDivElement>> = ({ icon: Icon, title = 'No items', description = '', className }) => {
  return (
    <div className={`text-center py-16 ${className || ''}`}>
      {Icon && <Icon className="mx-auto w-12 h-12 text-gray-300" />}
      <h3 className="mt-4 text-lg font-medium">{title}</h3>
      {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
    </div>
  );
};

export default EmptyState;
