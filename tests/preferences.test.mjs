import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../dist/theme.js',import.meta.url),'utf8');
function run(entries={},storage){
 const values=new Map(Object.entries(entries));
 const context={document:{documentElement:{dataset:{},classList:{remove(){}}}},window:{},localStorage:storage??{getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,String(value)),removeItem:key=>values.delete(key)}};
 vm.runInNewContext(source,context);
 return {context,values,prefs:context.window.SitePreferences};
}
test('first visit uses the light theme and stores nothing',()=>{
 const {context,values}=run();
 assert.equal(context.document.documentElement.dataset.theme,'light');
 assert.equal(values.size,0);
});
test('a stored dark choice is applied on load',()=>{
 const {context}=run({'variantes-theme':'dark'});
 assert.equal(context.document.documentElement.dataset.theme,'dark');
});
test('unexpected stored values fall back to light',()=>{
 const {context}=run({'variantes-theme':'purple'});
 assert.equal(context.document.documentElement.dataset.theme,'light');
});
test('choosing dark stores it and returning to light removes it',()=>{
 const {context,values,prefs}=run();
 assert.equal(prefs.setTheme('dark'),true);
 assert.equal(values.get('variantes-theme'),'dark');
 assert.equal(context.document.documentElement.dataset.theme,'dark');
 prefs.setTheme('light');
 assert.equal(values.has('variantes-theme'),false);
 assert.equal(context.document.documentElement.dataset.theme,'light');
});
test('blocked browser storage still applies the theme for the visit',()=>{
 const blocked={getItem(){throw Error('blocked')},setItem(){throw Error('blocked')},removeItem(){throw Error('blocked')}};
 const {context,prefs}=run({},blocked);
 assert.equal(context.document.documentElement.dataset.theme,'light');
 assert.equal(prefs.setTheme('dark'),false);
 assert.equal(context.document.documentElement.dataset.theme,'dark');
});
