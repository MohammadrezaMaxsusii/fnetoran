export interface API {
  id: string;
  ipAddress: string;
  requestedBy: string;
  action: string;
  attackType: string;
  evidence: string;
  createdAt: string;
  executedAt?: string;
  status: string;
  zones: string[];
  approvalStatus: string;
  approver: string | null;
  summary: {
    applied: number;
    failed: number;
  };
  errorMessage?: string;
}
