// Light theme by default. The dark theme is stored only when the visitor chooses it (interface preference, no banner).
(() => {
 const key = 'variantes-theme';
 let saved = null;
 try {saved = localStorage.getItem(key);} catch {}
 document.documentElement.dataset.theme = saved === 'dark' ? 'dark' : 'light';
 document.documentElement.classList.remove('no-js');
 window.SitePreferences = {
  get theme() {return document.documentElement.dataset.theme;},
  setTheme(theme) {
   theme = theme === 'dark' ? 'dark' : 'light';
   document.documentElement.dataset.theme = theme;
   try {
    if (theme === 'dark') localStorage.setItem(key, 'dark');
    else localStorage.removeItem(key);
    return true;
   } catch {return false;}
  }
 };
})();
