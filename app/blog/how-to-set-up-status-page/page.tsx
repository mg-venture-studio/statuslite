import Link from 'next/link';

export const metadata = {
  title: 'How to Set Up a Status Page for Your SaaS in 5 Minutes',
  description: 'Learn how to create a professional status page for your SaaS product in just 5 minutes with StatusLite.',
  keywords: ['how to create status page', 'set up status page', 'status page tutorial', 'SaaS status page'],
};

export default function HowToSetUpStatusPage() {
  return (
    <article className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <nav className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">StatusLite</span>
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-gray-900 text-sm">
            ← Back to blog
          </Link>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Set Up a Status Page for Your SaaS in 5 Minutes
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <time>October 25, 2026</time>
            <span>·</span>
            <span>4 min read</span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Your SaaS product needs a status page. It's one of the simplest ways to build trust, 
            reduce support tickets, and communicate transparently with your users. Here's how to set 
            one up in just 5 minutes.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why You Need a Status Page</h2>

          <p>Before we dive into the setup, let's talk about why a status page matters:</p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Build trust:</strong> Show users you're transparent about issues</li>
            <li><strong>Reduce support tickets:</strong> Users can check status themselves instead of emailing you</li>
            <li><strong>Improve communication:</strong> Notify subscribers automatically during incidents</li>
            <li><strong>Look professional:</strong> A status page signals you take reliability seriously</li>
          </ul>

          <p>If you don't have a status page yet, you're leaving trust on the table.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 1: Sign Up for StatusLite (30 seconds)</h2>

          <p>
            Head to <Link href="/signup" className="text-blue-600 hover:underline">StatusLite's signup page</Link> and 
            create your account. You'll need:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>An email address</li>
            <li>A password (minimum 6 characters)</li>
          </ul>

          <p>That's it. No credit card required for the free tier.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 2: Create Your Status Page (1 minute)</h2>

          <p>After signing up, you'll land on your dashboard. Click "Create new status page" and fill in:</p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Name:</strong> Your product name (e.g., "My SaaS Product")</li>
            <li><strong>URL Slug:</strong> A unique identifier (e.g., "my-saas")</li>
            <li><strong>Description:</strong> A brief description of your product (optional)</li>
          </ul>

          <p>
            Your status page will be live at <code className="bg-gray-100 px-2 py-1 rounded text-sm">statuslite.app/status/your-slug</code>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 3: Add Components (2 minutes)</h2>

          <p>
            Components are the parts of your product that users care about. Common examples:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>API</li>
            <li>Web App</li>
            <li>Database</li>
            <li>Email Service</li>
            <li>CDN</li>
          </ul>

          <p>
            On your status page dashboard, scroll to the "Components" section and add each component. 
            For each one, you can set the initial status:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Operational:</strong> Everything is working normally</li>
            <li><strong>Degraded:</strong> Performance is slower than usual</li>
            <li><strong>Partial Outage:</strong> Some features are not working</li>
            <li><strong>Major Outage:</strong> Critical systems are down</li>
            <li><strong>Maintenance:</strong> Scheduled maintenance in progress</li>
          </ul>

          <p>
            Start with all components set to "Operational" unless you're currently experiencing issues.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 4: Customize (Optional, 1 minute)</h2>

          <p>
            Your status page is live and functional, but you might want to customize it:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Custom domain:</strong> Use status.yourdomain.com (Pro plan, $9/month)</li>
            <li><strong>Description:</strong> Add a description to each component</li>
            <li><strong>Branding:</strong> Customize colors and logo (coming soon)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 5: Share with Users (30 seconds)</h2>

          <p>
            Your status page is ready! Now share it with your users:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Add a link in your app's footer: "Status"</li>
            <li>Add it to your docs: "Check our status page"</li>
            <li>Mention it in your welcome email</li>
          </ul>

          <p>
            Users can visit the page to see current status and subscribe to email notifications for incidents.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Happens During an Incident?</h2>

          <p>When something goes wrong, here's your workflow:</p>

          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>Go to your status page dashboard</li>
            <li>Click "Report incident"</li>
            <li>Fill in the incident title, description, and severity</li>
            <li>Select affected components</li>
            <li>Submit — subscribers get notified automatically</li>
          </ol>

          <p>
            You can update the incident as you investigate, and mark it resolved when everything's back to normal. 
            Users see the full timeline of updates.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Best Practices</h2>

          <p>Here are a few tips to get the most out of your status page:</p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Be honest:</strong> If something's broken, say so. Users appreciate transparency.</li>
            <li><strong>Update frequently:</strong> During incidents, post updates every 15-30 minutes.</li>
            <li><strong>Be specific:</strong> "API latency is high" is better than "We're experiencing issues."</li>
            <li><strong>Post-mortem:</strong> After major incidents, explain what happened and how you'll prevent it.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">You're Done!</h2>

          <p>
            In 5 minutes, you've set up a professional status page that will:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Build trust with your users</li>
            <li>Reduce support tickets</li>
            <li>Make you look professional</li>
            <li>Keep users informed during incidents</li>
          </ul>

          <p>
            Ready to get started? <Link href="/signup" className="text-blue-600 hover:underline font-semibold">
            Sign up for StatusLite</Link> and create your status page in 5 minutes.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Create your status page today
            </p>
            <p className="text-gray-700 mb-4">
              Free tier available. No credit card required. Set up in 5 minutes.
            </p>
            <Link href="/signup" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Get started free →
            </Link>
          </div>
        </div>
      </main>
    </article>
  );
}
