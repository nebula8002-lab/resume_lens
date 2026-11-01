import React from 'react';
import { Lightbulb, TrendingUp, ShieldCheck, Layers } from 'lucide-react';

export const InsightsTab: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <Lightbulb className="w-5 h-5 text-slate-800" />
          <h2 className="text-base font-semibold text-slate-900 tracking-tight">
            ATS Engineering Insights & Market Benchmarks
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          How modern Applicant Tracking Systems (Workday, Greenhouse, Lever, Taleo) evaluate engineering candidates in 2026.
        </p>
      </div>

      {/* Grid of Key ATS Criteria */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-slate-800 mb-3">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 mb-1">ATS Parser Architecture</h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Most corporate ATS systems run regex and entity-extraction pipelines that look for standardized section headers like "Experience", "Education", and "Skills".
          </p>
          <ul className="text-[11px] text-slate-500 space-y-1.5 list-disc pl-4 marker:text-slate-400">
            <li>Never use text embedded inside images or vector charts</li>
            <li>Avoid multi-column tables that scramble line orders in OCR</li>
            <li>Use standard date notations (e.g., "Jan 2023 - Present")</li>
          </ul>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-slate-800 mb-3">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 mb-1">Quantified Impact Rule</h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Recruiter screening filters and AI summaries assign 3x higher relevance to statements structured around concrete outcomes rather than responsibilities.
          </p>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px] space-y-1 font-mono">
            <span className="text-slate-500 block font-sans font-semibold">Target Formula:</span>
            <span className="text-slate-800 block">[Active Verb] + [Engineered Feature] + [Quantified Result (% or $ or Scale)]</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-slate-800 mb-3">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 mb-1">Keyword Density & Taxonomy</h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Do not "keyword-stuff" in invisible white font. Modern parsers flag hidden text and reject resumes with unnatural keyword repetitions.
          </p>
          <ul className="text-[11px] text-slate-500 space-y-1.5 list-disc pl-4 marker:text-slate-400">
            <li>Repeat high-value skills 2–3 times across skills and project bullets</li>
            <li>Match target job posting acronyms alongside expanded terms (e.g. AWS & Amazon Web Services)</li>
          </ul>
        </div>
      </div>

      {/* Industry Benchmarks Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-1">
          2026 Engineering Role Benchmarks
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Average candidate pass rates and optimal keyword matches by specialty.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-[11px] text-slate-500 uppercase font-semibold">
                <th className="py-2.5 px-4">Role Specialty</th>
                <th className="py-2.5 px-4">Avg ATS Pass Rate</th>
                <th className="py-2.5 px-4">Key In-Demand Skills</th>
                <th className="py-2.5 px-4">Typical Weakness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Frontend / Web Engineer</td>
                <td className="py-3 px-4">68%</td>
                <td className="py-3 px-4">TypeScript, React, Next.js, Performance / CWV</td>
                <td className="py-3 px-4 text-slate-500">Omitting backend/API & testing experience</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Machine Learning Engineer</td>
                <td className="py-3 px-4">62%</td>
                <td className="py-3 px-4">PyTorch, Python, Docker, LLMs/RAG, Cloud Deploy</td>
                <td className="py-3 px-4 text-slate-500">Lacking production deployment metrics</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">Full Stack Developer</td>
                <td className="py-3 px-4">74%</td>
                <td className="py-3 px-4">React, Node.js, SQL, Docker, AWS, Microservices</td>
                <td className="py-3 px-4 text-slate-500">Too shallow across too many languages</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-900">CS Graduate / Intern</td>
                <td className="py-3 px-4">54%</td>
                <td className="py-3 px-4">Python, Java, Git, Data Structures, Web basics</td>
                <td className="py-3 px-4 text-slate-500">Passive classroom bullets with no numbers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
