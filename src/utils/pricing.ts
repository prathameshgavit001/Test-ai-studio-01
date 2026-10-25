import { BillingCycle, EstimatorOptions, ContactFormData, ContactFormErrors } from '../types';

/**
 * Calculates annual monthly-equivalent price with 20% savings.
 */
export function calculateAnnualDiscount(monthlyPrice: number, discountPercentage = 20): number {
  if (monthlyPrice <= 0) return 0;
  const discounted = monthlyPrice * (1 - discountPercentage / 100);
  return Math.round(discounted);
}

/**
 * Calculates total quote estimate based on selected services and rush options.
 */
export function calculateCustomQuote(options: EstimatorOptions): number {
  let total = options.tierBase;
  if (options.includeDesignSystem) total += 2400;
  if (options.include3DRendering) total += 3200;
  if (options.includeRapidPrototyping) total += 1800;
  if (options.turnaroundRush) total = Math.round(total * 1.25);
  return total;
}

/**
 * Validates contact form inputs.
 */
export function validateContactForm(data: ContactFormData): {
  isValid: boolean;
  errors: ContactFormErrors;
} {
  const errors: ContactFormErrors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid business email address.';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Please provide a project description of at least 10 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Determines whether the studio is currently in open business hours (9:00 - 18:00 PST, Mon-Fri).
 */
export function isStudioOpen(currentDate = new Date()): {
  isOpen: boolean;
  statusText: string;
} {
  // Convert to PST / PDT (America/Los_Angeles)
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    weekday: 'short',
  });

  const parts = formatter.formatToParts(currentDate);
  const hourPart = parts.find((p) => p.type === 'hour')?.value;
  const weekdayPart = parts.find((p) => p.type === 'weekday')?.value;

  const hour = hourPart ? parseInt(hourPart, 10) : 10;
  const isWeekend = weekdayPart === 'Sat' || weekdayPart === 'Sun';

  const isOpen = !isWeekend && hour >= 9 && hour < 18;
  return {
    isOpen,
    statusText: isOpen ? 'Studio is open (9am – 6pm PT)' : 'Studio is closed (opens 9am PT)',
  };
}
