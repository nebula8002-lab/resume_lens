export type ResumeStatus = 'Needs Review' | 'Strong' | 'Improve' | 'Excellent';

export interface ScoreHistoryPoint {
  label: string;
  score: number;
  date: string;
}

export interface SectionAnalysis {
  section: string;
  status: 'present' | 'partial' | 'missing';
  score: number;
  details: string;
}

export interface ActionableSuggestion {
  id: string;
  category: 'Impact' | 'Keywords' | 'Formatting' | 'Structure';
  severity: 'high' | 'medium' | 'low';
  issue: string;
  suggestion: string;
  before?: string;
  after?: string;
}

export interface ResumeData {
  id: string;
  fileName: string;
  lastAnalyzed: string;
  score: number;
  atsScore: number;
  status: ResumeStatus;
  fileSize: string;
  targetRole: string;
  jobMatchScore: number;
  skillsDetected: number;
  skillCategoriesCount: number;
  scoreChangeText: string;
  atsTrendText: string;
  scoreBreakdown: {
    contentQuality: number;
    skillsKeywords: number;
    formatting: number;
    impact: number;
  };
  scoreHistory: ScoreHistoryPoint[];
  strengths: string[];
  needsAttention: string[];
  detectedSkills: {
    category: string;
    skills: string[];
  }[];
  sectionsDetected: {
    contact: boolean;
    education: boolean;
    skills: boolean;
    projects: boolean;
    experience: boolean;
  };
  sectionAnalyses: SectionAnalysis[];
  suggestions: ActionableSuggestion[];
  rawText?: string;
}

export interface JobMatchResult {
  jobRole: string;
  matchPercentage: number;
  matchedSkills: string[];
  missingKeywords: string[];
  explanation: string;
  recommendations: string[];
}

