const video = document.querySelector('#hero-video');
if (video) {
 const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
 const connection = navigator.connection;
 let inView = false;
 let failed = false;
 video.muted = true;
 video.controls = false;

 function shouldPlay() {
  const permitted = !preference.matches && !connection?.saveData;
  return !failed && permitted && inView && !document.hidden;
 }

 async function syncPlayback() {
  if (!shouldPlay()) {video.pause(); return;}
  try {await video.play();} catch {return;}
  // A play request can resolve after the visitor has scrolled away.
  if (!shouldPlay()) video.pause();
 }

 video.addEventListener('error', () => {
  failed = true;
  video.hidden = true;
  document.querySelector('#video-status').textContent = 'El vídeo no está disponible. Se muestra una imagen de ambiente.';
 });
 document.addEventListener('visibilitychange', syncPlayback);
 preference.addEventListener('change', syncPlayback);
 connection?.addEventListener('change', syncPlayback);
 new IntersectionObserver(entries => {
  inView = entries[0].isIntersecting;
  syncPlayback();
 }, {threshold:0.1}).observe(video);
}
