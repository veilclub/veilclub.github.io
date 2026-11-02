/* VEIL / The Archive folder transition. Links retain native navigation fallback. */
(function(){
  'use strict';
  var inProgress=false;
  var assetRoot=document.currentScript && document.currentScript.src
    ? new URL('./',document.currentScript.src).href
    : new URL('assets/',location.href).href;

  function isArchiveLink(a){
    if(!a||!a.getAttribute)return false;
    var href=a.getAttribute('href');
    if(!href||href[0]==='#'||a.hasAttribute('download')||a.hasAttribute('data-cube-switch'))return false;
    try{
      var url=new URL(href,location.href);
      var destPath=url.pathname.replace(/\\/g,'/');
      return url.origin===location.origin && /(?:^|\\/)members\\.html$/.test(destPath);
    }catch(e){return false}
  }
  function reduceMotion(){
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  function openArchive(destination){
    inProgress=true;
    var stage=document.createElement('div');
    stage.className='veil-archive-transition';
    stage.setAttribute('role','status');
    stage.setAttribute('aria-label','正在打開 VEIL 紳士名錄');
    stage.innerHTML=
      '<div class="veil-archive-transition__veil"></div>'+
      '<div class="veil-archive-transition__case" aria-hidden="true">'+
        '<div class="veil-archive-transition__folder">'+
          '<div class="veil-archive-transition__tab"></div>'+
          '<div class="veil-archive-transition__back"></div>'+
          '<div class="veil-archive-transition__paper"><small>VEIL / PERSONAL ARCHIVES</small><strong>GENTLEMEN</strong><span>紳士名錄 · THE COLLECTION</span></div>'+
          '<div class="veil-archive-transition__cover">'+
            '<div class="veil-archive-transition__cover-face"><img class="veil-archive-transition__logo" alt="" src="'+assetRoot+'veil-logo-silver.svg"><strong>THE ARCHIVE</strong><span>PRIVATE / VEIL</span></div>'+
            '<div class="veil-archive-transition__cover-inside"></div>'+
          '</div>'+
          '<div class="veil-archive-transition__spine"></div>'+
        '</div>'+
      '</div>'+
      '<div class="veil-archive-transition__caption">OPENING THE ARCHIVE / VEIL</div>';
    document.body.appendChild(stage);
    var savedOverflow=document.documentElement.style.overflow;
    document.documentElement.style.overflow='hidden';
    var navigated=false;
    var go=function(){
      if(navigated)return;navigated=true;
      document.documentElement.style.overflow=savedOverflow;
      location.assign(destination);
    };
    // Start after paint: slide from the right, then open the front cover on its left hinge.
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){stage.classList.add('is-entering')});
    });
    setTimeout(function(){stage.classList.add('is-opening')},650);
    setTimeout(go,1830);
    window.addEventListener('pageshow',function(){
      if(!navigated){stage.remove();document.documentElement.style.overflow=savedOverflow;inProgress=false}
    },{once:true});
  }
  document.addEventListener('click',function(e){
    if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||inProgress||reduceMotion())return;
    var a=e.target&&e.target.closest?e.target.closest('a[href]'):null;
    if(!isArchiveLink(a)||a.target&&a.target!=='_self')return;
    var url=new URL(a.getAttribute('href'),location.href);
    if(url.pathname===location.pathname)return;
    e.preventDefault();
    openArchive(url.href);
  },false);
})();
