'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from '@/app/actions';
import { User, Home, LogOut, ChevronDown } from 'lucide-react';

// Define the props this component will accept
interface UserNavProps {
  username: string;
}

export default function UserNav({ username }: UserNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sign out handler that refreshes the page state
  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
    router.refresh();
  };
  
  // Effect to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* The main button that opens the dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full p-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      >
        <User className="h-5 w-5" />
        <span className="hidden sm:inline">{username}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* The dropdown menu itself */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30"
          >
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">Signed in as</p>
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                {username}
              </p>
            </div>
            <div className="py-1">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <Home className="h-5 w-5" />
                <span>Home Page</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}