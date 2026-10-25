import { Component, ComponentStatus, STATUS_LABELS, STATUS_COLORS } from '@/lib/types';

interface ComponentCardProps {
  component: Component;
}

export default function ComponentCard({ component }: ComponentCardProps) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{component.name}</h3>
        {component.description && (
          <p className="text-sm text-gray-600 mt-1">{component.description}</p>
        )}
      </div>
      <div className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[component.status]}`}>
        {STATUS_LABELS[component.status]}
      </div>
    </div>
  );
}
