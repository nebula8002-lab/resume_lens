import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, FileText, AlertCircle } from 'lucide-react';
import type { ResumeData } from '../types/resume';
import { extractTextFromFile } from '../utils/textExtractor';
import { analyzeResumeText } from '../utils/atsAnalyzer';
import { SAMPLE_RESUMES } from '../data/sampleResumes';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (newResume: ResumeData) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const sampleCounterRef = useRef(100);

  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rawTextInput, setRawTextInput] = useState('');
  const [activeMode, setActiveMode] = useState<'file' | 'paste' | 'sample'>('file');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        setErrorMessage(null);
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const handleProcessFile = async (file: File) => {
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const text = await extractTextFromFile(file);
      if (!text || text.trim().length < 40) {
        throw new Error('Unable to extract sufficient text content from this file. Please ensure it contains readable text.');
      }

      const analyzed = analyzeResumeText(text, file.name);
      onUploadSuccess(analyzed);
      onClose();
    } catch (err: any) {
      console.error('File parsing error:', err);
      setErrorMessage(err.message || 'Error parsing file. Please try another file or paste text directly.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelectSample = (sample: ResumeData) => {
    sampleCounterRef.current += 1;
    const cloned: ResumeData = {
      ...sample,
      id: `res-${sample.id}-${sampleCounterRef.current}`,
      fileName: sample.fileName,
      lastAnalyzed: 'Just now'
    };
    onUploadSuccess(cloned);
    onClose();
  };

  const handleProcessPastedText = () => {
    if (!rawTextInput.trim() || rawTextInput.trim().length < 50) {
      setErrorMessage('Please paste at least 50 characters of resume content.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const analyzed = analyzeResumeText(rawTextInput, 'Pasted_Resume.txt');
      onUploadSuccess(analyzed);
      setIsProcessing(false);
      onClose();
    }, 400);
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="upload-dialog-title"
      className="m-auto rounded-xl border border-slate-200 bg-white shadow-xl p-0 w-full max-w-lg overflow-hidden backdrop:bg-slate-900/40"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
        <div className="flex items-center gap-2">
          <Upload className="w-4 h-4 text-slate-700" />
          <h2 id="upload-dialog-title" className="text-sm font-semibold text-slate-900">
            Upload Resume for Analysis
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-md transition-colors"
        >
          <X className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 px-6 pt-3 gap-4 text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveMode('file')}
          className={`pb-2.5 transition-colors border-b-2 ${
            activeMode === 'file'
              ? 'border-slate-900 text-slate-900 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          File Upload (PDF / TXT)
        </button>
        <button
          type="button"
          onClick={() => setActiveMode('paste')}
          className={`pb-2.5 transition-colors border-b-2 ${
            activeMode === 'paste'
              ? 'border-slate-900 text-slate-900 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Paste Plain Text
        </button>
        <button
          type="button"
          onClick={() => setActiveMode('sample')}
          className={`pb-2.5 transition-colors border-b-2 ${
            activeMode === 'sample'
              ? 'border-slate-900 text-slate-900 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Sample Resumes
        </button>
      </div>

      <div className="p-6">
        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {activeMode === 'file' && (
          <div>
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                isDragging
                  ? 'border-slate-900 bg-slate-50'
                  : 'border-slate-200 hover:border-slate-400 bg-slate-50/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt,.docx,.md"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleProcessFile(e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-600">
                <Upload className="w-5 h-5" />
              </div>

              <p className="text-xs font-semibold text-slate-900 mb-1">
                {isProcessing ? 'Extracting text & running ATS rules...' : 'Click to upload or drag & drop'}
              </p>
              <p className="text-[11px] text-slate-500">
                PDF, TXT, DOCX, or Markdown up to 10MB
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
              <span>Automatic text parsing</span>
              <span>100% private & client-side</span>
            </div>
          </div>
        )}

        {activeMode === 'paste' && (
          <div>
            <label htmlFor="raw-text-area" className="block text-xs font-medium text-slate-700 mb-1.5">
              Paste Complete Resume Text:
            </label>
            <textarea
              id="raw-text-area"
              rows={8}
              value={rawTextInput}
              onChange={(e) => setRawTextInput(e.target.value)}
              placeholder="Paste your education, skills, experience, and project descriptions..."
              className="w-full text-xs font-mono rounded-lg border border-slate-200 p-3 text-slate-800 bg-slate-50/50 focus:bg-white focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={handleProcessPastedText}
                disabled={isProcessing || !rawTextInput.trim()}
                className="text-xs font-medium px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-300 transition-colors shadow-xs"
              >
                {isProcessing ? 'Analyzing...' : 'Analyze Resume'}
              </button>
            </div>
          </div>
        )}

        {activeMode === 'sample' && (
          <div className="space-y-2.5">
            <p className="text-xs text-slate-500 mb-2">
              Select one of our realistic sample profiles to explore how ResumeLens evaluates different candidate seniority levels:
            </p>
            {SAMPLE_RESUMES.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-slate-600" />
                  <div>
                    <p className="text-xs font-semibold text-slate-900">{sample.fileName}</p>
                    <p className="text-[11px] text-slate-500">{sample.targetRole} • {sample.skillsDetected} skills</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{sample.score}/100</span>
                  <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {sample.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </dialog>
  );
};
