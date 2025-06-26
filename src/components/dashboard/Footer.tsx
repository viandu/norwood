// src/components/dashboard/Footer.tsx
'use client';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4">
            <div className="max-w-7xl mx-auto text-center text-sm text-slate-500 dark:text-slate-400">
                © {new Date().getFullYear()} Norwood Systems. All Rights Reserved.
            </div>
        </footer>
    );
}