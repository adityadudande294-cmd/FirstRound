import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';

import { safeLower } from '../../../types';

interface FilterPopoverProps {
  label: string;
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  searchable?: boolean;
}

export const FilterPopover: React.FC<FilterPopoverProps> = ({
  label,
  options = [],
  selectedOption,
  onSelect,
  searchable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const safeOptions = Array.isArray(options) ? options : [];
  const filteredOptions = searchable
    ? safeOptions.filter((opt) => safeLower(opt).includes(safeLower(searchQuery)))
    : safeOptions;

  const isActive = selectedOption !== 'All';

  return (
    <div className="relative inline-block text-left" ref={popoverRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center justify-between w-full min-w-[140px] px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors ${
          isActive
            ? 'bg-blue-50 border-blue-200 text-blue-700'
            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
        }`}
      >
        <span className="truncate">
          {label}: {isActive ? selectedOption : 'All'}
        </span>
        <ChevronDown className="w-4 h-4 ml-2 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-56 mt-2 origin-top-left bg-white border border-slate-200 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {searchable && (
            <div className="p-2 border-b border-slate-100">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder={`Search ${safeLower(label)}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
              </div>
            </div>
          )}
          <div className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
            <button
              onClick={() => {
                onSelect('All');
                setIsOpen(false);
                setSearchQuery('');
              }}
              className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${
                selectedOption === 'All' ? 'font-bold text-blue-700' : 'text-slate-700'
              }`}
            >
              All
              {selectedOption === 'All' && <Check className="w-3.5 h-3.5" />}
            </button>
            {filteredOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                  setSearchQuery('');
                }}
                className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${
                  selectedOption === option ? 'font-bold text-blue-700' : 'text-slate-700'
                }`}
              >
                <span className="truncate pr-2">{option}</span>
                {selectedOption === option && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            ))}
            {filteredOptions.length === 0 && (
              <div className="px-4 py-3 text-xs text-slate-500 text-center">No options found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
