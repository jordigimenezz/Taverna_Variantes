// Local preferences: no optional persistence until the visitor chooses it.
(() => {
 const key = 'variantes-consent-v1';
 const duration = 180 * 24 * 60 * 60 * 1000;
 let consent = null;
 try {
  const stored = JSON.parse(localStorage.getItem(key));
  if (stored?.version === 1 && typeof stored.preferences === 'boolean' && Number.isFinite(stored.expiresAt) && stored.expiresAt > Date.now()) consent = stored;
  else localStorage.removeItem(key);
  if (!consent?.preferences) localStorage.removeItem('variantes-theme');
 } catch {}
 window.SitePreferences = {
  get consent() {return consent;},
  rememberTheme(theme) {try {if (consent?.preferences) localStorage.setItem('variantes-theme', theme);} catch {}},
  choose(preferences,socialMedia=false) {
   consent = {version:1,necessary:true,preferences:Boolean(preferences),socialMedia:Boolean(socialMedia),updatedAt:Date.now(),expiresAt:Date.now()+duration};
   let persisted = false;
   try {localStorage.setItem(key,JSON.stringify(consent));persisted=true;if (preferences) localStorage.setItem('variantes-theme',document.documentElement.dataset.theme);else localStorage.removeItem('variantes-theme');} catch {}
   window.dispatchEvent(new CustomEvent('variantes:consent',{detail:consent}));
   return persisted;
  }
 };
 let saved;
 try {if (consent?.preferences) saved = localStorage.getItem('variantes-theme');} catch {}
 document.documentElement.dataset.theme = saved === 'light' || saved === 'dark' ? saved : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
})();
