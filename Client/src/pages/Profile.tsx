import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Edit, Save, X, Wallet, ImagePlus, Mail, Lock, LogOut, User as UserIcon, ExternalLink, MapPin, CalendarDays, Trees, ArrowRight, Unlink } from 'lucide-react';
import authService from '../services/authService';
import walletService from '../services/walletService';
import { useNavigate } from 'react-router-dom';
import TokenBalance from '../components/TokenBalance';
import TokenOperations from '../components/TokenOperations';
import NetworkConfig from '../components/NetworkConfig';
import UserDiscountCodes from '../components/UserDiscountCodes';

export default function Profile() {
  const { user, loading, logout, refreshProfile } = useAuth() as any;
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', password: '', currentPassword: '', profilePicture: user?.profilePicture || '' });
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [, setIsWalletConnected] = useState<boolean>(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!loading) {
      walletService.isMetaMaskConnected().then(setIsWalletConnected).catch(() => setIsWalletConnected(false));
    }
  }, [loading]);

  useEffect(() => {
    // Ensure user info is fresh (e.g., after wallet linking)
    if (!loading) {
      refreshProfile?.();
    }
  }, [loading]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center text-xl text-red-600">Not logged in.</div>;

  const handleEdit = () => {
    setEditMode(true);
    setForm({ name: user.name, email: user.email, password: '', currentPassword: '', profilePicture: user.profilePicture || '' });
    setFormError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormError('');
    setSuccess('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm(prev => ({ ...prev, profilePicture: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSuccess('');
    if (!form.name.trim()) {
      setFormError('Name cannot be empty');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFormError('Please provide a valid email');
      return;
    }
    setSaving(true);
    try {
      const update: any = { name: form.name, email: form.email, profilePicture: form.profilePicture };
      if (form.password) {
        if (!form.currentPassword) {
          setFormError('Please enter your current password to set a new one');
          setSaving(false);
          return;
        }
        update.password = form.password;
        update.currentPassword = form.currentPassword;
      }
      await authService.updateProfile(update);
      await (refreshProfile?.() || Promise.resolve());
      setSuccess('Profile updated!');
      setEditMode(false);
    } catch (err: any) {
      setFormError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleDisconnectWallet = async () => {
    if (!confirm('Are you sure you want to disconnect your wallet? This will remove the wallet from your account.')) {
      return;
    }

    setDisconnecting(true);
    setFormError('');
    setSuccess('');

    try {
      // Disconnect from backend
      await authService.disconnectWallet();
      
      // Disconnect from wallet service
      walletService.disconnectWallet();
      
      // Refresh user profile
      await refreshProfile?.();
      
      setSuccess('Wallet disconnected successfully!');
    } catch (err: any) {
      setFormError(err.response?.data?.error || 'Failed to disconnect wallet');
    } finally {
      setDisconnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-10 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={form.profilePicture || user.profilePicture || '/treewihte1.png'}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-green-200"
                />
                {editMode && (
                  <button
                    type="button"
                    onClick={handlePickImage}
                    className="absolute -bottom-1 -right-1 bg-green-600 text-white p-1.5 rounded-full shadow hover:bg-green-700"
                  >
                    <ImagePlus className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
                <p className="text-gray-500 flex items-center gap-2"><Mail className="w-4 h-4" /> {user.email}</p>
              </div>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            <div className="flex items-center gap-3 mt-6 w-full">
              {editMode ? (
                <>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-60"
                  >
                    <Save className="w-4 h-4 mr-2" /> Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
                  >
                    <X className="w-4 h-4 mr-2" /> Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </button>
              )}
              <button
                type="button"
                onClick={logout}
                className="ml-auto inline-flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-lg font-medium hover:bg-red-100"
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </button>
            </div>
            {formError && <div className="text-red-600 text-sm mt-4">{formError}</div>}
            {success && <div className="text-green-600 text-sm mt-4">{success}</div>}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="col-span-1">
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                {editMode ? (
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                      disabled={saving}
                    />
                  </div>
                ) : (
                  <div className="text-gray-900">{user.name}</div>
                )}
              </div>

              <div className="col-span-1">
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                {editMode ? (
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                      disabled={saving}
                    />
                  </div>
                ) : (
                  <div className="text-gray-900">{user.email}</div>
                )}
              </div>

              {editMode && (
                <>
                  <div className="md:col-span-1">
                    <label className="block text-sm text-gray-600 mb-1">Current Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        name="currentPassword"
                        type="password"
                        value={form.currentPassword}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        disabled={saving}
                        placeholder="Enter current password"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm text-gray-600 mb-1">New Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        disabled={saving}
                        placeholder="Leave blank to keep current password"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Wallet</label>
                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  <Wallet className="w-5 h-5 text-green-600" />
                  {user.walletAddress ? (
                    <div className="flex-1">
                      <div className="font-mono text-sm text-gray-900">{user.walletAddress}</div>
                      <div className="text-xs text-gray-500">{user.walletConnected ? 'Connected' : 'Not connected'}</div>
                    </div>
                  ) : (
                    <div className="flex-1 text-gray-500">No wallet linked</div>
                  )}
                  {!user.walletAddress ? (
                    <button
                      type="button"
                      onClick={() => navigate('/wallet/connect')}
                      className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
                    >
                      Add Wallet <ExternalLink className="w-4 h-4 ml-1" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleDisconnectWallet}
                      disabled={disconnecting}
                      className="inline-flex items-center px-3 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 disabled:opacity-50"
                    >
                      <Unlink className="w-4 h-4 mr-1" />
                      {disconnecting ? 'Disconnecting...' : 'Disconnect'}
                    </button>
                  )}
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                {editMode && (
                  <>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-60"
                    >
                      Save Changes
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>

          {/* Network Configuration Section */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Configuration</h3>
            <NetworkConfig />
          </div>

          {/* Token Balance Section */}
          {user.walletAddress && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">TUT Token Balance</h3>
              <TokenBalance address={user.walletAddress} />
            </div>
          )}

          {/* Token Operations Section */}
          {user.walletAddress && (
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Token Operations</h3>
              <TokenOperations />
            </div>
          )}

          {/* Discount Codes Section */}
          <div className="mt-6">
            <UserDiscountCodes />
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Trees className="w-5 h-5 text-green-700" /> Adopted Trees
              </h3>
              <button
                type="button"
                onClick={() => navigate('/roots/adopt')}
                className="inline-flex items-center gap-1 text-sm text-green-700 hover:text-green-800"
              >
                Adopt a Tree <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {Array.isArray(user.adoptedTrees) && user.adoptedTrees.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.adoptedTrees.map((tree: any) => (
                  <div key={tree._id} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                    <div className="h-32 bg-gray-50">
                      <img
                        src={(tree.images && tree.images[0]) || '/tree1.png'}
                        alt={tree.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="font-semibold text-gray-900">{tree.name}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4 text-green-600" /> {tree.location || 'Unknown location'}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                        <CalendarDays className="w-4 h-4 text-green-600" />
                        {tree.plantedDate ? new Date(tree.plantedDate).toLocaleDateString() : 'Date not available'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">You haven’t adopted any trees yet.</p>
                <button
                  type="button"
                  onClick={() => navigate('/roots/adopt')}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                >
                  Adopt a Tree <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}