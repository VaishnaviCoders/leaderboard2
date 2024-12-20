import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800">
        Privacy Policy for RSAI Leaderboard
      </h1>
      <p className="text-center text-gray-600">
        <strong>Effective Date: 15/12/2024</strong>
      </p>

      <p className="text-gray-700">
        At RSAI Leaderboard, we value your privacy and are committed to
        protecting your personal information. This Privacy Policy explains how
        we collect, use, and safeguard the data you provide when using our
        leaderboard system.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800">
        1. Information We Collect
      </h2>
      <p className="text-gray-700">
        We may collect the following types of information:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Personal Information:</strong>
          <ul className="list-inside list-disc pl-6">
            <li>Name</li>
            <li>Age</li>
            <li>Email address</li>
          </ul>
        </li>
        <li>
          <strong>Competition Data:</strong>
          <ul className="list-inside list-disc pl-6">
            <li>Performance records (e.g., solve times, scores)</li>
            <li>Event participation details (e.g., event type, age group)</li>
          </ul>
        </li>
        <li>
          <strong>Technical Information:</strong>
          <ul className="list-inside list-disc pl-6">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
          </ul>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800">
        2. How We Use Your Information
      </h2>
      <p className="text-gray-700">We use your information to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Display and update the leaderboard with accurate rankings.</li>
        <li>Verify participant performance and ensure fair competition.</li>
        <li>Generate certificates and awards for record holders.</li>
        <li>Communicate updates about the leaderboard or related events.</li>
        <li>Improve our platform and user experience.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800">
        3. Information Sharing
      </h2>
      <p className="text-gray-700">
        We do not sell or share your information with third parties, except:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>When required by law.</li>
        <li>With authorized event organizers for verification purposes.</li>
        <li>For media promotions, with your prior consent.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800">4. Data Security</h2>
      <p className="text-gray-700">
        We implement advanced security measures to protect your data from
        unauthorized access or misuse. However, no system is entirely secure,
        and we cannot guarantee absolute protection.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800">5. Your Rights</h2>
      <p className="text-gray-700">You have the right to:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Access your personal data on the leaderboard.</li>
        <li>Request corrections or updates to your data.</li>
        <li>Request the removal of your personal data.</li>
      </ul>
      <p className="text-gray-700">
        For assistance, contact us at{' '}
        <a
          href="mailto:support@rsai.co.in"
          className="text-blue-600 hover:underline"
        >
          support@rsai.co.in
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold text-gray-800">
        6. Cookies and Tracking
      </h2>
      <p className="text-gray-700">
        We use cookies to enhance your experience. Cookies help us analyze
        traffic and improve functionality. You can disable cookies via your
        browser settings, but some features may not work as intended.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800">
        7. Policy Updates
      </h2>
      <p className="text-gray-700">
        We may update this Privacy Policy from time to time. Any changes will be
        posted here with a revised effective date.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800">8. Contact Us</h2>
      <p className="text-gray-700">
        If you have any questions or concerns about this Privacy Policy, please
        contact us via email at:
      </p>
      <p className="text-gray-700">
        <a
          href="mailto:support@rsai.co.in"
          className="text-blue-600 hover:underline"
        >
          support@rsai.co.in
        </a>
      </p>

      <p className="text-gray-700">
        By using the RSAI Leaderboard, you agree to this Privacy Policy. We
        value your trust and are committed to safeguarding your information.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
