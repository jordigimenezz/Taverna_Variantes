import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../dist/theme.js',import.meta.url),'utf8');
function run(entries={}) {
 const values=new Map(Object.entries(entries));
 const context={document:{documentElement:{dataset:{}}},window:{dispatchEvent(){}},matchMedia:()=>({matches:false}),CustomEvent:class{constructor(type,options){this.type=type;this.detail=options?.detail;}},localStorage:{getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,String(value)),removeItem:key=>values.delete(key)}};
 vm.runInNewContext(source,context);
 return {context,values,prefs:context.window.SitePreferences};
}
test('first visit does not retain a theme before optional consent',()=>{
 const {values,prefs}=run({'variantes-theme':'dark'});
 assert.equal(prefs.consent,null);
 assert.equal(values.has('variantes-theme'),false);
 prefs.rememberTheme('dark');
 assert.equal(values.has('variantes-theme'),false);
});
test('accepting enables theme persistence and rejection removes it',()=>{
 const {context,values,prefs}=run();
 context.document.documentElement.dataset.theme='dark';
 assert.equal(prefs.choose(true),true);
 assert.equal(values.get('variantes-theme'),'dark');
 prefs.rememberTheme('light');
 assert.equal(values.get('variantes-theme'),'light');
 prefs.choose(false);
 assert.equal(values.has('variantes-theme'),false);
 assert.equal(JSON.parse(values.get('variantes-consent-v1')).preferences,false);
});
test('expired consent cannot revive a saved optional theme',()=>{
 const {values,prefs}=run({'variantes-theme':'dark','variantes-consent-v1':JSON.stringify({version:1,preferences:true,expiresAt:Date.now()-1000})});
 assert.equal(prefs.consent,null);
 assert.equal(values.has('variantes-theme'),false);
 assert.equal(values.has('variantes-consent-v1'),false);
});
test('rejection persists across a page reload without optional data',()=>{
 const first=run();first.prefs.choose(false);
 const next=run(Object.fromEntries(first.values));
 assert.equal(next.prefs.consent.preferences,false);
 assert.equal(next.values.has('variantes-theme'),false);
});
test('blocked browser storage still allows an in-memory choice',()=>{
 const context={document:{documentElement:{dataset:{}}},window:{dispatchEvent(){}},matchMedia:()=>({matches:false}),CustomEvent:class{},localStorage:{getItem(){throw Error('blocked')},setItem(){throw Error('blocked')},removeItem(){throw Error('blocked')}}};
 vm.runInNewContext(source,context);
 assert.equal(context.window.SitePreferences.choose(false),false);
 assert.equal(context.window.SitePreferences.consent.preferences,false);
});

test('older appearance consent does not silently enable Instagram',()=>{
 const {prefs}=run({'variantes-consent-v1':JSON.stringify({version:1,preferences:true,expiresAt:Date.now()+100000})});
 assert.notEqual(prefs.consent.socialMedia,true);
});
test('Instagram consent is independent of appearance persistence',()=>{
 const {values,prefs}=run();
 prefs.choose(false,true);
 assert.equal(prefs.consent.socialMedia,true);
 assert.equal(prefs.consent.preferences,false);
 assert.equal(values.has('variantes-theme'),false);
 prefs.choose(false,false);
 assert.equal(prefs.consent.socialMedia,false);
});
test('appearance-only consent leaves Instagram disabled',()=>{
 const {prefs}=run();prefs.choose(true);
 assert.equal(prefs.consent.socialMedia,false);
});
