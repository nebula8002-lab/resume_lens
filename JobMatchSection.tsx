import React, { useState } from 'react';
import { Target, Check, Plus, Sparkles, Copy, CheckCheck } from 'lucide-react';
import type { ResumeData, JobMatchResult } from '../types/resume';
import { SAMPLE_JOB_DESCRIPTIONS } from '../data/sampleJobDescriptions';
import { matchResumeWithJob } from '../utils/jobMatcher';

interface JobMatchSectionProps {
  resume: ResumeData;
  onUpdateTargetRole?: (role: string) => void;
}

export const JobMatchSection: React.FC<JobMatchSectionProps> = ({
  resume,
  onUpdateTargetRole
}) => {
  const [selectedRole, setSelectedRole] = useState(resume.targetRole || 'Senior Frontend Engineer');
  const [jobDescription, setJobDescription] = useState(SAMPLE_JOB_DESCRIPTIONS[0].text);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  // Initial state matches prompt
  const [matchResult, setMatchResult] = useState<JobMatchResult>(() => {
    return {
      jobRole: 'Senior Frontend Engineer',
      matchPercentage: 76,
      matchedSkills: ['Python', 'SQL', 'Machine Learning', 'Data Analysis'],
      missingKeywords: ['TensorFlow', 'Docker', 'AWS'],
      explanation:
        'Your resume matches 76% of the selected job description. Adding the missing technical keywords could improve your relevance.',
      recommendations: [
        'Add Docker containerization experience in your deployment bullets.',
        'Mention AWS cloud services (ECS, S3, CloudFront) to meet DevOps expectations.',
        'Highlight ML frameworks like TensorFlow or PyTorch if applying for data-intensive roles.'
      ]
    };
  });

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    setSelectedRole(newRole);
    if (onUpdateTargetRole) onUpdateTargetRole(newRole);

    const matchedJD = SAMPLE_JOB_DESCRIPTIONS.find((jd) => jd.role.toLowerCase().includes(newRole.toLowerCase()));
    if (matchedJD) {
      setJobDescription(matchedJD.text);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = matchResumeWithJob(
        resume.rawText || '',
        jobDescription,
        selectedRole
      );
      setMatchResult(result);
      setIsAnalyzing(false);
    }, 450);
  };

  const handleCopyKeyword = (keyword: string) => {
    navigator.clipboard.writeText(keyword);
    setCopiedKeyword(keyword);
    setTimeout(() => setCopiedKeyword(null), 1800);
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 sm:p-7">
      {/* Section Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-slate-700" />
            <h2 className="text-base font-semibold text-slate-900 tracking-tight">
              Match Your Resume to a Job
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compare your resume keywords against specific job requirements to optimize ATS relevance.
          </p>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-slate-400 font-medium mr-1">Load sample:</span>
          {SAMPLE_JOB_DESCRIPTIONS.map((jd) => (
            <button
              key={jd.id}
              type="button"
              onClick={() => {
                setSelectedRole(jd.role);
                setJobDescription(jd.text);
              }}
              className="text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 px-2 py-1 rounded transition-colors"
            >
              {jd.role.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Role Selector & Description Input */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label htmlFor="target-job-role" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
              Target Job Role
            </label>
            <div className="relative">
              <select
                id="target-job-role"
                value={selectedRole}
                onChange={handleRoleChange}
                className="w-full text-xs rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-800 shadow-xs focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                <option value="Senior Frontend Engineer">Senior Frontend Engineer</option>
                <option value="Machine Learning / AI Engineer">Machine Learning / AI Engineer</option>
                <option value="Full Stack Software Engineer">Full Stack Software Engineer</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Custom Engineering Role">Custom Engineering Role</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="job-description-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Job Description
              </label>
              <span className="text-[11px] text-slate-400">
                Paste requirements or responsibilities
              </span>
            </div>
            <textarea
              id="job-description-input"
              rows={5}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description requirements, technical qualifications, or responsibilities here..."
              className="w-full text-xs font-mono rounded-lg border border-slate-200 bg-slate-50/50 p-3 text-slate-800 leading-relaxed shadow-xs focus:bg-white focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 resize-y"
            />
          </div>

          <div>
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isAnalyzing || !jobDescription.trim()}
              className="inline-flex items-center justify-center gap-2 text-xs font-medium px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-300 transition-colors shadow-xs"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Analyzing Alignment...' : 'Analyze Match'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Match Percentage Gauge & Summary */}
        <div className="bg-slate-50/70 rounded-xl border border-slate-200/80 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Relevance Score
              </span>
              <span className="text-xs font-semibold text-slate-900">
                {matchResult.jobRole}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {matchResult.matchPercentage}%
              </span>
              <span className="text-xs text-slate-500 font-medium">ATS Match</span>
            </div>

            {/* Visual progress bar */}
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  matchResult.matchPercentage >= 80
                    ? 'bg-emerald-600'
                    : matchResult.matchPercentage >= 70
                    ? 'bg-slate-800'
                    : 'bg-amber-600'
                }`}
                style={{ width: `${matchResult.matchPercentage}%` }}
              />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {matchResult.explanation}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200/80 mt-4 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Matched: {matchResult.matchedSkills.length}</span>
            <span>Missing: {matchResult.missingKeywords.length}</span>
          </div>
        </div>
      </div>

      {/* Keyword Comparison Section (Matched Skills & Missing Keywords) */}
      <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <div className="bg-white rounded-lg border border-slate-200/80 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Matched Skills
            </h3>
            <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              {matchResult.matchedSkills.length} identified
            </span>
          </div>

          <p className="text-xs text-slate-500 mb-3">
            Keywords detected in your resume that directly align with this job posting.
          </p>

          <div className="flex flex-wrap gap-2">
            {matchResult.matchedSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md"
              >
                <Check className="w-3 h-3 text-emerald-600" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Missing Keywords */}
        <div className="bg-white rounded-lg border border-slate-200/80 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Missing Keywords
            </h3>
            <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
              {matchResult.missingKeywords.length} recommend
            </span>
          </div>

          <p className="text-xs text-slate-500 mb-3">
            High-frequency requirements in the posting that do not appear in your resume.
          </p>

          <div className="flex flex-wrap gap-2">
            {matchResult.missingKeywords.map((keyword) => (
              <button
                key={keyword}
                type="button"
                onClick={() => handleCopyKeyword(keyword)}
                title="Click to copy keyword"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 border-dashed px-2.5 py-1 rounded-md transition-colors"
              >
                <Plus className="w-3 h-3 text-amber-600" />
                <span>{keyword}</span>
                {copiedKeyword === keyword ? (
                  <CheckCheck className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Copy className="w-2.5 h-2.5 text-slate-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
