export interface SampleLogo {
  id: string;
  name: string;
  category: string;
  dataUrl: string;
}

function svgToDataUrl(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}

export const SAMPLE_LOGOS: SampleLogo[] = [
  {
    id: 'link',
    name: 'Link',
    category: 'General',
    dataUrl: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    `),
  },
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'Social',
    dataUrl: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#e1306c" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    `),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    category: 'Business',
    dataUrl: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0077b5">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    `),
  },
  {
    id: 'wifi',
    name: 'Wi-Fi',
    category: 'Tech',
    dataUrl: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20h.01"/>
        <path d="M2 8.82a15 15 0 0 1 20 0"/>
        <path d="M5 12.859a10 10 0 0 1 14 0"/>
        <path d="M8.5 16.429a5 5 0 0 1 7 0"/>
      </svg>
    `),
  },
  {
    id: 'coffee',
    name: 'Cafe / Dining',
    category: 'Hospitality',
    dataUrl: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 2v2"/>
        <path d="M14 2v2"/>
        <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h12Z"/>
        <path d="M6 2v2"/>
        <path d="M17 12h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1"/>
      </svg>
    `),
  },
  {
    id: 'star',
    name: 'VIP Star',
    category: 'Luxury',
    dataUrl: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#eab308" stroke="#ca8a04" stroke-width="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    `),
  },
  {
    id: 'grad-cap',
    name: 'Education',
    category: 'Education',
    dataUrl: svgToDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/>
        <path d="M22 10v6"/>
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
      </svg>
    `),
  },
];
