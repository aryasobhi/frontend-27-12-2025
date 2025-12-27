import { Badge } from '../components/ui/badge';
import { cn } from '../components/ui/utils';

interface StatusBadgeProps {
  status: string;
  className?: string; 
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, '-');
  
  const getStatusClasses = () => {
    // Success/Active/Completed
    if (['active', 'completed', 'approved', 'released', 'passed', 'operational', 'success', 'won', 'valid'].includes(normalizedStatus)) {
      return 'bg-gold/20 text-gold border-gold/30 shadow-glow-gold/20';
    }
    
    // Warning/Pending
    if (['pending', 'in-progress', 'under-review', 'processing', 'quarantine'].includes(normalizedStatus)) {
      return 'bg-rosary/20 text-rosary border-rosary/30';
    }
    
    // Error/Failed
    if (['failed', 'rejected', 'blocked', 'critical', 'overdue', 'error', 'cancelled', 'danger', 'expired', 'lost'].includes(normalizedStatus)) {
      return 'bg-blood/20 text-blood border-blood/50 shadow-glow-red/20';
    }
    
    // Info/Draft
    if (['draft', 'archived', 'inactive', 'idle', 'on-hold'].includes(normalizedStatus)) {
      return 'bg-white/10 text-rosary/60 border-white/20';
    }
    
    // Default
    return 'bg-gold/30 text-gold border-gold/50';
  };
  
  return (
    <Badge
      variant="outline"
      className={cn('capitalize backdrop-blur-md transition-all duration-300', getStatusClasses(), className)}
    >
      {status.replace(/-/g, ' ')}
    </Badge>
  );
}
