'use server';

import { deleteSessionCookie } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function signOut() {
  await deleteSessionCookie();
  redirect('/'); // Redirect to the homepage after signing out
}