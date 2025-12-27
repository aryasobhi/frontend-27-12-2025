import { useState } from 'react';

export function useModuleController() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isEntryFormOpen, setIsEntryFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
  const openEntryForm = () => setIsEntryFormOpen(true);
  const closeEntryForm = () => setIsEntryFormOpen(false);

  return {
    isFilterOpen,
    isEntryFormOpen,
    searchQuery,
    setSearchQuery,
    toggleFilter,
    openEntryForm,
    closeEntryForm,
  };
}
