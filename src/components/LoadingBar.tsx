import React, { useEffect, useState } from 'react';

export function LoadingBar() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handler = (ev: any) => {
      const c = ev?.detail?.count ?? 0;
      setCount(c);
    };
    window.addEventListener('api:loading', handler as EventListener);
    return () => window.removeEventListener('api:loading', handler as EventListener);
  }, []);

  return (
    <div className="fixed left-0 top-0 right-0 z-50">
      <div className={`h-1 transition-all duration-200 ${count > 0 ? 'w-full bg-gold' : 'w-0 bg-transparent'}`} />
    </div>
  );
}

export default LoadingBar;
