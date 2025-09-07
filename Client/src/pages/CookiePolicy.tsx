import React, { useState } from 'react';
import { Cookie, Settings, Eye, Shield, BarChart3, Target, CheckCircle } from 'lucide-react';

export default function CookiePolicy() {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    preferences: false
  });

  const cookieTypes = [
    {
      id: 'necessary',
      name: 'Necessary Cookies',
      icon: Shield,
      description: 'These cookies are essential for the website to function properly. They enable basic functions like page navigation, access to secure areas, and remembering your login status.',
      examples: [
        'Authentication cookies to keep you logged in',
        'Security cookies to protect against fraud',
        'Session cookies to maintain your shopping cart',
        'Load balancing cookies for website performance'
      ],
      required: true
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      icon: BarChart3,
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      examples: [
        'Google Analytics to track page views and user behavior',
        'Performance monitoring to identify technical issues',
        'User flow analysis to improve website navigation',
        'Error tracking to fix bugs and improve stability'
      ],
      required: false
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      icon: Target,
      description: 'These cookies are used to track visitors across websites to display relevant and engaging advertisements.',
      examples: [
        'Social media tracking pixels',
        'Advertising network cookies',
        'Retargeting cookies for personalized ads',
        'Conversion tracking for marketing campaigns'
      ],
      required: false
    },
    {
      id: 'preferences',
      name: 'Preference Cookies',
      icon: Settings,
      description: 'These cookies remember your choices and preferences to provide a more personalized experience.',
      examples: [
        'Language and region preferences',
        'Theme and display settings',
        'Accessibility preferences',
        'Customized content recommendations'
      ],
      required: false
    }
  ];

  const handleCookieToggle = (cookieType: string) => {
    if (cookieType === 'necessary') return; // Cannot disable necessary cookies
    
    setCookiePreferences(prev => ({
      ...prev,
      [cookieType]: !prev[cookieType]
    }));
  };

  const savePreferences = () => {
    // Here you would typically save the preferences to localStorage or send to backend
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    alert('Cookie preferences saved successfully!');
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    setCookiePreferences(allAccepted);
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    alert('All cookies accepted!');
  };

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    setCookiePreferences(onlyNecessary);
    localStorage.setItem('cookiePreferences', JSON.stringify(onlyNecessary));
    alert('Only necessary cookies accepted!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Cookie className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-xl text-gray-600">
            Learn about how we use cookies and manage your preferences.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Cookies?</h2>
          <p className="text-gray-600 mb-4">
            Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
            They are widely used to make websites work more efficiently and to provide information to website owners.
          </p>
          <p className="text-gray-600 mb-4">
            At Zeituna, we use cookies to enhance your browsing experience, analyze website traffic, and personalize 
            content. This Cookie Policy explains what cookies we use, why we use them, and how you can control them.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <Eye className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Your Privacy Matters</h3>
                <p className="text-blue-800 text-sm">
                  You have the right to choose which cookies you accept. You can manage your cookie preferences 
                  at any time using the settings below.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cookie Types */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Types of Cookies We Use</h2>
          
          {cookieTypes.map((cookieType) => (
            <div key={cookieType.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <cookieType.icon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{cookieType.name}</h3>
                    {cookieType.required && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
                        Required
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cookiePreferences[cookieType.id as keyof typeof cookiePreferences]}
                      onChange={() => handleCookieToggle(cookieType.id)}
                      disabled={cookieType.required}
                      className="sr-only"
                    />
                    <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      cookiePreferences[cookieType.id as keyof typeof cookiePreferences] 
                        ? 'bg-green-600' 
                        : 'bg-gray-200'
                    } ${cookieType.required ? 'opacity-50' : ''}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        cookiePreferences[cookieType.id as keyof typeof cookiePreferences] 
                          ? 'translate-x-6' 
                          : 'translate-x-1'
                      }`} />
                    </div>
                  </label>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{cookieType.description}</p>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Examples of what these cookies do:</h4>
                <ul className="space-y-1">
                  {cookieType.examples.map((example, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Cookie Management */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Manage Your Cookie Preferences</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={acceptAll}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Accept All</span>
            </button>
            
            <button
              onClick={rejectAll}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Shield className="w-5 h-5" />
              <span>Reject All</span>
            </button>
            
            <button
              onClick={savePreferences}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Settings className="w-5 h-5" />
              <span>Save Preferences</span>
            </button>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-1">Important Note</h3>
                <p className="text-yellow-800 text-sm">
                  Necessary cookies cannot be disabled as they are essential for the website to function properly. 
                  Disabling other types of cookies may affect your experience on our website.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Browser Settings */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browser Cookie Settings</h2>
          <p className="text-gray-600 mb-6">
            You can also control cookies through your browser settings. Here's how to manage cookies in popular browsers:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Chrome</h3>
              <ol className="text-sm text-gray-600 space-y-1">
                <li>1. Click the three dots menu → Settings</li>
                <li>2. Go to Privacy and security → Cookies and other site data</li>
                <li>3. Choose your preferred cookie settings</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Firefox</h3>
              <ol className="text-sm text-gray-600 space-y-1">
                <li>1. Click the menu button → Settings</li>
                <li>2. Go to Privacy & Security</li>
                <li>3. Under Cookies and Site Data, choose your settings</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Safari</h3>
              <ol className="text-sm text-gray-600 space-y-1">
                <li>1. Go to Safari → Preferences</li>
                <li>2. Click the Privacy tab</li>
                <li>3. Choose your cookie preferences</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Edge</h3>
              <ol className="text-sm text-gray-600 space-y-1">
                <li>1. Click the three dots menu → Settings</li>
                <li>2. Go to Cookies and site permissions</li>
                <li>3. Manage your cookie settings</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Third-Party Cookies */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Third-Party Cookies</h2>
          <p className="text-gray-600 mb-4">
            Some cookies on our website are set by third-party services. These include:
          </p>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Google Analytics</h3>
              <p className="text-gray-600 text-sm mb-2">
                We use Google Analytics to understand how visitors use our website. This helps us improve our services.
              </p>
              <p className="text-xs text-gray-500">
                <strong>Privacy Policy:</strong> <a href="https://policies.google.com/privacy" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Social Media Platforms</h3>
              <p className="text-gray-600 text-sm mb-2">
                We may use social media tracking pixels to measure the effectiveness of our social media campaigns.
              </p>
              <p className="text-xs text-gray-500">
                <strong>Platforms:</strong> Facebook, Twitter, Instagram, LinkedIn
              </p>
            </div>
          </div>
        </div>

        {/* Updates */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Updates to This Policy</h2>
          <p className="text-gray-600 mb-4">
            We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
            operational, legal, or regulatory reasons. We will notify you of any material changes by:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Posting the updated policy on our website</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Sending you an email notification if you have an account with us</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Displaying a notice on our website</span>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="bg-green-600 text-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Questions About Cookies?</h2>
          <p className="mb-4">
            If you have any questions about our use of cookies or this Cookie Policy, please contact us:
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
