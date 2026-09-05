import React, { useState } from 'react';
import {
  Award,
  Crown,
  Flame,
  Medal,
  Sparkles,
  Target,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';
import { LeaderboardEntry } from '../types';

interface LeaderboardViewProps {
  leaderboard: LeaderboardEntry[];
  currentUserId?: string;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  leaderboard,
  currentUserId,
}) => {
  const [filterCompany, setFilterCompany] = useState('all');

  const filtered = leaderboard.filter((entry) => {
    if (filterCompany !== 'all' && !entry.targetCompany?.toLowerCase().includes(filterCompany.toLowerCase())) {
      return false;
    }
    return true;
  });

  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end p-7 sm:p-10 text-center space-y-3 text-white shadow-xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold shadow-sm">
          <Trophy className="w-4 h-4 text-slate-950" />
          <span>All-India Placement Aptitude Rankings</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
          Live National Leaderboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
          Ranked dynamically by total placement points <code>(Correct × 10 − Incorrect × 2)</code>, accuracy percentage, and test-taking speed.
        </p>
      </div>

      {/* Top 3 Podium Cards - White cards with subtle borders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end pt-2">
        {/* Rank 2 (Silver) */}
        {top2 && (
          <div className="bg-surface border border-border rounded-2xl p-6 text-center space-y-3.5 order-2 md:order-1 relative shadow-sm">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-surface-hover border border-border text-slate-700 flex items-center justify-center text-xl font-black shadow-inner">
              2
            </div>
            <div>
              <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-surface-hover text-slate-700 border border-border">
                🥈 Rank 2
              </span>
              <h3 className="text-base font-bold text-text-primary mt-2">{top2.userName}</h3>
              <p className="text-xs text-text-muted truncate">{top2.userCollege}</p>
            </div>
            <div className="p-3 bg-app-bg rounded-xl border border-slate-150 grid grid-cols-2 gap-2 text-center text-xs">
              <div>
                <p className="text-[10px] text-slate-400 font-semibold">Points</p>
                <p className="text-sm font-extrabold text-text-primary">{top2.totalPoints.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold">Accuracy</p>
                <p className="text-sm font-extrabold text-emerald-600">{top2.averageAccuracy}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Rank 1 (Gold - Elevated with Warm Yellow Highlight) */}
        {top1 && (
          <div className="bg-surface border-2 border-amber-400 rounded-3xl p-7 text-center space-y-4 order-1 md:order-2 relative shadow-md md:-translate-y-2">
            <div className="absolute top-3 right-3">
              <Crown className="w-6 h-6 text-amber-500 animate-bounce" />
            </div>
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-2xl font-black shadow-md">
              1
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                👑 All-India Champion
              </span>
              <h3 className="text-lg font-black text-text-primary mt-2.5 font-['Outfit']">{top1.userName}</h3>
              <p className="text-xs text-text-muted font-medium">{top1.userCollege}</p>
            </div>
            <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <p className="text-[10px] text-text-muted font-semibold">Points</p>
                <p className="text-base font-black text-slate-950">{top1.totalPoints.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted font-semibold">Accuracy</p>
                <p className="text-base font-black text-emerald-600">{top1.averageAccuracy}%</p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted font-semibold">Speed</p>
                <p className="text-base font-black text-sky-700">{top1.avgSpeedSeconds}s</p>
              </div>
            </div>
          </div>
        )}

        {/* Rank 3 (Bronze) */}
        {top3 && (
          <div className="bg-surface border border-border rounded-2xl p-6 text-center space-y-3.5 order-3 md:order-3 relative shadow-sm">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-center text-xl font-black shadow-inner">
              3
            </div>
            <div>
              <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                🥉 Rank 3
              </span>
              <h3 className="text-base font-bold text-text-primary mt-2">{top3.userName}</h3>
              <p className="text-xs text-text-muted truncate">{top3.userCollege}</p>
            </div>
            <div className="p-3 bg-app-bg rounded-xl border border-slate-150 grid grid-cols-2 gap-2 text-center text-xs">
              <div>
                <p className="text-[10px] text-slate-400 font-semibold">Points</p>
                <p className="text-sm font-extrabold text-text-primary">{top3.totalPoints.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold">Accuracy</p>
                <p className="text-sm font-extrabold text-emerald-600">{top3.averageAccuracy}%</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Company Target Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-surface p-4 rounded-2xl border border-border shadow-sm">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold text-slate-800">Filter by Target Drive:</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end overflow-x-auto pb-1 sm:pb-0">
          {['all', 'tcs', 'infosys', 'accenture', 'capgemini'].map((c) => (
            <button
              key={c}
              onClick={() => setFilterCompany(c)}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded-lg transition-all ${
                filterCompany === c
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-hover text-text-secondary hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Complete Rankings Table - Clean Crisp White Data Grid */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-app-bg border-b border-border text-[11px] uppercase font-extrabold text-text-muted tracking-wider">
              <tr>
                <th className="py-3.5 px-4 text-center">Rank</th>
                <th className="py-3.5 px-4">Candidate & College</th>
                <th className="py-3.5 px-4 text-center">Target Company</th>
                <th className="py-3.5 px-4 text-center">Tests Taken</th>
                <th className="py-3.5 px-4 text-center">Accuracy</th>
                <th className="py-3.5 px-4 text-center">Avg Speed</th>
                <th className="py-3.5 px-4 text-right">Total Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map((entry) => {
                  const isCurrentUser = entry.userId === currentUserId;
                  return (
                    <tr
                      key={entry.userId}
                      className={`transition-colors ${
                        isCurrentUser
                          ? 'bg-amber-50/70 font-semibold text-slate-950'
                          : 'hover:bg-app-bg'
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-xl font-bold text-xs ${
                            entry.rank === 1
                              ? 'bg-amber-400 text-slate-950'
                              : entry.rank === 2
                              ? 'bg-slate-200 text-slate-800'
                              : entry.rank === 3
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-surface-hover text-text-secondary'
                          }`}
                        >
                          {entry.rank}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-surface-hover border border-border text-xs font-bold text-slate-800 flex items-center justify-center">
                            {entry.userName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-text-primary flex items-center gap-1.5">
                              {entry.userName}
                              {isCurrentUser && (
                                <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-amber-400 text-slate-950">
                                  YOU
                                </span>
                              )}
                            </p>
                            <p className="text-[11px] text-text-muted truncate max-w-xs">{entry.userCollege}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-surface-hover text-slate-700 border border-border">
                          {entry.targetCompany || 'Tier-1 IT'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center font-semibold text-slate-700">
                        {entry.totalTestsAttempted} Mocks
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className="text-emerald-700 font-bold">{entry.averageAccuracy}%</span>
                      </td>

                      <td className="py-3.5 px-4 text-center text-text-secondary font-mono">
                        {entry.avgSpeedSeconds}s / Q
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <span className="text-sm font-extrabold text-text-primary font-mono">
                          {entry.totalPoints.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 px-4 text-center text-text-muted">
                    <Trophy className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-bold text-sm text-slate-700">No candidates on the leaderboard yet</p>
                    <p className="text-xs text-slate-400 mt-1">Complete a placement mock test to claim your All-India ranking!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
