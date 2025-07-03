import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  Briefcase, 
  Shield, 
  Award,
  ArrowRight,
  Target,
  Heart,
  Zap
} from 'lucide-react';

const About: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    {
      url: 'https://images.pexels.com/photos/9816661/pexels-photo-9816661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      caption: 'Wildland firefighters working together to contain a forest fire'
    },
    {
      url: 'https://images.pexels.com/photos/9816662/pexels-photo-9816662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      caption: 'Helicopter operations supporting ground crews in fire suppression'
    },
    {
      url: 'https://images.pexels.com/photos/9816663/pexels-photo-9816663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      caption: 'Hotshot crew members creating firebreaks in challenging terrain'
    },
    {
      url: 'https://images.pexels.com/photos/9816664/pexels-photo-9816664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      caption: 'Engine crews responding to initial attack on wildland fires'
    },
    {
      url: 'https://images.pexels.com/photos/9816665/pexels-photo-9816665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      caption: 'Firefighters conducting prescribed burns for forest management'
    },
    {
      url: 'https://images.pexels.com/photos/9816666/pexels-photo-9816666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      caption: 'Training exercises preparing crews for the fire season'
    }
  ];

  const stats = [
    { number: '500+', label: 'Jobs Posted', icon: <Briefcase className="h-8 w-8" /> },
    { number: '1,200+', label: 'Firefighters Connected', icon: <Users className="h-8 w-8" /> },
    { number: '25+', label: 'Partner Agencies', icon: <Shield className="h-8 w-8" /> },
    { number: '98%', label: 'Success Rate', icon: <Award className="h-8 w-8" /> }
  ];

  const teamMembers = [
    {
      name: 'Sarah Martinez',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: '15 years in wildland firefighting, former CAL FIRE captain'
    },
    {
      name: 'Mike Thompson',
      role: 'Operations Director',
      image: 'https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: 'Former U.S. Forest Service hotshot superintendent'
    },
    {
      name: 'Jessica Chen',
      role: 'Technology Lead',
      image: 'https://images.pexels.com/photos/3760811/pexels-photo-3760811.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: 'Software engineer with passion for public safety technology'
    },
    {
      name: 'David Rodriguez',
      role: 'Agency Relations',
      image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: '20 years building partnerships across fire agencies'
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-800 to-orange-600 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/9816661/pexels-photo-9816661.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1)'
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About OC Wildlands Fire Fighters
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Connecting qualified wildland firefighters with career opportunities 
              across Southern California since 2020
            </p>
          </div>
        </div>
      </div>

      {/* Image Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Wildland Firefighting in Action
            </h2>
            <p className="text-lg text-gray-600">
              See the brave men and women who protect our communities and natural resources
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg shadow-2xl">
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                    <p className="text-white text-lg font-medium">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all"
            >
              <ChevronLeft className="h-6 w-6 text-gray-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all"
            >
              <ChevronRight className="h-6 w-6 text-gray-800" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-orange-500' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="h-8 w-8 text-orange-500 mr-3" />
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                OC Wildlands Fire Fighters was founded with a simple yet powerful mission: to bridge 
                the gap between qualified wildland firefighters and the agencies that need them most. 
                We understand that wildland firefighting is more than a job—it's a calling to protect 
                communities, preserve natural resources, and serve something greater than yourself.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our platform connects experienced firefighters, eager newcomers, and specialized 
                professionals with opportunities across Southern California's diverse fire agencies, 
                from federal hotshot crews to local prevention specialists.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/9816662/pexels-photo-9816662.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
                alt="Firefighters working together"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.pexels.com/photos/9816663/pexels-photo-9816663.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
                alt="Diverse firefighting team"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center">
                <Heart className="h-8 w-8 text-orange-500 mr-3" />
                Who We Serve
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We proudly serve the entire wildland firefighting community, from entry-level 
                firefighters taking their first steps into this challenging profession to seasoned 
                veterans seeking leadership roles and specialized positions.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-3 mr-3"></div>
                  <p className="text-gray-700"><strong>New Firefighters:</strong> Entry-level positions with comprehensive training programs</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-3 mr-3"></div>
                  <p className="text-gray-700"><strong>Experienced Crews:</strong> Hotshot, engine, and hand crew opportunities</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-3 mr-3"></div>
                  <p className="text-gray-700"><strong>Specialists:</strong> Aviation, prevention, investigation, and support roles</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-3 mr-3"></div>
                  <p className="text-gray-700"><strong>Leaders:</strong> Supervisory and management positions across all agencies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Platform */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Zap className="h-8 w-8 text-orange-500 mr-3" />
              How Our Platform Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We've streamlined the job search process to connect you with the right opportunities quickly and efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up and create a comprehensive profile showcasing your experience, 
                certifications, and career goals.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Browse Premium Jobs</h3>
              <p className="text-gray-600">
                Access exclusive job postings from top agencies with detailed descriptions, 
                requirements, and direct contact information.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Connect & Apply</h3>
              <p className="text-gray-600">
                Apply directly to positions that match your skills and receive priority 
                consideration from our partner agencies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety First */}
      <section className="py-20 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="h-16 w-16 text-orange-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Safety First, Always</h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Safety is the cornerstone of everything we do. We partner only with agencies that 
              maintain the highest safety standards and provide comprehensive training. Every job 
              posting includes detailed safety requirements and expectations, ensuring you're 
              prepared for the challenges ahead.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">100%</div>
                <p className="text-lg">Safety-Certified Agencies</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">24/7</div>
                <p className="text-lg">Safety Support Resources</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">Zero</div>
                <p className="text-lg">Tolerance for Safety Violations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600">
              Numbers that reflect our commitment to the wildland firefighting community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="flex justify-center mb-4 text-orange-500">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              Experienced professionals dedicated to serving the firefighting community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started CTA */}
      <section className="py-20 bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Advance Your Firefighting Career?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join the OC Wildlands community and discover opportunities that match your skills and passion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-orange-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/jobs"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-orange-500 transition-colors"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;