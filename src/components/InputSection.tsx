import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Link as LinkIcon,
  Type,
  Mail,
  Phone,
  Wifi,
  Contact,
  Clipboard,
  Check,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import type { ContentType, EmailData, PhoneData, VCardData, WifiData } from '../types/qr';
import { encodeContent } from '../lib/contentEncoders';
import { animateInputShake, animateCheckmarkDraw } from '../lib/animeHelper';

interface InputSectionProps {
  contentType: ContentType;
  onChangeContentType: (type: ContentType) => void;
  onEncodedChange: (encoded: string, rawSummary: string) => void;
  initialValue?: string;
}

export const InputSection: React.FC<InputSectionProps> = ({
  contentType,
  onChangeContentType,
  onEncodedChange,
  initialValue = 'https://github.com',
}) => {
  // State per content type
  const [rawUrl, setRawUrl] = useState(initialValue);
  const [rawText, setRawText] = useState('Welcome to QRify Studio!');
  const [emailData, setEmailData] = useState<EmailData>({
    email: 'contact@example.com',
    subject: 'Inquiry',
    body: 'Hello! I scanned your QR code.',
  });
  const [phoneData, setPhoneData] = useState<PhoneData>({
    phone: '+1 555 234 5678',
  });
  const [wifiData, setWifiData] = useState<WifiData>({
    ssid: 'Guest_HighSpeed_WiFi',
    password: 'SecurePassword2026',
    encryption: 'WPA',
    hidden: false,
  });
  const [vcardData, setVcardData] = useState<VCardData>({
    firstName: 'Alex',
    lastName: 'Morgan',
    organization: 'Acme Studio',
    title: 'Creative Director',
    phone: '+1 555 019 2831',
    email: 'alex.morgan@acmestudio.com',
    url: 'https://acmestudio.com',
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [copiedState, setCopiedState] = useState(false);

  const inputContainerRef = useRef<HTMLDivElement | null>(null);
  const checkSvgRef = useRef<SVGPathElement | null>(null);
  const debounceTimerRef = useRef<any>(null);

  // Compute encoding & validation
  const updateEncoding = useCallback(() => {
    const result = encodeContent(contentType, {
      rawUrl,
      rawText,
      emailData,
      phoneData,
      wifiData,
      vcardData,
    });

    if (result.isValid) {
      setValidationError(null);
      let summary = rawUrl;
      if (contentType === 'text') summary = rawText.slice(0, 30);
      else if (contentType === 'email') summary = emailData.email;
      else if (contentType === 'phone') summary = phoneData.phone;
      else if (contentType === 'wifi') summary = `Wi-Fi: ${wifiData.ssid}`;
      else if (contentType === 'vcard') summary = `${vcardData.firstName} ${vcardData.lastName}`;

      onEncodedChange(result.encoded, summary);

      // Trigger checkmark animation if checkmark is present
      if (checkSvgRef.current) {
        animateCheckmarkDraw(checkSvgRef.current);
      }
    } else {
      setValidationError(result.error || 'Please fill in the required fields');
    }
  }, [contentType, rawUrl, rawText, emailData, phoneData, wifiData, vcardData, onEncodedChange]);

  // Debounced live update (300ms)
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      updateEncoding();
    }, 300);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [updateEncoding]);

  // Handle Paste from Clipboard
  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) return;

      if (contentType === 'url') {
        setRawUrl(text);
      } else if (contentType === 'text') {
        setRawText(text);
      } else if (contentType === 'email') {
        setEmailData((prev) => ({ ...prev, email: text }));
      } else if (contentType === 'phone') {
        setPhoneData({ phone: text });
      }

      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 2000);
    } catch (e) {
      console.warn('Clipboard access rejected', e);
    }
  };

  // Trigger error shake
  const triggerErrorShake = () => {
    animateInputShake(inputContainerRef.current);
  };

  const contentTabs: { type: ContentType; label: string; icon: React.ReactNode }[] = [
    { type: 'url', label: 'Website URL', icon: <LinkIcon className="w-4 h-4" /> },
    { type: 'text', label: 'Plain Text', icon: <Type className="w-4 h-4" /> },
    { type: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
    { type: 'phone', label: 'Phone', icon: <Phone className="w-4 h-4" /> },
    { type: 'wifi', label: 'Wi-Fi Network', icon: <Wifi className="w-4 h-4" /> },
    { type: 'vcard', label: 'vCard Contact', icon: <Contact className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 shadow-premium dark:shadow-premium-dark border border-slate-200/80 dark:border-slate-800 transition-all duration-200">
      {/* Content Type Tabs */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80 mb-5">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          QR Code Destination
        </span>
        <button
          onClick={handlePasteClipboard}
          className="inline-flex items-center space-x-1.5 px-2.5 py-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 bg-brand-50 dark:bg-brand-950/70 hover:bg-brand-100 rounded-lg transition-colors border border-brand-200/60 dark:border-brand-800/60"
        >
          {copiedState ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Clipboard className="w-3.5 h-3.5" />}
          <span>{copiedState ? 'Pasted!' : 'Paste Clipboard'}</span>
        </button>
      </div>

      {/* Type Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
        {contentTabs.map((tab) => {
          const isActive = contentType === tab.type;
          return (
            <button
              key={tab.type}
              onClick={() => onChangeContentType(tab.type)}
              className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25 ring-2 ring-brand-500/30'
                  : 'bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Content Inputs */}
      <div ref={inputContainerRef} className="space-y-4">
        {contentType === 'url' && (
          <div className="relative">
            <label htmlFor="url-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Target Web Address
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-4 pointer-events-none text-slate-400 dark:text-slate-500">
                <LinkIcon className="w-5 h-5" />
              </div>
              <input
                id="url-input"
                type="text"
                value={rawUrl}
                onChange={(e) => setRawUrl(e.target.value)}
                onBlur={updateEncoding}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    updateEncoding();
                    if (validationError) triggerErrorShake();
                  }
                }}
                placeholder="example.com or https://yourlink.com"
                className={`w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 border text-sm sm:text-base font-medium transition-all duration-200 focus:outline-none ${
                  validationError
                    ? 'border-red-400 dark:border-red-500/60 focus:ring-4 focus:ring-red-400/20'
                    : 'border-slate-200 dark:border-slate-700/80 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20'
                }`}
              />
              <div className="absolute right-4 flex items-center">
                {!validationError && rawUrl.trim() && (
                  <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path ref={checkSvgRef} d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {validationError && (
                  <AlertCircle className="w-5 h-5 text-red-500 cursor-pointer" onClick={triggerErrorShake} />
                )}
              </div>
            </div>
            <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
              Auto-prepends <code className="text-brand-500">https://</code> if missing. Updates live in real-time.
            </p>
          </div>
        )}

        {contentType === 'text' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Plain Text or Message
            </label>
            <textarea
              rows={3}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Enter notes, serial numbers, codes, or instructions..."
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-700/80 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 text-sm font-medium transition-all focus:outline-none"
            />
          </div>
        )}

        {contentType === 'email' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Recipient Email
              </label>
              <input
                type="email"
                value={emailData.email}
                onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
                placeholder="name@company.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                  placeholder="Inquiry"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Message Body</label>
                <input
                  type="text"
                  value={emailData.body}
                  onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
                  placeholder="Pre-filled email message"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>
        )}

        {contentType === 'phone' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Phone Number (with Country Code)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="tel"
                value={phoneData.phone}
                onChange={(e) => setPhoneData({ phone: e.target.value })}
                placeholder="+1 555 123 4567"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        )}

        {contentType === 'wifi' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Network Name (SSID)</label>
              <input
                type="text"
                value={wifiData.ssid}
                onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
                placeholder="MyOffice_WiFi"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Wi-Fi Password</label>
              <input
                type="text"
                value={wifiData.password}
                onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
                placeholder="Password"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Security Type</label>
              <select
                value={wifiData.encryption}
                onChange={(e) => setWifiData({ ...wifiData, encryption: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="WPA">WPA / WPA2 / WPA3</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None (Open Network)</option>
              </select>
            </div>
          </div>
        )}

        {contentType === 'vcard' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">First Name</label>
              <input
                type="text"
                value={vcardData.firstName}
                onChange={(e) => setVcardData({ ...vcardData, firstName: e.target.value })}
                placeholder="First name"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Last Name</label>
              <input
                type="text"
                value={vcardData.lastName}
                onChange={(e) => setVcardData({ ...vcardData, lastName: e.target.value })}
                placeholder="Last name"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company / Organization</label>
              <input
                type="text"
                value={vcardData.organization}
                onChange={(e) => setVcardData({ ...vcardData, organization: e.target.value })}
                placeholder="Acme Inc."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Job Title</label>
              <input
                type="text"
                value={vcardData.title}
                onChange={(e) => setVcardData({ ...vcardData, title: e.target.value })}
                placeholder="Senior Engineer"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone</label>
              <input
                type="tel"
                value={vcardData.phone}
                onChange={(e) => setVcardData({ ...vcardData, phone: e.target.value })}
                placeholder="+1 555 123 4567"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={vcardData.email}
                onChange={(e) => setVcardData({ ...vcardData, email: e.target.value })}
                placeholder="name@company.com"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        )}

        {/* Validation Warning / Error banner */}
        {validationError && (
          <div className="flex items-center space-x-2 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 p-2.5 rounded-xl">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{validationError}</span>
          </div>
        )}
      </div>
    </div>
  );
};
