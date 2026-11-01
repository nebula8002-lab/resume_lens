import React from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import type { ResumeData } from '../types/resume';

interface AnalysisSummaryCardProps {
  resume: ResumeData;
  onOpenAnalysis: () => void;
}

export const AnalysisSummaryCard: React.FC<AnalysisSummaryCardProps> = ({
  resume,
  onOpenAnalysis
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-slate-500" />
            <h2 className="text-sm font-semibold text-slate-900">Analysis Summary</h2>
          </div>
          <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            AI Assisted
          </span>
        </div>

        {/* Strengths Section */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wide">
              Strengths
            </h3>
          </div>
          <ul className="space-y-1.5 pl-5 list-disc text-xs text-slate-600 marker:text-emerald-500">
            {resume.strengths.map((strength, index) => (
              <li key={index} className="leading-relaxed">
                {strength}
              </li>
            ))}
          </ul>
        </div>

        {/* Needs Attention Section */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wide">
              Needs Attention
            </h3>
          </div>
          <ul className="space-y-1.5 pl-5 list-disc text-xs text-slate-600 marker:text-amber-500">
            {resume.needsAttention.map((item, index) => (
              <li key={index} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 mt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onOpenAnalysis}
          className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-medium text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 px-3 py-2 rounded-lg transition-colors shadow-xs"
        >
          <span>View Full Analysis</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>
    </div>
  );
};
