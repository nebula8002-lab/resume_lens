import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, CheckCircle2, Clock, Trash2 } from 'lucide-react';
import type { ResumeData } from '../types/resume';

interface MyResumesTabProps {
  resumes: ResumeData[];
  activeResumeId: string;
  onSelectResume: (id: string) => void;
  onOpenAnalysis: (resume: ResumeData) => void;
  onOpenUpload: () => void;
  onDeleteResume: (id: string) => void;
}

export const MyResumesTab: React.FC<MyResumesTabProps> = ({
  resumes,
  activeResumeId,
  onSelectResume,
  onOpenAnalysis,
  onOpenUpload,
  onDeleteResume
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = resumes.filter((r) => {
    const matchesSearch = r.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.targetRole.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || r.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-semibold text-slate-900 tracking-tight">
            My Resumes Portfolio
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your tailored resume variations, tracked revisions, and comparative ATS health.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenUpload}
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Resume</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resumes by filename or target position..."
            className="w-full text-xs rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2 text-slate-800 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 focus:outline-none focus:border-slate-900 shadow-xs"
          >
            <option value="all">All Statuses</option>
            <option value="strong">Strong (85+)</option>
            <option value="needs review">Needs Review</option>
            <option value="improve">Improve</option>
            <option value="excellent">Excellent</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => {
          const isActive = item.id === activeResumeId;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-xl border p-5 transition-all flex flex-col justify-between ${
                isActive
                  ? 'border-slate-900 shadow-xs ring-1 ring-slate-900/10'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-slate-700">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {isActive ? (
                      <span className="text-[10px] font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                        Active in Dashboard
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSelectResume(item.id)}
                        className="text-[11px] text-slate-500 hover:text-slate-900 font-medium"
                      >
                        Set as Active
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-slate-900 mb-1">
                  {item.fileName}
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  {item.targetRole}
                </p>

                <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 text-xs mb-4">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Overall Score</span>
                    <span className="text-lg font-bold text-slate-900">{item.score}/100</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">ATS Readability</span>
                    <span className="text-lg font-bold text-slate-900">{item.atsScore}%</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 space-y-1 mb-4">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{item.skillsDetected} technical skills verified</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Evaluated {item.lastAnalyzed}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onOpenAnalysis(item)}
                  className="flex-1 text-xs font-medium text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 py-1.5 rounded-md transition-colors"
                >
                  Full Analysis
                </button>
                <button
                  type="button"
                  onClick={() => onSelectResume(item.id)}
                  className="text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-md transition-colors"
                >
                  View
                </button>
                {resumes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onDeleteResume(item.id)}
                    title="Delete Draft"
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="sr-only">Delete</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
