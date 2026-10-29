const video = document.querySelector('#hero-video');
const toggle = document.querySelector('.video-toggle');
if (video && toggle) {
 const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
 const connection = navigator.connection;
 let userWantsPlayback = null;
 let inView = false;
 let failed = false;
 video.muted = true;
 video.controls = false;
 toggle.hidden = false;

 function updateControl() {
  const playing = !video.paused;
  toggle.setAttribute('aria-label', playing ? 'Pausar vídeo de portada' : 'Reproducir vídeo de portada');
  toggle.querySelector('span').textContent = playing ? 'Pausar' : 'Reproducir';
  toggle.querySelector('use').setAttribute('href', 'assets/icons.svg#' + (playing ? 'pause' : 'play'));
 }

 function shouldPlay() {
  const permitted = userWantsPlayback ?? (!preference.matches && !connection?.saveData);
  return !failed && permitted && inView && !document.hidden;
 }

 async function syncPlayback() {
  if (!shouldPlay()) {video.pause(); return;}
  try {await video.play();} catch {updateControl();}
  // A play request can resolve after the visitor has scrolled or paused.
  if (!shouldPlay()) video.pause();
 }

 toggle.addEventListener('click', () => {
  userWantsPlayback = video.paused;
  syncPlayback();
 });
 video.addEventListener('play', updateControl);
 video.addEventListener('pause', updateControl);
 video.addEventListener('error', () => {
  failed = true;
  video.hidden = true;
  toggle.hidden = true;
  document.querySelector('#video-status').textContent = 'El vídeo no está disponible. Se muestra una imagen de ambiente.';
 });
 document.addEventListener('visibilitychange', syncPlayback);
 preference.addEventListener('change', () => {
  userWantsPlayback = null;
  syncPlayback();
 });
 connection?.addEventListener('change', syncPlayback);
 new IntersectionObserver(entries => {
  inView = entries[0].isIntersecting;
  syncPlayback();
 }, {threshold:0.1}).observe(video);
 updateControl();
}
