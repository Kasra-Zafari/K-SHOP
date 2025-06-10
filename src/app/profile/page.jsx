'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : { user: null })
      .then(data => {
        if (!data.user) {
          router.push('/login');
        } else {
          setUser(data.user);
        }
      });
  }, [router]);

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