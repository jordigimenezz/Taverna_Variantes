const instagramPosts = JSON.parse(document.querySelector('#instagram-posts').textContent);
const instagramDialog = document.querySelector('#instagram-dialog');
const imagePreview = document.querySelector('#instagram-preview');
const embedContainer = document.querySelector('#instagram-embed');
const embedStatus = document.querySelector('#instagram-status');
const loadButton = document.querySelector('#instagram-load');
const previewButton = document.querySelector('#instagram-show-preview');
let activePost = 0;
let trigger = null;
let generation = 0;
let embedScriptPromise;
let embedObserver;
let embedTimer;

function clearEmbed() {
 generation++;
 clearTimeout(embedTimer);
 embedObserver?.disconnect();
 embedContainer.replaceChildren();
 imagePreview.hidden = false;
 loadButton.hidden = false;
 previewButton.hidden = true;
 embedStatus.textContent = 'Vista previa de la publicación. Los carruseles y vídeos completos se muestran en Instagram.';
}

function selectInstagramPost(index) {
 activePost = (index + instagramPosts.length) % instagramPosts.length;
 clearEmbed();
 const post = instagramPosts[activePost];
 imagePreview.src = post.image;
 imagePreview.alt = post.alt;
 document.querySelector('#instagram-position').textContent = `${activePost+1} / ${instagramPosts.length}`;
 document.querySelector('#instagram-post-type').textContent = `${post.type} · ${new Intl.DateTimeFormat('es-ES',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(post.date))}`;
 document.querySelector('#instagram-original').href = post.url;
 loadButton.textContent = window.SitePreferences.consent?.socialMedia ? 'Cargar publicación de Instagram' : 'Permitir Instagram y cargar publicación';
}

function ensureEmbedScript() {
 if (window.instgrm?.Embeds) return Promise.resolve();
 if (embedScriptPromise) return embedScriptPromise;
 embedScriptPromise = new Promise((resolve,reject) => {
  const script = document.createElement('script');
  script.src = 'https://www.instagram.com/embed.js';
  script.async = true;
  script.id = 'instagram-embed-script';
  const timeout = setTimeout(()=>{script.remove();reject(new Error('timeout'));},10000);
  script.onload = ()=>{clearTimeout(timeout);resolve();};
  script.onerror = ()=>{clearTimeout(timeout);script.remove();reject(new Error('unavailable'));};
  document.head.append(script);
 }).catch(error=>{embedScriptPromise=null;throw error;});
 return embedScriptPromise;
}

async function loadInstagramPost() {
 if (!window.SitePreferences.consent?.socialMedia) {
  window.SitePreferences.choose(window.SitePreferences.consent?.preferences===true,true);
 }
 if (!instagramDialog.open) return;
 const request = ++generation;
 loadButton.hidden = true;
 embedStatus.textContent = 'Cargando la publicación desde Instagram…';
 const post = instagramPosts[activePost];
 const block = document.createElement('blockquote');
 block.className = 'instagram-media';
 block.setAttribute('data-instgrm-permalink',post.url);
 block.setAttribute('data-instgrm-version','14');
 const link = document.createElement('a');
 link.href = post.url;
 link.target = '_blank';
 link.rel = 'noopener noreferrer';
 link.textContent = 'Ver esta publicación en Instagram';
 block.append(link);
 embedContainer.replaceChildren(block);
 function frameReady() {
  if (request!==generation) return;
  if (embedContainer.querySelector('iframe')) {
   imagePreview.hidden = false;
   previewButton.hidden = false;
   previewButton.textContent = 'Ocultar contenido de Instagram';
   embedStatus.textContent = 'Inserción solicitada a Instagram. Puede estar bloqueada o pedir iniciar sesión; la vista previa y el enlace al original siguen disponibles.';
   clearTimeout(embedTimer);
   embedObserver?.disconnect();
  }
 }
 embedObserver = new MutationObserver(frameReady);
 embedObserver.observe(embedContainer,{childList:true,subtree:true});
 embedTimer = setTimeout(()=>{
  if(request!==generation)return;
  embedStatus.textContent = 'Instagram no ha mostrado la publicación. Puedes ver la vista previa o abrir el original.';
  loadButton.hidden = false;
 },12000);
 try {
  await ensureEmbedScript();
  if(request!==generation||!instagramDialog.open||!window.SitePreferences.consent?.socialMedia)return;
  window.instgrm?.Embeds?.process();
  frameReady();
 } catch {
  if(request!==generation)return;
  clearEmbed();
  embedStatus.textContent = 'No se ha podido cargar Instagram. La vista previa y el enlace original siguen disponibles.';
 }
}

document.querySelectorAll('[data-instagram-post]').forEach(button=>button.addEventListener('click',()=>{
 trigger = button;
 selectInstagramPost(Number(button.dataset.instagramPost));
 instagramDialog.showModal();
}));
document.querySelector('[data-instagram-close]').addEventListener('click',()=>instagramDialog.close());
document.querySelector('[data-instagram-prev]').addEventListener('click',()=>selectInstagramPost(activePost-1));
document.querySelector('[data-instagram-next]').addEventListener('click',()=>selectInstagramPost(activePost+1));
instagramDialog.addEventListener('close',()=>{clearEmbed();trigger?.focus({preventScroll:true});});
loadButton.addEventListener('click',loadInstagramPost);
previewButton.addEventListener('click',clearEmbed);
window.addEventListener('variantes:consent',()=>{
 if(!window.SitePreferences.consent?.socialMedia&&instagramDialog.open) {
  clearEmbed();
  loadButton.textContent='Permitir Instagram y cargar publicación';
 }
});
