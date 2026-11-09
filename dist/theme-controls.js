const themeControls = [...document.querySelectorAll('.theme-toggle')];
function syncThemeControls() {
 const dark = document.documentElement.dataset.theme === 'dark';
 themeControls.forEach(button => {
  const label = dark ? 'Activar tema claro' : 'Activar tema oscuro';
  button.setAttribute('aria-label', label);
  button.setAttribute('title', label);
  button.setAttribute('aria-pressed', String(dark));
  button.innerHTML = '<svg class="icon" viewBox="0 0 256 256" aria-hidden="true"><use href="assets/icons.svg#' + (dark ? 'sun' : 'moon') + '"></use></svg>';
 });
}
themeControls.forEach(button => button.addEventListener('click', () => {
 window.SitePreferences.setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
 syncThemeControls();
}));
syncThemeControls();
