import React from 'react';
import { Leaf, Users, Target, Award, Heart, Globe, TreePine, ShoppingBag } from 'lucide-react';

export default function AboutUs() {
  const stats = [
    { number: '10,000+', label: 'Trees Planted', icon: TreePine },
    { number: '5,000+', label: 'Happy Customers', icon: Users },
    { number: '50+', label: 'Partner Communities', icon: Globe },
    { number: '100%', label: 'Sustainable Practices', icon: Award }
  ];

  const values = [
    {
      icon: Leaf,
      title: 'Environmental Stewardship',
      description: 'We are committed to protecting and restoring our planet through sustainable practices and community-driven conservation efforts.'
    },
    {
      icon: Heart,
      title: 'Community Impact',
      description: 'Every purchase and tree adoption directly supports local communities and creates meaningful social and economic impact.'
    },
    {
      icon: Target,
      title: 'Transparency',
      description: 'We believe in complete transparency in our operations, from tree planting to community partnerships and financial impact.'
    },
    {
      icon: Globe,
      title: 'Global Vision',
      description: 'While we start locally, our vision extends globally to create a worldwide network of sustainable communities and environmental restoration.'
    }
  ];

  const team = [
    {
      name: 'Ahmad Al-Masri',
      role: 'Founder & CEO',
      description: 'Environmental activist with 15+ years in sustainable development and community organizing.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Sarah Khalil',
      role: 'Head of Operations',
      description: 'Expert in supply chain management and community partnerships across the Middle East.',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Omar Hassan',
      role: 'Technology Director',
      description: 'Blockchain and sustainability technology expert, passionate about using tech for good.',
      image: '/api/placeholder/150/150'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About Zeituna</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            We're building a sustainable future where every purchase plants hope, 
            every tree adoption creates impact, and every community thrives through 
            environmental stewardship and economic empowerment.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              To create a sustainable marketplace that connects communities, supports local economies, 
              and drives environmental restoration through innovative technology and community partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Zeituna was born from a simple yet powerful vision: to create a platform where 
                  environmental conservation meets economic opportunity. Founded in Palestine, 
                  we understand the importance of community resilience and sustainable development.
                </p>
                <p>
                  Our journey began when our founder, Ahmad Al-Masri, witnessed the devastating 
                  effects of deforestation in his community. He realized that traditional approaches 
                  to environmental protection weren't enough - we needed to create economic incentives 
                  that would make conservation profitable for local communities.
                </p>
                <p>
                  Today, Zeituna combines cutting-edge blockchain technology with traditional 
                  community values to create a marketplace where every transaction contributes 
                  to environmental restoration and community development.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TreePine className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Tree Adoption Program</h3>
                    <p className="text-gray-600 text-sm">Adopt trees and track their growth in real-time</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Sustainable Marketplace</h3>
                    <p className="text-gray-600 text-sm">Shop from local vendors committed to sustainability</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Community Impact</h3>
                    <p className="text-gray-600 text-sm">Every purchase supports local communities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape our commitment to creating 
              positive change in the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind Zeituna, working together to create 
              a sustainable future for all.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Be part of the movement that's creating a sustainable future. 
            Every action you take with Zeituna contributes to environmental restoration 
            and community empowerment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/roots"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Adopt a Tree
            </a>
            <a
              href="/marketplace"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Explore Marketplace
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
