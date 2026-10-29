import Link from 'next/link';

export const metadata = {
  title: 'StatusLite vs Statuspage: The Affordable Alternative for Indie SaaS',
  description: 'Compare StatusLite to Atlassian Statuspage and discover why indie SaaS founders are switching to a more affordable status page solution.',
  keywords: ['statuslite vs statuspage', 'statuspage alternative', 'cheap status page', 'affordable status page'],
};

export default function StatusLiteVsStatuspage() {
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
            StatusLite vs Statuspage: The Affordable Alternative for Indie SaaS
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <time>October 25, 2026</time>
            <span>·</span>
            <span>5 min read</span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            If you're running an indie SaaS product, you've probably considered adding a status page. 
            It's one of the simplest ways to build trust with your users and reduce support tickets. 
            But Atlassian's Statuspage starts at $29/month — that's a lot for a bootstrapped product.
          </p>

          <p>
            That's where <strong>StatusLite</strong> comes in. We built StatusLite specifically for indie SaaS founders 
            who need a professional status page without the enterprise price tag.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Problem with Statuspage</h2>

          <p>
            Statuspage (now owned by Atlassian) is the industry standard. It's used by companies like DigitalOcean, 
            Dropbox, and Reddit. But there's a catch: <strong>it's expensive</strong>.
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Free tier:</strong> Only 1 status page, limited components, no custom domain</li>
            <li><strong>Pro plan:</strong> $29/month for basic features</li>
            <li><strong>Business plan:</strong> $99/month (still missing advanced features)</li>
            <li><strong>Enterprise:</strong> $199+/month</li>
          </ul>

          <p>
            For a bootstrapped SaaS making $500-2000 MRR, spending $29-99/month on a status page 
            doesn't make sense. That's 2-10% of your revenue just to tell users if your API is down.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Enter StatusLite</h2>

          <p>
            StatusLite is built for indie hackers. We offer everything you need at a price that makes sense 
            for small SaaS products:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Free tier:</strong> 1 status page, 3 components, basic incident management</li>
            <li><strong>Pro plan:</strong> $9/month — unlimited components, custom domain, email subscribers</li>
            <li><strong>Team plan:</strong> $19/month — multiple team members, Slack integration, API access</li>
          </ul>

          <p>
            That's <strong>69% cheaper than Statuspage</strong> for comparable features.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Feature Comparison</h2>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4 font-semibold">Feature</th>
                  <th className="text-center py-3 px-4 font-semibold">StatusLite</th>
                  <th className="text-center py-3 px-4 font-semibold">Statuspage</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">Starting price</td>
                  <td className="text-center py-3 px-4 text-green-600 font-semibold">$0</td>
                  <td className="text-center py-3 px-4">$0 (limited)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">Paid plan price</td>
                  <td className="text-center py-3 px-4 text-green-600 font-semibold">$9/mo</td>
                  <td className="text-center py-3 px-4">$29/mo</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">Custom domain</td>
                  <td className="text-center py-3 px-4">✅ Pro ($9)</td>
                  <td className="text-center py-3 px-4">✅ Pro ($29)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">Email subscribers</td>
                  <td className="text-center py-3 px-4">✅ Pro ($9)</td>
                  <td className="text-center py-3 px-4">✅ Pro ($29)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">Unlimited components</td>
                  <td className="text-center py-3 px-4">✅ Pro ($9)</td>
                  <td className="text-center py-3 px-4">✅ Pro ($29)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">Incident management</td>
                  <td className="text-center py-3 px-4">✅</td>
                  <td className="text-center py-3 px-4">✅</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">Beautiful design</td>
                  <td className="text-center py-3 px-4">✅</td>
                  <td className="text-center py-3 px-4">✅</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Choose StatusLite?</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Built for Indie Hackers</h3>
          <p>
            We understand the indie SaaS journey. StatusLite is designed to be simple, affordable, 
            and just powerful enough. No bloat, no enterprise features you'll never use.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Set Up in 5 Minutes</h3>
          <p>
            Sign up, create your first status page, add your components. That's it. No complex setup, 
            no configuration files, no DevOps required.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Beautiful by Default</h3>
          <p>
            Your status page looks professional out of the box. Clean design, responsive layout, 
            and accessible to all users.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Email Notifications</h3>
          <p>
            Users can subscribe to updates via email. When you report an incident, they get notified 
            automatically. No more "Is the site down?" tweets.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Custom Domain</h3>
          <p>
            Use your own domain (status.yourproduct.com) for a branded, professional experience. 
            Available on the $9/month Pro plan.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Who Should Use StatusLite?</h2>

          <p>StatusLite is perfect for:</p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Indie SaaS founders and solo developers</li>
            <li>Small teams (1-10 people)</li>
            <li>Bootstrapped products under $5k MRR</li>
            <li>Side projects and open source tools</li>
            <li>Anyone who wants a simple, affordable status page</li>
          </ul>

          <p>If you're making $10k+ MRR and need enterprise features like SSO, SLAs, or dedicated support, 
            Statuspage might be a better fit. But for everyone else, StatusLite is the smarter choice.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Get Started for Free</h2>

          <p>
            Ready to build trust with your users? <Link href="/signup" className="text-blue-600 hover:underline font-semibold">
            Sign up for StatusLite</Link> and create your first status page in 5 minutes. 
            No credit card required.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Start your free status page today
            </p>
            <p className="text-gray-700 mb-4">
              Join hundreds of indie SaaS founders using StatusLite to communicate transparently with their users.
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
