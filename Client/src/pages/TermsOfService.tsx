import React from 'react';
import { FileText, Scale, AlertTriangle, Shield, Users, CreditCard } from 'lucide-react';

export default function TermsOfService() {
  const sections = [
    {
      icon: Users,
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using Zeituna platform, you accept and agree to be bound by the terms and provision of this agreement.',
        'If you do not agree to abide by the above, please do not use this service.',
        'These terms apply to all visitors, users, and others who access or use the service.',
        'We reserve the right to modify these terms at any time without prior notice.'
      ]
    },
    {
      icon: Shield,
      title: 'User Accounts and Responsibilities',
      content: [
        'You must provide accurate and complete information when creating an account.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You must notify us immediately of any unauthorized use of your account.',
        'You are responsible for all activities that occur under your account.',
        'You must be at least 18 years old to create an account and use our services.',
        'One person or legal entity may maintain no more than one free account.'
      ]
    },
    {
      icon: CreditCard,
      title: 'Payment Terms and Refunds',
      content: [
        'All payments are processed securely through our payment partners.',
        'Prices are subject to change without notice.',
        'Refunds are processed within 5-10 business days of approval.',
        'Tree adoption fees are non-refundable once the adoption process begins.',
        'We accept TUT tokens, credit cards, and other approved payment methods.',
        'You are responsible for any applicable taxes on your purchases.'
      ]
    },
    {
      icon: Scale,
      title: 'Tree Adoption Program',
      content: [
        'Tree adoptions are symbolic and represent your contribution to environmental conservation.',
        'Adopted trees remain the property of local communities and conservation organizations.',
        'You will receive regular updates about your adopted tree for the duration of the program.',
        'Tree adoption does not grant you ownership rights to the physical tree or land.',
        'We reserve the right to relocate or replace trees due to environmental or safety concerns.',
        'Adoption certificates are provided for your records and are not transferable.'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Prohibited Uses',
      content: [
        'You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts.',
        'You may not violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances.',
        'You may not infringe upon or violate our intellectual property rights or the intellectual property rights of others.',
        'You may not harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate.',
        'You may not submit false or misleading information.',
        'You may not upload or transmit viruses or any other type of malicious code.'
      ]
    }
  ];

  const limitations = [
    'The service is provided on an "AS IS" and "AS AVAILABLE" basis.',
    'We do not guarantee that the service will be uninterrupted or error-free.',
    'We are not responsible for any loss of data or information.',
    'We reserve the right to modify or discontinue the service at any time.',
    'We are not liable for any indirect, incidental, special, or consequential damages.',
    'Our total liability shall not exceed the amount you paid for the service in the last 12 months.'
  ];

  const intellectualProperty = [
    'All content, features, and functionality of the service are owned by Zeituna and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.',
    'You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of our material.',
    'The Zeituna name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Zeituna.',
    'You may not use such marks without our prior written permission.',
    'All other names, logos, product and service names, designs, and slogans on this service are the trademarks of their respective owners.'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600">
            Please read these terms carefully before using our platform.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
          <p className="text-gray-600 mb-4">
            These Terms of Service ("Terms") govern your use of the Zeituna platform, including our website, 
            mobile application, and services (collectively, the "Service") operated by Zeituna ("us," "we," or "our").
          </p>
          <p className="text-gray-600">
            By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any 
            part of these terms, then you may not access the Service.
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

        {/* Intellectual Property */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Intellectual Property Rights</h2>
          <ul className="space-y-3">
            {intellectualProperty.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Limitation of Liability */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Limitation of Liability</h2>
          <p className="text-gray-600 mb-4">
            In no event shall Zeituna, nor its directors, employees, partners, agents, suppliers, or affiliates, 
            be liable for any indirect, incidental, special, consequential, or punitive damages, including without 
            limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use 
            of the service.
          </p>
          <ul className="space-y-2">
            {limitations.map((limitation, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-600">{limitation}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimers */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Disclaimers</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              <strong>Service Availability:</strong> We do not guarantee that our service will be available at all times. 
              We may experience hardware, software, or other problems or need to perform maintenance related to the service, 
              resulting in interruptions, delays, or errors.
            </p>
            <p className="text-gray-600">
              <strong>Environmental Impact:</strong> While we strive to make a positive environmental impact through our 
              tree adoption and conservation programs, we cannot guarantee specific environmental outcomes or results.
            </p>
            <p className="text-gray-600">
              <strong>Third-Party Services:</strong> Our service may contain links to third-party websites or services 
              that are not owned or controlled by Zeituna. We have no control over and assume no responsibility for the 
              content, privacy policies, or practices of any third-party websites or services.
            </p>
          </div>
        </div>

        {/* Termination */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Termination</h2>
          <p className="text-gray-600 mb-4">
            We may terminate or suspend your account and bar access to the service immediately, without prior notice 
            or liability, under our sole discretion, for any reason whatsoever and without limitation, including but 
            not limited to a breach of the Terms.
          </p>
          <p className="text-gray-600 mb-4">
            If you wish to terminate your account, you may simply discontinue using the service or contact us to 
            request account deletion.
          </p>
          <p className="text-gray-600">
            Upon termination, your right to use the service will cease immediately. All provisions of the Terms 
            which by their nature should survive termination shall survive termination, including, without limitation, 
            ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
          </p>
        </div>

        {/* Governing Law */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Governing Law</h2>
          <p className="text-gray-600 mb-4">
            These Terms shall be interpreted and governed by the laws of Palestine, without regard to its conflict 
            of law provisions. Our failure to enforce any right or provision of these Terms will not be considered 
            a waiver of those rights.
          </p>
          <p className="text-gray-600">
            If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining 
            provisions of these Terms will remain in effect. These Terms constitute the entire agreement between 
            us regarding our service and supersede and replace any prior agreements we might have had between us 
            regarding the service.
          </p>
        </div>

        {/* Changes to Terms */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Changes to Terms</h2>
          <p className="text-gray-600 mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
            If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
          </p>
          <p className="text-gray-600">
            What constitutes a material change will be determined at our sole discretion. By continuing to access 
            or use our service after those revisions become effective, you agree to be bound by the revised terms. 
            If you do not agree to the new terms, please stop using the service.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-green-600 text-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
          <p className="mb-4">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="space-y-2">
            <p><strong>Email:</strong> legal@tourath.com</p>
            <p><strong>Phone:</strong> +970 (56) 807-6985</p>
            <p><strong>Address:</strong> Deir Ghassaneh, Palestine</p>
          </div>
        </div>
      </div>
    </div>
  );
}
