'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { useAuth } from '@/app/context/AuthContext';

export default function ProfilePage() {
  const { token, isAuthenticated } = useAuth();
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      router.push('/login');
      return;
    }
    try {
      const decoded = jwt.decode(token);
      setUser(decoded);
    } catch (err) {
      router.push('/login');
    }
  }, [isAuthenticated, token, router]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white p-6 rounded-2xl shadow-md text-center">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-12 bg-white p-6 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-[#002AB3]">Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}