import React, { useState } from 'react';
import { History, TrendingUp } from 'lucide-react';
import type { ResumeData } from '../types/resume';

interface ScoreHistoryCardProps {
  resume: ResumeData;
}

export const ScoreHistoryCard: React.FC<ScoreHistoryCardProps> = ({ resume }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const history = resume.scoreHistory;
  const initialScore = history[0]?.score || 68;
  const currentScore = history[history.length - 1]?.score || 82;
  const totalGain = currentScore - initialScore;

  // Chart coordinate mapping
  const chartWidth = 320;
  const chartHeight = 130;
  const paddingX = 35;
  const paddingY = 24;

  const minScore = 55;
  const maxScore = 100;

  const getX = (index: number) => {
    if (history.length <= 1) return chartWidth / 2;
    return paddingX + (index * (chartWidth - 2 * paddingX)) / (history.length - 1);
  };

  const getY = (scoreVal: number) => {
    const ratio = (scoreVal - minScore) / (maxScore - minScore);
    return chartHeight - paddingY - ratio * (chartHeight - 2 * paddingY);
  };

  // Build SVG path
  const points = history.map((point, index) => ({
    x: getX(index),
    y: getY(point.score),
    point
  }));

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  // Closed path for subtle fill under curve
  const areaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`
    : '';

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-slate-500" />
            <h2 className="text-sm font-semibold text-slate-900">Score History</h2>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            +{totalGain} pts total
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-4">Progression over iterative drafts</p>

        {/* Minimal SVG Chart */}
        <div className="w-full relative pt-2">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-36 overflow-visible"
            role="img"
            aria-label="Resume Score Progression Line Chart"
          >
            <defs>
              <linearGradient id="scoreAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Subtle horizontal grid lines */}
            {[60, 80, 100].map((level) => {
              const y = getY(level);
              return (
                <g key={level}>
                  <line
                    x1={paddingX - 10}
                    y1={y}
                    x2={chartWidth - paddingX + 10}
                    y2={y}
                    stroke="#e2e8f0"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  <text
                    x={paddingX - 14}
                    y={y + 3}
                    textAnchor="end"
                    className="text-[9px] fill-slate-400 font-medium"
                  >
                    {level}
                  </text>
                </g>
              );
            })}

            {/* Area under curve */}
            {areaD && <path d={areaD} fill="url(#scoreAreaGrad)" />}

            {/* Chart Line */}
            {pathD && (
              <path
                d={pathD}
                fill="none"
                stroke="#0f172a"
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Data points */}
            {points.map((p, i) => {
              const isHovered = hoveredIndex === i;
              const isCurrent = i === points.length - 1;

              return (
                <g
                  key={i}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isHovered ? 6 : isCurrent ? 5 : 4}
                    fill={isCurrent ? '#0f172a' : '#ffffff'}
                    stroke="#0f172a"
                    strokeWidth="2"
                    className="transition-all duration-150"
                  />

                  {/* Value label on top of point */}
                  <text
                    x={p.x}
                    y={p.y - 9}
                    textAnchor="middle"
                    className={`text-[10px] font-semibold ${
                      isCurrent || isHovered ? 'fill-slate-900' : 'fill-slate-500'
                    }`}
                  >
                    {p.point.score}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Realistic Labels Along Bottom */}
      <div className="pt-3 border-t border-slate-100 mt-2">
        <div className="grid grid-cols-4 gap-1 text-center">
          {history.map((item, idx) => {
            const isCurrent = idx === history.length - 1;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`py-1 rounded transition-colors ${
                  isCurrent ? 'bg-slate-100 font-semibold' : 'hover:bg-slate-50'
                }`}
              >
                <p className={`text-[11px] leading-tight ${isCurrent ? 'text-slate-900' : 'text-slate-600'}`}>
                  {item.label}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">{item.date}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
