const policies = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/'],
  'child-src': ["'self'"],
  'style-src': ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/'],
  'img-src': ["'self'", 'data:', process.env.NEXT_PUBLIC_CDN_URL, 'https://www.gravatar.com'],
  'font-src': ["'self'", 'data:', 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/'],
  'frame-src': ["'self'", 'https://www.youtube-nocookie.com'],
  'connect-src': ["'self'"],
  'worker-src': ["'self'"],
};

export default Object.entries(policies)
  .map(([key, value]) => (Array.isArray(value) && value.length ? `${key} ${value.join(' ')}` : ''))
  .filter(Boolean)
  .join('; ');
