'use client';

import { useRouter } from 'next/navigation';
import { clearToken } from '@/lib/auth';
import toast from 'react-hot-toast';

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 1️⃣ Clear token from storage/localStorage
      clearToken();

      // 2️⃣ Show toast
      toast.success('Logged out successfully!');

      // 3️⃣ Redirect to home (or login) first
      router.push('/');

      // 4️⃣ Give Next.js a tick to finish navigation
      setTimeout(() => {
        // Force reload to clear any cached client-side state
        window.location.href = '/login';
      }, 400); // slight delay makes sure push() finishes first
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 flex items-center space-x-1"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
