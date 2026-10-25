import React, { useState } from 'react';
import { ContactFormData, ContactFormErrors } from '../types';
import { validateContactForm, isStudioOpen } from '../utils/pricing';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  Copy,
  Check,
  Send,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface ContactPageProps {
  initialPlanInterest?: string;
  initialEstimatedPrice?: number;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  initialPlanInterest,
  initialEstimatedPrice,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    projectCategory: 'Spatial & Architectural Design',
    budgetRange: initialEstimatedPrice
      ? `$${initialEstimatedPrice.toLocaleString()}/mo`
      : '$30k – $60k',
    message: initialPlanInterest
      ? `Hello Vanguard Studio,\n\nWe are interested in discussing the ${initialPlanInterest} engagement model for an upcoming initiative.`
      : '',
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    referenceId: string;
    submittedAt: string;
    data: ContactFormData;
  } | null>(null);

  // Quick copy feedback
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Selected exploratory call date
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-04');

  const studioStatus = isStudioOpen();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('inquiry@vanguardstudio.design');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+1 (415) 890-4210');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      const refId = `VAN-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedData({
        referenceId: refId,
        submittedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        data: { ...formData },
      });
      setIsSubmitting(false);
    }, 450);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      fullName: '',
      email: '',
      projectCategory: 'Spatial & Architectural Design',
      budgetRange: '$30k – $60k',
      message: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-semibold uppercase tracking-widest text-stone-500">
          Direct Channels & Inquiries
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Initiate an exploratory consultation.
        </h1>
        <p className="text-base text-stone-600 leading-relaxed">
          Whether you are planning a site-specific spatial pavilion, comprehensive brand architecture, or a bespoke tactile digital system, our partners review every submission directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Form: Form or Confirmation State */}
        <div className="lg:col-span-7">
          {submittedData ? (
            <div className="rounded-2xl p-8 sm:p-10 bg-white border border-stone-200 shadow-sm space-y-6 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <CheckCircle className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-stone-400">
                  REF: {submittedData.referenceId}
                </div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  Inquiry logged with studio partners.
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Thank you, <span className="font-semibold text-stone-900">{submittedData.data.fullName}</span>. We have routed your brief to Marcus Sterling and senior studio directors. You will receive an initial response at <span className="font-semibold text-stone-900">{submittedData.data.email}</span> within 24 business hours.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-2 text-xs text-stone-700">
                <div className="font-semibold text-stone-900 uppercase tracking-wider text-[11px]">
                  Brief Summary
                </div>
                <div>Category: {submittedData.data.projectCategory}</div>
                <div>Budget Target: {submittedData.data.budgetRange}</div>
                <div>Received: {submittedData.submittedAt}</div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-stone-200/80 hover:bg-stone-300 rounded-md transition-colors"
                >
                  Submit Another Brief
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-6 sm:p-8 bg-white border border-stone-200 shadow-xs space-y-6"
              noValidate
            >
              <div className="border-b border-stone-200 pb-4">
                <h2 className="text-xl font-serif font-bold text-stone-900">
                  Project Brief Submission
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Please provide foundational details about your timeline and objectives.
                </p>
              </div>

              {initialPlanInterest && (
                <div className="p-3 rounded-lg bg-stone-100 border border-stone-200 text-xs text-stone-700 flex items-center justify-between">
                  <span>Selected Engagement Plan: <strong className="text-stone-900">{initialPlanInterest}</strong></span>
                  {initialEstimatedPrice && (
                    <span className="font-mono font-semibold text-stone-900">
                      ${initialEstimatedPrice.toLocaleString()}/mo
                    </span>
                  )}
                </div>
              )}

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="fullName"
                    className="text-xs font-bold uppercase tracking-wider text-stone-700 block"
                  >
                    Your Full Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="e.g. Julian Hayes"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-md border bg-stone-50/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 ${
                      errors.fullName
                        ? 'border-red-500 focus-visible:ring-red-500 bg-red-50/30'
                        : 'border-stone-300'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600">{errors.fullName}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-bold uppercase tracking-wider text-stone-700 block"
                  >
                    Work Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="julian@institution.org"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-md border bg-stone-50/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 ${
                      errors.email
                        ? 'border-red-500 focus-visible:ring-red-500 bg-red-50/30'
                        : 'border-stone-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Category & Budget Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label
                    htmlFor="projectCategory"
                    className="text-xs font-bold uppercase tracking-wider text-stone-700 block"
                  >
                    Primary Discipline
                  </label>
                  <select
                    id="projectCategory"
                    value={formData.projectCategory}
                    onChange={(e) =>
                      setFormData({ ...formData, projectCategory: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-md border border-stone-300 bg-stone-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
                  >
                    <option value="Spatial & Architectural Design">Spatial & Architectural Design</option>
                    <option value="Brand Identity & Custom Type">Brand Identity & Custom Type</option>
                    <option value="Tactile Digital Product UI/UX">Tactile Digital Product UI/UX</option>
                    <option value="Limited Monograph / Exhibition">Limited Monograph / Exhibition</option>
                    <option value="Comprehensive Strategic Advisory">Comprehensive Strategic Advisory</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="budgetRange"
                    className="text-xs font-bold uppercase tracking-wider text-stone-700 block"
                  >
                    Anticipated Budget / Retainer
                  </label>
                  <select
                    id="budgetRange"
                    value={formData.budgetRange}
                    onChange={(e) =>
                      setFormData({ ...formData, budgetRange: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-md border border-stone-300 bg-stone-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
                  >
                    <option value="$15k – $30k">$15k – $30k (Foundation Sprint)</option>
                    <option value="$30k – $60k">$30k – $60k (Standard Engagement)</option>
                    <option value="$60k – $120k">$60k – $120k (Multi-Disciplinary)</option>
                    <option value="$120k+">$120k+ (Enterprise / Physical Spatial)</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-bold uppercase tracking-wider text-stone-700 block"
                >
                  Project Vision & Scope Description *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Outline key objectives, architectural site or digital requirements, and desired kickoff timeline..."
                  className={`w-full px-3.5 py-2.5 text-sm rounded-md border bg-stone-50/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 ${
                    errors.message
                      ? 'border-red-500 focus-visible:ring-red-500 bg-red-50/30'
                      : 'border-stone-300'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-600">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-stone-900 rounded-md hover:bg-stone-800 transition-colors shadow-xs flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Registering Brief...</span>
                  ) : (
                    <>
                      <span>Submit Project Brief</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Info: Direct Channels & Studio Hours */}
        <div className="lg:col-span-5 space-y-8">
          {/* Real-time Studio Status Card */}
          <div className="p-6 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-stone-300" />
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                  Studio Operations
                </span>
              </div>
              <span className="text-xs font-mono text-stone-400">
                PST (UTC-8)
              </span>
            </div>

            <div>
              <div className="text-base font-semibold text-white">
                {studioStatus.statusText}
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Mon – Fri · 9:00 AM – 6:00 PM Pacific Standard Time
              </div>
            </div>

            <p className="text-xs text-stone-400 border-t border-stone-800 pt-3">
              Outside office hours, messages are routed directly to executive on-call directors for high-priority commissions.
            </p>
          </div>

          {/* Direct channels with copy triggers */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Direct Contact Lines
            </h3>

            {/* Email Card */}
            <div className="p-4 rounded-lg bg-white border border-stone-200 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-stone-100 text-stone-800">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-stone-500 font-medium">Inquiry Mailbox</div>
                  <a
                    href="mailto:inquiry@vanguardstudio.design"
                    className="text-xs font-semibold text-stone-900 hover:underline"
                  >
                    inquiry@vanguardstudio.design
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors"
                aria-label="Copy email address"
                title="Copy email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-4 rounded-lg bg-white border border-stone-200 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-stone-100 text-stone-800">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-stone-500 font-medium">Direct Line (SF)</div>
                  <a
                    href="tel:+14158904210"
                    className="text-xs font-semibold text-stone-900 hover:underline"
                  >
                    +1 (415) 890-4210
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors"
                aria-label="Copy phone number"
                title="Copy phone"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Physical Offices */}
            <div className="p-4 rounded-lg bg-white border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-700">
                <MapPin className="w-4 h-4" />
                <span>Physical Studios</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600">
                <div>
                  <strong className="text-stone-900 block font-semibold">San Francisco Studio</strong>
                  <p>480 Jackson Street</p>
                  <p>Jackson Square, CA 94111</p>
                </div>
                <div>
                  <strong className="text-stone-900 block font-semibold">Zurich Atelier</strong>
                  <p>Bahnhofstrasse 28</p>
                  <p>8001 Zurich, Switzerland</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Consultation Scheduler Preview */}
          <div className="p-5 rounded-xl bg-stone-100/80 border border-stone-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700">
              <Calendar className="w-4 h-4" />
              <span>Exploratory Briefing Calendar</span>
            </div>
            <p className="text-xs text-stone-600">
              Select an ideal date for an introductory 30-minute design discovery session:
            </p>
            <input
              type="date"
              value={selectedDate}
              min="2026-10-26"
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono bg-white border border-stone-300 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            />
            <div className="text-[11px] text-stone-500">
              Selected window: <span className="font-semibold text-stone-800">{selectedDate}</span> (Subject to partner availability verification).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
