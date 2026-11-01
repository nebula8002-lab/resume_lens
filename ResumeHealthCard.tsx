import React from 'react';
import { Activity } from 'lucide-react';
import type { ResumeData } from '../types/resume';

interface ResumeHealthCardProps {
  resume: ResumeData;
}

export const ResumeHealthCard: React.FC<ResumeHealthCardProps> = ({ resume }) => {
  const { score, scoreBreakdown } = resume;

  // SVG Circular Gauge calculations
  const size = 160;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Score percentage offset
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-slate-500" />
            <h2 className="text-sm font-semibold text-slate-900">Resume Health</h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">Weighted ATS v2</span>
        </div>

        {/* Circular Gauge */}
        <div className="flex flex-col items-center justify-center my-3">
          <div className="relative flex items-center justify-center">
            <svg
              width={size}
              height={size}
              className="transform -rotate-90"
              aria-label={`Overall Score: ${score} out of 100`}
              role="img"
            >
              {/* Background circle track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                className="stroke-slate-100"
                strokeWidth={strokeWidth}
                fill="none"
              />
              {/* Active progress stroke */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={score >= 80 ? '#0f172a' : score >= 70 ? '#334155' : '#475569'}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                style={{
                  transition: 'stroke-dashoffset 0.8s ease-in-out'
                }}
              />
            </svg>

            {/* Inner Center Content */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                {score}
              </span>
              <span className="text-xs font-medium text-slate-500 mt-0.5">
                Overall Score
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Metrics */}
      <div className="space-y-3 pt-4 border-t border-slate-100 mt-4">
        {/* Content Quality */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-600 font-medium">Content Quality</span>
            <span className="text-slate-900 font-semibold">{scoreBreakdown.contentQuality}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-800 rounded-full transition-all duration-500"
              style={{ width: `${scoreBreakdown.contentQuality}%` }}
            />
          </div>
        </div>

        {/* Skills & Keywords */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-600 font-medium">Skills & Keywords</span>
            <span className="text-slate-900 font-semibold">{scoreBreakdown.skillsKeywords}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-700 rounded-full transition-all duration-500"
              style={{ width: `${scoreBreakdown.skillsKeywords}%` }}
            />
          </div>
        </div>

        {/* Formatting */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-600 font-medium">Formatting</span>
            <span className="text-slate-900 font-semibold">{scoreBreakdown.formatting}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${scoreBreakdown.formatting}%` }}
            />
          </div>
        </div>

        {/* Impact */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-600 font-medium">Impact</span>
            <span className="text-slate-900 font-semibold">{scoreBreakdown.impact}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-600 rounded-full transition-all duration-500"
              style={{ width: `${scoreBreakdown.impact}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
