import Link from 'next/link';

const blogPosts = [
  {
    slug: 'statuslite-vs-statuspage',
    title: 'StatusLite vs Statuspage: The Affordable Alternative for Indie SaaS',
    excerpt: 'Compare StatusLite to Atlassian Statuspage and discover why indie SaaS founders are switching to a more affordable status page solution.',
    date: '2026-10-25',
    readTime: '5 min read',
  },
  {
    slug: 'how-to-set-up-status-page',
    title: 'How to Set Up a Status Page for Your SaaS in 5 Minutes',
    excerpt: 'Learn how to create a professional status page for your SaaS product in just 5 minutes with StatusLite.',
    date: '2026-10-25',
    readTime: '4 min read',
  },
  {
    slug: 'best-status-page-tools',
    title: '5 Best Status Page Tools for Indie Hackers in 2026',
    excerpt: 'A comprehensive comparison of the best status page tools for indie hackers and small SaaS teams.',
    date: '2026-10-25',
    readTime: '7 min read',
  },
  {
    slug: 'why-saas-needs-status-page',
    title: 'Why Every SaaS Needs a Status Page (And How to Build One)',
    excerpt: 'Discover why a status page is essential for SaaS success and how to set one up without breaking the bank.',
    date: '2026-10-25',
    readTime: '6 min read',
  },
];

export const metadata = {
  title: 'Blog — StatusLite',
  description: 'Tips, guides, and insights on status pages, incident management, and SaaS operations.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">StatusLite</span>
          </Link>
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            ← Back to home
          </Link>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600">
            Tips, guides, and insights on status pages, incident management, and SaaS operations.
          </p>
        </div>

        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="border-b border-gray-200 pb-8">
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {post.title}
                </h2>
              </Link>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <p className="text-gray-600">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="inline-block mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm">
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
