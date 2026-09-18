export type ThemeType = 'trust' | 'midnight' | 'aurora';

export type PageType = 'landing' | 'dashboard' | 'upload' | 'analysis' | 'risks' | 'evidence';

export type RiskSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type RiskStatus = 'CONFLICT' | 'POTENTIAL_RISK' | 'COMPLIANT';

export interface Obligation {
  id: string;
  obligation: string;
  responsible_party: string;
  deadline: string;
  frequency?: string;
  category: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  source_section: string;
  source_text: string;
  status: RiskStatus;
  risk_id?: string;
}

export interface PolicyRule {
  id: string;
  rule: string;
  category: string;
  limit_value?: string;
  source_section: string;
  source_text: string;
}

export interface ComplianceRisk {
  id: string;
  obligation_id: string;
  policy_id: string;
  title: string;
  status: RiskStatus;
  risk_level: RiskSeverity;
  category: string;
  contract_clause: string;
  contract_section: string;
  contract_metric: string;
  policy_rule: string;
  policy_section: string;
  policy_metric: string;
  difference: string;
  explanation: string;
  recommended_action: string;
  proposed_redline?: string;
  review_status: 'open' | 'in_review' | 'resolved' | 'accepted';
}

export interface UploadedDocument {
  id: string;
  name: string;
  type: 'contract' | 'policy';
  size: string;
  pages: number;
  uploadedAt: string;
  status: 'ready' | 'processing' | 'analyzed';
  content?: string;
}

export interface AnalysisState {
  complianceScore: number;
  totalContracts: number;
  obligationsCount: number;
  highRisksCount: number;
  mediumRisksCount: number;
  compliantCount: number;
  contractName: string;
  policyName: string;
  analyzedAt: string;
}
