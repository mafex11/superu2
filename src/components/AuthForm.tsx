'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';

export default function AuthForm({ mode }: { mode: 'signup' | 'login' }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = mode === 'signup' ? 'signup' : 'login';
      await axios.post(`http://localhost:8000/auth/${endpoint}`, { email, password }, {
        withCredentials: true,
      });
      router.push('/workspace');
    } catch (err) {
      setError('Authentication failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
      <h2 className="text-2xl font-bold">{mode === 'signup' ? 'Sign Up' : 'Log In'}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <Label>Email</Label>
        <Input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
      </div>
      <div>
        <Label>Password</Label>
        <Input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
      </div>
      <Button type="submit">{mode === 'signup' ? 'Sign Up' : 'Log In'}</Button>
    </form>
  );
}
