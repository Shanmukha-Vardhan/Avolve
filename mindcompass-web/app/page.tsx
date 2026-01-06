import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-20">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[var(--color-primary-50)] via-[var(--background)] to-[var(--color-secondary-50)]" />

        {/* Floating orbs */}
        <div className="absolute left-1/4 top-1/4 -z-10 h-72 w-72 rounded-full bg-[var(--color-primary-200)] opacity-20 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-[var(--color-secondary-200)] opacity-20 blur-3xl animate-float" style={{ animationDelay: '1s' }} />

        {/* Content */}
        <div className="container mx-auto max-w-4xl text-center">
          {/* Logo/Icon */}
          <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] shadow-lg animate-scale-in">
            <span className="text-4xl font-bold text-white">A</span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-[var(--foreground)] md:text-6xl lg:text-7xl animate-fade-in-up">
            Evolve Your
            <span className="text-gradient block">Digital Presence</span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-[var(--foreground-secondary)] md:text-xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            We craft exceptional web experiences that help businesses grow. Modern, high-performance applications built with cutting-edge technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link
              href="/contact"
              className="btn btn-primary btn-lg group relative overflow-hidden shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10">Start Your Project</span>
              <svg
                className="relative z-10 ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <Link
              href="/work"
              className="btn btn-secondary btn-lg"
            >
              View Our Work
            </Link>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="container mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {[
            {
              icon: '🚀',
              title: 'Web Development',
              description: 'High-performance web applications built with Next.js, React, and modern technologies.',
            },
            {
              icon: '🎨',
              title: 'UI/UX Design',
              description: 'Beautiful, intuitive interfaces that delight users and drive engagement.',
            },
            {
              icon: '⚡',
              title: 'Digital Strategy',
              description: 'Data-driven solutions that help your business evolve and stay ahead of the curve.',
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="card card-hover group"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--background-secondary)] text-2xl transition-transform group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[var(--foreground)]">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--background-secondary)] px-4 py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 text-sm text-[var(--foreground-muted)] md:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] text-sm font-bold text-white">A</span>
            <span className="font-semibold text-[var(--foreground)]">Avolve</span>
          </div>
          <p>© {new Date().getFullYear()} Avolve. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[var(--foreground)] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[var(--foreground)] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
