// The video only downloads on wide screens, without data saving or reduced motion, and only while visible.
const video = document.querySelector('#hero-video');
if (video) {
 const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
 const wide = window.matchMedia('(min-width: 700px)');
 const connection = navigator.connection;
 let inView = false;
 let failed = false;
 video.muted = true;

 function shouldPlay() {
  return !failed && inView && !document.hidden && wide.matches && !motion.matches && !connection?.saveData;
 }
 async function syncPlayback() {
  if (!shouldPlay()) {if (!video.paused) video.pause(); return;}
  if (!video.src) video.src = video.dataset.src;
  try {await video.play();} catch {return;}
  if (!shouldPlay()) video.pause();
 }
 video.addEventListener('error', () => {failed = true; video.hidden = true;});
 document.addEventListener('visibilitychange', syncPlayback);
 motion.addEventListener('change', syncPlayback);
 wide.addEventListener('change', syncPlayback);
 connection?.addEventListener('change', syncPlayback);
 new IntersectionObserver(entries => {inView = entries[0].isIntersecting; syncPlayback();}, {threshold: .1}).observe(video);
}
