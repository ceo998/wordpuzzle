import { Metadata } from 'next';
import { Breadcrumb } from '@/components';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for WordPuzzle. Read our terms and conditions for using our free word search puzzles.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="container-wide py-8">
      <Breadcrumb items={[{ label: 'Terms of Use' }]} />

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Terms of Use
        </h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-gray-600">
              By accessing and using WordPuzzle, you accept and agree to be bound by
              these Terms of Use. If you do not agree to these terms, please do not
              use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Description of Service
            </h2>
            <p className="text-gray-600">
              WordPuzzle provides free online word search puzzles for entertainment
              and educational purposes. Our service includes playing puzzles online,
              printing puzzles, and creating custom puzzles using our word search
              maker tool.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              User Conduct
            </h2>
            <p className="text-gray-600 mb-4">
              When using our service, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Use the service for lawful purposes only</li>
              <li>Not attempt to interfere with the proper functioning of the website</li>
              <li>Not use automated systems to access the service</li>
              <li>Not create puzzles containing offensive or inappropriate content</li>
              <li>Respect the intellectual property rights of others</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Intellectual Property
            </h2>
            <p className="text-gray-600">
              All content on WordPuzzle, including puzzles, graphics, and code, is
              owned by or licensed to us. You may use our puzzles for personal,
              educational, and non-commercial purposes. Puzzles you create using our
              maker tool are yours to use and share freely.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Disclaimer
            </h2>
            <p className="text-gray-600">
              Our service is provided &quot;as is&quot; without warranties of any kind. We do
              not guarantee that the service will be uninterrupted or error-free. We
              are not responsible for any damages arising from your use of the
              service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-600">
              WordPuzzle shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use of or
              inability to use the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. Changes will be
              effective immediately upon posting to the website. Your continued use
              of the service constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact
            </h2>
            <p className="text-gray-600">
              If you have any questions about these Terms of Use, please contact us
              through our website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
