import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import walletService from '../../services/walletService';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const connectWallet = async () => {
    setIsConnectingWallet(true);
    setError('');
    
    try {
      const walletInfo = await walletService.connectWallet();
      setWalletAddress(walletInfo.address);
      setIsWalletConnected(true);
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnectingWallet(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password, isWalletConnected ? walletAddress : undefined);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/assets_task_01k0mvvh89efqadt8dwf17x9kc_task_01k0mvvh89efqadt8dwf17x9kc_genid_b3f2495d-219b-49ef-b888-fdb551baf921_25_07_20_21_31_275149_videos_00000_61819355_source.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-10" />

      {/* Registration Form */}
      <div className="relative min-h-screen flex items-center justify-center z-20 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md p-8 backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl"
        >
          <div className="text-center mb-8">
            <Link to="/">
              <img src="/treewihte1.png" alt="Zeituna Logo" className="w-20 h-20 mx-auto mb-4 object-contain" />
            </Link>
            <h2 className="text-3xl font-extrabold text-white">Join Zeituna</h2>
            <p className="text-green-100 font-medium">Create an account to start your sustainable journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center">
                {error}
              </div>
            )}

            {/* Full Name, Email, Password Inputs */}
            <div className="relative">
              <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Full Name" />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative">
              <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Email Address" />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative">
              <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={handleChange} className="w-full px-4 py-3 pl-12 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Password" />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-white">{showPassword ? <EyeOff /> : <Eye />}</button>
            </div>
            <div className="relative">
              <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} required value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-3 pl-12 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Confirm Password" />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-white">{showConfirmPassword ? <EyeOff /> : <Eye />}</button>
            </div>

            {/* Wallet Connection */}
            {!isWalletConnected ? (
              <button type="button" onClick={connectWallet} disabled={isConnectingWallet} className="w-full flex items-center justify-center space-x-2 bg-white/10 border border-white/20 text-white py-3 px-4 rounded-lg font-medium hover:bg-white/20 disabled:opacity-50">
                <Wallet className="w-5 h-5 text-green-400" />
                <span>{isConnectingWallet ? 'Connecting...' : 'Connect Wallet (Optional)'}</span>
              </button>
            ) : (
              <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg text-center">
                Wallet Connected: {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input id="terms" name="terms" type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="h-4 w-4 text-green-600 bg-white/20 border-white/30 rounded focus:ring-green-500" />
              <label htmlFor="terms" className="ml-2 text-gray-300 text-sm">I agree to the <Link to="/terms" className="text-green-400 hover:text-green-300">Terms</Link> and <Link to="/privacy" className="text-green-400 hover:text-green-300">Privacy Policy</Link></label>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isLoading || !agreedToTerms} className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-bold text-lg shadow-lg transition-all duration-200 hover:from-green-700 hover:to-blue-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-green-400 hover:text-green-300">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}