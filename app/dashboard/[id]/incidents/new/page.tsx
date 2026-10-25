'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface NewIncidentPageProps {
  params: Promise<{ id: string }>;
}

export default function NewIncidentPage({ params }: NewIncidentPageProps) {
  const [id] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [pageId, setPageId] = useState<string>('');

  useState(() => {
    params.then(({ id: resolvedId }) => {
      setPageId(resolvedId);
      loadComponents(resolvedId);
    });
  });

  const [components, setComponents] = useState<any[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

  async function loadComponents(statusPageId: string) {
    const { data } = await supabase
      .from('components')
      .select('*')
      .eq('status_page_id', statusPageId)
      .order('position');
    if (data) setComponents(data);
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const severity = formData.get('severity') as string;

    const res = await fetch('/api/incidents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status_page_id: pageId,
        title,
        description: description || null,
        severity,
        component_ids: selectedComponents.length > 0 ? selectedComponents : undefined,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Failed to create incident');
      setLoading(false);
      return;
    }

    router.push(`/dashboard/${pageId}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href={`/dashboard/${pageId}`} className="text-blue-600 hover:underline text-sm">
            ← Back to dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Report Incident</h1>

        <form action={handleSubmit} className="bg-white p-8 rounded-lg border border-gray-200 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Incident Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="API experiencing high latency"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Describe the incident, its impact, and any known cause..."
            />
          </div>

          <div>
            <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-2">
              Severity
            </label>
            <select
              id="severity"
              name="severity"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="minor">Minor</option>
              <option value="major">Major</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Affected Components
            </label>
            <div className="space-y-2">
              {components.map((component) => (
                <label key={component.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={component.id}
                    checked={selectedComponents.includes(component.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedComponents([...selectedComponents, component.id]);
                      } else {
                        setSelectedComponents(selectedComponents.filter((id) => id !== component.id));
                      }
                    }}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">{component.name}</span>
                </label>
              ))}
              {components.length === 0 && (
                <p className="text-sm text-gray-500">No components added yet.</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Reporting...' : 'Report incident'}
          </button>
        </form>
      </main>
    </div>
  );
}
