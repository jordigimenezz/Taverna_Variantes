const banner = document.querySelector('#cookie-banner');
const preferencesDialog = document.querySelector('#cookie-preferences');
const optionalInput = document.querySelector('#preference-storage');
const socialInput = document.querySelector('#social-media-storage');
let preferencesOpener = null;

function finishConsent(preferences,socialMedia) {
 const persisted=window.SitePreferences.choose(preferences,socialMedia);
 banner.hidden=true;
 if (preferencesDialog.open) preferencesDialog.close();
 document.querySelector('#consent-status').textContent=persisted?'Preferencias guardadas. Puedes cambiarlas desde el pie de página.':'Preferencias aplicadas a esta visita. El navegador no ha permitido guardarlas.';
}
function openPreferences(event) {
 preferencesOpener=event?.currentTarget;
 optionalInput.checked=window.SitePreferences.consent?.preferences===true;
 socialInput.checked=window.SitePreferences.consent?.socialMedia===true;
 if (!preferencesDialog.open) preferencesDialog.showModal();
}
document.querySelectorAll('[data-cookie-settings]').forEach(button=>button.addEventListener('click',openPreferences));
document.querySelectorAll('[data-consent-accept]').forEach(button=>button.addEventListener('click',()=>finishConsent(true,true)));
document.querySelectorAll('[data-consent-reject]').forEach(button=>button.addEventListener('click',()=>finishConsent(false,false)));
document.querySelector('[data-consent-save]').addEventListener('click',()=>finishConsent(optionalInput.checked,socialInput.checked));
document.querySelector('[data-consent-close]').addEventListener('click',()=>preferencesDialog.close());
preferencesDialog.addEventListener('close',()=>{if(preferencesOpener?.isConnected&&preferencesOpener.getClientRects().length)preferencesOpener.focus({preventScroll:true});});
preferencesDialog.addEventListener('click',event=>{if(event.target===preferencesDialog){const r=preferencesDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)preferencesDialog.close();}});
banner.hidden=Boolean(window.SitePreferences.consent);

window.addEventListener('variantes:consent',()=>{banner.hidden=true;});
