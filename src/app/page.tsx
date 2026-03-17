import Link from "next/link";
import Converter from "@/components/Converter";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Nav */}
      <nav className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <Logo size={32} />
            <span className="text-[15px] font-bold tracking-tight text-white">
              PNG To JPG
            </span>
          </div>
          <span className="hidden text-sm text-muted sm:block">
            Free &middot; Fast &middot; Private
          </span>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6">
        {/* Hero */}
        <section className="pb-10 pt-16 sm:pt-24 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium text-muted">
              Your files never leave your device
            </span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Convert PNG to JPG
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Drop your images below. Conversion happens instantly in your
            browser - no uploads, no servers, no waiting.
          </p>
        </section>

        {/* Converter */}
        <section className="pb-20">
          <Converter />
        </section>

        {/* Features */}
        <section className="pb-20">
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
            <FeatureCard
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              }
              title="Private"
              description="Files stay on your device. Nothing is uploaded - everything is processed locally in your browser."
            />
            <FeatureCard
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              }
              title="Instant"
              description="No server round-trips. Conversions happen in milliseconds, powered by your browser."
            />
            <FeatureCard
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              }
              title="Compact"
              description="JPG files are significantly smaller than PNGs. Perfect for sharing, emailing, or saving storage."
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8">
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-sm text-muted">
              &copy; {new Date().getFullYear()} pngtojpg.co.uk
            </p>
            <Link
              href="/privacy"
              className="text-sm text-muted hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-surface p-6">
      <div className="mb-3 text-muted">
        {icon}
      </div>
      <h3 className="mb-1 text-sm font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
