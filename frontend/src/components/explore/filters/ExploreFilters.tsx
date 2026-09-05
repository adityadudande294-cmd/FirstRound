import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { FilterToolbar } from './FilterToolbar';
import { MobileFilterDrawer } from './MobileFilterDrawer';
import { ActiveFilterChips } from './ActiveFilterChips';

interface ExploreFiltersProps {
  selectedCategory: string;
  dynamicTopics: string[];
  dynamicCompanies: string[];
  dynamicTechnologies: string[];
  dynamicRoles: string[];
  
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
  resultCount: number;
}

export const ExploreFilters: React.FC<ExploreFiltersProps> = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="w-full flex flex-col gap-3">
      {/* 
        On mobile/tablet: Show a prominent Filters button 
        On desktop: Show the FilterToolbar 
      */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="md:hidden flex items-center gap-2 min-h-[44px] px-4 rounded-xl text-sm font-bold bg-white border border-slate-200 text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>

        <FilterToolbar {...props} />
      </div>

      <ActiveFilterChips 
        selectedTopic={props.selectedTopic} setSelectedTopic={props.setSelectedTopic}
        selectedCompany={props.selectedCompany} setSelectedCompany={props.setSelectedCompany}
        selectedTech={props.selectedTech} setSelectedTech={props.setSelectedTech}
        selectedDifficulty={props.selectedDifficulty} setSelectedDifficulty={props.setSelectedDifficulty}
        selectedRole={props.selectedRole} setSelectedRole={props.setSelectedRole}
        selectedAvailability={props.selectedAvailability} setSelectedAvailability={props.setSelectedAvailability}
        onReset={props.onReset}
      />

      <MobileFilterDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        {...props} 
      />
    </div>
  );
};
