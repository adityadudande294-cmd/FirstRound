import React from 'react';
import { X } from 'lucide-react';

interface ActiveFilterChipsProps {
  selectedTopic: string;
  setSelectedTopic: (v: string) => void;
  selectedCompany: string;
  setSelectedCompany: (v: string) => void;
  selectedTech: string;
  setSelectedTech: (v: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (v: string) => void;
  selectedRole: string;
  setSelectedRole: (v: string) => void;
  selectedAvailability: string;
  setSelectedAvailability: (v: string) => void;
  onReset: () => void;
}

export const ActiveFilterChips: React.FC<ActiveFilterChipsProps> = ({
  selectedTopic, setSelectedTopic,
  selectedCompany, setSelectedCompany,
  selectedTech, setSelectedTech,
  selectedDifficulty, setSelectedDifficulty,
  selectedRole, setSelectedRole,
  selectedAvailability, setSelectedAvailability,
  onReset
}) => {
  const activeFilters = [
    { key: 'topic', val: selectedTopic, setter: setSelectedTopic },
    { key: 'company', val: selectedCompany, setter: setSelectedCompany },
    { key: 'tech', val: selectedTech, setter: setSelectedTech },
    { key: 'diff', val: selectedDifficulty, setter: setSelectedDifficulty },
    { key: 'role', val: selectedRole, setter: setSelectedRole },
    { key: 'avail', val: selectedAvailability, setter: setSelectedAvailability },
  ].filter(f => f.val !== 'All');

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <span className="text-xs font-semibold text-slate-500 mr-1">Active:</span>
      
      {activeFilters.map(filter => (
        <span 
          key={filter.key}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200"
        >
          {filter.val === 'coming_soon' ? 'Coming Soon' : filter.val === 'ready' ? 'Ready' : filter.val}
          <button 
            onClick={() => filter.setter('All')}
            className="hover:bg-blue-200 rounded-full p-0.5 transition-colors -mr-1"
            title="Remove filter"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      
      {activeFilters.length > 1 && (
        <button 
          onClick={onReset}
          className="text-[11px] font-bold text-slate-500 hover:text-slate-800 underline decoration-slate-300 underline-offset-2 ml-1"
        >
          Clear all
        </button>
      )}
    </div>
  );
};
