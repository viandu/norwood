// src/components/dashboard/settings/CreateUserModal.tsx
'use client';
import { useState, FormEvent } from 'react';
import { X, Loader2, UserPlus, KeyRound } from 'lucide-react';
import { User } from '@/lib/types';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: (newUser: User) => void;
}

export default function CreateUserModal({ isOpen, onClose, onUserCreated }: CreateUserModalProps) {
  const [username, setUsername] = useState('');
  // MODIFICATION: Email state removed
  const [password, setPassword] = useState('');
  // MODIFICATION: Added state for confirm password
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // MODIFICATION: Updated validation logic
    if (!username || !password) {
      setError('Username and password are required.');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // MODIFICATION: Removed email from the request body
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const newUser = await res.json();
        onUserCreated(newUser);
        handleClose();
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Failed to create user.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // MODIFICATION: Updated state reset logic
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-md relative">
        <button onClick={handleClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">Create New User</h2>
        {error && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-300">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Username</label>
            <div className="relative">
                <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-3 pl-10 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-sky-500 focus:border-sky-500" required />
            </div>
          </div>
          
          {/* MODIFICATION: Email input section completely removed */}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
             <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                {/* MODIFICATION: Added minLength attribute */}
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 pl-10 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-sky-500 focus:border-sky-500" required minLength={8} />
            </div>
          </div>

          {/* MODIFICATION: Added Confirm Password field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Confirm Password</label>
             <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-3 pl-10 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-sky-500 focus:border-sky-500" required placeholder="Re-enter password" />
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70">
            {isLoading && <Loader2 className="animate-spin mr-2" size={20} />}
            {isLoading ? 'Creating...' : 'Create User'}
          </button>
        </form>
      </div>
    </div>
  );
}