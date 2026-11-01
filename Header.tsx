import React, { useState } from 'react';
import { FileText, Sparkles, Upload, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'resumes' | 'jobmatch' | 'insights';
  setActiveTab: (tab: 'dashboard' | 'resumes' | 'jobmatch' | 'insights') => void;
  onOpenUpload: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenUpload
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="bg-slate-900 text-slate-100 pt-6 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo & Product Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-slate-800 border border-slate-700/80 flex items-center justify-center text-slate-100 shadow-xs">
              <FileText className="w-5 h-5 text-slate-200" strokeWidth={1.75} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg tracking-tight text-white">ResumeLens</span>
                <span className="text-[10px] font-medium tracking-wide uppercase px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/50">
                  ATS v2.4
                </span>
              </div>
              <p className="text-xs text-slate-400">Your career insights, simplified.</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/40 p-1 rounded-lg border border-slate-800/70" aria-label="Main Navigation">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('resumes')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'resumes'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              My Resumes
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('jobmatch')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'jobmatch'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              Job Match
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('insights')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'insights'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              Insights
            </button>
          </nav>

          {/* Actions & Profile */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenUpload}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-white text-slate-900 hover:bg-slate-100 transition-colors shadow-xs"
            >
              <Upload className="w-3.5 h-3.5 text-slate-700" strokeWidth={2} />
              <span>Upload Resume</span>
            </button>

            {/* User Profile Avatar */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 hover:border-slate-500 transition-colors flex items-center justify-center text-xs font-medium text-slate-200"
                aria-label="User Account Menu"
              >
                DP
              </button>
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-slate-900" />

              {showProfileMenu && (
                <div 
                  className="absolute right-0 mt-2 w-56 rounded-md bg-white border border-slate-200 shadow-md py-1.5 z-50 text-slate-800 animate-fade-in"
                  onMouseLeave={() => setShowProfileMenu(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">Dharun P.</p>
                    <p className="text-[11px] text-slate-500">dharun@example.com</p>
                  </div>
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => { setActiveTab('resumes'); setShowProfileMenu(false); }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      Manage Resumes (4)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setActiveTab('insights'); setShowProfileMenu(false); }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                      ATS Criteria Guide
                    </button>
                  </div>
                  <div className="border-t border-slate-100 px-3 py-1.5 text-[11px] text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Enterprise ATS Parser Active
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center justify-between mt-4 pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`text-xs px-2.5 py-1 rounded ${activeTab === 'dashboard' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('resumes')}
              className={`text-xs px-2.5 py-1 rounded ${activeTab === 'resumes' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
            >
              Resumes
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('jobmatch')}
              className={`text-xs px-2.5 py-1 rounded ${activeTab === 'jobmatch' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
            >
              Match
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('insights')}
              className={`text-xs px-2.5 py-1 rounded ${activeTab === 'insights' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
            >
              Insights
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
