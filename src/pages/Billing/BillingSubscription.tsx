import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CreditCard, 
  Calendar, 
  DollarSign, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Payment } from '../../types';

const BillingSubscription: React.FC = () => {
  const { user, updateUser, isSubscribed } = useAuth();
  const navigate = useNavigate();
  
  const [payments, setPayments] = useState<Payment[]>([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showUpdatePaymentModal, setShowUpdatePaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  useEffect(() => {
    // Load payment history
    const storedPayments = JSON.parse(localStorage.getItem('payments') || '[]');
    const userPayments = storedPayments.filter((p: Payment) => p.userId === user?.id);
    setPayments(userPayments.sort((a: Payment, b: Payment) => 
      new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()
    ));
  }, [user?.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAmount = (amount: number) => {
    return (amount / 100).toFixed(2);
  };

  const getNextBillingDate = () => {
    if (!user?.subscriptionExpiry) return null;
    return new Date(user.subscriptionExpiry);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setPaymentData({ ...paymentData, [name]: formatted });
    } else if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2').substr(0, 5);
      setPaymentData({ ...paymentData, [name]: formatted });
    } else if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '').substr(0, 3);
      setPaymentData({ ...paymentData, [name]: formatted });
    } else {
      setPaymentData({ ...paymentData, [name]: value });
    }
  };

  const handleUpdatePaymentMethod = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMessage({ type: 'success', text: 'Payment method updated successfully!' });
      setShowUpdatePaymentModal(false);
      setPaymentData({ cardNumber: '', expiryDate: '', cvv: '', nameOnCard: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update payment method. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      updateUser({
        subscriptionStatus: 'cancelled'
      });

      setMessage({ type: 'success', text: 'Subscription cancelled successfully. You can reactivate anytime.' });
      setShowCancelModal(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to cancel subscription. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleReactivateSubscription = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newExpiry = new Date();
      newExpiry.setMonth(newExpiry.getMonth() + 1);

      updateUser({
        subscriptionStatus: 'active',
        subscriptionExpiry: newExpiry.toISOString()
      });

      // Add new payment record
      const newPayment: Payment = {
        id: Date.now().toString(),
        userId: user?.id || '',
        amount: 500,
        currency: 'usd',
        status: 'succeeded',
        paymentDate: new Date().toISOString(),
        subscriptionPeriodStart: new Date().toISOString(),
        subscriptionPeriodEnd: newExpiry.toISOString()
      };

      const allPayments = JSON.parse(localStorage.getItem('payments') || '[]');
      allPayments.push(newPayment);
      localStorage.setItem('payments', JSON.stringify(allPayments));
      setPayments([newPayment, ...payments]);

      setMessage({ type: 'success', text: 'Subscription reactivated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to reactivate subscription. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'text-green-600 bg-green-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'succeeded':
        return <CheckCircle className="h-4 w-4" />;
      case 'failed':
        return <XCircle className="h-4 w-4" />;
      case 'pending':
        return <RefreshCw className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-600 hover:text-orange-600 transition-colors mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
        <p className="text-gray-600 mt-2">Manage your subscription and payment information</p>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-700' 
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Plan */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-orange-500" />
            Current Plan
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Plan</span>
              <span className="font-semibold">Premium Access</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Price</span>
              <span className="font-semibold">$5.00/month</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status</span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                user?.subscriptionStatus === 'active' 
                  ? 'bg-green-100 text-green-800'
                  : user?.subscriptionStatus === 'cancelled'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {user?.subscriptionStatus === 'active' ? 'Active' : 
                 user?.subscriptionStatus === 'cancelled' ? 'Cancelled' : 'Inactive'}
              </span>
            </div>

            {isSubscribed && getNextBillingDate() && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Next Billing Date</span>
                <span className="font-semibold flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-orange-500" />
                  {formatDate(getNextBillingDate()!.toISOString())}
                </span>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Plan Features</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Access to all job postings</li>
                <li>• Direct contact information</li>
                <li>• Save and bookmark jobs</li>
                <li>• Priority access to new listings</li>
                <li>• Email alerts for matching jobs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Method & Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-500">Expires 12/25</p>
                </div>
              </div>
              <button
                onClick={() => setShowUpdatePaymentModal(true)}
                className="text-orange-600 hover:text-orange-700 transition-colors"
              >
                <Edit className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {user?.subscriptionStatus === 'active' ? (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="w-full px-4 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
                >
                  Cancel Subscription
                </button>
              ) : user?.subscriptionStatus === 'cancelled' ? (
                <button
                  onClick={handleReactivateSubscription}
                  disabled={loading}
                  className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Reactivating...' : 'Reactivate Subscription'}
                </button>
              ) : (
                <button
                  onClick={() => navigate('/subscribe')}
                  className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  Subscribe Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-orange-500" />
          Payment History
        </h2>

        {payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(payment.paymentDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${formatAmount(payment.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        <span className="ml-1 capitalize">{payment.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(payment.subscriptionPeriodStart)} - {formatDate(payment.subscriptionPeriodEnd)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No payment history available</p>
          </div>
        )}
      </div>

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cancel Subscription</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your current billing period.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Keep Subscription
              </button>
              <button
                onClick={handleCancelSubscription}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Cancelling...' : 'Cancel Subscription'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Payment Method Modal */}
      {showUpdatePaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Payment Method</h3>
            <form onSubmit={handleUpdatePaymentMethod} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  name="nameOnCard"
                  required
                  value={paymentData.nameOnCard}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  required
                  placeholder="1234 5678 9012 3456"
                  value={paymentData.cardNumber}
                  onChange={handleInputChange}
                  maxLength={19}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    required
                    placeholder="MM/YY"
                    value={paymentData.expiryDate}
                    onChange={handleInputChange}
                    maxLength={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    required
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={handleInputChange}
                    maxLength={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUpdatePaymentModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingSubscription;