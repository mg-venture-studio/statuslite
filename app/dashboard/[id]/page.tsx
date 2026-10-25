import { supabase } from '@/lib/supabase';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';

export const instant = false;

interface ManagePageProps {
  params: Promise<{ id: string }>;
}

export default async function ManageStatusPage({ params }: ManagePageProps) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { id } = await params;

  const { data: statusPage } = await supabase
    .from('status_pages')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (!statusPage) notFound();

  const { data: components } = await supabase
    .from('components')
    .select('*')
    .eq('status_page_id', id)
    .order('position', { ascending: true });

  const { data: incidents } = await supabase
    .from('incidents')
    .select('*')
    .eq('status_page_id', id)
    .order('created_at', { ascending: false })
    .limit(20);

  const { data: subscribers } = await supabase
    .from('subscribers')
    .select('id')
    .eq('status_page_id', id)
    .eq('verified', true);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 text-sm">
              ← Dashboard
            </Link>
            <h1 className="text-xl font-bold text-gray-900">{statusPage.name}</h1>
          </div>
          <div className="flex items-center space-x-3">
            <a
              href={`/status/${statusPage.slug}`}
              target="_blank"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              View public page →
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Components</h2>
              </div>
              <div className="bg-white rounded-lg border border-gray-200">
                {components && components.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {components.map((component) => (
                      <ComponentRow key={component.id} component={component} pageId={id} />
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No components yet. Add your first component below.
                  </div>
                )}
                <div className="border-t border-gray-200 p-4">
                  <AddComponentForm pageId={id} />
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Incidents</h2>
                <Link
                  href={`/dashboard/${id}/incidents/new`}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Report incident
                </Link>
              </div>
              <div className="space-y-4">
                {incidents && incidents.length > 0 ? (
                  incidents.map((incident) => (
                    <IncidentRow key={incident.id} incident={incident} pageId={id} />
                  ))
                ) : (
                  <div className="bg-white p-8 rounded-lg border border-gray-200 text-center text-gray-500">
                    No incidents reported.
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Page Details</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-gray-500">URL</dt>
                  <dd className="text-gray-900 font-mono">/status/{statusPage.slug}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Subscribers</dt>
                  <dd className="text-gray-900">{subscribers?.length || 0} verified</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Components</dt>
                  <dd className="text-gray-900">{components?.length || 0}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Custom Domain</h3>
              {statusPage.custom_domain ? (
                <p className="text-sm text-gray-900">{statusPage.custom_domain}</p>
              ) : (
                <p className="text-sm text-gray-500">No custom domain configured.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ComponentRow({ component, pageId }: { component: any; pageId: string }) {
  const statusColors: Record<string, string> = {
    operational: 'text-green-600 bg-green-50',
    degraded: 'text-yellow-600 bg-yellow-50',
    partial_outage: 'text-orange-600 bg-orange-50',
    major_outage: 'text-red-600 bg-red-50',
    maintenance: 'text-blue-600 bg-blue-50',
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <p className="font-medium text-gray-900">{component.name}</p>
        {component.description && (
          <p className="text-sm text-gray-500">{component.description}</p>
        )}
      </div>
      <div className="flex items-center space-x-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[component.status] || 'bg-gray-100 text-gray-600'}`}>
          {component.status.replace('_', ' ')}
        </span>
        <StatusDropdown componentId={component.id} currentStatus={component.status} />
      </div>
    </div>
  );
}

function StatusDropdown({ componentId, currentStatus }: { componentId: string; currentStatus: string }) {
  return (
    <form action={updateComponentStatus} className="inline">
      <input type="hidden" name="componentId" value={componentId} />
      <select
        name="status"
        defaultValue={currentStatus}
        onChange={(e) => {
          const formData = new FormData(e.target.form!);
          formData.set('status', e.target.value);
          updateComponentStatus(formData);
        }}
        className="text-xs border border-gray-300 rounded px-2 py-1"
      >
        <option value="operational">Operational</option>
        <option value="degraded">Degraded</option>
        <option value="partial_outage">Partial Outage</option>
        <option value="major_outage">Major Outage</option>
        <option value="maintenance">Maintenance</option>
      </select>
    </form>
  );
}

async function updateComponentStatus(formData: FormData) {
  'use server';
  const componentId = formData.get('componentId') as string;
  const status = formData.get('status') as string;

  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/components/${componentId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
}

function AddComponentForm({ pageId }: { pageId: string }) {
  return (
    <form action={addComponent} className="flex items-center space-x-3">
      <input type="hidden" name="pageId" value={pageId} />
      <input
        type="text"
        name="name"
        placeholder="Component name (e.g. API, Database)"
        required
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        Add
      </button>
    </form>
  );
}

async function addComponent(formData: FormData) {
  'use server';
  const pageId = formData.get('pageId') as string;
  const name = formData.get('name') as string;

  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/components`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status_page_id: pageId, name }),
  });
}

function IncidentRow({ incident, pageId }: { incident: any; pageId: string }) {
  const statusColors: Record<string, string> = {
    investigating: 'bg-orange-500',
    identified: 'bg-yellow-500',
    monitoring: 'bg-blue-500',
    resolved: 'bg-green-500',
  };

  const severityColors: Record<string, string> = {
    minor: 'text-yellow-600 bg-yellow-50',
    major: 'text-orange-600 bg-orange-50',
    critical: 'text-red-600 bg-red-50',
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{incident.title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {new Date(incident.started_at).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
            })}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${statusColors[incident.status]}`}>
            {incident.status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityColors[incident.severity]}`}>
            {incident.severity}
          </span>
        </div>
      </div>
      {incident.description && (
        <p className="text-sm text-gray-600 mt-2">{incident.description}</p>
      )}
      {incident.status !== 'resolved' && (
        <ResolveIncidentForm incidentId={incident.id} />
      )}
    </div>
  );
}

function ResolveIncidentForm({ incidentId }: { incidentId: string }) {
  return (
    <form action={resolveIncident} className="mt-3 flex items-center space-x-2">
      <input type="hidden" name="incidentId" value={incidentId} />
      <input
        type="text"
        name="update_body"
        placeholder="Add an update message..."
        className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm"
      />
      <button
        type="submit"
        name="status"
        value="resolved"
        className="bg-green-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-green-700"
      >
        Resolve
      </button>
      <button
        type="submit"
        name="status"
        value="monitoring"
        className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-700"
      >
        Update
      </button>
    </form>
  );
}

async function resolveIncident(formData: FormData) {
  'use server';
  const incidentId = formData.get('incidentId') as string;
  const status = formData.get('status') as string;
  const updateBody = formData.get('update_body') as string;

  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/incidents/${incidentId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, update_body: updateBody || undefined }),
  });
}
