import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Edit, Save, X, Wallet } from 'lucide-react';

export default function Profile() {
  const { user, loading, error, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', password: '' });
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center text-xl text-red-600">Not logged in.</div>;

  const handleEdit = () => {
    setEditMode(true);
    setForm({ name: user.name, password: '' });
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSuccess('');
    if (!form.name.trim()) {
      setFormError('Name cannot be empty');
      return;
    }
    setSaving(true);
    try {
      // Only send password if changed
      const update: any = { name: form.name };
      if (form.password) update.password = form.password;
      const res = await import('../services/authService').then(m => m.default.updateProfile(update));
      setSuccess('Profile updated!');
      setEditMode(false);
    } catch (err: any) {
      setFormError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-green-100">
        <div className="flex items-center mb-8">
          <img src="/treewhite.svg" alt="Profile" className="w-16 h-16 rounded-full bg-green-100 object-contain mr-4" />
          <div>
            <h2 className="text-3xl font-bold text-green-900 mb-1">Profile</h2>
            <p className="text-gray-500">Welcome, {user.name}</p>
          </div>
        </div>
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            {editMode ? (
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                disabled={saving}
              />
            ) : (
              <div className="text-lg text-gray-900">{user.name}</div>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <div className="text-lg text-gray-900">{user.email}</div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Wallet Address</label>
            <div className="flex items-center text-gray-900">
              <Wallet className="w-5 h-5 mr-2 text-green-600" />
              {user.walletAddress ? (
                <span className="font-mono">{user.walletAddress}</span>
              ) : (
                <span className="italic text-gray-400">Not connected</span>
              )}
            </div>
          </div>
          {editMode && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">New Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                disabled={saving}
                placeholder="Leave blank to keep current password"
              />
            </div>
          )}
          {formError && <div className="text-red-600 text-sm">{formError}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <div className="flex gap-4 mt-4">
            {editMode ? (
              <>
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
                  disabled={saving}
                >
                  <Save className="w-5 h-5 mr-2" /> Save
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  <X className="w-5 h-5 mr-2" /> Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                onClick={handleEdit}
              >
                <Edit className="w-5 h-5 mr-2" /> Edit Profile
              </button>
            )}
            <button
              type="button"
              className="ml-auto px-6 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition"
              onClick={logout}
            >
              Log Out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}