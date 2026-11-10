const menus={aperitivo:[['Gildas de la casa','Anchoa, piparra y aceituna. El pequeño gran comienzo.','3,50 €'],['Ensaladilla Variantes','Patata, ventresca y ese punto de nuestra casa.','9 €'],['Croquetas de jamón','Crujientes por fuera. Cremosas de verdad. Cuatro unidades.','10 €'],['Conservas para compartir','Una selección del mar, con pan y buen aceite.','16 €']],mesa:[['Tomates de temporada','Buen aceite de oliva, sal y poco más.','12 €'],['Puerros a la brasa','Romesco, avellanas y el perfume del fuego.','14 €'],['Albóndigas de la taberna','Guisadas despacio. Con salsa para no dejar ni rastro.','18 €'],['La pesca del día','Una propuesta de mercado, según lo que traiga el mar.','22 €']],dulce:[['Flan de la casa','Huevo, leche, caramelo y una cucharilla.','6 €'],['Chocolate, aceite y sal','El final de siempre, que siempre apetece.','7 €'],['Quesos para alargar la charla','Selección de quesos con pan y acompañamientos.','14 €']],copas:[['Vermut de la casa','Con hielo, naranja y una aceituna.','5 €'],['Vino por copas','Una selección de blancos, tintos y burbujas.','Desde 5 €'],['Cerveza bien tirada','Fresca. Y en su punto.','3,50 €'],['Un café, sin prisa','El compañero natural de una buena sobremesa.','2,50 €']]};

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const menuDialog = document.querySelector('#menu-dialog');
const menuList = document.querySelector('#menu-list');
const navButton = document.querySelector('.mobile-menu');
const mobileNav = document.querySelector('.mobile-nav');
const openers = new WeakMap();
const closing = new WeakMap();
const iconMarkup = name => '<svg class="icon" viewBox="0 0 256 256" aria-hidden="true"><use href="assets/icons.svg#' + name + '"></use></svg>';

/* Carta */
function showMenu(category = 'aperitivo') {
 if (!menus[category]) category = 'aperitivo';
 document.querySelectorAll('[data-category]').forEach(tab => {
  const selected = tab.dataset.category === category;
  tab.setAttribute('aria-selected', String(selected));
  tab.tabIndex = selected ? 0 : -1;
 });
 menuList.setAttribute('aria-labelledby', 'tab-' + category);
 menuList.replaceChildren(...menus[category].map(([name, description, price]) => {
  const article = document.createElement('article');
  article.className = 'dish';
  const row = document.createElement('div');
  const title = document.createElement('h3');
  title.textContent = name;
  const amount = document.createElement('span');
  amount.textContent = price;
  const text = document.createElement('p');
  text.textContent = description;
  row.append(title, amount);
  article.append(row, text);
  return article;
 }));
 if (!reducedMotion.matches) menuList.animate([{opacity: .4, transform: 'translateY(6px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 220, easing: 'ease-out'});
}

/* Ventanas */
function openDialog(dialog) {
 if (dialog.open) return;
 const active = document.activeElement;
 openers.set(dialog, mobileNav.contains(active) ? navButton : active);
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
 const animation = dialog.animate([{opacity: 1}, {opacity: 0, transform: 'translateY(8px)'}], {duration: 140, easing: 'ease-out'});
 closing.set(dialog, animation);
 animation.finished.then(() => {dialog.close(); closing.delete(dialog);}).catch(() => closing.delete(dialog));
}
document.querySelectorAll('[data-menu]').forEach(button => button.addEventListener('click', () => {
 showMenu(button.dataset.categoryOpen || 'aperitivo');
 openDialog(menuDialog);
}));
document.querySelectorAll('[data-about]').forEach(button => button.addEventListener('click', () => openDialog(document.querySelector('#about-dialog'))));
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => closeDialog(button.closest('dialog'))));
document.querySelectorAll('dialog').forEach(dialog => {
 dialog.addEventListener('close', () => {
  const opener = openers.get(dialog);
  if (opener instanceof HTMLElement && opener.isConnected && opener.getClientRects().length) opener.focus({preventScroll: true});
 });
 dialog.addEventListener('cancel', event => {event.preventDefault(); closeDialog(dialog);});
 dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDialog(dialog);
 });
});

/* Pestañas accesibles de la carta */
function tablist(tabs, select) {
 tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => select(index));
  tab.addEventListener('keydown', event => {
   let next = index;
   if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
   else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
   else if (event.key === 'Home') next = 0;
   else if (event.key === 'End') next = tabs.length - 1;
   else return;
   event.preventDefault();
   select(next);
   tabs[next].focus();
  });
 });
}
const menuTabs = [...document.querySelectorAll('[data-category]')];
tablist(menuTabs, index => showMenu(menuTabs[index].dataset.category));

/* Navegación móvil */
function closeNav() {
 mobileNav.hidden = true;
 navButton.setAttribute('aria-expanded', 'false');
 navButton.setAttribute('aria-label', 'Abrir navegación');
 navButton.innerHTML = iconMarkup('list');
}
navButton.addEventListener('click', () => {
 if (!mobileNav.hidden) {closeNav(); return;}
 mobileNav.hidden = false;
 navButton.setAttribute('aria-expanded', 'true');
 navButton.setAttribute('aria-label', 'Cerrar navegación');
 navButton.innerHTML = iconMarkup('x');
 if (!reducedMotion.matches) mobileNav.animate([{opacity: .2, transform: 'translateY(-8px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 220, easing: 'ease-out'});
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
document.addEventListener('keydown', event => {
 if (event.key === 'Escape' && !mobileNav.hidden) {closeNav(); navButton.focus();}
});
window.matchMedia('(min-width: 1001px)').addEventListener('change', event => {if (event.matches) closeNav();});

showMenu();
