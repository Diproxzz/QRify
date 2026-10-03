import type { ContentType, EmailData, PhoneData, VCardData, WifiData } from '../types/qr';

export function normalizeUrl(input: string): { valid: boolean; formatted: string; error?: string } {
  const trimmed = input.trim();
  if (!trimmed) {
    return { valid: false, formatted: '', error: 'Please enter a URL' };
  }

  // If starts with scheme, test it
  let candidate = trimmed;
  if (!/^https?:\/\//i.test(candidate)) {
    candidate = `https://${candidate}`;
  }

  try {
    const parsed = new URL(candidate);
    if (!parsed.hostname || !parsed.hostname.includes('.')) {
      return { valid: false, formatted: candidate, error: 'Please enter a valid domain (e.g. example.com)' };
    }
    return { valid: true, formatted: parsed.href };
  } catch {
    return { valid: false, formatted: candidate, error: 'Invalid URL format' };
  }
}

export function encodeEmail(data: EmailData): string {
  const email = data.email.trim();
  if (!email) return '';
  const params = new URLSearchParams();
  if (data.subject.trim()) params.append('subject', data.subject.trim());
  if (data.body.trim()) params.append('body', data.body.trim());
  const queryString = params.toString();
  return `mailto:${email}${queryString ? `?${queryString}` : ''}`;
}

export function encodePhone(data: PhoneData): string {
  const phone = data.phone.trim();
  if (!phone) return '';
  return `tel:${phone.replace(/\s+/g, '')}`;
}

export function encodeWifi(data: WifiData): string {
  if (!data.ssid.trim()) return '';
  const escape = (str: string) => str.replace(/([\\;:,\"])/g, '\\$1');
  const type = data.encryption === 'nopass' ? 'nopass' : data.encryption;
  const pass = data.encryption === 'nopass' ? '' : escape(data.password);
  const hidden = data.hidden ? 'true' : 'false';
  return `WIFI:T:${type};S:${escape(data.ssid)};P:${pass};H:${hidden};;`;
}

export function encodeVCard(data: VCardData): string {
  const lines: string[] = ['BEGIN:VCARD', 'VERSION:3.0'];
  const fn = `${data.firstName.trim()} ${data.lastName.trim()}`.trim();
  if (fn) {
    lines.push(`N:${data.lastName.trim()};${data.firstName.trim()};;;`);
    lines.push(`FN:${fn}`);
  }
  if (data.organization.trim()) lines.push(`ORG:${data.organization.trim()}`);
  if (data.title.trim()) lines.push(`TITLE:${data.title.trim()}`);
  if (data.phone.trim()) lines.push(`TEL;TYPE=CELL:${data.phone.trim()}`);
  if (data.email.trim()) lines.push(`EMAIL:${data.email.trim()}`);
  if (data.url.trim()) {
    const { formatted } = normalizeUrl(data.url);
    lines.push(`URL:${formatted || data.url.trim()}`);
  }
  if (data.note?.trim()) lines.push(`NOTE:${data.note.trim()}`);
  lines.push('END:VCARD');
  return lines.join('\n');
}

export function encodeContent(
  type: ContentType,
  values: {
    rawUrl?: string;
    rawText?: string;
    emailData?: EmailData;
    phoneData?: PhoneData;
    wifiData?: WifiData;
    vcardData?: VCardData;
  }
): { encoded: string; isValid: boolean; error?: string } {
  switch (type) {
    case 'url': {
      const { valid, formatted, error } = normalizeUrl(values.rawUrl || '');
      return { encoded: formatted, isValid: valid, error };
    }
    case 'text': {
      const text = (values.rawText || '').trim();
      return { encoded: text, isValid: text.length > 0, error: text.length === 0 ? 'Text cannot be empty' : undefined };
    }
    case 'email': {
      const data = values.emailData || { email: '', subject: '', body: '' };
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim());
      return {
        encoded: encodeEmail(data),
        isValid,
        error: !data.email.trim() ? 'Please provide an email address' : !isValid ? 'Invalid email format' : undefined,
      };
    }
    case 'phone': {
      const data = values.phoneData || { phone: '' };
      const cleaned = data.phone.replace(/[\s\-\(\)]/g, '');
      const isValid = cleaned.length >= 5;
      return {
        encoded: encodePhone(data),
        isValid,
        error: !data.phone.trim() ? 'Please provide a phone number' : !isValid ? 'Phone number too short' : undefined,
      };
    }
    case 'wifi': {
      const data = values.wifiData || { ssid: '', password: '', encryption: 'WPA', hidden: false };
      const isValid = data.ssid.trim().length > 0;
      return {
        encoded: encodeWifi(data),
        isValid,
        error: !isValid ? 'Network name (SSID) is required' : undefined,
      };
    }
    case 'vcard': {
      const data = values.vcardData || {
        firstName: '',
        lastName: '',
        organization: '',
        title: '',
        phone: '',
        email: '',
        url: '',
      };
      const hasName = Boolean(data.firstName.trim() || data.lastName.trim());
      const hasContact = Boolean(data.phone.trim() || data.email.trim());
      const isValid = hasName || hasContact;
      return {
        encoded: encodeVCard(data),
        isValid,
        error: !isValid ? 'Provide at least a name or contact method' : undefined,
      };
    }
    default:
      return { encoded: values.rawUrl || '', isValid: true };
  }
}
