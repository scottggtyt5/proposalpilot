// Cookie-based usage tracking for free tier limit

const STORAGE_KEY = 'proposalpilot_usage';
const FREE_TIER_LIMIT = 5;
const RESET_INTERVAL = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

export interface UsageData {
  count: number;
  lastReset: number;
}

/**
 * Get the current usage data from localStorage
 */
export function getUsageData(): UsageData {
  if (typeof window === 'undefined') {
    return { count: 0, lastReset: Date.now() };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const data = stored ? JSON.parse(stored) : null;

    if (!data) {
      return { count: 0, lastReset: Date.now() };
    }

    // Check if we need to reset (30 days have passed)
    const now = Date.now();
    if (now - data.lastReset > RESET_INTERVAL) {
      const newData = { count: 0, lastReset: now };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      return newData;
    }

    return data;
  } catch (error) {
    console.error('Error reading usage data:', error);
    return { count: 0, lastReset: Date.now() };
  }
}

/**
 * Increment the usage counter
 */
export function incrementUsage(): UsageData {
  if (typeof window === 'undefined') {
    return { count: 0, lastReset: Date.now() };
  }

  const data = getUsageData();
  const updated = {
    count: data.count + 1,
    lastReset: data.lastReset,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving usage data:', error);
  }

  return updated;
}

/**
 * Check if user has exceeded free tier limit
 */
export function isFreeTierLimitExceeded(): boolean {
  const data = getUsageData();
  return data.count >= FREE_TIER_LIMIT;
}

/**
 * Get remaining proposals for free tier
 */
export function getRemainingProposals(): number {
  const data = getUsageData();
  return Math.max(0, FREE_TIER_LIMIT - data.count);
}

/**
 * Get days until usage resets
 */
export function getDaysUntilReset(): number {
  const data = getUsageData();
  const now = Date.now();
  const timeUntilReset = data.lastReset + RESET_INTERVAL - now;

  if (timeUntilReset <= 0) {
    return 0;
  }

  return Math.ceil(timeUntilReset / (24 * 60 * 60 * 1000));
}

/**
 * Format usage information for display
 */
export function getUsageDisplay(): string {
  const remaining = getRemainingProposals();
  const daysUntilReset = getDaysUntilReset();

  if (remaining === 0) {
    return `Free tier limit reached. Resets in ${daysUntilReset} day${daysUntilReset === 1 ? '' : 's'}.`;
  }

  return `${remaining} proposals remaining this month.`;
}
