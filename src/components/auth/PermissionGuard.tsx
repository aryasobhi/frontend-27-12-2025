import React from 'react';
import { useAuth } from '../../context/AuthContext';

type Mode = 'hide' | 'disable';

interface Props {
  requiredRole: string;
  mode?: Mode;
  actionName?: string;
  children: React.ReactElement | null;
}

export default function PermissionGuard({ requiredRole, mode = 'hide', actionName = 'action', children }: Props) {
  let auth: any = null;
  try { auth = useAuth(); } catch (e) { auth = { role: null }; }
  const role = auth?.role || 'OPERATOR';

  const allowed = role === requiredRole || role === 'ADMIN';

  if (!allowed && mode === 'hide') return null;

  if (!children) return null;

  const child = React.Children.only(children) as React.ReactElement;

  if (!allowed && mode === 'disable') {
    const props: any = { ...child.props };
    props.disabled = true;
    props.className = ((props.className || '') + ' opacity-50 pointer-events-none').trim();
    const onAttempt = (ev: any) => {
      try { console.warn(`[PermissionGuard] blocked attempt`, { action: actionName, role, ts: new Date().toISOString() }); } catch (e) {}
      ev?.stopPropagation?.();
    };
    props.onClick = onAttempt;
    return React.cloneElement(child, props);
  }

  return child;
}
