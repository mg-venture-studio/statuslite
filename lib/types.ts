export type ComponentStatus = 'operational' | 'degraded' | 'partial_outage' | 'major_outage' | 'maintenance';

export type IncidentStatus = 'investigating' | 'identified' | 'monitoring' | 'resolved';

export type IncidentSeverity = 'minor' | 'major' | 'critical';

export interface StatusPage {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  description: string | null;
  custom_domain: string | null;
  theme: {
    primaryColor: string;
    logo: string | null;
  };
  created_at: string;
  updated_at: string;
}

export interface Component {
  id: string;
  status_page_id: string;
  name: string;
  description: string | null;
  status: ComponentStatus;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface Incident {
  id: string;
  status_page_id: string;
  title: string;
  description: string | null;
  status: IncidentStatus;
  severity: IncidentSeverity;
  started_at: string;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
  components?: Component[];
  updates?: IncidentUpdate[];
}

export interface IncidentUpdate {
  id: string;
  incident_id: string;
  body: string;
  status: IncidentStatus;
  created_at: string;
}

export interface Subscriber {
  id: string;
  status_page_id: string;
  email: string;
  verified: boolean;
  verification_token: string | null;
  created_at: string;
}

export const STATUS_LABELS: Record<ComponentStatus, string> = {
  operational: 'Operational',
  degraded: 'Degraded Performance',
  partial_outage: 'Partial Outage',
  major_outage: 'Major Outage',
  maintenance: 'Maintenance',
};

export const STATUS_COLORS: Record<ComponentStatus, string> = {
  operational: 'text-green-600 bg-green-50',
  degraded: 'text-yellow-600 bg-yellow-50',
  partial_outage: 'text-orange-600 bg-orange-50',
  major_outage: 'text-red-600 bg-red-50',
  maintenance: 'text-blue-600 bg-blue-50',
};

export const INCIDENT_STATUS_LABELS: Record<IncidentStatus, string> = {
  investigating: 'Investigating',
  identified: 'Identified',
  monitoring: 'Monitoring',
  resolved: 'Resolved',
};

export const INCIDENT_STATUS_COLORS: Record<IncidentStatus, string> = {
  investigating: 'bg-orange-500',
  identified: 'bg-yellow-500',
  monitoring: 'bg-blue-500',
  resolved: 'bg-green-500',
};
