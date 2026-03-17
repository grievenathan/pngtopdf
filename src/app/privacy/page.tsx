import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata = {
  title: "Privacy Policy - PNG To JPG",
  description: "Privacy policy for pngtojpg.co.uk. All image conversion happens locally in your browser - your files never leave your device.",
};

export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen">
      {/* Nav */}
      <nav className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo size={32} />
            <span className="text-[15px] font-bold tracking-tight text-white">
              PNG To JPG
            </span>
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mb-12 text-sm text-muted">Last updated: March 2026</p>

        <div className="space-y-10">

          <Section title="The short version">
            <p>
              This tool converts your PNG images to JPG entirely inside your browser.
              Your image files are never uploaded to our servers - they stay on your
              device at all times.
            </p>
          </Section>

          <Section title="Who we are">
            <p>
              pngtojpg.co.uk is operated by Modern CV Limited.
            </p>
          </Section>

          <Section title="How the conversion works">
            <p>
              All image processing runs locally in your web browser. When you
              select or drop a file:
            </p>
            <ul className="mt-3 space-y-2 text-muted">
              <ListItem>The file is read into browser memory only</ListItem>
              <ListItem>The conversion happens on your device - no image data leaves your browser</ListItem>
              <ListItem>The converted JPG is made available for download directly</ListItem>
            </ul>
          </Section>

          <Section title="Information we may collect">
            <p>
              While your image files are never sent to our servers, we may collect
              standard usage information to help improve the site. This may include:
            </p>
            <ul className="mt-3 space-y-2 text-muted">
              <ListItem>Anonymous usage data such as page views and general traffic patterns</ListItem>
              <ListItem>Device and browser information</ListItem>
              <ListItem>Approximate location based on IP address</ListItem>
            </ul>
          </Section>

          <Section title="Cookies and advertising">
            <p>
              We may use cookies and similar technologies for site functionality,
              analytics, and advertising purposes. Third-party advertising partners
              may also set cookies to serve relevant ads. You can manage your cookie
              preferences through your browser settings.
            </p>
          </Section>

          <Section title="Third-party services">
            <p>
              We use Vercel Analytics to understand how visitors use this site.
              This collects anonymous, aggregated data such as page views,
              referral sources, and general visitor demographics. No personally
              identifiable information is collected by Vercel Analytics.
            </p>
            <p className="mt-3">
              We may also use additional third-party services for advertising
              and other purposes. These services may collect information in
              accordance with their own privacy policies. We encourage you to
              review their policies.
            </p>
          </Section>

          <Section title="Children">
            <p>
              This site is a general-purpose utility. We do not knowingly collect
              personal information from children under 13.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              We may update this policy from time to time. Changes will be reflected
              by the date at the top of this page. Continued use of the site after
              changes are posted constitutes acceptance of the updated policy.
            </p>
          </Section>

        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-border pt-8">
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-sm text-muted">
              &copy; {new Date().getFullYear()} pngtojpg.co.uk
            </p>
            <Link
              href="/"
              className="text-sm text-muted hover:text-white transition-colors"
            >
              &larr; Back to converter
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-base font-semibold text-white">{title}</h2>
      <div className="text-sm leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted" />
      <span>{children}</span>
    </li>
  );
}
