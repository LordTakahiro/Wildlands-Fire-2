import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Shield, Users, Award, Star, ArrowRight } from 'lucide-react';

const Landing: React.FC = () => {
  const features = [
    {
      icon: <Flame className="h-8 w-8 text-orange-500" />,
      title: 'Exclusive Job Access',
      description: 'Access to premium wildland firefighting positions not available elsewhere.'
    },
    {
      icon: <Shield className="h-8 w-8 text-orange-500" />,
      title: 'Verified Opportunities',
      description: 'All job postings are verified and directly from trusted agencies.'
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: 'Expert Network',
      description: 'Connect with experienced professionals and industry leaders.'
    },
    {
      icon: <Award className="h-8 w-8 text-orange-500" />,
      title: 'Career Advancement',
      description: 'Find opportunities for growth and specialization in wildland firefighting.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Hotshot Crew Member',
      content: 'Found my dream job with a Type 1 crew through OC Wildlands. The platform made it so easy to connect with the right opportunities.',
      rating: 5
    },
    {
      name: 'Mike Rodriguez',
      role: 'Engine Operator',
      content: 'The job board helped me transition from structure to wildland firefighting. Great resource for career development.',
      rating: 5
    },
    {
      name: 'Jessica Chen',
      role: 'Fire Prevention Specialist',
      content: 'Professional platform with legitimate opportunities. Worth every penny of the subscription fee.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-800 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Access Exclusive Wildland Firefighting Jobs
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Join Orange County's premier job board for wildland firefighting opportunities. 
              Connect with top agencies and advance your firefighting career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose OC Wildlands?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We connect qualified firefighters with the best opportunities in wildland firefighting
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Affordable Access
            </h2>
            <p className="text-lg text-gray-600">
              Just $5/month for unlimited access to premium firefighting jobs
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="bg-white border-2 border-orange-500 rounded-lg p-8 shadow-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Access</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-orange-500">$5</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <span className="text-orange-500 mr-2">✓</span>
                    Access to all job postings
                  </li>
                  <li className="flex items-center">
                    <span className="text-orange-500 mr-2">✓</span>
                    Direct contact information
                  </li>
                  <li className="flex items-center">
                    <span className="text-orange-500 mr-2">✓</span>
                    Save and bookmark jobs
                  </li>
                  <li className="flex items-center">
                    <span className="text-orange-500 mr-2">✓</span>
                    Priority access to new listings
                  </li>
                  <li className="flex items-center">
                    <span className="text-orange-500 mr-2">✓</span>
                    Email alerts for matching jobs
                  </li>
                </ul>
                <Link
                  to="/register"
                  className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors block text-center"
                >
                  Start Your Subscription
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600">
              Real feedback from firefighters who found their careers through OC Wildlands
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Next Opportunity?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of firefighters who have found their dream jobs through OC Wildlands
          </p>
          <Link
            to="/register"
            className="bg-white text-orange-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;