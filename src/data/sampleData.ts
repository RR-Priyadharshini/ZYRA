import { Obligation, PolicyRule, ComplianceRisk, UploadedDocument } from '../types';

export const SAMPLE_CONTRACT_TEXT = `ACME SUPPLIER MASTER SERVICES AGREEMENT
Document Reference: MSA-2026-ACME-884
Effective Date: March 1, 2026
Parties: ACME Global Technologies Inc. ("Supplier") and Client Corporation ("Customer")

SECTION 1. DATA RETENTION AND ARCHIVAL
Section 1.1 Scope of Data. Supplier processes Customer Transactional and Customer Identity Records.
Section 1.2 Retention Period. Supplier shall retain all Customer personal data, audit logs, and transaction records for a mandatory duration of seven (7) years following creation to support regulatory reporting and commercial tax reviews.

SECTION 2. SECURITY INCIDENT NOTIFICATION
Section 2.1 Breach Notification. In the event of an actual or suspected security incident affecting Customer information, Supplier shall notify Customer's Chief Information Security Officer in writing within twenty-four (24) hours of initial discovery.

SECTION 3. SECURITY AUDIT AND ACCESS
Section 3.1 Annual Audit. Customer may conduct an annual security inspection of Supplier facilities and SOC 2 Type II controls upon forty-five (45) business days prior notice.
Section 3.2 Audit Expenses. The costs of Customer-initiated audits shall be paid by Customer unless material non-compliance is identified.

SECTION 4. DATA DELETION UPON TERMINATION
Section 4.1 Return or Destruction. Within thirty (30) calendar days after the termination or expiration of this Agreement, Supplier shall securely erase and purge all Customer Confidential Information from active server disks and provide written certificate of destruction.

SECTION 5. CONFIDENTIALITY AND ENCRYPTION
Section 5.1 Mutual Confidentiality. Each party agrees to protect proprietary information using the same degree of care it uses for its own confidential information, but no less than reasonable care.
Section 5.2 Encryption Standard. All data in transit and at rest shall be encrypted using industry-recognized protocols (AES-256, TLS 1.3).

SECTION 6. ACCESS CONTROL
Section 6.1 Authorized Personnel. Access to Customer databases shall be restricted solely to Supplier employees with verified background checks and a demonstrated business need to know.

SECTION 7. BACKUP AND DISASTER RECOVERY
Section 7.1 Backup Frequency. Supplier shall execute daily automated backups of all Customer production workloads and replicate snapshots to secondary cloud availability zones.

SECTION 8. SUBCONTRACTORS AND THIRD-PARTY PROCESSORS
Section 8.1 Notice of Subcontracting. Supplier may engage third-party hosting, infrastructure, or analytics subcontractors by providing Customer with five (5) business days written notice.

SECTION 9. COMPLIANCE WITH LAWS
Section 9.1 Regulatory Adherence. Supplier shall comply with applicable data protection laws, including GDPR, CCPA/CPRA, and sector-specific financial privacy rules.`;

export const SAMPLE_POLICY_TEXT = `ENTERPRISE DATA GOVERNANCE & SECURITY POLICY
Document ID: POL-SEC-2025-V4
Applicability: All Operations, Vendor Engagements, and Procurement Contracts
Owner: Global Governance, Risk and Compliance (GRC) Office

RULE 1. DATA RETENTION THRESHOLDS
Section 3.1 Maximum Data Retention Limit. Customer personal data and personal identification records must not be retained beyond five (5) years from account closure or transaction completion. Retaining data beyond 5 years creates strict regulatory liability under privacy minimization guidelines and violates our statutory retention schedule.

RULE 2. SECURITY INCIDENT REPORTING TIMELINES
Section 3.2 Vendor Incident Reporting Window. Standard operational baseline requires third-party service providers to report confirmed security incidents within forty-eight (48) hours. Any contractual requirement imposing shorter timelines (e.g., <24h) creates severe SLA breach exposure unless expedited triage workflows are operationalized.

RULE 3. ANNUAL SECURITY REVIEW & ASSESSMENTS
Section 4.1 Audit Mandate. All Tier-1 critical technology suppliers must furnish an independent SOC 2 Type II report every twelve (12) months. On-site physical facility inspections shall be accommodated upon reasonable notice without penalty fees.

RULE 4. POST-TERMINATION DATA DESTRUCTION
Section 5.2 Purge Timelines. Third-party vendors must permanently delete, overwrite, and destroy all organizational data within thirty (30) days of contract termination, substantiated by an authorized Certificate of Destruction.

RULE 5. SUBCONTRACTOR RISK GOVERNANCE
Section 6.3 Mandatory 30-Day Vendor Clearance. Under no circumstances may a third-party vendor delegate data processing to secondary sub-processors without thirty (30) days prior security review and explicit written consent from the GRC Office.`;

export const SAMPLE_DOCUMENTS: UploadedDocument[] = [
  {
    id: 'doc-contract-01',
    name: 'ACME_Supplier_Agreement_MSA-2026.pdf',
    type: 'contract',
    size: '1.8 MB',
    pages: 14,
    uploadedAt: 'Today at 09:42 AM',
    status: 'analyzed',
    content: SAMPLE_CONTRACT_TEXT,
  },
  {
    id: 'doc-policy-01',
    name: 'Enterprise_Data_Governance_Policy_V4.pdf',
    type: 'policy',
    size: '840 KB',
    pages: 8,
    uploadedAt: 'Today at 09:44 AM',
    status: 'analyzed',
    content: SAMPLE_POLICY_TEXT,
  },
];

export const SAMPLE_RISKS: ComplianceRisk[] = [
  {
    id: 'risk-retention-01',
    obligation_id: 'obl-01',
    policy_id: 'pol-01',
    title: 'Data Retention Conflict',
    status: 'CONFLICT',
    risk_level: 'HIGH',
    category: 'Data Retention',
    contract_section: 'Section 1.2',
    contract_clause: 'Supplier shall retain all Customer personal data, audit logs, and transaction records for a mandatory duration of seven (7) years following creation.',
    contract_metric: '7 years',
    policy_section: 'Section 3.1',
    policy_rule: 'Customer personal data and personal identification records must not be retained beyond five (5) years from account closure or transaction completion.',
    policy_metric: '5 years',
    difference: '2 years over policy maximum',
    explanation: 'The contract imposes a 7-year retention obligation on customer personal data. This directly violates Organizational Policy Section 3.1, which strictly limits retention to 5 years. Retaining data 2 years beyond policy limits creates non-compliance with data minimization regulations (GDPR Art. 5(1)(e) & CCPA) and amplifies discovery exposure in litigation.',
    recommended_action: 'Escalate to Legal and Data Protection Officer. Negotiate a contract amendment capping retention at 5 years with an exception carve-out for statutory tax records only.',
    proposed_redline: 'Section 1.2 (Proposed Amendment): "Supplier shall retain Customer personal data for up to five (5) years, or such shorter retention schedule as Customer specifies in writing, except where statutory financial regulations strictly require longer archival."',
    review_status: 'open',
  },
  {
    id: 'risk-subcontractor-02',
    obligation_id: 'obl-08',
    policy_id: 'pol-05',
    title: 'Subcontractor Pre-Clearance Notice Conflict',
    status: 'CONFLICT',
    risk_level: 'HIGH',
    category: 'Subcontractors',
    contract_section: 'Section 8.1',
    contract_clause: 'Supplier may engage third-party hosting, infrastructure, or analytics subcontractors by providing Customer with five (5) business days written notice.',
    contract_metric: '5 days notice',
    policy_section: 'Section 6.3',
    policy_rule: 'Under no circumstances may a third-party vendor delegate data processing without thirty (30) days prior security review and explicit written consent from GRC Office.',
    policy_metric: '30 days prior review',
    difference: '25 days insufficient for vendor audit',
    explanation: 'A 5-day notification window makes it operationally impossible for the internal GRC team to perform mandatory third-party vendor risk assessments (TPRM), vulnerability audits, and DPA verification within the required 30-day clearance cycle.',
    recommended_action: 'Redline Section 8.1 to mandate at least 30 calendar days advance notice and explicit written consent prior to onboarding any new downstream sub-processor.',
    proposed_redline: 'Section 8.1 (Proposed Amendment): "Supplier shall provide Customer at least thirty (30) days prior written notice of any proposed subcontractor and shall not disclose Customer Data without Customer\'s express written approval."',
    review_status: 'in_review',
  },
  {
    id: 'risk-sla-03',
    obligation_id: 'obl-02',
    policy_id: 'pol-02',
    title: 'Incident Notification Window Over-Commitment',
    status: 'POTENTIAL_RISK',
    risk_level: 'MEDIUM',
    category: 'Incident Reporting',
    contract_section: 'Section 2.1',
    contract_clause: 'In the event of an actual or suspected security incident, Supplier shall notify Customer\'s CISO in writing within twenty-four (24) hours of initial discovery.',
    contract_metric: '24 hours',
    policy_section: 'Section 3.2',
    policy_rule: 'Standard operational baseline requires third-party service providers to report confirmed security incidents within forty-eight (48) hours.',
    policy_metric: '48 hours',
    difference: 'Contract requirement is 24h stricter than baseline',
    explanation: 'The contract contractual commitment (24 hours) is stricter than the standard organizational baseline (48 hours). While stricter notification enhances client protection, failure by operational incident responders to meet the expedited 24h timeline exposes the organization to material breach penalties.',
    recommended_action: 'Validate operational readiness with SOC Incident Response leads to verify whether automated 24-hour alerting playbooks are staffed 24/7/365 for this account.',
    proposed_redline: 'Section 2.1 (Proposed Amendment): "Supplier shall provide preliminary notice of confirmed critical security incidents within twenty-four (24) hours, with comprehensive forensic reports within forty-eight (48) hours."',
    review_status: 'open',
  },
  {
    id: 'risk-audit-04',
    obligation_id: 'obl-03',
    policy_id: 'pol-03',
    title: 'Audit Cost Allocation Divergence',
    status: 'POTENTIAL_RISK',
    risk_level: 'MEDIUM',
    category: 'Audit & Inspection',
    contract_section: 'Section 3.2',
    contract_clause: 'The costs of Customer-initiated audits shall be paid by Customer unless material non-compliance is identified.',
    contract_metric: 'Customer pays audit',
    policy_section: 'Section 4.1',
    policy_rule: 'On-site physical facility inspections shall be accommodated upon reasonable notice without penalty or inspection fees.',
    policy_metric: 'Vendor absorbs cooperation costs',
    difference: 'Fee allocation divergence',
    explanation: 'Policy dictates that supplier must cooperate and facilitate audits without ancillary fees. Contract forces Customer to pay for all third-party auditor hours unless a material breach is proven.',
    recommended_action: 'Insert clarifying clause that supplier internal staff facilitation and evidence production costs cannot be billed to Customer.',
    proposed_redline: 'Section 3.2 (Proposed Amendment): "Each party shall bear its own internal administrative costs in preparing for and facilitating the annual inspection."',
    review_status: 'open',
  },
  {
    id: 'risk-deletion-05',
    obligation_id: 'obl-04',
    policy_id: 'pol-04',
    title: 'Post-Termination Data Purge Alignment',
    status: 'COMPLIANT',
    risk_level: 'LOW',
    category: 'Data Deletion',
    contract_section: 'Section 4.1',
    contract_clause: 'Within thirty (30) calendar days after termination, Supplier shall securely erase and purge all Customer Confidential Information and provide written certificate.',
    contract_metric: '30 days',
    policy_section: 'Section 5.2',
    policy_rule: 'Third-party vendors must permanently delete, overwrite, and destroy all organizational data within thirty (30) days of contract termination.',
    policy_metric: '30 days',
    difference: '0 days (Exact match)',
    explanation: 'Contract clause and internal policy rule are in 100% harmonious alignment. Both mandate secure deletion within 30 days and require formal certification of destruction.',
    recommended_action: 'No contractual changes required. Log in the Vendor Compliance Registry as Compliant.',
    proposed_redline: 'N/A — Fully compliant clause.',
    review_status: 'resolved',
  },
  {
    id: 'risk-encryption-06',
    obligation_id: 'obl-05',
    policy_id: 'pol-01',
    title: 'Cryptographic Standards & Transit Protection',
    status: 'COMPLIANT',
    risk_level: 'LOW',
    category: 'Security',
    contract_section: 'Section 5.2',
    contract_clause: 'All data in transit and at rest shall be encrypted using industry-recognized protocols (AES-256, TLS 1.3).',
    contract_metric: 'AES-256 / TLS 1.3',
    policy_section: 'Section 1.1',
    policy_rule: 'All external data transfers must employ modern ciphers (minimum AES-256 and TLS 1.3).',
    policy_metric: 'AES-256 / TLS 1.3',
    difference: '0 variance (Compliant standard)',
    explanation: 'Both contract and policy adopt identical NIST-approved encryption standards.',
    recommended_action: 'Maintain automated telemetry checks during quarterly vendor reviews.',
    proposed_redline: 'N/A — Standard verified.',
    review_status: 'resolved',
  }
];

export const SAMPLE_OBLIGATIONS: Obligation[] = [
  {
    id: 'obl-01',
    obligation: 'Retain customer transaction records, logs, and personal data for seven years.',
    responsible_party: 'Supplier (ACME Global Technologies)',
    deadline: '7 years from creation',
    frequency: 'Continuous',
    category: 'Data Retention',
    severity: 'High',
    source_section: 'Section 1.2',
    source_text: 'Supplier shall retain all Customer personal data, audit logs, and transaction records for a mandatory duration of seven (7) years following creation to support regulatory reporting and commercial tax reviews.',
    status: 'CONFLICT',
    risk_id: 'risk-retention-01',
  },
  {
    id: 'obl-02',
    obligation: 'Provide written notification of security incidents to Customer CISO within 24 hours.',
    responsible_party: 'Supplier Incident Response Team',
    deadline: 'Within 24 hours of discovery',
    frequency: 'Event-driven',
    category: 'Incident Reporting',
    severity: 'Medium',
    source_section: 'Section 2.1',
    source_text: 'In the event of an actual or suspected security incident affecting Customer information, Supplier shall notify Customer\'s Chief Information Security Officer in writing within twenty-four (24) hours of initial discovery.',
    status: 'POTENTIAL_RISK',
    risk_id: 'risk-sla-03',
  },
  {
    id: 'obl-03',
    obligation: 'Permit annual security audit and inspection of facilities and SOC 2 Type II controls.',
    responsible_party: 'Supplier & Customer Audit Team',
    deadline: 'Annually (45 business days notice)',
    frequency: 'Annual',
    category: 'Audit & Inspection',
    severity: 'Medium',
    source_section: 'Section 3.1',
    source_text: 'Customer may conduct an annual security inspection of Supplier facilities and SOC 2 Type II controls upon forty-five (45) business days prior notice.',
    status: 'POTENTIAL_RISK',
    risk_id: 'risk-audit-04',
  },
  {
    id: 'obl-04',
    obligation: 'Securely delete and purge all customer confidential information within 30 calendar days.',
    responsible_party: 'Supplier Operations',
    deadline: 'Within 30 calendar days of termination',
    frequency: 'Post-termination',
    category: 'Data Deletion',
    severity: 'Low',
    source_section: 'Section 4.1',
    source_text: 'Within thirty (30) calendar days after the termination or expiration of this Agreement, Supplier shall securely erase and purge all Customer Confidential Information from active server disks and provide written certificate of destruction.',
    status: 'COMPLIANT',
    risk_id: 'risk-deletion-05',
  },
  {
    id: 'obl-05',
    obligation: 'Maintain mutual confidentiality and encrypt data using AES-256 and TLS 1.3.',
    responsible_party: 'Both Parties (Mutual)',
    deadline: 'Ongoing throughout agreement term',
    frequency: 'Continuous',
    category: 'Security',
    severity: 'Low',
    source_section: 'Section 5.2',
    source_text: 'All data in transit and at rest shall be encrypted using industry-recognized protocols (AES-256, TLS 1.3).',
    status: 'COMPLIANT',
    risk_id: 'risk-encryption-06',
  },
  {
    id: 'obl-06',
    obligation: 'Restrict customer database access solely to background-checked authorized staff.',
    responsible_party: 'Supplier Security Operations',
    deadline: 'Prior to granting access',
    frequency: 'Per-user onboarding',
    category: 'Access Control',
    severity: 'Medium',
    source_section: 'Section 6.1',
    source_text: 'Access to Customer databases shall be restricted solely to Supplier employees with verified background checks and a demonstrated business need to know.',
    status: 'POTENTIAL_RISK',
  },
  {
    id: 'obl-07',
    obligation: 'Execute automated daily backups and multi-region replication of customer data.',
    responsible_party: 'Supplier DevOps Infrastructure',
    deadline: 'Every 24 hours',
    frequency: 'Daily',
    category: 'Backup & Recovery',
    severity: 'Medium',
    source_section: 'Section 7.1',
    source_text: 'Supplier shall execute daily automated backups of all Customer production workloads and replicate snapshots to secondary cloud availability zones.',
    status: 'POTENTIAL_RISK',
  },
  {
    id: 'obl-08',
    obligation: 'Provide notice before engaging downstream cloud and infrastructure subcontractors.',
    responsible_party: 'Supplier Procurement',
    deadline: '5 business days prior notice',
    frequency: 'Per subcontract engagement',
    category: 'Subcontractors',
    severity: 'High',
    source_section: 'Section 8.1',
    source_text: 'Supplier may engage third-party hosting, infrastructure, or analytics subcontractors by providing Customer with five (5) business days written notice.',
    status: 'CONFLICT',
    risk_id: 'risk-subcontractor-02',
  },
  {
    id: 'obl-09',
    obligation: 'Ensure compliance with GDPR, CCPA, and statutory privacy regulations.',
    responsible_party: 'Supplier Compliance Officer',
    deadline: 'Continuous adherence',
    frequency: 'Continuous',
    category: 'Regulatory',
    severity: 'High',
    source_section: 'Section 9.1',
    source_text: 'Supplier shall comply with applicable data protection laws, including GDPR, CCPA/CPRA, and sector-specific financial privacy rules.',
    status: 'POTENTIAL_RISK',
  },
  {
    id: 'obl-10',
    obligation: 'Provide written Certificate of Destruction following complete data purge.',
    responsible_party: 'Supplier Information Officer',
    deadline: 'Within 10 days of purge completion',
    frequency: 'Post-termination',
    category: 'Data Deletion',
    severity: 'Low',
    source_section: 'Section 4.1',
    source_text: 'Supplier shall provide written certificate of destruction confirming irrevocable erasure.',
    status: 'COMPLIANT',
  },
  {
    id: 'obl-11',
    obligation: 'Maintain SOC 2 Type II audit report throughout contract lifecycle.',
    responsible_party: 'Supplier GRC Team',
    deadline: 'Updated every 12 months',
    frequency: 'Annual',
    category: 'Audit & Inspection',
    severity: 'Low',
    source_section: 'Section 3.1',
    source_text: 'Supplier shall maintain unbroken SOC 2 Type II attestation covering security and confidentiality principles.',
    status: 'COMPLIANT',
  },
  {
    id: 'obl-12',
    obligation: 'Ensure customer financial records remain segregated from multi-tenant co-mingling.',
    responsible_party: 'Supplier Architecture Team',
    deadline: 'At tenant provisioning',
    frequency: 'Continuous',
    category: 'Security',
    severity: 'Medium',
    source_section: 'Section 5.1',
    source_text: 'Customer records must be cryptographically or logically isolated from general tenant storage.',
    status: 'POTENTIAL_RISK',
  }
];

export const INITIAL_ANALYSIS_STATS = {
  complianceScore: 72,
  totalContracts: 24,
  obligationsCount: 12,
  highRisksCount: 3,
  mediumRisksCount: 5,
  compliantCount: 4,
  contractName: 'ACME Supplier Agreement (MSA-2026)',
  policyName: 'Enterprise Data Governance Policy V4',
  analyzedAt: 'September 18, 2026 — 09:45 AM',
};

export const RECENT_ISSUES = [
  {
    id: 'iss-1',
    contract: 'ACME Supplier Agreement #102',
    riskTitle: 'Data Retention Conflict',
    metricComparison: 'Contract: 7 years vs Policy: 5 years',
    severity: 'HIGH',
    category: 'Data Retention',
    status: 'Open',
    daysAgo: 'Today',
  },
  {
    id: 'iss-2',
    contract: 'CloudCore Infrastructure SOW #44',
    riskTitle: 'Subcontractor Pre-Clearance Window',
    metricComparison: 'Contract: 5 days vs Policy: 30 days',
    severity: 'HIGH',
    category: 'Subcontractors',
    status: 'Under Legal Review',
    daysAgo: '1 day ago',
  },
  {
    id: 'iss-3',
    contract: 'FinTech Payment Rail Addendum',
    riskTitle: 'Incident Reporting SLA Discrepancy',
    metricComparison: 'Contract: 24h vs Policy: 48h baseline',
    severity: 'MEDIUM',
    category: 'Incident Reporting',
    status: 'Assessing Operations',
    daysAgo: '3 days ago',
  },
  {
    id: 'iss-4',
    contract: 'Apex Logistics Data Pipeline Agreement',
    riskTitle: 'Audit Expense Liability Burden',
    metricComparison: 'Customer pays unless material breach',
    severity: 'MEDIUM',
    category: 'Audit',
    status: 'Amendment Drafted',
    daysAgo: '4 days ago',
  }
];

export const UPCOMING_DEADLINES = [
  {
    id: 'dl-1',
    title: 'Annual SOC 2 Type II Verification',
    vendor: 'ACME Global Technologies',
    dueIn: 'In 14 days (Oct 2, 2026)',
    category: 'Audit',
    riskLevel: 'LOW',
  },
  {
    id: 'dl-2',
    title: 'Data Retention Redline Amendment Sign-off',
    vendor: 'ACME Vendor Legal Counsel',
    dueIn: 'In 18 days (Oct 6, 2026)',
    category: 'Data Retention',
    riskLevel: 'HIGH',
  },
  {
    id: 'dl-3',
    title: 'Incident Response 24h Playbook Validation',
    vendor: 'Internal InfoSec SOC',
    dueIn: 'In 24 days (Oct 12, 2026)',
    category: 'Incident Reporting',
    riskLevel: 'MEDIUM',
  },
  {
    id: 'dl-4',
    title: 'Subcontractor TPRM Dossier Review',
    vendor: 'CloudCore Downstream Hosting',
    dueIn: 'In 30 days (Oct 18, 2026)',
    category: 'Subcontractors',
    riskLevel: 'HIGH',
  }
];
