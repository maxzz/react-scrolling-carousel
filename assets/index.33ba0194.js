var e=Object.assign;import{C as t,a as n}from"./vendor.f185215a.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(n){const l=new URL(e,location),r=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((n,o)=>{const s=new URL(e,l);if(self[t].moduleMap[s])return n(self[t].moduleMap[s]);const c=new Blob([`import * as m from '${s}';`,`${t}.moduleMap['${s}']=m;`],{type:"text/javascript"}),a=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(c),onerror(){o(new Error(`Failed to import: ${e}`)),r(a)},onload(){n(self[t].moduleMap[s]),r(a)}});document.head.appendChild(a)})),self[t].moduleMap={}}}("/react-scrolling-carousel/assets/");function l({size:n,children:l,style:r={}}){return t.createElement("div",{className:"item",style:e({width:`${n}rem`,height:`${n}rem`},r)},l)}function r(e){const t=e[0].previousElementSibling;return HTMLElement,t}function o(e){const t=e[e.length-1].nextElementSibling;return t instanceof HTMLElement?t:null}function s(e){const[n,l]=t.useState(null),[s,c]=t.useState(null);t.useEffect((()=>{const t=e.current;if(!t)return;console.log("------------------------------");const n=()=>{const e=t.getBoundingClientRect(),n=Array.from(t.children).filter((t=>{const n=t.getBoundingClientRect();return n.left>=e.left&&n.right<=e.right}));n.length>0&&(l(r(n)),c(o(n)),console.log("prev, next",r(n),o(n)))};return n(),t.addEventListener("scroll",function(e,t){let n,l;return function(){const r=null,o=arguments;l?(clearTimeout(n),n=setTimeout((function(){Date.now()-l>=t&&(e.apply(r,o),l=Date.now())}),t-(Date.now()-l))):(e.apply(r,o),l=Date.now())}}(n,500),{passive:!0}),()=>{t.removeEventListener("scroll",n)}}),[e]);const a=t.useCallback((t=>{const n=e.current;if(!n||!t)return;let l=t.offsetLeft+t.getBoundingClientRect().width/2-n.getBoundingClientRect().width/2;n.scroll({left:l,behavior:"smooth"})}),[e]),i=t.useCallback((()=>a(s)),[s,a]),u=t.useCallback((()=>a(n)),[n,a]);return{hasItemsOnLeft:null!==n,hasItemsOnRight:null!==s,scrollRight:i,scrollLeft:u}}function c(e){const{children:n,hasItemsOnSide:l,onClick:r,className:o}=e;let s="carousel-button "+o;return t.createElement("div",{className:s,onClick:r,style:{visibility:l?"visible":"hidden"}},n)}const a=({size:e=30,color:n="#000000"})=>t.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:n,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},t.createElement("path",{d:"M19 12H6M12 5l-7 7 7 7"})),i=({size:e=30,color:n="#000000"})=>t.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:n,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},t.createElement("path",{d:"M5 12h13M12 5l7 7-7 7"}));function u({children:e}){const n=t.useRef(),{hasItemsOnLeft:l,hasItemsOnRight:r,scrollRight:o,scrollLeft:u}=s(n);return t.createElement("div",{className:"carouser-container",role:"region","aria-label":"Colors carousel"},t.createElement("div",{className:"carouser-container-inner",ref:n},t.Children.map(e,((e,n)=>t.createElement("div",{className:"carousel-item",key:n},e)))),t.createElement(c,{className:"carousel-button-left",hasItemsOnSide:l,onClick:u},t.createElement(a,null)),t.createElement(c,{className:"carousel-button-right",hasItemsOnSide:r,onClick:o},t.createElement(i,null)))}const m=Array.from(Array(10).keys()).map((e=>t.createElement(l,{size:5,style:{color:"black"},key:e},e)));function d(){return t.createElement("div",{className:"container"},t.createElement("h1",null,"Easy Carousel"),t.createElement("div",{className:"horizontal-center"},t.createElement(u,null,m)))}n.render(t.createElement(t.StrictMode,null,t.createElement(d,null)),document.getElementById("root"));