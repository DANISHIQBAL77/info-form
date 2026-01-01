'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import Input from '@/components/ui/input';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { loginWithEmail } from '@/lib/authService';

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setStatus('error');
      return;
    }

    setStatus('loading');

    const result = await loginWithEmail(formData.email, formData.password);

    if (result.success) {
      router.push('/admin/dashboard');
    } else {
      setStatus('error');
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-purple-600 rounded-full mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-gray-300">Sign in to access the dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              required
            />

            {/* Password Field */}
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            {/* Error Alert */}
            {status === 'error' && error && (
              <Alert type="error" message={error} />
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              loading={status === 'loading'}
              icon={<LogIn className="w-5 h-5" />}
              className="w-full"
            >
              Sign In
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Protected area - Authorized access only
        </p>
      </div>
    </div>
  );
}