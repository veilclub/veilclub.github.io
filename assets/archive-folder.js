/* VEIL / The Archive v2 — slide in, open on spine, zoom into dossier, arrive. */
(function(){
'use strict';
var busy=false;
var root=document.currentScript&&document.currentScript.src?new URL('./',document.currentScript.src).href:new URL('assets/',location.href).href;
var reduced=function(){return window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches};
var onArchive=/\/(?:members\.html)$/.test(location.pathname);
if(onArchive&&new URLSearchParams(location.search).get('archiveOpen')==='1'){
 document.addEventListener('DOMContentLoaded',function(){document.body.classList.add('archive-arrived')},{once:true});
}
function match(a){
 if(!a||!a.getAttribute||a.hasAttribute('download')||a.hasAttribute('data-cube-switch'))return false;
 var h=a.getAttribute('href');if(!h||h[0]==='#')return false;
 try{var u=new URL(h,location.href);return u.origin===location.origin&&u.pathname.split('/').pop()==='members.html'&&u.pathname!==location.pathname}catch(e){return false}
}
function start(url){
 busy=true;
 var stage=document.createElement('div');stage.className='veil-archive-transition';
 stage.setAttribute('role','status');stage.setAttribute('aria-label','正在開啟 VEIL 紳士名錄');
 stage.innerHTML='<div class="veil-archive-transition__veil"></div><div class="veil-archive-transition__case" aria-hidden="true"><div class="veil-archive-transition__folder"><div class="veil-archive-transition__tab"></div><div class="veil-archive-transition__back"></div><div class="veil-archive-transition__paper"><div class="veil-archive-transition__paper-top"><small>VEIL / PERSONAL ARCHIVE</small><span class="veil-archive-transition__stamp">PRIVATE FILE</span></div><div class="veil-archive-transition__paper-main"><strong>GENTLEMEN</strong><span>紳士名錄 · THE COLLECTION</span></div><div class="veil-archive-transition__paper-lines"><i></i><i></i><i></i></div></div><div class="veil-archive-transition__cover"><div class="veil-archive-transition__cover-face"><img class="veil-archive-transition__logo" src="'+root+'veil-logo-silver.svg" alt=""><div class="veil-archive-transition__cover-title"><strong>THE ARCHIVE</strong><span>VEIL / CONFIDENTIAL DOSSIER</span></div></div><div class="veil-archive-transition__cover-inside"></div></div><div class="veil-archive-transition__spine"></div></div></div><div class="veil-archive-transition__caption">OPENING THE ARCHIVE / VEIL</div><div class="veil-archive-transition__wipe"></div>';
 document.body.appendChild(stage);
 var oldOverflow=document.documentElement.style.overflow;
 document.documentElement.style.overflow='hidden';
 // Compute zoom to cover the complete viewport in either portrait or landscape.
 function setZoom(){
  var c=stage.querySelector('.veil-archive-transition__case');
  var r=c.getBoundingClientRect();
  var ratio=Math.max(innerWidth/(r.width*.7),innerHeight/(r.height*.7))*1.3;
  c.style.setProperty('--archive-zoom',Math.max(3.6,ratio).toFixed(2));
 }
 setZoom();
 var done=false;
 function navigate(){
  if(done)return;done=true;document.documentElement.style.overflow=oldOverflow;
  var dest=new URL(url);dest.searchParams.set('archiveOpen','1');location.assign(dest.href);
 }
 requestAnimationFrame(function(){requestAnimationFrame(function(){stage.classList.add('is-entering')})});
 setTimeout(function(){stage.classList.add('is-opening')},550);
 setTimeout(function(){stage.classList.add('is-zooming')},1340);
 setTimeout(function(){stage.classList.add('is-finishing')},1860);
 setTimeout(navigate,2090);
 // Defensive fallback if transitions are interrupted.
 setTimeout(navigate,2900);
 window.addEventListener('pageshow',function(){if(!done){stage.remove();document.documentElement.style.overflow=oldOverflow;busy=false}},{once:true});
}
document.addEventListener('click',function(e){
 if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||busy||reduced())return;
 var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;
 if(!match(a)||(a.target&&a.target!=='_self'))return;
 e.preventDefault();start(new URL(a.getAttribute('href'),location.href).href);
},false);
})();
