import React from 'react';
import { FilterPopover } from './FilterPopover';

interface FilterToolbarProps {
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
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  selectedCategory,
  dynamicTopics,
  dynamicCompanies,
  dynamicTechnologies,
  dynamicRoles,
  selectedTopic, setSelectedTopic,
  selectedCompany, setSelectedCompany,
  selectedTech, setSelectedTech,
  selectedDifficulty, setSelectedDifficulty,
  selectedRole, setSelectedRole,
  selectedAvailability, setSelectedAvailability,
}) => {
  return (
    <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-wrap pt-1">
      <FilterPopover 
        label="Difficulty" 
        options={['Easy', 'Medium', 'Hard']} 
        selectedOption={selectedDifficulty} 
        onSelect={setSelectedDifficulty} 
      />
      
      <FilterPopover 
        label="Role" 
        options={dynamicRoles} 
        selectedOption={selectedRole} 
        onSelect={setSelectedRole}
        searchable
      />

      {/* Conditionally show relevant filters based on category */}
      {selectedCategory === 'foundation' && dynamicTopics.length > 0 && (
        <FilterPopover 
          label="Topics & Skills" 
          options={dynamicTopics} 
          selectedOption={selectedTopic} 
          onSelect={setSelectedTopic}
          searchable
        />
      )}

      {selectedCategory === 'company' && dynamicCompanies.length > 0 && (
        <FilterPopover 
          label="Company" 
          options={dynamicCompanies} 
          selectedOption={selectedCompany} 
          onSelect={setSelectedCompany}
          searchable
        />
      )}

      {selectedCategory === 'coding' && dynamicTechnologies.length > 0 && (
        <FilterPopover 
          label="Tech / Skill" 
          options={dynamicTechnologies} 
          selectedOption={selectedTech} 
          onSelect={setSelectedTech}
          searchable
        />
      )}

      {/* Only show availability on very wide screens or if needed, else it collapses. We'll show it for now */}
      <FilterPopover 
        label="Availability" 
        options={['ready', 'coming_soon']} 
        selectedOption={selectedAvailability} 
        onSelect={setSelectedAvailability} 
      />
    </div>
  );
};
