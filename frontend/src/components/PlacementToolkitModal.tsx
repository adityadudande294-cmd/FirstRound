import React, { useEffect, useMemo, useState } from 'react';
import {
  Calculator,
  Check,
  ChevronRight,
  Clock,
  Copy,
  FileText,
  HelpCircle,
  RotateCcw,
  Search,
  Sparkles,
  Trash2,
  X,
  Zap,
} from 'lucide-react';
import { FormulaItem, PLACEMENT_FORMULA_CATALOG } from '../data/placementFormulas';
import { TestCategory, safeLower } from '../types';

interface PlacementToolkitModalProps {
  onClose: () => void;
  userId?: string;
  activeTestCategory?: TestCategory | string;
  activeTestTitle?: string;
}

type ToolkitTab = 'notes' | 'formulas' | 'solver';
type SolverCategory = 'speed' | 'percentage' | 'profit' | 'work' | 'interest' | 'average' | 'ratio';

export const PlacementToolkitModal: React.FC<PlacementToolkitModalProps> = ({
  onClose,
  userId,
  activeTestCategory,
  activeTestTitle,
}) => {
  const [activeTab, setActiveTab] = useState<ToolkitTab>('notes');

  // Notes state (synced to localStorage per user)
  const notesStorageKey = `firstround_notes_${userId || 'guest'}`;
  const [notes, setNotes] = useState<string>(() => {
    try {
      return localStorage.getItem(notesStorageKey) || '';
    } catch {
      return '';
    }
  });
  const [isSaved, setIsSaved] = useState(false);

  // Formula Search & Filter state
  const [formulaSearchQuery, setFormulaSearchQuery] = useState('');
  const [selectedFormulaCategory, setSelectedFormulaCategory] = useState<string>('All');
  const [copiedFormulaId, setCopiedFormulaId] = useState<string | null>(null);

  // Quick numerical solver state
  const [solverType, setSolverType] = useState<SolverCategory>('speed');
  const [solverInputs, setSolverInputs] = useState<Record<string, string>>({});
  const [solverResult, setSolverResult] = useState<{ value: string; step: string } | null>(null);

  // Recent Formulas viewed / applied
  const recentFormulasKey = `firstround_recent_formulas_${userId || 'guest'}`;
  const [recentFormulaIds, setRecentFormulaIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(recentFormulasKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const handleSelectFormula = (formula: FormulaItem) => {
    // Add to recent
    setRecentFormulaIds((prev) => {
      const updated = [formula.id, ...prev.filter((id) => id !== formula.id)].slice(0, 5);
      try {
        localStorage.setItem(recentFormulasKey, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // Filter formulas
  const filteredFormulas = useMemo(() => {
    const query = safeLower(formulaSearchQuery.trim());
    return PLACEMENT_FORMULA_CATALOG.filter((item) => {
      const matchesCat =
        selectedFormulaCategory === 'All' || item.category === selectedFormulaCategory;
      if (!matchesCat) return false;

      if (!query) return true;
      return (
        safeLower(item.name).includes(query) ||
        safeLower(item.topic).includes(query) ||
        safeLower(item.equation).includes(query) ||
        safeLower(item.explanation || '').includes(query) ||
        (item.keywords || []).some((kw) => safeLower(kw).includes(query))
      );
    });
  }, [formulaSearchQuery, selectedFormulaCategory]);

  // Context-aware recommended formulas
  const recommendedFormulas = useMemo(() => {
    if (!activeTestCategory) return [];
    const catLower = safeLower(activeTestCategory);
    if (catLower.includes('quant')) {
      return PLACEMENT_FORMULA_CATALOG.filter((f) => f.category === 'Quantitative').slice(0, 4);
    }
    if (catLower.includes('logic') || catLower.includes('reason')) {
      return PLACEMENT_FORMULA_CATALOG.filter((f) => f.category === 'Logical').slice(0, 4);
    }
    if (catLower.includes('tech') || catLower.includes('code')) {
      return PLACEMENT_FORMULA_CATALOG.filter((f) => f.category === 'Technical').slice(0, 4);
    }
    return [];
  }, [activeTestCategory]);

  // Recent formula objects
  const recentFormulaItems = useMemo(() => {
    return recentFormulaIds
      .map((id) => PLACEMENT_FORMULA_CATALOG.find((f) => f.id === id))
      .filter((f): f is FormulaItem => Boolean(f));
  }, [recentFormulaIds]);

  // ----------------------------------------------------
  // QUICK SOLVER CALCULATORS STATE
  // ----------------------------------------------------
  const [solverCategory, setSolverCategory] = useState<SolverCategory>('speed');

  // 1. Speed / Distance / Time Solver
  const [sdtSpeed, setSdtSpeed] = useState('');
  const [sdtSpeedUnit, setSdtSpeedUnit] = useState<'kmh' | 'mps'>('kmh');
  const [sdtDistance, setSdtDistance] = useState('');
  const [sdtDistanceUnit, setSdtDistanceUnit] = useState<'m' | 'km'>('m');
  const [sdtTime, setSdtTime] = useState('');
  const [sdtTimeUnit, setSdtTimeUnit] = useState<'sec' | 'min' | 'hr'>('sec');
  const [sdtResult, setSdtResult] = useState<{ text: string; formula: string } | null>(null);
  const [sdtError, setSdtError] = useState<string | null>(null);

  const calculateSDT = () => {
    setSdtError(null);
    setSdtResult(null);

    const sVal = sdtSpeed.trim() ? parseFloat(sdtSpeed) : null;
    const dVal = sdtDistance.trim() ? parseFloat(sdtDistance) : null;
    const tVal = sdtTime.trim() ? parseFloat(sdtTime) : null;

    const providedCount = [sVal, dVal, tVal].filter((v) => v !== null && !isNaN(v)).length;
    if (providedCount < 2) {
      setSdtError('Enter any two values to calculate the missing third value.');
      return;
    }
    if (providedCount === 3) {
      setSdtError('Please clear one field to calculate its value.');
      return;
    }

    // Convert everything to standard SI units (m/s, meters, seconds)
    let speedMps = sVal !== null ? (sdtSpeedUnit === 'kmh' ? (sVal * 5) / 18 : sVal) : null;
    let distMeters = dVal !== null ? (sdtDistanceUnit === 'km' ? dVal * 1000 : dVal) : null;
    let timeSecs =
      tVal !== null ? (sdtTimeUnit === 'hr' ? tVal * 3600 : sdtTimeUnit === 'min' ? tVal * 60 : tVal) : null;

    if ((speedMps !== null && speedMps <= 0) || (distMeters !== null && distMeters < 0) || (timeSecs !== null && timeSecs <= 0)) {
      setSdtError('Values must be positive numbers.');
      return;
    }

    if (distMeters === null && speedMps !== null && timeSecs !== null) {
      const calculatedMeters = speedMps * timeSecs;
      const km = calculatedMeters / 1000;
      setSdtResult({
        text: `Distance = ${calculatedMeters.toFixed(2)} meters (${km.toFixed(3)} km)`,
        formula: 'Distance = Speed × Time  [Converted to standard units]',
      });
    } else if (speedMps === null && distMeters !== null && timeSecs !== null) {
      if (timeSecs === 0) {
        setSdtError('Time cannot be zero.');
        return;
      }
      const calcMps = distMeters / timeSecs;
      const calcKmh = (calcMps * 18) / 5;
      setSdtResult({
        text: `Speed = ${calcKmh.toFixed(2)} km/h (${calcMps.toFixed(2)} m/s)`,
        formula: 'Speed = Distance / Time  [Converted to standard units]',
      });
    } else if (timeSecs === null && distMeters !== null && speedMps !== null) {
      if (speedMps === 0) {
        setSdtError('Speed cannot be zero.');
        return;
      }
      const calcSecs = distMeters / speedMps;
      const mins = calcSecs / 60;
      setSdtResult({
        text: `Time = ${calcSecs.toFixed(2)} seconds (${mins.toFixed(2)} mins)`,
        formula: 'Time = Distance / Speed  [Converted to standard units]',
      });
    }
  };

  // 2. Percentage Solver
  const [percMode, setPercMode] = useState<'of' | 'is_what_perc' | 'change'>('of');
  const [percX, setPercX] = useState('');
  const [percY, setPercY] = useState('');
  const [percResult, setPercResult] = useState<string | null>(null);
  const [percError, setPercError] = useState<string | null>(null);

  const calculatePercentage = () => {
    setPercError(null);
    setPercResult(null);
    const x = parseFloat(percX);
    const y = parseFloat(percY);
    if (isNaN(x) || isNaN(y)) {
      setPercError('Please enter valid numerical values.');
      return;
    }

    if (percMode === 'of') {
      const res = (x / 100) * y;
      setPercResult(`${x}% of ${y} = ${res.toFixed(2)}`);
    } else if (percMode === 'is_what_perc') {
      if (y === 0) {
        setPercError('Denominator cannot be zero.');
        return;
      }
      const res = (x / y) * 100;
      setPercResult(`${x} is ${res.toFixed(2)}% of ${y}`);
    } else if (percMode === 'change') {
      if (x === 0) {
        setPercError('Initial base value cannot be zero for percentage change.');
        return;
      }
      const diff = y - x;
      const pct = (diff / x) * 100;
      setPercResult(
        `${pct >= 0 ? 'Increase' : 'Decrease'} of ${Math.abs(pct).toFixed(2)}% (Difference = ${diff > 0 ? '+' : ''}${diff})`
      );
    }
  };

  // 3. Profit & Loss Solver
  const [plCP, setPlCP] = useState('');
  const [plSP, setPlSP] = useState('');
  const [plResult, setPlResult] = useState<string | null>(null);
  const [plError, setPlError] = useState<string | null>(null);

  const calculateProfitLoss = () => {
    setPlError(null);
    setPlResult(null);
    const cp = parseFloat(plCP);
    const sp = parseFloat(plSP);
    if (isNaN(cp) || isNaN(sp) || cp <= 0 || sp < 0) {
      setPlError('Enter valid positive Cost Price and Selling Price.');
      return;
    }

    const diff = sp - cp;
    if (diff > 0) {
      const pPct = (diff / cp) * 100;
      setPlResult(`Profit = ₹${diff.toFixed(2)} | Profit Percentage = ${pPct.toFixed(2)}%`);
    } else if (diff < 0) {
      const lossAmt = Math.abs(diff);
      const lPct = (lossAmt / cp) * 100;
      setPlResult(`Loss = ₹${lossAmt.toFixed(2)} | Loss Percentage = ${lPct.toFixed(2)}%`);
    } else {
      setPlResult('No Profit, No Loss (Break-even).');
    }
  };

  // 4. Time & Work Solver
  const [twPersonA, setTwPersonA] = useState('');
  const [twPersonB, setTwPersonB] = useState('');
  const [twResult, setTwResult] = useState<string | null>(null);
  const [twError, setTwError] = useState<string | null>(null);

  const calculateTimeAndWork = () => {
    setTwError(null);
    setTwResult(null);
    const a = parseFloat(twPersonA);
    const b = parseFloat(twPersonB);
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
      setTwError('Please enter positive days for both individuals.');
      return;
    }
    const combined = (a * b) / (a + b);
    setTwResult(`Together (A + B) will finish work in: ${combined.toFixed(2)} days (Formula: AB / (A+B))`);
  };

  // 5. Simple & Compound Interest Solver
  const [intP, setIntP] = useState('');
  const [intR, setIntR] = useState('');
  const [intT, setIntT] = useState('');
  const [intResult, setIntResult] = useState<{ si: string; ci: string; diff: string } | null>(null);
  const [intError, setIntError] = useState<string | null>(null);

  const calculateInterest = () => {
    setIntError(null);
    setIntResult(null);
    const p = parseFloat(intP);
    const r = parseFloat(intR);
    const t = parseFloat(intT);
    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r <= 0 || t <= 0) {
      setIntError('Please enter valid positive values for Principal, Rate, and Time.');
      return;
    }

    const si = (p * r * t) / 100;
    const ciAmount = p * Math.pow(1 + r / 100, t);
    const ci = ciAmount - p;
    const diff = ci - si;

    setIntResult({
      si: `Simple Interest = ₹${si.toFixed(2)} (Total Amount: ₹${(p + si).toFixed(2)})`,
      ci: `Compound Interest = ₹${ci.toFixed(2)} (Total Amount: ₹${ciAmount.toFixed(2)})`,
      diff: `CI - SI Difference = ₹${diff.toFixed(2)}`,
    });
  };

  // Keyboard close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      id="placement-toolkit-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="placement-toolkit-modal"
        className="bg-surface border border-border w-full max-w-3xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-text-primary"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-primary text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Zap className="w-4 h-4 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold tracking-tight">Placement Toolkit</h3>
                <span className="px-2 py-0.5 bg-sky-900/80 border border-sky-700/60 text-amber-300 text-[10px] font-bold rounded-full">
                  Rough Work & Formulas
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Calculate faster, revise formulas, and keep your rough work in one place.
              </p>
            </div>
          </div>

          <button
            id="toolkit-close-btn"
            onClick={onClose}
            aria-label="Close Toolkit"
            className="p-1.5 text-slate-300 hover:text-white hover:bg-surface/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 py-2.5 bg-app-bg border-b border-border flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl">
            <button
              id="toolkit-tab-notes"
              onClick={() => setActiveTab('notes')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'notes'
                  ? 'bg-surface text-text-primary shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              <span>Quick Notes</span>
            </button>

            <button
              id="toolkit-tab-formulas"
              onClick={() => setActiveTab('formulas')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'formulas'
                  ? 'bg-surface text-text-primary shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Formula Library</span>
            </button>

            <button
              id="toolkit-tab-solver"
              onClick={() => setActiveTab('solver')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'solver'
                  ? 'bg-surface text-text-primary shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              <span>Quick Solver</span>
            </button>
          </div>

          {activeTestTitle && (
            <span className="hidden sm:inline-block text-[11px] font-semibold text-text-muted truncate max-w-xs">
              Context: {activeTestTitle}
            </span>
          )}
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* ======================================================== */}
          {/* TAB 1: QUICK NOTES (Scratchpad Text Work)                 */}
          {/* ======================================================== */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-text-primary">Placement Rough Sheet</h4>
                  <p className="text-xs text-text-muted">
                    Auto-saved rough work scratchpad for calculations, test equations, and speed notes.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyNotes}
                    disabled={!notes.trim()}
                    className="px-3 py-1.5 bg-surface-hover hover:bg-slate-200 text-slate-700 disabled:opacity-40 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    {copiedNotes ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Notes</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleClearNotes}
                    disabled={!notes.trim()}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 disabled:opacity-40 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>

              <div className="relative">
                <textarea
                  id="toolkit-quick-notes-textarea"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Type your placement rough notes, equations, or calculations here...&#10;Example:&#10;Speed = 54 km/h = 15 m/s&#10;Time = 20 s&#10;Distance = 15 * 20 = 300 m"
                  className="w-full h-72 sm:h-80 p-4 font-mono text-xs sm:text-sm bg-app-bg border border-slate-300 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:bg-surface resize-none leading-relaxed text-slate-800"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                <span>Notes are saved locally on this browser.</span>
                <span>{notes.length} characters</span>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: FORMULA LIBRARY                                    */}
          {/* ======================================================== */}
          {activeTab === 'formulas' && (
            <div className="space-y-4">
              {/* Context-aware recommendation banner if active */}
              {recommendedFormulas.length > 0 && (
                <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                    <span>Recommended for this assessment ({activeTestCategory})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {recommendedFormulas.map((f) => (
                      <div
                        key={f.id}
                        className="p-2.5 bg-surface border border-amber-200/80 rounded-xl flex items-center justify-between gap-2 shadow-2xs"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-text-primary truncate">{f.name}</p>
                          <p className="text-[11px] font-mono text-text-secondary truncate">{f.equation}</p>
                        </div>
                        <button
                          onClick={() => handleCopyFormula(f)}
                          aria-label={`Copy formula ${f.name}`}
                          className="px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-950 text-[10px] font-bold rounded-lg shrink-0 flex items-center gap-1"
                        >
                          {copiedFormulaId === f.id ? (
                            <Check className="w-3 h-3 text-emerald-700" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>{copiedFormulaId === f.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Formula Search & Category Filter */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="toolkit-formula-search-input"
                    type="text"
                    value={formulaSearchQuery}
                    onChange={(e) => setFormulaSearchQuery(e.target.value)}
                    placeholder="Search formula (e.g. speed, train, work, profit, bitwise, cryptarithm)..."
                    className="w-full pl-9 pr-4 py-2 bg-app-bg border border-border rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:bg-surface text-text-primary"
                  />
                  {formulaSearchQuery && (
                    <button
                      onClick={() => setFormulaSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1 p-1 bg-surface-hover rounded-xl shrink-0 overflow-x-auto">
                  {['All', 'Quantitative', 'Logical', 'Technical'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedFormulaCategory(cat)}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                        selectedFormulaCategory === cat
                          ? 'bg-surface text-text-primary shadow-2xs font-bold'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recently Used Section (strictly real user interactions) */}
              {recentFormulaItems.length > 0 && !formulaSearchQuery && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Recently Used Formulas
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {recentFormulaItems.map((rf) => (
                      <button
                        key={rf.id}
                        onClick={() => handleCopyFormula(rf)}
                        className="px-2.5 py-1 bg-surface-hover hover:bg-amber-100/80 border border-border hover:border-amber-300 rounded-lg text-xs font-medium text-slate-800 transition-colors flex items-center gap-1.5"
                      >
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{rf.name}</span>
                        {copiedFormulaId === rf.id && (
                          <span className="text-[10px] text-emerald-600 font-bold">✓ Copied</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Formulas Cards Grid */}
              <div className="space-y-2.5">
                {filteredFormulas.length === 0 ? (
                  <div className="p-8 text-center bg-app-bg rounded-2xl border border-border">
                    <p className="text-xs font-bold text-slate-700">No matching formulas found.</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Try searching another topic like "work", "train", "si", "percentage", or "oop".
                    </p>
                  </div>
                ) : (
                  filteredFormulas.map((formula) => (
                    <div
                      key={formula.id}
                      className="p-3.5 bg-surface border border-border rounded-2xl hover:border-slate-300 transition-all shadow-2xs space-y-2 group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-text-primary">{formula.name}</span>
                            <span className="px-2 py-0.5 bg-surface-hover text-text-secondary text-[10px] font-semibold rounded">
                              {formula.topic}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleCopyFormula(formula)}
                          aria-label={`Copy formula ${formula.name}`}
                          className="px-3 py-1.5 bg-surface-hover hover:bg-amber-400 text-slate-800 hover:text-slate-950 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                        >
                          {copiedFormulaId === formula.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-700" />
                              <span className="text-emerald-800">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="p-2.5 bg-app-bg border border-slate-100 rounded-xl font-mono text-xs text-sky-900 font-semibold select-all">
                        {formula.equation}
                      </div>

                      {formula.explanation && (
                        <p className="text-[11px] text-text-muted leading-relaxed">
                          {formula.explanation}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: QUICK SOLVER (Placement Calculators)               */}
          {/* ======================================================== */}
          {activeTab === 'solver' && (
            <div className="space-y-4">
              {/* Category selector */}
              <div className="flex items-center gap-1.5 p-1 bg-surface-hover rounded-xl overflow-x-auto shrink-0">
                {[
                  { id: 'speed', label: 'Speed & Distance' },
                  { id: 'percentage', label: 'Percentages' },
                  { id: 'profit', label: 'Profit & Loss' },
                  { id: 'work', label: 'Time & Work' },
                  { id: 'interest', label: 'SI & CI Interest' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSolverCategory(s.id as SolverCategory)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                      solverCategory === s.id
                        ? 'bg-surface text-text-primary font-bold shadow-2xs'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* 1. SPEED / DISTANCE / TIME */}
              {solverCategory === 'speed' && (
                <div className="p-4 bg-app-bg border border-border rounded-2xl space-y-4">
                  <div className="border-b border-border pb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Speed / Distance / Time Solver
                    </h4>
                    <p className="text-[11px] text-text-muted">
                      Enter any TWO values to calculate the missing third value with automatic unit conversion.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Speed Input */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Speed</label>
                      <div className="flex gap-1">
                        <input
                          type="number"
                          value={sdtSpeed}
                          onChange={(e) => setSdtSpeed(e.target.value)}
                          placeholder="e.g. 54"
                          className="w-full px-3 py-2 bg-surface border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                        />
                        <select
                          value={sdtSpeedUnit}
                          onChange={(e) => setSdtSpeedUnit(e.target.value as any)}
                          className="px-2 py-2 bg-surface border border-slate-300 rounded-xl text-xs font-semibold text-slate-700"
                        >
                          <option value="kmh">km/h</option>
                          <option value="mps">m/s</option>
                        </select>
                      </div>
                    </div>

                    {/* Distance Input */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Distance</label>
                      <div className="flex gap-1">
                        <input
                          type="number"
                          value={sdtDistance}
                          onChange={(e) => setSdtDistance(e.target.value)}
                          placeholder="e.g. 300"
                          className="w-full px-3 py-2 bg-surface border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                        />
                        <select
                          value={sdtDistanceUnit}
                          onChange={(e) => setSdtDistanceUnit(e.target.value as any)}
                          className="px-2 py-2 bg-surface border border-slate-300 rounded-xl text-xs font-semibold text-slate-700"
                        >
                          <option value="m">m</option>
                          <option value="km">km</option>
                        </select>
                      </div>
                    </div>

                    {/* Time Input */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Time</label>
                      <div className="flex gap-1">
                        <input
                          type="number"
                          value={sdtTime}
                          onChange={(e) => setSdtTime(e.target.value)}
                          placeholder="e.g. 20"
                          className="w-full px-3 py-2 bg-surface border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                        />
                        <select
                          value={sdtTimeUnit}
                          onChange={(e) => setSdtTimeUnit(e.target.value as any)}
                          className="px-2 py-2 bg-surface border border-slate-300 rounded-xl text-xs font-semibold text-slate-700"
                        >
                          <option value="sec">sec</option>
                          <option value="min">min</option>
                          <option value="hr">hr</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {sdtError && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                      {sdtError}
                    </div>
                  )}

                  {sdtResult && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-xl space-y-1">
                      <p className="text-xs font-extrabold">{sdtResult.text}</p>
                      <p className="text-[10px] font-mono text-emerald-800">{sdtResult.formula}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={calculateSDT}
                      className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl shadow-2xs transition-all"
                    >
                      Calculate Missing Value
                    </button>
                    <button
                      onClick={() => {
                        setSdtSpeed('');
                        setSdtDistance('');
                        setSdtTime('');
                        setSdtResult(null);
                        setSdtError(null);
                      }}
                      className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}

              {/* 2. PERCENTAGES */}
              {solverCategory === 'percentage' && (
                <div className="p-4 bg-app-bg border border-border rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 border-b border-border pb-2">
                    <button
                      onClick={() => setPercMode('of')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${
                        percMode === 'of' ? 'bg-primary text-white font-bold' : 'text-text-secondary'
                      }`}
                    >
                      X% of Y
                    </button>
                    <button
                      onClick={() => setPercMode('is_what_perc')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${
                        percMode === 'is_what_perc' ? 'bg-primary text-white font-bold' : 'text-text-secondary'
                      }`}
                    >
                      X is what % of Y
                    </button>
                    <button
                      onClick={() => setPercMode('change')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${
                        percMode === 'change' ? 'bg-primary text-white font-bold' : 'text-text-secondary'
                      }`}
                    >
                      % Change from X to Y
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">
                        {percMode === 'of' ? 'Percentage (X %)' : 'Value X'}
                      </label>
                      <input
                        type="number"
                        value={percX}
                        onChange={(e) => setPercX(e.target.value)}
                        placeholder="e.g. 15"
                        className="w-full px-3 py-2 bg-surface border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">
                        {percMode === 'of' ? 'Base Number (Y)' : 'Base Number Y'}
                      </label>
                      <input
                        type="number"
                        value={percY}
                        onChange={(e) => setPercY(e.target.value)}
                        placeholder="e.g. 250"
                        className="w-full px-3 py-2 bg-surface border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {percError && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                      {percError}
                    </div>
                  )}

                  {percResult && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-xl font-bold text-xs">
                      {percResult}
                    </div>
                  )}

                  <button
                    onClick={calculatePercentage}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl shadow-2xs transition-all"
                  >
                    Calculate
                  </button>
                </div>
              )}

              {/* 3. PROFIT & LOSS */}
              {solverCategory === 'profit' && (
                <div className="p-4 bg-app-bg border border-border rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-border pb-2">
                    Profit & Loss Calculator
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Cost Price (CP ₹)</label>
                      <input
                        type="number"
                        value={plCP}
                        onChange={(e) => setPlCP(e.target.value)}
                        placeholder="e.g. 450"
                        className="w-full px-3 py-2 bg-surface border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Selling Price (SP ₹)</label>
                      <input
                        type="number"
                        value={plSP}
                        onChange={(e) => setPlSP(e.target.value)}
                        placeholder="e.g. 540"
                        className="w-full px-3 py-2 bg-surface border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {plError && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                      {plError}
                    </div>
                  )}

                  {plResult && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-xl font-bold text-xs">
                      {plResult}
                    </div>
                  )}

                  <button
                    onClick={calculateProfitLoss}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl shadow-2xs transition-all"
                  >
                    Calculate Profit / Loss
                  </button>
                </div>
              )}

              {/* 4. TIME & WORK */}
              {solverCategory === 'work' && (
                <div className="p-4 bg-app-bg border border-border rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-border pb-2">
                    Combined Time & Work (A + B)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Person A Time (Days)</label>
                      <input
                        type="number"
                        value={twPersonA}
                        onChange={(e) => setTwPersonA(e.target.value)}
                        placeholder="e.g. 10"
                        className="w-full px-3 py-2 bg-surface border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Person B Time (Days)</label>
                      <input
                        type="number"
                        value={twPersonB}
                        onChange={(e) => setTwPersonB(e.target.value)}
                        placeholder="e.g. 15"
                        className="w-full px-3 py-2 bg-surface border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {twError && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                      {twError}
                    </div>
                  )}

                  {twResult && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-xl font-bold text-xs">
                      {twResult}
                    </div>
                  )}

                  <button
                    onClick={calculateTimeAndWork}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl shadow-2xs transition-all"
                  >
                    Calculate Together Days
                  </button>
                </div>
              )}

              {/* 5. SIMPLE & COMPOUND INTEREST */}
              {solverCategory === 'interest' && (
                <div className="p-4 bg-app-bg border border-border rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-border pb-2">
                    Simple & Compound Interest
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Principal (₹)</label>
                      <input
                        type="number"
                        value={intP}
                        onChange={(e) => setIntP(e.target.value)}
                        placeholder="e.g. 10000"
                        className="w-full px-3 py-2 bg-surface border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Annual Rate (%)</label>
                      <input
                        type="number"
                        value={intR}
                        onChange={(e) => setIntR(e.target.value)}
                        placeholder="e.g. 8"
                        className="w-full px-3 py-2 bg-surface border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Time (Years)</label>
                      <input
                        type="number"
                        value={intT}
                        onChange={(e) => setIntT(e.target.value)}
                        placeholder="e.g. 2"
                        className="w-full px-3 py-2 bg-surface border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {intError && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                      {intError}
                    </div>
                  )}

                  {intResult && (
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-xl space-y-1.5 text-xs font-semibold">
                      <p className="text-emerald-900 font-bold">{intResult.si}</p>
                      <p className="text-emerald-900 font-bold">{intResult.ci}</p>
                      <p className="text-[11px] font-mono text-emerald-800">{intResult.diff}</p>
                    </div>
                  )}

                  <button
                    onClick={calculateInterest}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl shadow-2xs transition-all"
                  >
                    Calculate Interests & Difference
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-app-bg border-t border-border flex items-center justify-between text-xs text-text-muted shrink-0">
          <span>Press <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-[10px] font-mono font-bold text-slate-700">ESC</kbd> to close</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded-xl transition-colors"
          >
            Close Toolkit
          </button>
        </div>
      </div>
    </div>
  );
};
