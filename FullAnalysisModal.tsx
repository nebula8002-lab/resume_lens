import React, { useEffect, useRef } from 'react';
import { X, CheckCircle2, AlertTriangle, Printer, Sparkles, ShieldCheck } from 'lucide-react';
import type { ResumeData } from '../types/resume';

interface FullAnalysisModalProps {
  resume: ResumeData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FullAnalysisModal: React.FC<FullAnalysisModalProps> = ({
  resume,
  isOpen,
  onClose
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // Modern web guidance: native dialog handling
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Handle click outside (light dismiss fallback)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  if (!resume) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="full-analysis-title"
      className="m-auto rounded-xl border border-slate-200 bg-white shadow-xl p-0 w-full max-w-3xl max-h-[88vh] overflow-hidden backdrop:bg-slate-900/40"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-slate-900 text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 id="full-analysis-title" className="text-sm font-semibold text-slate-900">
              Detailed ATS Analysis & Recommendations
            </h2>
            <p className="text-xs text-slate-500">
              {resume.fileName} • Overall Score: {resume.score}/100 • ATS Compatibility: {resume.atsScore}%
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            title="Print or Save PDF"
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-md transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span className="sr-only">Print</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>

      {/* Modal Scrollable Body */}
      <div className="p-6 overflow-y-auto max-h-[calc(88vh-130px)] space-y-6 text-xs text-slate-700">
        {/* Section Completeness Overview */}
        <div>
          <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-700" />
            Core Resume Sections Check
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {resume.sectionAnalyses.map((sec, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-semibold text-slate-800 truncate">
                    {sec.section.split(' ')[0]}
                  </span>
                  {sec.status === 'present' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  )}
                </div>
                <div className="text-[10px] text-slate-500">
                  Rating: <span className="font-semibold text-slate-800">{sec.score}/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Diagnostics */}
        <div>
          <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
            Section Breakdown & Findings
          </h3>
          <div className="space-y-2 border border-slate-200/80 rounded-lg divide-y divide-slate-100 overflow-hidden">
            {resume.sectionAnalyses.map((sec, idx) => (
              <div key={idx} className="p-3 bg-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-900">{sec.section}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    sec.status === 'present'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                      : 'bg-amber-50 text-amber-700 border border-amber-100'
                  }`}>
                    {sec.status === 'present' ? 'Verified' : 'Needs Work'}
                  </span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">{sec.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Rewrites (Before vs After) */}
        <div>
          <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
            High-Impact Bullet Rewrites
          </h3>
          <p className="text-slate-500 mb-3 text-xs">
            Transform passive descriptions into ATS-optimized achievement statements with quantifiable metrics:
          </p>
          <div className="space-y-3">
            {resume.suggestions.map((sug) => (
              <div key={sug.id} className="border border-slate-200 rounded-lg p-3.5 bg-slate-50/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-900">{sug.issue}</span>
                  <span className="text-[10px] font-medium uppercase px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                    {sug.category}
                  </span>
                </div>
                <p className="text-slate-600 text-xs mb-3">{sug.suggestion}</p>

                {sug.before && sug.after && (
                  <div className="space-y-2 pt-2 border-t border-slate-200/70 text-xs font-mono">
                    <div className="bg-rose-50/70 border border-rose-100 p-2 rounded text-rose-900">
                      <span className="font-sans font-semibold text-[10px] uppercase text-rose-700 block mb-0.5">
                        Before:
                      </span>
                      {sug.before}
                    </div>
                    <div className="bg-emerald-50/70 border border-emerald-100 p-2 rounded text-emerald-950">
                      <span className="font-sans font-semibold text-[10px] uppercase text-emerald-700 block mb-0.5">
                        Optimized After:
                      </span>
                      {sug.after}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Rule-based Scoring Formula Transparency */}
        <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
          <h4 className="font-semibold text-slate-900 text-xs mb-1">
            Transparent Rule-Based Scoring Criteria
          </h4>
          <p className="text-slate-500 text-xs leading-relaxed">
            ResumeLens calculates your score using rule-based criteria:
            <span className="block mt-1">
              • <strong>Content Quality (25%):</strong> Section completeness, verified contact info, academic credentials.
            </span>
            <span>
              • <strong>Skills & Keywords (25%):</strong> Density of industry tech keywords matched to market taxonomies.
            </span>
            <span className="block">
              • <strong>Formatting (25%):</strong> Standard bullet hierarchy, word count (350–800), absence of OCR-breaking layout.
            </span>
            <span>
              • <strong>Impact (25%):</strong> Measurable percentage/scale metrics and active verbs.
            </span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 px-6 py-3.5 border-t border-slate-100 bg-slate-50/70">
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg transition-colors shadow-xs"
        >
          Close
        </button>
      </div>
    </dialog>
  );
};
