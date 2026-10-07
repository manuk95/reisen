import test from 'node:test';
import assert from 'node:assert/strict';
import autoLink from '../src/markdown/autolink.mjs';

// Explicit MDX navigation and headings must retain their authored structure.
// This is the HAST shape emitted by the MDX compiler, not an HTML element node.
test('MDX links and headings retain their text without nested automatic links', () => {
  const anchor={type:'mdxJsxTextElement',name:'a',attributes:[{type:'mdxJsxAttribute',name:'href',value:'#wiederbelebung'}],children:[{type:'text',value:'Neues Leben für Tskaltubo'}]};
  const heading={type:'mdxJsxFlowElement',name:'h2',attributes:[],children:[{type:'text',value:'Bekannte Sanatorien von Tskaltubo'}]};
  const expectedAnchor=structuredClone(anchor),expectedHeading=structuredClone(heading);
  const paragraph={type:'element',tagName:'p',properties:{},children:[{type:'text',value:'In Tskaltubo gibt es Mineralquellen.'}]};
  const tree={type:'root',children:[{type:'mdxJsxFlowElement',name:'nav',attributes:[],children:[anchor]},heading,paragraph]};
  autoLink()(tree,{path:new URL('../src/content/sehenswuerdigkeiten/tskaltubo-sanatorien.mdx',import.meta.url).pathname});
  assert.deepEqual(anchor,expectedAnchor);
  assert.deepEqual(heading,expectedHeading);
  assert.equal(paragraph.children.find(x=>x.tagName==='a')?.properties.href,'/reisen/georgien/sehenswuerdigkeiten/tskaltubo/');
});
