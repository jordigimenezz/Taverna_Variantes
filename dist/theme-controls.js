const themeControls = [...document.querySelectorAll('.theme-toggle')];
function syncThemeControls() {
 const dark = document.documentElement.dataset.theme === 'dark';
 themeControls.forEach(button => {
  button.setAttribute('aria-label',dark?'Activar tema claro':'Activar tema oscuro');
  button.setAttribute('title',dark?'Activar tema claro':'Activar tema oscuro');
  button.setAttribute('aria-pressed',String(dark));
  button.innerHTML = '<svg class="icon" viewBox="0 0 256 256" aria-hidden="true"><use href="assets/icons.svg#'+(dark?'sun':'moon')+'"></use></svg><span>'+(dark?'Claro':'Oscuro')+'</span>';
 });
}
themeControls.forEach(button => button.addEventListener('click',() => {
 const theme = document.documentElement.dataset.theme==='dark'?'light':'dark';
 document.documentElement.dataset.theme=theme;
 window.SitePreferences?.rememberTheme(theme);
 syncThemeControls();
}));
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',event => {
 if (!window.SitePreferences?.consent?.preferences) {document.documentElement.dataset.theme=event.matches?'dark':'light';syncThemeControls();}
});
syncThemeControls();
