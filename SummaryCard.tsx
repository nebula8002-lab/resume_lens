import React from 'react';
import { ArrowUpRight, TrendingUp, Cpu, Target, FileText, ChevronRight } from 'lucide-react';
import type { ResumeData } from '../types/resume';

interface SummaryCardProps {
  resume: ResumeData;
  onOpenAnalysis: () => void;
  onSwitchToJobMatch: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  resume,
  onOpenAnalysis,
  onSwitchToJobMatch
}) => {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-14 mb-8">
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Active Analysis:</span>
              <span className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                {resume.fileName}
              </span>
            </div>
            <span className="hidden sm:inline-block text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">Evaluated {resume.lastAnalyzed}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Target Role:</span>
            <button
              type="button"
              onClick={onSwitchToJobMatch}
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1 rounded-md transition-colors"
            >
              <span>{resume.targetRole}</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>

        {/* 4 Important Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {/* Metric 1: Resume Score */}
          <div
            onClick={onOpenAnalysis}
            className="pt-4 sm:pt-0 sm:pr-4 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide group-hover:text-slate-900 transition-colors flex items-center gap-1">
                <span>Resume Score</span>
                <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/80">
                {resume.scoreChangeText}
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold tracking-tight text-slate-900">
                {resume.score}
              </span>
              <span className="text-xs font-semibold text-slate-400">/ 100</span>
            </div>
            <p className="mt-1 text-xs text-slate-500 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Higher than 78% of applicants</span>
            </p>
          </div>

          {/* Metric 2: ATS Compatibility */}
          <div className="pt-4 sm:pt-0 sm:px-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                ATS Compatibility
              </span>
              <span className="text-[11px] font-medium text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/60">
                Standard
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold tracking-tight text-slate-900">
                {resume.atsScore}%
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 flex items-center gap-1">
              <span className="text-emerald-600 font-medium">{resume.atsTrendText}</span>
            </p>
          </div>

          {/* Metric 3: Skills Detected */}
          <div className="pt-4 sm:pt-0 sm:px-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Skills Detected
              </span>
              <span className="text-[11px] font-medium text-slate-600 bg-slate-50 px-1.5 py-0.5 rounded">
                Verified
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold tracking-tight text-slate-900">
                {resume.skillsDetected}
              </span>
              <span className="text-xs text-slate-400 font-medium">technical tokens</span>
            </div>
            <p className="mt-1 text-xs text-slate-500 flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-slate-400" />
              <span>Across {resume.skillCategoriesCount} skill categories</span>
            </p>
          </div>

          {/* Metric 4: Job Match */}
          <div className="pt-4 sm:pt-0 sm:pl-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Job Match
              </span>
              <button
                type="button"
                onClick={onSwitchToJobMatch}
                className="text-[11px] font-medium text-slate-600 hover:text-slate-900 underline underline-offset-2"
              >
                Inspect Match
              </button>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold tracking-tight text-slate-900">
                {resume.jobMatchScore}%
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-slate-400" />
              <span>Based on {resume.targetRole}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
