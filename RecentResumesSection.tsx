import React from 'react';
import { FileText, Download, Eye, Trash2, Upload } from 'lucide-react';
import type { ResumeData, ResumeStatus } from '../types/resume';

interface RecentResumesSectionProps {
  resumes: ResumeData[];
  activeResumeId: string;
  onSelectResume: (id: string) => void;
  onOpenAnalysis: (resume: ResumeData) => void;
  onOpenUpload: () => void;
  onDeleteResume: (id: string) => void;
}

export const RecentResumesSection: React.FC<RecentResumesSectionProps> = ({
  resumes,
  activeResumeId,
  onSelectResume,
  onOpenAnalysis,
  onOpenUpload,
  onDeleteResume
}) => {
  const getStatusBadge = (status: ResumeStatus) => {
    switch (status) {
      case 'Excellent':
        return (
          <span className="inline-flex items-center text-[11px] font-medium text-slate-800 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
            Excellent
          </span>
        );
      case 'Strong':
        return (
          <span className="inline-flex items-center text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
            Strong
          </span>
        );
      case 'Needs Review':
        return (
          <span className="inline-flex items-center text-[11px] font-medium text-amber-800 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
            Needs Review
          </span>
        );
      case 'Improve':
        return (
          <span className="inline-flex items-center text-[11px] font-medium text-rose-800 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full">
            Improve
          </span>
        );
    }
  };

  const handleDownload = (e: React.MouseEvent, resume: ResumeData) => {
    e.stopPropagation();
    const content = `ResumeLens ATS Analysis Report\n============================\nResume: ${resume.fileName}\nScore: ${resume.score}/100\nATS Compatibility: ${resume.atsScore}%\nStatus: ${resume.status}\n\nStrengths:\n${resume.strengths.map(s => `• ${s}`).join('\n')}\n\nAreas to Improve:\n${resume.needsAttention.map(a => `• ${a}`).join('\n')}\n`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resume.fileName.replace('.pdf', '')}_Analysis.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-700" />
            <h2 className="text-sm font-semibold text-slate-900">Recently Analyzed Resumes</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Select any document to load its complete health score, breakdown, and historical trend.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenUpload}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors self-start sm:self-auto"
        >
          <Upload className="w-3.5 h-3.5 text-slate-500" />
          <span>Upload Another Draft</span>
        </button>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th scope="col" className="py-3 px-5 sm:px-6">Resume Name</th>
              <th scope="col" className="py-3 px-4">Last Analyzed</th>
              <th scope="col" className="py-3 px-4">Score</th>
              <th scope="col" className="py-3 px-4">Status</th>
              <th scope="col" className="py-3 px-5 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {resumes.map((item) => {
              const isActive = item.id === activeResumeId;

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectResume(item.id)}
                  className={`group cursor-pointer transition-colors ${
                    isActive ? 'bg-slate-50/90 font-medium' : 'hover:bg-slate-50/50'
                  }`}
                >
                  {/* Column 1: Resume Name */}
                  <td className="py-3.5 px-5 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center border transition-colors ${
                        isActive
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-500 border-slate-200 group-hover:border-slate-300'
                      }`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-900 font-medium group-hover:text-slate-950">
                            {item.fileName}
                          </span>
                          {isActive && (
                            <span className="text-[10px] font-semibold text-slate-700 bg-slate-200/80 px-1.5 py-0.2 rounded">
                              Active
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 font-normal">
                          {item.fileSize} • {item.skillsDetected} skills detected
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Column 2: Last Analyzed */}
                  <td className="py-3.5 px-4 text-slate-600">
                    {item.lastAnalyzed}
                  </td>

                  {/* Column 3: Score */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-slate-900">{item.score}</span>
                      <span className="text-[10px] text-slate-400">/ 100</span>
                    </div>
                  </td>

                  {/* Column 4: Status */}
                  <td className="py-3.5 px-4">
                    {getStatusBadge(item.status)}
                  </td>

                  {/* Column 5: Actions */}
                  <td className="py-3.5 px-5 sm:px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => onOpenAnalysis(item)}
                        title="View Full Analysis"
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="sr-only">View Analysis</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDownload(e, item)}
                        title="Download Analysis Summary"
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="sr-only">Download</span>
                      </button>

                      {resumes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => onDeleteResume(item.id)}
                          title="Remove Resume"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="sr-only">Delete</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
