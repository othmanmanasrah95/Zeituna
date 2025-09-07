import React from 'react';
import { Shield, Eye, Lock, Database, Users, Globe } from 'lucide-react';

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Personal Information: Name, email address, phone number, and billing information when you create an account or make a purchase.',
        'Tree Adoption Data: Information about trees you adopt, including location, species, and adoption preferences.',
        'Usage Data: Information about how you interact with our platform, including pages visited, time spent, and features used.',
        'Device Information: IP address, browser type, operating system, and device identifiers.',
        'Blockchain Data: Wallet addresses and transaction data when using TUT tokens or other cryptocurrencies.'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'To provide and maintain our services, including tree adoption and marketplace functionality.',
        'To process transactions and manage your account.',
        'To send you updates about your adopted trees and platform notifications.',
        'To improve our services through analytics and user feedback.',
        'To comply with legal obligations and protect our rights.',
        'To communicate with you about new features, promotions, and important updates.'
      ]
    },
    {
      icon: Users,
      title: 'Information Sharing',
      content: [
        'We do not sell, trade, or rent your personal information to third parties.',
        'We may share information with trusted service providers who assist in operating our platform.',
        'We may disclose information when required by law or to protect our rights and safety.',
        'Tree adoption data may be shared with local communities and partners for conservation purposes.',
        'Aggregated, anonymized data may be used for research and improvement purposes.'
      ]
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        'We implement industry-standard security measures to protect your information.',
        'All data transmission is encrypted using SSL/TLS protocols.',
        'Sensitive information is stored in secure, encrypted databases.',
        'We regularly audit our security practices and update them as needed.',
        'Access to personal information is restricted to authorized personnel only.'
      ]
    },
    {
      icon: Globe,
      title: 'International Data Transfers',
      content: [
        'Your information may be transferred to and processed in countries other than your own.',
        'We ensure appropriate safeguards are in place for international transfers.',
        'We comply with applicable data protection laws in all jurisdictions where we operate.',
        'You have the right to know where your data is processed and stored.'
      ]
    }
  ];

  const rights = [
    'Access your personal information',
    'Correct inaccurate or incomplete data',
    'Delete your personal information',
    'Restrict processing of your data',
    'Data portability',
    'Object to processing',
    'Withdraw consent at any time'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-600 mb-4">
            Zeituna ("we," "our," or "us") is committed to protecting your privacy and personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
            you use our platform, including our website, mobile application, and services.
          </p>
          <p className="text-gray-600">
            By using our services, you agree to the collection and use of information in accordance with 
            this policy. If you do not agree with our policies and practices, please do not use our services.
          </p>
        </div>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <section.icon className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Your Rights */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Rights</h2>
          <p className="text-gray-600 mb-6">
            Under applicable data protection laws, you have certain rights regarding your personal information:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rights.map((right, index) => (
              <div key={index} className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <span className="text-gray-600">{right}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-600 mt-6">
            To exercise any of these rights, please contact us at privacy@tourath.com. 
            We will respond to your request within 30 days.
          </p>
        </div>

        {/* Cookies */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Cookies and Tracking</h2>
          <p className="text-gray-600 mb-4">
            We use cookies and similar tracking technologies to enhance your experience on our platform. 
            Cookies are small data files stored on your device that help us:
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-gray-600">Remember your preferences and settings</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-gray-600">Analyze how you use our platform</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-gray-600">Provide personalized content and advertisements</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-gray-600">Improve our services and user experience</span>
            </li>
          </ul>
          <p className="text-gray-600">
            You can control cookies through your browser settings. However, disabling cookies may 
            affect the functionality of our platform.
          </p>
        </div>

        {/* Data Retention */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Data Retention</h2>
          <p className="text-gray-600 mb-4">
            We retain your personal information for as long as necessary to provide our services 
            and fulfill the purposes outlined in this Privacy Policy. Specifically:
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-gray-600">Account information: Until you delete your account</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-gray-600">Transaction data: 7 years for tax and legal compliance</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-gray-600">Tree adoption records: Permanently for conservation tracking</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-gray-600">Usage analytics: 2 years in anonymized form</span>
            </li>
          </ul>
        </div>

        {/* Children's Privacy */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Children's Privacy</h2>
          <p className="text-gray-600">
            Our services are not intended for children under 13 years of age. We do not knowingly 
            collect personal information from children under 13. If you are a parent or guardian and 
            believe your child has provided us with personal information, please contact us immediately. 
            If we discover that we have collected information from a child under 13, we will delete 
            that information promptly.
          </p>
        </div>

        {/* Changes to Policy */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Changes to This Privacy Policy</h2>
          <p className="text-gray-600 mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by:
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-gray-600">Posting the new Privacy Policy on this page</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-gray-600">Sending you an email notification</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span className="text-gray-600">Updating the "Last updated" date at the top of this policy</span>
            </li>
          </ul>
          <p className="text-gray-600">
            We encourage you to review this Privacy Policy periodically for any changes. 
            Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-green-600 text-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy or our privacy practices, please contact us:
          </p>
          <div className="space-y-2">
            <p><strong>Email:</strong> privacy@tourath.com</p>
            <p><strong>Phone:</strong> +970 (56) 807-6985</p>
            <p><strong>Address:</strong> Deir Ghassaneh, Palestine</p>
          </div>
        </div>
      </div>
    </div>
  );
}
