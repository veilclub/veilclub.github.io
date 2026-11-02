/* VEIL / THE ARCHIVE v4 — play on every homepage-to-roster navigation. */
(function(){
  'use strict';
  var page=location.pathname.replace(/\/+$/,'/');
  var fromHome=(page==='/'||page==='/index.html');
  var onRoster=/\/members\.html$/.test(page);
  var reduced=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var active=false;
  var root=document.currentScript && document.currentScript.src ? new URL('./',document.currentScript.src).href : new URL('assets/',location.href).href;
  function isRosterLink(a){
    if(!a||!a.getAttribute||a.hasAttribute('download')||a.hasAttribute('data-cube-switch'))return false;
    var href=a.getAttribute('href');
    if(!href||href.charAt(0)==='#')return false;
    try{
      var dest=new URL(href,location.href);
      return dest.origin===location.origin && dest.pathname==='/members.html' && (!a.target || a.target==='_self');
    }catch(e){return false}
  }
  if(onRoster&&new URLSearchParams(location.search).get('archiveOpen')==='1'){
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){document.body.classList.add('archive-arrived')},{once:true});
    else document.body.classList.add('archive-arrived');
  }
  // All internal profile and secondary-page navigation remains immediate.
  if(!fromHome||onRoster||reduced)return;
  document.addEventListener('click',function(ev){
    if(active||ev.defaultPrevented||ev.button!==0||ev.metaKey||ev.ctrlKey||ev.shiftKey||ev.altKey)return;
    var a=ev.target&&ev.target.closest?ev.target.closest('a[href]'):null;
    if(!isRosterLink(a))return;
    ev.preventDefault();
    active=true;
    var target=new URL(a.href,location.href);
    target.searchParams.set('archiveOpen','1');
    var stage=document.createElement('div');
    stage.className='veil-archive-transition';
    stage.setAttribute('role','dialog');
    stage.setAttribute('aria-label','正在翻開 VEIL 人物名錄');
    stage.innerHTML=
      '<div class="veil-archive-transition__veil"></div>'+
      '<div class="veil-archive-transition__case" aria-hidden="true">'+
       '<div class="veil-archive-transition__folder">'+
        '<div class="veil-archive-transition__tab"></div>'+
        '<div class="veil-archive-transition__back"></div>'+
        '<div class="veil-archive-transition__paper">'+
         '<div class="veil-archive-transition__paper-top"><small>VEIL / THE ARCHIVE</small><span class="veil-archive-transition__stamp">MEMBER FILES</span></div>'+
         '<div class="veil-archive-transition__paper-main"><strong>GENTLEMEN</strong><span>每一位紳士，都有自己的故事。</span></div>'+
         '<div class="veil-archive-transition__paper-lines"><i></i><i></i><i></i></div>'+
        '</div>'+
        '<div class="veil-archive-transition__cover">'+
         '<div class="veil-archive-transition__cover-face"><img class="veil-archive-transition__logo" src="'+root+'veil-logo-silver.svg" alt=""><div class="veil-archive-transition__cover-title"><strong>THE ARCHIVE</strong><span>GENTLEMEN / VEIL</span></div></div>'+
         '<div class="veil-archive-transition__cover-inside"></div>'+
        '</div>'+
        '<div class="veil-archive-transition__spine"></div>'+
       '</div>'+
      '</div>'+
      '<div class="veil-archive-transition__caption">VEIL / THE GENTLEMEN</div>'+
      '<button type="button" class="veil-archive-transition__skip" aria-label="略過動畫，進入名冊">SKIP <span aria-hidden="true">↗</span></button>';
    document.body.appendChild(stage);
    var previousOverflow=document.documentElement.style.overflow;
    document.documentElement.style.overflow='hidden';
    var finished=false;
    function navigate(){
      if(finished)return;
      finished=true;
      document.documentElement.style.overflow=previousOverflow;
      location.assign(target.href);
    }
    var skip=stage.querySelector('.veil-archive-transition__skip');
    skip.addEventListener('click',navigate);
    function fitZoom(){
      var rect=stage.querySelector('.veil-archive-transition__case').getBoundingClientRect();
      var ratio=Math.max(innerWidth/(rect.width*.85),innerHeight/(rect.height*.85))*1.08;
      stage.style.setProperty('--archive-zoom',Math.max(2.6,ratio).toFixed(2));
    }
    fitZoom();
    requestAnimationFrame(function(){requestAnimationFrame(function(){stage.classList.add('is-entering')})});
    setTimeout(function(){stage.classList.add('is-opening')},550);
    setTimeout(function(){stage.classList.add('is-zooming')},1430);
    setTimeout(function(){stage.classList.add('is-holding')},2580);
    setTimeout(navigate,3200);
    setTimeout(navigate,4600); // fallback
  },false);
  // A direct load of the directory shows the permanent dossier instantly.
})();