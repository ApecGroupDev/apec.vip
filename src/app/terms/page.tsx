import Link from 'next/link';

export default function TermsConditions() {
  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Terms and Conditions</h1>
          <p className="text-lg text-gray-600 mb-8">
            Please read these terms and conditions carefully before using our services.
          </p>
        </div>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>
              Welcome to APEC. These Terms and Conditions govern your use of our website and services. By accessing
              or using our website, you agree to comply with these Terms. If you do not agree with these Terms, please
              do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. User Responsibilities</h2>
            <p>
              As a user, you are responsible for maintaining the confidentiality of your account and password. You agree
              to notify us immediately of any unauthorized use of your account. You also agree to use our services for
              lawful purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Privacy Policy</h2>
            <p>
              We are committed to protecting your privacy. Please review our <Link href="/privacy-policy"><span className="text-[#e82228] hover:text-[#9c2e2b]">Privacy Policy</span></Link> to understand how we collect and use your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Intellectual Property</h2>
            <p>
              All content, logos, and trademarks on our website are the property of APEC. You may not use, modify, or
              distribute any content without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
            <p>
              APEC will not be liable for any indirect, incidental, or consequential damages arising from your use of
              our website. You agree to use our website at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify or update these Terms at any time. You will be notified of any significant
              changes. Continued use of our website after such changes constitutes your acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
            <p>
              If you have any questions about these Terms and Conditions, feel free to contact us at{' '}
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
