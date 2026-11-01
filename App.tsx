import { useState } from 'react';
import { Header } from './components/Header';
import { SummaryCard } from './components/SummaryCard';
import { ResumeHealthCard } from './components/ResumeHealthCard';
import { AnalysisSummaryCard } from './components/AnalysisSummaryCard';
import { ScoreHistoryCard } from './components/ScoreHistoryCard';
import { JobMatchSection } from './components/JobMatchSection';
import { RecentResumesSection } from './components/RecentResumesSection';
import { FullAnalysisModal } from './components/FullAnalysisModal';
import { UploadModal } from './components/UploadModal';
import { MyResumesTab } from './components/MyResumesTab';
import { InsightsTab } from './components/InsightsTab';
import { SAMPLE_RESUMES } from './data/sampleResumes';
import type { ResumeData } from './types/resume';
import { Shield, CheckCircle2 } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'resumes' | 'jobmatch' | 'insights'>('dashboard');
  const [resumes, setResumes] = useState<ResumeData[]>(SAMPLE_RESUMES);
  const [activeResumeId, setActiveResumeId] = useState<string>(SAMPLE_RESUMES[0].id);

  const [modalResume, setModalResume] = useState<ResumeData | null>(null);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeResume = resumes.find((r) => r.id === activeResumeId) || resumes[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSelectResume = (id: string) => {
    setActiveResumeId(id);
    const selected = resumes.find((r) => r.id === id);
    if (selected) {
      showToast(`Active resume switched to ${selected.fileName}`);
    }
  };

  const handleOpenAnalysis = (resumeToInspect?: ResumeData) => {
    setModalResume(resumeToInspect || activeResume);
    setIsAnalysisModalOpen(true);
  };

  const handleUploadSuccess = (newResume: ResumeData) => {
    setResumes((prev) => [newResume, ...prev]);
    setActiveResumeId(newResume.id);
    showToast(`Successfully evaluated ${newResume.fileName} with Score ${newResume.score}/100`);
  };

  const handleDeleteResume = (id: string) => {
    if (resumes.length <= 1) return;
    setResumes((prev) => prev.filter((r) => r.id !== id));
    if (activeResumeId === id) {
      const remaining = resumes.filter((r) => r.id !== id);
      if (remaining.length > 0) setActiveResumeId(remaining[0].id);
    }
    showToast('Resume draft removed from list');
  };

  const handleUpdateTargetRole = (newRole: string) => {
    setResumes((prev) =>
      prev.map((r) =>
        r.id === activeResumeId
          ? { ...r, targetRole: newRole }
          : r
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-slate-900 selection:text-white">
      {/* Top Navigation & Dark Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenUpload={() => setIsUploadModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-lg border border-slate-800 flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tab 1: Primary Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Large White Floating Summary Card Overlapping Header */}
            <SummaryCard
              resume={activeResume}
              onOpenAnalysis={() => handleOpenAnalysis(activeResume)}
              onSwitchToJobMatch={() => setActiveTab('jobmatch')}
            />

            {/* Dashboard Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              {/* Three-Card Main Dashboard Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Left Card: Resume Health */}
                <ResumeHealthCard resume={activeResume} />

                {/* Middle Card: Analysis Summary */}
                <AnalysisSummaryCard
                  resume={activeResume}
                  onOpenAnalysis={() => handleOpenAnalysis(activeResume)}
                />

                {/* Right Card: Score History */}
                <ScoreHistoryCard resume={activeResume} />
              </div>

              {/* Lower Section: Job Match Analysis */}
              <JobMatchSection
                resume={activeResume}
                onUpdateTargetRole={handleUpdateTargetRole}
              />

              {/* Recent Resumes Table Section */}
              <RecentResumesSection
                resumes={resumes}
                activeResumeId={activeResumeId}
                onSelectResume={handleSelectResume}
                onOpenAnalysis={handleOpenAnalysis}
                onOpenUpload={() => setIsUploadModalOpen(true)}
                onDeleteResume={handleDeleteResume}
              />
            </div>
          </div>
        )}

        {/* Tab 2: My Resumes Portfolio */}
        {activeTab === 'resumes' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <MyResumesTab
              resumes={resumes}
              activeResumeId={activeResumeId}
              onSelectResume={handleSelectResume}
              onOpenAnalysis={handleOpenAnalysis}
              onOpenUpload={() => setIsUploadModalOpen(true)}
              onDeleteResume={handleDeleteResume}
            />
          </div>
        )}

        {/* Tab 3: Focused Job Match Deep Dive */}
        {activeTab === 'jobmatch' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <h2 className="text-base font-semibold text-slate-900 tracking-tight">
                Deep Job Matching & Keyword Optimization
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Active Resume: <strong className="text-slate-800">{activeResume.fileName}</strong> ({activeResume.targetRole})
              </p>
            </div>
            <JobMatchSection
              resume={activeResume}
              onUpdateTargetRole={handleUpdateTargetRole}
            />
          </div>
        )}

        {/* Tab 4: Insights & Benchmarks */}
        {activeTab === 'insights' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <InsightsTab />
          </div>
        )}
      </main>

      {/* Corporate Dashboard Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-slate-600" />
            <span className="font-semibold text-slate-900">ResumeLens</span>
            <span>— Transparent Career Tech & ATS Optimization Platform</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              ATS Parser Engines Online
            </span>
            <span>Privacy First — Client Side Rule Engine</span>
          </div>
        </div>
      </footer>

      {/* Full Analysis Modal */}
      <FullAnalysisModal
        isOpen={isAnalysisModalOpen}
        resume={modalResume || activeResume}
        onClose={() => setIsAnalysisModalOpen(false)}
      />

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}

export default App;
