import { Metadata } from 'next';
import { Breadcrumb } from '@/components';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for WordPuzzle. Learn how we handle your data and protect your privacy.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="container-wide py-8">
      <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 mb-4">
              WordPuzzle is committed to protecting your privacy. We collect minimal
              information necessary to provide our services:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                <strong>Usage Data:</strong> We may collect anonymous usage statistics
                to improve our service.
              </li>
              <li>
                <strong>Local Storage:</strong> We use browser local storage to save
                your game progress and preferences.
              </li>
              <li>
                <strong>Cookies:</strong> We may use essential cookies for site
                functionality.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-600 mb-4">
              Any information we collect is used solely to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Provide and maintain our service</li>
              <li>Improve user experience</li>
              <li>Analyze usage patterns to enhance our puzzles</li>
              <li>Save your game progress locally on your device</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Data Storage
            </h2>
            <p className="text-gray-600">
              All game progress and preferences are stored locally on your device
              using browser local storage. We do not store personal information on
              our servers. You can clear this data at any time through your browser
              settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Third-Party Services
            </h2>
            <p className="text-gray-600">
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices of these external sites. We
              encourage you to review their privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Children&apos;s Privacy
            </h2>
            <p className="text-gray-600">
              Our service is designed to be family-friendly and safe for children.
              We do not knowingly collect personal information from children. Our
              puzzles can be enjoyed by users of all ages without providing any
              personal data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-600">
              We may update this privacy policy from time to time. We will notify
              you of any changes by posting the new policy on this page with an
              updated date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us
              through our website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
