import { Incident, INCIDENT_STATUS_LABELS, INCIDENT_STATUS_COLORS } from '@/lib/types';

interface IncidentCardProps {
  incident: Incident;
}

export default function IncidentCard({ incident }: IncidentCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{incident.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{formatDate(incident.started_at)}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium text-white ${INCIDENT_STATUS_COLORS[incident.status]}`}>
          {INCIDENT_STATUS_LABELS[incident.status]}
        </div>
      </div>
      
      {incident.description && (
        <p className="text-gray-700 mb-4">{incident.description}</p>
      )}

      {incident.updates && incident.updates.length > 0 && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Updates</h4>
          <div className="space-y-3">
            {incident.updates.map((update) => (
              <div key={update.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${INCIDENT_STATUS_COLORS[update.status]}`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{update.body}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(update.created_at)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
