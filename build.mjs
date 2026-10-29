import {build} from 'esbuild';
import fs from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ArrowUpRight,ArrowDown,ArrowUp,ArrowLeft,ArrowRight,List,X,Pause,Play,Sun,Moon,InstagramLogo} from '@phosphor-icons/react';
const icons={'arrow-up-right':ArrowUpRight,'arrow-down':ArrowDown,'arrow-up':ArrowUp,'arrow-left':ArrowLeft,'arrow-right':ArrowRight,list:List,x:X,pause:Pause,play:Play,sun:Sun,moon:Moon,instagram:InstagramLogo};
const symbols=Object.entries(icons).map(([name,Icon])=>{
 const svg=renderToStaticMarkup(React.createElement(Icon,{weight:'regular'}));
 return `<symbol id="${name}" viewBox="0 0 256 256">${svg.replace(/<svg[^>]*>/,'').replace('</svg>','')}</symbol>`;
});
fs.writeFileSync('dist/assets/icons.svg',`<svg xmlns="http://www.w3.org/2000/svg">${symbols.join('')}</svg>`);
await build({entryPoints:['src/experience.jsx'],outfile:'dist/experience.js',bundle:true,minify:true,format:'esm',target:['es2020'],define:{'process.env.NODE_ENV':'"production"'},legalComments:'linked'});

await import('./prepare-pages.mjs');
