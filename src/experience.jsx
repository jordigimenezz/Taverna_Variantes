"use client";
import React, {useState, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {motion, AnimatePresence, MotionConfig, useReducedMotion} from 'motion/react';
import {animate, inView} from 'motion';
import {ArrowUpRight,ArrowLeft,ArrowRight} from '@phosphor-icons/react';

const moments = [
 {title:'El aperitivo',note:'Para ir abriendo boca',text:'Una gilda, un vermut y esa maravillosa sensación de que el día acaba de empezar.',image:'food',alt:'Verduras frescas y pequeños platos para abrir el apetito',caption:'Lo bueno empieza con algo pequeño.',category:'aperitivo'},
 {title:'La buena mesa',note:'Para compartirlo todo',text:'Platos al centro, pan para mojar y una segunda copa que llega sin que nadie la pida.',image:'table',alt:'Un plato servido con cuidado en una mesa de restaurante',caption:'Uno para ti. Otro para compartir.',category:'mesa'},
 {title:'La sobremesa',note:'Para quedarse un poco más',text:'El café se termina. La charla, no. A veces, el mejor plato es el rato de después.',image:'bar',alt:'Luz cálida de restaurante para alargar la sobremesa',caption:'Que el último sea siempre el penúltimo.',category:'dulce'}
];

function Rituals(){
 const [active,setActive]=useState(0);
 const reduced=useReducedMotion();
 const refs=useRef([]);
 const current=moments[active];
 function onKey(event,index){
  let next=index;
  if(event.key==='ArrowRight')next=(index+1)%3;
  else if(event.key==='ArrowLeft')next=(index+2)%3;
  else if(event.key==='Home')next=0;
  else if(event.key==='End')next=2;
  else return;
  event.preventDefault();setActive(next);refs.current[next].focus();
 }
 return <MotionConfig reducedMotion="user"><div className="moment-experience">
  <div className="moment-tabs" role="tablist" aria-label="Elige tu momento en Variantes">
   {moments.map((m,i)=><button key={m.title} ref={el=>refs.current[i]=el} role="tab" id={`moment-tab-${i}`} aria-controls="moment-panel" aria-selected={i===active} tabIndex={i===active?0:-1} onKeyDown={e=>onKey(e,i)} onClick={()=>setActive(i)}><span>{m.title}</span>{i===active&&<motion.span className="moment-underline" layoutId="moment-line" transition={{duration:reduced?0:.3,ease:[.16,1,.3,1]}}/>}</button>)}
  </div>
  <div id="moment-panel" className="moment-panel" role="tabpanel" aria-labelledby={`moment-tab-${active}`} tabIndex={0}>
   <div className="moment-image"><AnimatePresence initial={false} mode="sync"><motion.img key={current.image} src={`assets/${current.image}.jpg`} alt={current.alt} initial={{opacity:0,scale:reduced?1:1.035}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:reduced?.12:.45,ease:[.16,1,.3,1]}}/></AnimatePresence></div>
   <div className="moment-copy"><span className="moment-count">{String(active+1).padStart(2,'0')} / 03</span><AnimatePresence initial={false} mode="wait"><motion.div key={active} initial={{opacity:0,y:reduced?0:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced?0:-8}} transition={{duration:reduced?.1:.22}}><h3>{current.title}</h3><p>{current.text}</p><span className="moment-note">{current.note}</span><button className="moment-cta" onClick={()=>window.dispatchEvent(new CustomEvent('variantes:open-menu',{detail:current.category}))}>VER QUÉ APETECE <ArrowUpRight className="icon" aria-hidden="true"/></button></motion.div></AnimatePresence><div className="moment-bottom"><span>{current.caption}</span><div><button aria-label="Momento anterior" onClick={()=>setActive((active+2)%3)}><ArrowLeft className="icon" aria-hidden="true"/></button><button aria-label="Momento siguiente" onClick={()=>setActive((active+1)%3)}><ArrowRight className="icon" aria-hidden="true"/></button></div></div></div>
  </div>
 </div></MotionConfig>;
}

const ritualRoot=document.querySelector('.rituals');
if(ritualRoot){ritualRoot.className='ritual-mount';createRoot(ritualRoot).render(<Rituals/>)}

const reducedQuery=window.matchMedia('(prefers-reduced-motion: reduce)');
const ease=[.16,1,.3,1];
if(!reducedQuery.matches){
 // The two halves open like a printed spread; copy remains visible if JS fails.
 animate('.hero-video',{opacity:[.65,1]},{duration:.55,ease});
 animate('.hero-copy h1',{opacity:[.45,1],y:[18,0]},{duration:.7,ease,delay:.08});
 const stop=inView('.memory-photo, .food-image',el=>{animate(el,{opacity:[.65,1],y:[20,0]},{duration:.55,ease});},{margin:'0px 0px -40px 0px'});
 reducedQuery.addEventListener('change',()=>{if(reducedQuery.matches)stop()},{once:true});
}
window.addEventListener('variantes:menu-changed',()=>{
 animate('#menu-list .dish',{opacity:[.4,1],y:reducedQuery.matches?[0,0]:[6,0]},{duration:reducedQuery.matches?.1:.22,ease});
});
// A subtle header state indicates that the editorial opening has been passed.
const hero=document.querySelector('.hero');
new IntersectionObserver(entries=>{document.querySelector('header').classList.toggle('is-scrolled',!entries[0].isIntersecting)},{threshold:0}).observe(hero);
