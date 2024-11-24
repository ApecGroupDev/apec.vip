import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 mb-8">
            At APEC, your privacy is important to us. Please read this policy to understand how we collect, use, and protect
            your personal information.
          </p>
        </div>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
            <p>
              We collect personal information from you when you visit our website, sign up for our services, or contact us. This
              information may include your name, email address, phone number, and other information necessary to fulfill your
              requests.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
            <p>
              We use your personal information to provide and improve our services, respond to inquiries, send promotional
              offers, and communicate updates about our website. We will never sell or share your information with third parties
              without your consent, except as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Cookies and Tracking Technologies</h2>
            <p>
              Our website uses cookies to enhance your experience and track website activity. Cookies are small files stored
              on your device that help us personalize your experience. You can manage your cookie preferences through your
              browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
            <p>
              We take reasonable measures to protect your personal data from unauthorized access, alteration, or disclosure.
              However, no security system is 100% secure, and we cannot guarantee the absolute security of your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Third-Party Services</h2>
            <p>
              We may use third-party services, such as payment processors or analytics providers, to help us operate our website
              and services. These third parties may have access to your personal information to the extent necessary to perform
              their functions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete the personal information we have about you. If you would like
              to exercise these rights, please contact us at{' '}
              <a href="mailto:Service@TheAPECgroup.com" className="text-[#e82228] hover:text-[#9c2e2b]">
                Service@TheAPECgroup.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Changes to this Privacy Policy</h2>
            <p>
              We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this
              page with an updated date. Your continued use of our website after such changes indicates your acceptance of the
              updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at{' '}
              <a href="mailto:Service@TheAPECgroup.com" className="text-[#e82228] hover:text-[#9c2e2b]">
                Service@TheAPECgroup.com
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[#e82228] hover:text-[#9c2e2b]">
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
