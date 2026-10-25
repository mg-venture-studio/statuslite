import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import ComponentCard from '@/components/ComponentCard';
import IncidentCard from '@/components/IncidentCard';

export const instant = false;

interface StatusPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: StatusPageProps) {
  const { slug } = await params;
  const { data: statusPage } = await supabase
    .from('status_pages')
    .select('name, description')
    .eq('slug', slug)
    .single();

  if (!statusPage) {
    return {
      title: 'Status Page Not Found',
    };
  }

  return {
    title: `${statusPage.name} - Status`,
    description: statusPage.description || `Status page for ${statusPage.name}`,
  };
}

export default async function StatusPage({ params }: StatusPageProps) {
  const { slug } = await params;
  
  const { data: statusPage } = await supabase
    .from('status_pages')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!statusPage) {
    notFound();
  }

  const { data: components } = await supabase
    .from('components')
    .select('*')
    .eq('status_page_id', statusPage.id)
    .order('position', { ascending: true });

  const { data: incidents } = await supabase
    .from('incidents')
    .select(`
      *,
      updates:incident_updates(*),
      components:incident_components(component_id)
    `)
    .eq('status_page_id', statusPage.id)
    .order('started_at', { ascending: false })
    .limit(10);

  const typedComponents = components?.map(c => ({
    ...c,
    status: c.status as import('@/lib/types').ComponentStatus,
  })) as unknown as import('@/lib/types').Component[];

  const typedIncidents = incidents?.map(i => ({
    ...i,
    status: i.status as import('@/lib/types').IncidentStatus,
    severity: i.severity as import('@/lib/types').IncidentSeverity,
  })) as unknown as import('@/lib/types').Incident[];

  const overallStatus = typedComponents?.every(c => c.status === 'operational')
    ? 'operational'
    : typedComponents?.some(c => c.status === 'major_outage')
    ? 'major_outage'
    : 'degraded';

  const statusColors = {
    operational: 'bg-green-500',
    degraded: 'bg-yellow-500',
    major_outage: 'bg-red-500',
  };

  const statusLabels = {
    operational: 'All Systems Operational',
    degraded: 'Degraded Performance',
    major_outage: 'Major Outage',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{statusPage.name}</h1>
          {statusPage.description && (
            <p className="mt-2 text-gray-600">{statusPage.description}</p>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`p-6 rounded-lg mb-8 ${overallStatus === 'operational' ? 'bg-green-50 border border-green-200' : overallStatus === 'degraded' ? 'bg-yellow-50 border border-yellow-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${statusColors[overallStatus]}`} />
            <h2 className="text-xl font-semibold text-gray-900">
              {statusLabels[overallStatus]}
            </h2>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Components</h2>
          <div className="space-y-3">
            {typedComponents?.map((component) => (
              <ComponentCard key={component.id} component={component} />
            ))}
            {(!typedComponents || typedComponents.length === 0) && (
              <p className="text-gray-600 text-center py-8">No components added yet.</p>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Incidents</h2>
          <div className="space-y-4">
            {typedIncidents?.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
            {(!typedIncidents || typedIncidents.length === 0) && (
              <p className="text-gray-600 text-center py-8">No incidents reported.</p>
            )}
          </div>
        </section>

        <section className="mt-12 bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Subscribe to updates</h2>
          <p className="text-sm text-gray-600 mb-4">Get email notifications when incidents occur.</p>
          <SubscribeForm statusPageId={statusPage.id} />
        </section>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Powered by <a href="/" className="text-blue-600 hover:underline">StatusLite</a></p>
        </div>
      </main>
    </div>
  );
}

function SubscribeForm({ statusPageId }: { statusPageId: string }) {
  return (
    <form action={subscribe} className="flex items-center space-x-3">
      <input type="hidden" name="statusPageId" value={statusPageId} />
      <input
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Subscribe
      </button>
    </form>
  );
}

async function subscribe(formData: FormData) {
  'use server';
  const statusPageId = formData.get('statusPageId') as string;
  const email = formData.get('email') as string;

  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/subscribers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status_page_id: statusPageId, email }),
  });
}
