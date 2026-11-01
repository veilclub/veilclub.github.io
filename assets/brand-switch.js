/* VEIL / AZUREFLAME — shared cube navigation, no external libraries. */
(function(){
  'use strict';
  if(window.self !== window.top){document.documentElement.classList.add('brand-cube-embedded');return;}
  var active=false;
  function iframeUrl(url){var u=new URL(url,location.href);u.searchParams.set('brandCubeFrame','1');return u.href;}
  function waitFor(frame){return new Promise(function(resolve){var done=false;var timer=setTimeout(finish,5500);function finish(){if(done)return;done=true;clearTimeout(timer);resolve();}frame.addEventListener('load',finish,{once:true});frame.addEventListener('error',finish,{once:true});});}
  function navigate(e){
    if(e.defaultPrevented||e.button>0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    var anchor=e.currentTarget, destination=new URL(anchor.getAttribute('href'),location.href);
    if(destination.origin!==location.origin)return;
    e.preventDefault();
    if(active)return;
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){location.assign(destination.href);return;}
    active=true;anchor.setAttribute('aria-busy','true');
    var stage=document.createElement('div');stage.className='brand-cube-overlay';stage.setAttribute('aria-hidden','true');
    stage.innerHTML='<div class="brand-cube-scene"><div class="brand-cube-body"><div class="brand-cube-face brand-cube-face--from"><iframe tabindex="-1" title="目前品牌"></iframe></div><div class="brand-cube-face brand-cube-face--to"><iframe tabindex="-1" title="切換品牌"></iframe></div></div></div><div class="brand-cube-edge"></div><div class="brand-cube-label">VEIL · AZUREFLAME</div>';
    document.body.appendChild(stage);
    var faces=stage.querySelectorAll('iframe'),body=stage.querySelector('.brand-cube-body');
    var from=waitFor(faces[0]),to=waitFor(faces[1]);
    faces[0].src=iframeUrl(location.href);faces[1].src=iframeUrl(destination.href);
    var fallBack=setTimeout(function(){location.assign(destination.href);},7000);
    Promise.all([from,to]).then(function(){
      try{faces[0].contentWindow.scrollTo(0,window.scrollY);}catch(_e){}
      stage.classList.add('is-visible');
      requestAnimationFrame(function(){requestAnimationFrame(function(){body.classList.add('is-turning');});});
      var once=false;function finish(){if(once)return;once=true;clearTimeout(fallBack);location.assign(destination.href);}
      body.addEventListener('transitionend',function(ev){if(ev.propertyName==='transform')finish();},{once:true});
      setTimeout(finish,1350);
    }).catch(function(){clearTimeout(fallBack);location.assign(destination.href);});
  }
  function init(){document.querySelectorAll('a[data-cube-switch]').forEach(function(link){link.addEventListener('click',navigate);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();