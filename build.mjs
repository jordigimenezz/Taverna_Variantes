import fs from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ArrowUpRight,ArrowLeft,ArrowRight,List,X,Sun,Moon,InstagramLogo} from '@phosphor-icons/react';
const icons={'arrow-up-right':ArrowUpRight,'arrow-left':ArrowLeft,'arrow-right':ArrowRight,list:List,x:X,sun:Sun,moon:Moon,instagram:InstagramLogo};
const symbols=Object.entries(icons).map(([name,Icon])=>{
 const svg=renderToStaticMarkup(React.createElement(Icon,{weight:'regular'}));
 return `<symbol id="${name}" viewBox="0 0 256 256">${svg.replace(/<svg[^>]*>/,'').replace('</svg>','')}</symbol>`;
});
fs.writeFileSync('dist/assets/icons.svg',`<svg xmlns="http://www.w3.org/2000/svg">${symbols.join('')}</svg>`);

await import('./prepare-pages.mjs');
