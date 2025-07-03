import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Check, Flame } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Subscribe: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  const [error, setError] = useState('');
  
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      // Format card number with spaces
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setPaymentData({ ...paymentData, [name]: formatted });
    } else if (name === 'expiryDate') {
      // Format expiry date MM/YY
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2').substr(0, 5);
      setPaymentData({ ...paymentData, [name]: formatted });
    } else if (name === 'cvv') {
      // Limit CVV to 3 digits
      const formatted = value.replace(/\D/g, '').substr(0, 3);
      setPaymentData({ ...paymentData, [name]: formatted });
    } else {
      setPaymentData({ ...paymentData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // Simulate successful payment
      const subscriptionExpiry = new Date();
      subscriptionExpiry.setMonth(subscriptionExpiry.getMonth() + 1);

      updateUser({
        subscriptionStatus: 'active',
        subscriptionExpiry: subscriptionExpiry.toISOString()
      });

      // Save payment record
      const payment = {
        id: Date.now().toString(),
        userId: user?.id || '',
        amount: 500, // $5.00 in cents
        currency: 'usd',
        status: 'succeeded' as const,
        paymentDate: new Date().toISOString(),
        subscriptionPeriodStart: new Date().toISOString(),
        subscriptionPeriodEnd: subscriptionExpiry.toISOString()
      };

      const payments = JSON.parse(localStorage.getItem('payments') || '[]');
      payments.push(payment);
      localStorage.setItem('payments', JSON.stringify(payments));

      navigate('/jobs');
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    'Access to all job postings',
    'Direct contact information',
    'Save and bookmark jobs',
    'Priority access to new listings',
    'Email alerts for matching jobs',
    'Advanced filtering options',
    'Detailed job descriptions',
    'Application tracking'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Flame className="h-12 w-12 text-orange-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Subscribe to Access Premium Jobs</h1>
          <p className="text-lg text-gray-600 mt-2">
            Join hundreds of firefighters advancing their careers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subscription Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Access</h2>
            <div className="mb-6">
              <span className="text-4xl font-bold text-orange-500">$5</span>
              <span className="text-gray-600 text-lg">/month</span>
            </div>
            
            <div className="space-y-3 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-800 mb-2">Why Subscribe?</h3>
              <p className="text-orange-700 text-sm">
                Free users can only see job titles and locations. Subscribe to view full job details, 
                contact information, and apply directly to positions.
              </p>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700">
                  Name on Card
                </label>
                <input
                  type="text"
                  id="nameOnCard"
                  name="nameOnCard"
                  required
                  value={paymentData.nameOnCard}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    required
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={handleInputChange}
                    maxLength={19}
                    className="block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                  <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    required
                    placeholder="MM/YY"
                    value={paymentData.expiryDate}
                    onChange={handleInputChange}
                    maxLength={5}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    required
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={handleInputChange}
                    maxLength={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Subscription (Monthly)</span>
                  <span className="font-semibold">$5.00</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span>$5.00</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-md font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing Payment...' : 'Subscribe Now - $5/month'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Your subscription will automatically renew monthly. Cancel anytime from your dashboard.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;