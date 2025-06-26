import { getAnalyticsData } from '@/lib/data';
import { Users, Package, Briefcase, FileText, CalendarDays } from 'lucide-react';
import ActivityChart from '@/components/dashboard/ActivityChart';
import React from 'react';

// --- Helper Components for a Cleaner & More Reusable Structure ---

// A robust helper to format dates, handling invalid or missing values.
function formatDate(date: Date | string | null | undefined): string {
  if (!date) return '—'; // Return a dash if date is null or undefined
  const d = new Date(date);
  // Check if the parsed date is valid before formatting
  if (isNaN(d.getTime())) {
    return 'Invalid Date';
  }
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Reusable component for displaying a key performance indicator (KPI).
const KpiCard = ({ icon: Icon, title, value, iconClassName }: {
  icon: React.ElementType,
  title: string,
  value: number | string,
  iconClassName: string,
}) => (
  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
    <Icon className={`w-8 h-8 ${iconClassName} mb-2`} />
    <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400">{title}</h3>
    <p className="text-3xl font-bold text-slate-800 dark:text-white">{value}</p>
  </div>
);

// Reusable card component for displaying lists of recent activity.
const RecentActivityCard = ({ title, children, emptyMessage }: {
  title: string,
  children: React.ReactNode,
  emptyMessage: string
}) => {
  const hasChildren = React.Children.count(children) > 0;

  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">{title}</h3>
      {hasChildren ? (
        <ul className="space-y-4">{children}</ul>
      ) : (
        <p className="text-slate-500 dark:text-slate-400">{emptyMessage}</p>
      )}
    </div>
  );
};


// This page is a Server Component, so we can fetch data directly.
// The component is now more resilient to errors and unexpected data.
export default async function AnalyticsPage() {
  let data;
  try {
    // Fetch data and handle potential network or server errors.
    data = await getAnalyticsData();
  } catch (error) {
    console.error("Failed to fetch analytics data:", error);
    return (
      <div className="flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-2xl font-bold text-red-500 dark:text-red-400">Error Loading Analytics</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          There was a problem retrieving the site data. Please try again later.
        </p>
      </div>
    );
  }

  // Safely access data using optional chaining and provide default values.
  const kpiMetrics = [
    { icon: Users, title: 'Total Users', value: data?.totalUsers ?? 0, iconClassName: 'text-indigo-500' },
    { icon: Package, title: 'Total Items', value: data?.totalItems ?? 0, iconClassName: 'text-sky-500' },
    { icon: Briefcase, title: 'Total Vacancies', value: data?.totalVacancies ?? 0, iconClassName: 'text-emerald-500' },
    { icon: FileText, title: 'Applications', value: data?.totalApplications ?? 0, iconClassName: 'text-amber-500' },
  ];

  // Ensure recent activity arrays are valid before attempting to map over them.
  const recentUsers = Array.isArray(data?.recentUsers) ? data.recentUsers : [];
  const recentItems = Array.isArray(data?.recentItems) ? data.recentItems : [];

  return (
    <>
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">Site Analytics</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">An overview of key metrics and recent activity.</p>
      </header>

      {/* KPI Cards Section - Now using the KpiCard component */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {kpiMetrics.map((metric) => (
          <KpiCard key={metric.title} {...metric} />
        ))}
      </section>

      {/* Activity Chart Section - Safely pass data */}
      <section className="mb-6 sm:mb-8">
        <ActivityChart data={data?.activityLast7Days ?? []} />
      </section>

      {/* Recent Activity Lists Section - Now using the RecentActivityCard component */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <RecentActivityCard title="Recent User Sign-ups" emptyMessage="No recent users.">
          {recentUsers
            .filter(Boolean) // Filter out any null/undefined entries in the array
            .map(user => (
              <li key={user._id} className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">{user.username ?? 'Unnamed User'}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{user.email ?? 'No Email'}</p>
                </div>
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 flex-shrink-0">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  <span>{formatDate(user.createdAt)}</span>
                </div>
              </li>
            ))}
        </RecentActivityCard>

        <RecentActivityCard title="Recently Added Items" emptyMessage="No recent items.">
          {recentItems
            .filter(Boolean)
            .map(item => (
              <li key={item._id} className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">{item.name ?? 'Unnamed Item'}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Code: {item.itemCode ?? 'N/A'}</p>
                </div>
                 <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 flex-shrink-0">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  <span>{formatDate(item.createdAt)}</span>
                </div>
              </li>
            ))}
        </RecentActivityCard>
      </section>
    </>
  );
}