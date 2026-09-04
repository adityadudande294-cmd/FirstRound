import React from 'react';
import { X, Check } from 'lucide-react';
import { PrimaryTestCategory } from '../../../types';

interface FilterSectionProps {
  title: string;
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, options, selectedOption, onSelect }) => {
  return (
    <div className="py-4 border-b border-slate-100 last:border-0">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">{title}</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelect('All')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            selectedOption === 'All'
              ? 'bg-primary text-white'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          All
        </button>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              selectedOption === option
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {selectedOption === option && <Check className="w-3 h-3" />}
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  
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

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  dynamicTopics,
  dynamicCompanies,
  dynamicTechnologies,
  dynamicRoles,
  selectedTopic,
  setSelectedTopic,
  selectedCompany,
  setSelectedCompany,
  selectedTech,
  setSelectedTech,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedRole,
  setSelectedRole,
  selectedAvailability,
  setSelectedAvailability,
  onReset,
  resultCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 custom-scrollbar pb-20">
          <FilterSection
            title="Difficulty"
            options={['Easy', 'Medium', 'Hard']}
            selectedOption={selectedDifficulty}
            onSelect={setSelectedDifficulty}
          />
          
          <FilterSection
            title="Role"
            options={dynamicRoles}
            selectedOption={selectedRole}
            onSelect={setSelectedRole}
          />

          {selectedCategory === 'foundation' && dynamicTopics.length > 0 && (
            <FilterSection
              title="Topics & Skills"
              options={dynamicTopics}
              selectedOption={selectedTopic}
              onSelect={setSelectedTopic}
            />
          )}

          {selectedCategory === 'company' && dynamicCompanies.length > 0 && (
            <FilterSection
              title="Company"
              options={dynamicCompanies}
              selectedOption={selectedCompany}
              onSelect={setSelectedCompany}
            />
          )}

          {selectedCategory === 'coding' && dynamicTechnologies.length > 0 && (
            <FilterSection
              title="Technology / Skill"
              options={dynamicTechnologies}
              selectedOption={selectedTech}
              onSelect={setSelectedTech}
            />
          )}

          <FilterSection
            title="Availability"
            options={['ready', 'coming_soon']}
            selectedOption={selectedAvailability}
            onSelect={setSelectedAvailability}
          />
        </div>

        {/* Sticky Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button
            onClick={onReset}
            className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Reset All
          </button>
          <button
            onClick={onClose}
            className="flex-[2] py-3 px-4 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-hover transition-colors shadow-xs"
          >
            Show {resultCount} {resultCount === 1 ? 'Test' : 'Tests'}
          </button>
        </div>
      </div>
    </div>
  );
};
