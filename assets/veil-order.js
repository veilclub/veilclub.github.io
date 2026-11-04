/* THE DOSSIER — native JS, static data only. No network requests or payment state. */
const MEMBERS = [
  {slug:'qiuye',archive:'ARCHIVE 001',name:'囚夜',role:'HOUSE PUBLIC RELATIONS',tags:['聊天','陪伴','角色扮演'],appointment:'未標示',photo:'assets/qiuye.webp',accent:'#b4bac7',intro:'神祕的外表下，是天然、直率且不時讓人措手不及的反差。據說他原本只是來應徵攝影師。'},
  {slug:'guilan',archive:'ARCHIVE 002',name:'晷藍',role:'IN-HOUSE PHOTOGRAPHER',tags:['館內攝影師'],appointment:'不接受指名',photo:null,accent:'#82719b',intro:'深灰色的髮絲與紫色眼眸，總讓人覺得他身上帶著幾分神秘而疏離的氣息。\n不過，這份印象通常維持不了太久。因為仔細觀察便會發現，他大多時候並不是在思考什麼深奧的事情，只是單純地在發呆。'},
  {slug:'canele',archive:'ARCHIVE 003',name:'Canele',role:'RESIDENT YOUNG MASTER / BAR',tags:['吧檯'],appointment:'不接受指名',photo:null,accent:'#a28263',intro:'親切、隨性，總是帶著一抹無害的笑容。\n初次見面時，Canele 給人的印象或許像是誤入夜店的年輕貴族少爺。外貌稚嫩，氣質輕快，偶爾還帶著幾分孩子氣，讓人很難將他與一間俱樂部的幕後經營聯想在一起。'},
  {slug:'xie-xinda',archive:'ARCHIVE 004',name:'謝新達沒有死',role:'RESIDENT PUBLIC RELATIONS',tags:['閒聊','嘴砲','陪伴'],appointment:'未標示',photo:null,accent:'#8DA6BE',intro:'慢熟、率直，帶著一點不經意的幽默。\n如果你以為他不愛說話，那大概只是你還沒跟他熟起來。'},
  {slug:'jinyao',archive:'ARCHIVE 005',name:'瑾曜',role:'RESIDENT PUBLIC RELATIONS',tags:['傾聽','陪伴','安慰','討論故事'],appointment:'未標示',photo:null,accent:'#a995bc',intro:'身上帶著肉桂與薰衣草交織的味道，待人親切而有禮，總是帶著微笑。擅長傾聽，願意認真回應每一段談話。'},
  {slug:'same',archive:'ARCHIVE 006',name:'鮫 SAME',role:'RESIDENT PUBLIC RELATIONS',tags:['聊天','陪伴','輕中度 RP'],appointment:'可接受指名',photo:null,accent:'#73a3af',intro:'安靜而優雅，總是帶著淺淺的笑意。熟悉之後，偶爾也會故意說些令人難以招架的話，欣賞對方意料之外的反應。'},
  {slug:'yanxi',archive:'ARCHIVE 007',name:'言曦',role:'RESIDENT PUBLIC RELATIONS',tags:['曖昧','陪伴','年上系','深度 RP'],appointment:'未標示',photo:null,accent:'#A6ADC7',intro:'溫柔親切，擅長傾聽。從日常閒聊到音樂、文學與哲學，都能自然交流；熟悉之後，也許會發現他不只有溫柔的一面。'},
  {slug:'izayoi-kou',archive:'ARCHIVE ⋰⟡⋱ ⛵︎ ⌁̷⋯',name:'十六夜航',role:'CREATIVE / DESIGN / TECHNICAL DIRECTOR',tags:['技術','設計','藝術'],appointment:'非指名',photo:'assets/izayoi-kou-portrait.webp',accent:'#9081a7',intro:'「月光尚懂得姍姍來遲，今夜又何必如此匆忙？」\n俊雅從容、略帶慵懶的駐店（？）總監。將技術與美感藏在薄幕之後，不親自駛入夜色，卻為夜航者留下一束光。'}
];
const RATE_GROUPS = [
  {title:'基本體驗',items:[
    {id:'house',code:'THE HOUSE',name:'基本體驗',price:'無低消',unit:'—',notes:['吧檯自由交流・餐桌・飲品']}
  ]},
  {title:'指名與專屬服務',items:[
    {id:'s01',code:'PERSONAL APPOINTMENT',name:'指名',price:'20 萬',unit:'／30 分鐘',notes:['同行每增加 1 人，加收 5 萬。','續時 15 萬／30 分鐘。','原同行者人頭費只收首次，續時不重複收取。']},
    {id:'s02',code:'OUTING',name:'外出',price:'30 萬',unit:'／30 分鐘',notes:['可在遊戲內隨處走動，同組客人可同行，最長 1 小時。','可前往其他 RP 店，所產生的額外費用另計。','續時 15 萬／30 分鐘']},
    {id:'s03',code:'PRIVATE ROOM',name:'包廂',price:'+7 萬',unit:'／30 分鐘',notes:['需搭配指名服務，包廂費為指名費之外另加。','單人：20＋7＝27 萬；兩人：20＋5＋7＝32 萬（首次 30 分鐘）。','包廂續時按原價計算，不適用指名續時優惠。']},
    {id:'s04',code:'GROUP APPOINTMENT',name:'團客',price:'40 萬',unit:'／4 人・30 分鐘',notes:['四人可指名 1 位公關。','四人以上每增加 1 人，加收 5 萬。','續時按原價計算。']}
  ]},
  {title:'攝影與特別企劃',items:[
    {id:'s05',code:'PHOTOGRAPHY',name:'拍照',price:'15 萬',unit:'／張',notes:['實際拍攝張數依攝影時間調整。']},
    {id:'s06',code:'SIGNED PORTRAIT',name:'簽繪',price:'30 萬',unit:'／張',notes:['每位攝影師單日營業限 3 張。']},
    {id:'s07',code:'CHAMPAGNE TOWER',name:'香檳塔',price:'100 萬',unit:'／次',notes:['包含跳舞、香檳 × 3，以及專屬攝影師拍照。']},
    {id:'s08',code:'BIRTHDAY EVENT',name:'生日企劃',price:'客製報價',unit:'—',notes:['依活動需求與內容報價。','例如大地遊戲、店內公關於海都白頻祝賀、拍照。']}
  ]}
];

(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const stage=$('order-stage'),browse=$('order-browse'),wall=$('order-wall'),cinema=$('order-cinematic');
  const sheet=$('order-transit-sheet'),folder=$('order-pull-folder'),dartFlyer=$('order-dart-flyer');
  const dossier=$('order-dossier'),rates=$('order-rates'),mount=$('order-dart-mount');
  const dots=$('order-dots'),counter=$('order-counter'),announcer=$('order-announcer');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const pagePath=location.pathname+location.search;
  const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
  let state='BROWSE',active=0,drag=null,dragFrac=0,run=0,timers=[],clickLock=0,wheelTime=0;
  const isReduced=()=>reduced.matches;
  const delay=(fn,ms)=>{const t=setTimeout(fn,ms);timers.push(t);return t};
  const clearTimers=()=>{timers.forEach(clearTimeout);timers=[];run++};
  const member=()=>MEMBERS[active];
  const archiveLabel=m=>m.archive;
  const pending=()=>'<span class="order-photo-pending" role="img" aria-label="PORTRAIT PENDING"><b>V</b><span>VEIL / THE ARCHIVE</span><span>PORTRAIT PENDING</span></span>';
  const portrait=(m,eager=false)=>m.photo?`<img src="${safe(m.photo)}" alt="${safe(m.name)}形象照" loading="${eager?'eager':'lazy'}" decoding="async" onerror="const p=this.parentNode,f=p.querySelector('.order-photo-pending');this.replaceWith(f);f.hidden=false"><span class="order-photo-pending" hidden><b>V</b><span>VEIL / THE ARCHIVE</span><span>PORTRAIT PENDING</span></span>`:pending();
  const dartSVG=(accent)=>`<svg viewBox="0 0 108 55" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="dartMetal" x1="0" x2="1"><stop stop-color="#5e6a78"/><stop offset=".45" stop-color="#f2f4f8"/><stop offset="1" stop-color="#788696"/></linearGradient></defs><path d="M4 27L25 23L25 32Z" fill="#dbe6f4"/><path d="M25 24L72 24L74 30L25 30Z" fill="url(#dartMetal)" stroke="#596a7d" stroke-width="1"/><path d="M69 22L83 18L89 35L74 32Z" fill="#a5b7cb"/><path d="M82 27L105 7L102 26L106 47Z" fill="${safe(accent)}" stroke="#d4dfec" stroke-width="1.3"/><path d="M83 27L105 7M83 27L106 47" stroke="#f0f2fa" opacity=".7"/></svg>`;

  function folderHTML(m,i){return `<span class="order-folder-shell"><span class="order-folder-tab"><span>${safe(m.archive)}</span><strong>${safe(m.name)}</strong></span><span class="order-folder-face"><span class="order-folder-head"><span>VEIL / THE ARCHIVE</span><span>CLASS: GENTLEMEN</span></span><span class="order-folder-photo">${portrait(m,Math.abs(i-active)<=1)}</span><span class="order-folder-bottom"><span class="order-folder-name">${safe(m.name)}</span><span class="order-folder-stamp">CONFIDENTIAL<span class="order-barcode"></span></span></span></span></span>`}
  function cardHTML(m){return `<div class="order-dossier-head"><span class="order-dossier-archive">${safe(m.archive)}<br>VEIL / PRIVATE FILE</span><span class="order-dossier-archive">GENTLEMEN / 01</span></div><h3 class="order-dossier-name">${safe(m.name)}</h3><div class="order-dossier-main"><figure class="order-dossier-photo">${portrait(m,true)}</figure><dl class="order-dossier-fields"><div><dt>NAME</dt><dd>${safe(m.name)}</dd></div><div><dt>ROLE</dt><dd>${safe(m.role)}</dd></div><div><dt>ARCHIVE</dt><dd>${safe(m.archive)}</dd></div><div><dt>TAGS</dt><dd>${m.tags.map(safe).join('・')}</dd></div></dl></div><p class="order-dossier-intro">${safe(m.intro)}</p><div class="order-dossier-tags">${m.tags.map(t=>`<span>${safe(t)}</span>`).join('')}</div><div class="order-dossier-stamp">VEIL</div><span class="order-holo" aria-hidden="true"></span>`}
  function ratesHTML(m){const noAppointment=m.appointment==='不接受指名'||m.appointment==='非指名';return `<span class="order-rates-kicker">VEIL / SERVICE LEDGER / GIL</span><h2 id="order-rates-title" tabindex="-1">Service &amp; Rates</h2><p class="order-rates-lead">${safe(m.name)} · 遊戲內 Gil 計價（1 萬 = 10,000 Gil）</p>${RATE_GROUPS.map(g=>`<section class="order-rate-group"><h3>${safe(g.title)}</h3>${g.items.map(p=>{const unavailable=noAppointment&&['s01','s02','s03','s04'].includes(p.id);const photo=m.slug==='guilan'&&['s05','s06'].includes(p.id);return `<article class="order-rate-item${unavailable?' is-unavailable':''}${photo?' is-photographer':''}" data-rate="${p.id}"><div class="order-rate-head"><div class="order-rate-title"><span class="order-rate-code">${safe(p.code)}</span><h4>${safe(p.name)}</h4>${unavailable?'<span class="order-availability">此位不接受指名</span>':''}${photo?'<span class="order-photo-label">館內攝影師</span>':''}</div><div class="order-rate-price">${safe(p.price)}<span class="order-price-unit">${safe(p.unit)}</span></div></div><ul class="order-rate-notes">${p.notes.map(t=>`<li>${safe(t)}</li>`).join('')}</ul></article>`}).join('')}</section>`).join('')}<p class="order-rate-footer">其他需求可洽館內公關。實際接待與安排以雙方意願為前提。</p>`}

  function createBrowse(){
    stage.innerHTML=MEMBERS.map((m,i)=>`<button class="order-folder" id="order-folder-${i}" type="button" role="option" data-index="${i}" aria-selected="false" aria-label="${safe(m.archive)} ${safe(m.name)}" style="--folder-accent:${m.accent}">${folderHTML(m,i)}</button>`).join('');
    dots.innerHTML=MEMBERS.map((m,i)=>`<button class="order-dot" type="button" data-dot="${i}" aria-label="移至 ${safe(m.archive)} ${safe(m.name)}" aria-current="false"></button>`).join('');
    dots.addEventListener('click',e=>{const b=e.target.closest('[data-dot]');if(b&&state==='BROWSE')setActive(Number(b.dataset.dot))});
    positionCards();
  }
  function stepSize(){return window.innerWidth<600?Math.min(196,window.innerWidth*.49):window.innerWidth<900?202:Math.min(250,stage.clientWidth*.22)}
  function positionCards(){const step=stepSize();stage.querySelectorAll('.order-folder').forEach((el,i)=>{
      const d=i-active-dragFrac,ad=Math.abs(d),side=Math.sign(d);const cutoff=window.innerWidth<600?1.95:window.innerWidth<900?2.4:3.25;
      const pos=side*(Math.min(ad,1)*step+Math.max(0,ad-1)*step*.66);
      el.style.setProperty('--shift',`${pos}px`);el.style.setProperty('--z',`${-120*ad}px`);el.style.setProperty('--turn',`${-side*Math.min(32,ad*32)}deg`);el.style.setProperty('--size',String(Math.max(.58,1-.13*ad)));el.style.setProperty('--alpha',String(ad>cutoff?0:Math.max(.3,1-ad*.17)));el.style.setProperty('--light',String(Math.max(.42,1-ad*.19)));el.style.setProperty('--order',String(100-Math.round(ad*12)));el.style.setProperty('--click',ad>2.7?'none':'auto');el.setAttribute('aria-selected',String(i===active));el.classList.toggle('is-active',i===active);
      const img=el.querySelector('img');if(img)img.loading=ad<=1?'eager':'lazy';
    });
    dots.querySelectorAll('.order-dot').forEach((dot,i)=>dot.setAttribute('aria-current',String(i===active)));
    $('order-prev').disabled=active===0;$('order-next').disabled=active===MEMBERS.length-1;
    counter.textContent=String(active+1).padStart(2,'0')+' / '+String(MEMBERS.length).padStart(2,'0');
    announcer.textContent=archiveLabel(member())+' '+member().name;
  }
  function setActive(index){if(state!=='BROWSE')return;active=clamp(index,0,MEMBERS.length-1);dragFrac=0;positionCards()}

  function previewMember(m){dossier.style.setProperty('--folder-accent',m.accent);dossier.style.setProperty('--paper-rotation',`${[-2,-1,1,2,-1,2,-2,1][active]}deg`);dossier.innerHTML=cardHTML(m);rates.innerHTML=`<span class="order-pin" aria-hidden="true"></span><div id="order-rates-content">${ratesHTML(m)}</div>`;rates.classList.remove('is-visible');mount.className='order-dart-mount';mount.innerHTML=dartSVG(m.accent)+`<div class="order-sparks">${'<i></i>'.repeat(6)}</div>`}
  function showPinned({direct=false,hit=false}={}){
    state='PINNED';clearTimers();drag=null;const m=member();
    dossier.getAnimations().forEach(a=>a.cancel());rates.getAnimations().forEach(a=>a.cancel());
    wall.hidden=false;browse.hidden=true;cinema.hidden=true;cinema.className='order-cinematic';dartFlyer.hidden=true;
    previewMember(m);dossier.style.visibility='visible';dossier.style.opacity='';mount.classList.add('is-visible');
    if(hit){mount.classList.remove('is-aiming');mount.classList.add('is-hit');dossier.classList.add('is-hit');wall.classList.add('is-hit');mount.querySelector('.order-sparks').classList.add('is-hit');delay(()=>{dossier.classList.remove('is-hit');wall.classList.remove('is-hit');mount.classList.remove('is-hit')},450)}
    rates.classList.add('is-visible');
    // On deep links only: an instant scroll. During flight the wall is already fixed.
    if(direct)wall.scrollIntoView({behavior:'instant',block:'start'});
    $('order-rates-title').focus({preventScroll:true});
  }
  function openMember(){if(state!=='BROWSE')return;history.pushState({veilPinned:true},'',pagePath+'#'+member().slug);if(isReduced()){showPinned({direct:true});return}
    clearTimers();state='PULL';browse.classList.add('is-pulling');cinema.hidden=false;cinema.className='order-cinematic';
    $('order-pull-label').textContent=member().archive;sheet.innerHTML=cardHTML(member());sheet.removeAttribute('style');sheet.style.setProperty('--folder-accent',member().accent);
    // Restart CSS animation only after DOM is ready.
    cinema.offsetWidth;cinema.classList.add('is-pull');
    const token=run;delay(()=>{if(state!=='PULL'||token!==run)return;sheet.addEventListener('pointerdown',skipPause,{once:true});delay(()=>{if(state==='PULL'&&token===run)beginFlight()},900)},820);
  }
  function skipPause(){if(state==='PULL')beginFlight()}
  const FLIGHT_DURATION=610;
  const DART_DURATION=290;
  const DART_TIP_X=100*4/108, DART_TIP_Y=27;
  function beginFlight(){
    if(state!=='PULL')return;
    state='FLIGHT';const token=run,m=member();
    sheet.removeEventListener('pointerdown',skipPause);
    browse.hidden=true;wall.hidden=false;previewMember(m);
    dossier.style.visibility='visible';dossier.style.opacity='0';
    // site.css enables smooth scrolling. Fix the wall's viewport position
    // synchronously BEFORE computing the flight and dart landing geometry.
    wall.scrollIntoView({behavior:'instant',block:'start'});
    cinema.classList.add('is-flight');folder.hidden=true;
    sheet.style.animation='none';
    sheet.style.transform='translate(-50%,-50%) rotate(1deg)';
    sheet.style.opacity='1';
    const from=sheet.getBoundingClientRect(),to=dossier.getBoundingClientRect();
    const x=to.left+to.width/2-(from.left+from.width/2);
    const y=to.top+to.height/2-(from.top+from.height/2);
    const scale=to.width/from.width;
    sheet.getAnimations().forEach(a=>a.cancel());
    // The extracted summary sheet is shorter than the full dossier.
    // Keep the moving sheet fully opaque until it is replaced at impact.
    // Both paper elements must never fade away at the same time.
    sheet.animate([
      {transform:'translate(-50%,-50%) rotate(1deg)',opacity:1,offset:0},
      {transform:'translate(-50%,-50%) translate3d('+x*.72+'px,'+y*.72+'px,0) scale('+(1+(scale-1)*.72)+') rotate(-1deg)',opacity:1,offset:.60},
      {transform:'translate(-50%,-50%) translate3d('+x+'px,'+y+'px,0) scale('+scale+') rotate(-2deg)',opacity:1,offset:1}
    ],{duration:FLIGHT_DURATION,fill:'forwards',easing:'cubic-bezier(.2,.7,.3,1)'});
    dossier.animate([{opacity:0,offset:0},{opacity:0,offset:.72},{opacity:1,offset:1}],
      {duration:FLIGHT_DURATION,fill:'forwards',easing:'ease-out'});
    cinema.querySelector('.order-cinematic-shade').animate([
      {opacity:1},{opacity:.2}
    ],{duration:FLIGHT_DURATION,fill:'forwards'});
    // The stationary and moving dart use the SAME measured tip anchor.
    mount.classList.add('is-visible','is-aiming');
    const anchor=mount.getBoundingClientRect();
    launchDart(m.accent,anchor.left+DART_TIP_X,anchor.top+DART_TIP_Y);
    delay(()=>{
      if(token!==run||state!=='FLIGHT')return;
      folder.hidden=false;showPinned({hit:true});
    },FLIGHT_DURATION);
  }
  function launchDart(accent,x,y){
    dartFlyer.innerHTML=dartSVG(accent);dartFlyer.hidden=false;
    dartFlyer.getAnimations().forEach(a=>a.cancel());
    const sx=innerWidth+120,sy=Math.min(-70,y-270);
    const midX=x+(sx-x)*.50,midY=y-Math.min(180,Math.abs(y-sy)*.62);
    const at=(xx,yy,deg)=>'translate3d('+(xx-DART_TIP_X)+'px,'+(yy-DART_TIP_Y)+'px,0) rotate('+deg+'deg)';
    dartFlyer.style.offsetPath='none';
    dartFlyer.animate([
      {transform:at(sx,sy,-8),opacity:0,offset:0},
      {transform:at(sx-(sx-x)*.25,sy+(midY-sy)*.62,-16),opacity:1,offset:.25},
      {transform:at(midX,midY,-19),opacity:1,offset:.56},
      {transform:at(x,y,-25),opacity:1,offset:1}
    ],{duration:DART_DURATION,delay:FLIGHT_DURATION-DART_DURATION,
       easing:'cubic-bezier(.17,.63,.26,1)',fill:'both' /* hide at offscreen start during delay */});
  }
  function restoreBrowse({reverse=false}={}){
    if(state==='BROWSE')return;clearTimers();const old=state;state='FLIGHT';
    cinema.hidden=true;dartFlyer.hidden=true;folder.hidden=false;browse.classList.remove('is-pulling');
    const finish=()=>{wall.hidden=true;browse.hidden=false;state='BROWSE';stage.focus({preventScroll:true});positionCards();browse.scrollIntoView({behavior:'instant',block:'center'})};
    if(reverse&&old==='PINNED'&&!isReduced()){
      dossier.animate([{transform:'translateY(0) scale(1)',opacity:1},{transform:'translateY(100px) scale(.78) rotate(-5deg)',opacity:0}],{duration:470,easing:'ease-in',fill:'forwards'});
      rates.animate([{transform:'translateX(0)',opacity:1},{transform:'translateX(45px)',opacity:0}],{duration:420,fill:'forwards'});
      delay(finish,480);
    }else finish();
  }
  function backToBrowse(){if(state!=='PINNED')return;if(history.state?.veilPinned){history.back()}else{history.replaceState({veilBrowse:true},'',pagePath);restoreBrowse({reverse:true})}}
  function syncFromLocation(){const slug=decodeURIComponent(location.hash.slice(1));const idx=MEMBERS.findIndex(m=>m.slug===slug);if(idx>=0){clearTimers();active=idx;positionCards();showPinned({direct:true})}else restoreBrowse({reverse:true})}

  // Pointer Events: capture drag; separate click from >6px drag; velocity adds inertia.
  stage.addEventListener('pointerdown',e=>{if(state!=='BROWSE'||(e.button!==undefined&&e.button!==0))return;drag={id:e.pointerId,start:e.clientX,last:e.clientX,lastTime:performance.now(),velocity:0,target:e.target.closest('.order-folder'),moved:false};stage.setPointerCapture(e.pointerId)});
  stage.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id||state!=='BROWSE')return;const now=performance.now(),dt=Math.max(1,now-drag.lastTime),dx=e.clientX-drag.start;drag.velocity=(e.clientX-drag.last)/dt;drag.last=e.clientX;drag.lastTime=now;if(Math.abs(dx)>6)drag.moved=true;if(drag.moved){dragFrac=clamp(-dx/stepSize(),-3.5,3.5);positionCards()}});
  function endPointer(e,cancel=false){if(!drag||e.pointerId!==drag.id)return;const d=drag;drag=null;const dx=e.clientX-d.start;const isDrag=d.moved||Math.abs(dx)>6;dragFrac=0;if(state!=='BROWSE')return;if(cancel){positionCards();return}if(isDrag){const fling=clamp(-dx/stepSize() - d.velocity*200/stepSize(),-3,3);const steps=Math.abs(fling)<.3?0:(fling>0?Math.max(1,Math.round(fling)):Math.min(-1,Math.round(fling)));setActive(active+steps);clickLock=performance.now()+250}else if(d.target){const i=Number(d.target.dataset.index);if(i!==active)setActive(i);else openMember()}else positionCards()}
  stage.addEventListener('pointerup',e=>endPointer(e));stage.addEventListener('pointercancel',e=>endPointer(e,true));stage.addEventListener('lostpointercapture',e=>{if(drag&&e.pointerId===drag.id){drag=null;dragFrac=0;positionCards()}});
  stage.addEventListener('wheel',e=>{if(state!=='BROWSE')return;const delta=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;if(!delta)return;e.preventDefault();const now=performance.now();if(now-wheelTime<260)return;wheelTime=now;setActive(active+(delta>0?1:-1))},{passive:false});
  stage.addEventListener('click',e=>{if(performance.now()<clickLock)e.preventDefault()});
  $('order-prev').addEventListener('click',()=>setActive(active-1));$('order-next').addEventListener('click',()=>setActive(active+1));$('order-select').addEventListener('click',openMember);$('order-back').addEventListener('click',backToBrowse);
  document.addEventListener('keydown',e=>{const tag=document.activeElement?.tagName;if(['INPUT','TEXTAREA','SELECT'].includes(tag))return;if(state==='BROWSE'){if(e.key==='ArrowRight'){e.preventDefault();setActive(active+1)}else if(e.key==='ArrowLeft'){e.preventDefault();setActive(active-1)}else if((e.key==='Enter'||e.key===' ')&&(document.activeElement===stage||stage.contains(document.activeElement))){e.preventDefault();openMember()}}else if(e.key==='Escape'&&state==='PINNED'){e.preventDefault();backToBrowse()}});
  window.addEventListener('resize',()=>{if(state==='BROWSE')positionCards()});window.addEventListener('popstate',syncFromLocation);
  createBrowse();
  const first=decodeURIComponent(location.hash.slice(1)),found=MEMBERS.findIndex(m=>m.slug===first);
  if(found!==-1){history.replaceState({veilBrowse:true},'',pagePath);history.pushState({veilPinned:true},'',pagePath+'#'+first);active=found;positionCards();showPinned({direct:true})}
  else{history.replaceState({veilBrowse:true},'',pagePath);browse.hidden=false;wall.hidden=true}
})();