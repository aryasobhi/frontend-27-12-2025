import React from 'react';

export const Separator: React.FC<React.HTMLAttributes<HTMLHRElement>> = ({ className }) => (
  <hr className={className} />
);

export default Separator;
