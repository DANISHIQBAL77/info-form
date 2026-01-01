'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, ShieldCheck } from 'lucide-react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { validateContactForm } from '@/lib/utils';
import { submitContactForm } from '@/lib/Firebaseservice';

export default function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async () => {
    setErrors({});
    setAlertMessage('');
    
    // Validate form
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setStatus('error');
      setAlertMessage(Object.values(validation.errors)[0]);
      return;
    }

    setStatus('loading');

    // Submit to Firebase
    const result = await submitContactForm(formData);

    if (result.success) {
      setStatus('success');
      setAlertMessage('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      setTimeout(() => {
        setStatus('idle');
        setAlertMessage('');
      }, 3000);
    } else {
      setStatus('error');
      setAlertMessage(result.error || 'Failed to send message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative">
      {/* Admin Access Button - Top Right */}
      <button
        onClick={() => router.push('/admin/login')}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-purple-600 hover:to-blue-600 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl group transform hover:scale-105"
        title="Admin Access"
      >
        <ShieldCheck className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
        <span className="font-semibold text-black text-sm">Admin</span>
      </button>

      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Get In Touch</h1>
          <p className="text-gray-600">We'd love to hear from you. Send us a message!</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="space-y-6">
            {/* Name Field */}
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              error={errors.name}
            />

            {/* Email Field */}
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              error={errors.email}
            />

            {/* Phone Field */}
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              error={errors.phone}
            />

            {/* Message Field */}
            <Textarea
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us what you're thinking..."
              required
              error={errors.message}
            />

            {/* Alert Messages */}
            {status === 'success' && (
              <Alert type="success" message={alertMessage} />
            )}

            {status === 'error' && alertMessage && (
              <Alert type="error" message={alertMessage} />
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              loading={status === 'loading'}
              icon={!status === 'loading' && <Send className="w-5 h-5" />}
              className="w-full"
            >
              Send Message
            </Button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-800 mt-6">
          By <span className='font-bold'>DANISH</span>
        </p>
        <p className="text-center text-sm text-gray-500 mt-6">
          Your information is secure and will never be shared with third parties.
        </p>
        <p className="text-center text-sm text-gray-500 mt-6">
          © 2024 Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
}