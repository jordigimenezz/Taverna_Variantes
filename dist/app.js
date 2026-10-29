const menus={aperitivo:[['Gildas de la casa','Anchoa, piparra y aceituna. El pequeño gran comienzo.','3,50 €'],['Ensaladilla Variantes','Patata, ventresca y ese punto de nuestra casa.','9 €'],['Croquetas de jamón','Crujientes por fuera. Cremosas de verdad. Cuatro unidades.','10 €'],['Conservas para compartir','Una selección del mar, con pan y buen aceite.','16 €']],mesa:[['Tomates de temporada','Buen aceite de oliva, sal y poco más.','12 €'],['Puerros a la brasa','Romesco, avellanas y el perfume del fuego.','14 €'],['Albóndigas de la taberna','Guisadas despacio. Con salsa para no dejar ni rastro.','18 €'],['La pesca del día','Una propuesta de mercado, según lo que traiga el mar.','22 €']],dulce:[['Flan de la casa','Huevo, leche, caramelo y una cucharilla.','6 €'],['Chocolate, aceite y sal','El final de siempre, que siempre apetece.','7 €'],['Quesos para alargar la charla','Selección de quesos con pan y acompañamientos.','14 €']],copas:[['Vermut de la casa','Con hielo, naranja y una aceituna.','5 €'],['Vino por copas','Una selección de blancos, tintos y burbujas.','Desde 5 €'],['Cerveza bien tirada','Fresca. Y en su punto.','3,50 €'],['Un café, sin prisa','El compañero natural de una buena sobremesa.','2,50 €']]};

const menuDialog = document.querySelector('#menu-dialog');
const navButton = document.querySelector('.mobile-menu');
const nav = document.querySelector('.mobile-nav');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const closing = new WeakMap();
const openers = new WeakMap();
const iconMarkup = name => '<svg class="icon" viewBox="0 0 256 256" aria-hidden="true"><use href="assets/icons.svg#' + name + '"></use></svg>';

function showMenu(category = 'aperitivo') {
 if (!menus[category]) category = 'aperitivo';
 document.querySelectorAll('[data-category]').forEach(button => {
  const selected = button.dataset.category === category;
  button.setAttribute('aria-selected', String(selected));
  button.tabIndex = selected ? 0 : -1;
 });
 const list = document.querySelector('#menu-list');
 list.setAttribute('aria-labelledby', 'tab-' + category);
 list.replaceChildren(...menus[category].map(([name, description, price]) => {
  const article = document.createElement('article');
  article.className = 'dish';
  const row = document.createElement('div');
  const title = document.createElement('h3');
  title.textContent = name;
  const amount = document.createElement('span');
  amount.textContent = price;
  const paragraph = document.createElement('p');
  paragraph.textContent = description;
  row.append(title, amount);
  article.append(row, paragraph);
  return article;
 }));
 window.dispatchEvent(new Event('variantes:menu-changed'));
}

function openDialog(dialog) {
 if (dialog.open) return;
 const active = document.activeElement;
 openers.set(dialog, nav.contains(active) ? navButton : active);
 closeNav();
 dialog.showModal();
 if (!reducedMotion.matches) dialog.animate(
  [{opacity: .3, transform: 'translateY(16px)'}, {opacity: 1, transform: 'translateY(0)'}],
  {duration: 280, easing: 'cubic-bezier(.16,1,.3,1)'}
 );
}

function closeDialog(dialog) {
 if (closing.has(dialog) || !dialog.open) return;
 if (reducedMotion.matches) {dialog.close(); return;}
 const animation = dialog.animate(
  [{opacity: 1, transform: 'translateY(0)'}, {opacity: 0, transform: 'translateY(8px)'}],
  {duration: 140, easing: 'ease-out'}
 );
 closing.set(dialog, animation);
 animation.finished.then(() => {
  dialog.close();
  closing.delete(dialog);
 }).catch(() => closing.delete(dialog));
}

function closeNav() {
 nav.hidden = true;
 navButton.setAttribute('aria-expanded', 'false');
 navButton.setAttribute('aria-label', 'Abrir navegación');
 navButton.innerHTML = iconMarkup('list');
}

document.querySelectorAll('[data-menu]').forEach(button => button.addEventListener('click', () => {
 showMenu(button.dataset.categoryOpen || 'aperitivo');
 openDialog(menuDialog);
}));
window.addEventListener('variantes:open-menu', event => {
 showMenu(event.detail);
 openDialog(menuDialog);
});
document.querySelectorAll('[data-reserve]').forEach(button => button.addEventListener('click', () => openDialog(document.querySelector('#visit-dialog'))));
document.querySelector('[data-about]').addEventListener('click', () => openDialog(document.querySelector('#about-dialog')));
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => closeDialog(button.closest('dialog'))));
document.querySelectorAll('dialog').forEach(dialog => {
 dialog.addEventListener('close', () => {const opener = openers.get(dialog); if (opener instanceof HTMLElement && opener.isConnected && opener.getClientRects().length) opener.focus({preventScroll:true});});
 dialog.addEventListener('cancel', event => {event.preventDefault(); closeDialog(dialog);});
 dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDialog(dialog);
 });
});
document.querySelectorAll('[data-category]').forEach(button => {
 button.addEventListener('click', () => showMenu(button.dataset.category));
 button.addEventListener('keydown', event => {
  const tabs = [...document.querySelectorAll('[data-category]')];
  let index = tabs.indexOf(button);
  if (event.key === 'ArrowRight') index = (index + 1) % tabs.length;
  else if (event.key === 'ArrowLeft') index = (index + tabs.length - 1) % tabs.length;
  else if (event.key === 'Home') index = 0;
  else if (event.key === 'End') index = tabs.length - 1;
  else return;
  event.preventDefault();
  showMenu(tabs[index].dataset.category);
  tabs[index].focus();
 });
});
document.querySelector('#visit-to-menu').addEventListener('click', () => {
 document.querySelector('#visit-dialog').close();
 showMenu();
 openDialog(menuDialog);
});
navButton.addEventListener('click', () => {
 if (!nav.hidden) {closeNav(); return;}
 nav.hidden = false;
 navButton.setAttribute('aria-expanded', 'true');
 navButton.setAttribute('aria-label', 'Cerrar navegación');
 navButton.innerHTML = iconMarkup('x');
 if (!reducedMotion.matches) nav.animate(
  [{opacity: .2, transform: 'translateY(-8px)'}, {opacity: 1, transform: 'translateY(0)'}],
  {duration: 220, easing: 'ease-out'}
 );
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
document.addEventListener('keydown', event => {
 if (event.key === 'Escape' && !nav.hidden) {closeNav(); navButton.focus();}
});
window.matchMedia('(min-width: 1101px)').addEventListener('change', event => {if (event.matches) closeNav();});
document.querySelector('#year').textContent = new Date().getFullYear();
const topButton = document.querySelector('.back-to-top');
topButton.addEventListener('click', () => {
 window.scrollTo({top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
});
new IntersectionObserver(entries => {
 topButton.classList.toggle('is-visible', !entries[0].isIntersecting);
}).observe(document.querySelector('.hero'));
const links = [...document.querySelectorAll('.nav-left a, .nav-right > a')];
const sectionObserver = new IntersectionObserver(entries => {
 entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  links.forEach(link => {
   if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'true');
   else link.removeAttribute('aria-current');
  });
 });
}, {rootMargin: '-20% 0px -55% 0px'});
document.querySelectorAll('#filosofia, #espacio, #rituales').forEach(section => sectionObserver.observe(section));
showMenu();

