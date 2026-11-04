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

(function(){
'use strict';
const ORDER_MEMBERS = MEMBERS.filter(m => !['不接受指名','非指名'].includes(m.appointment));
const $=id=>document.getElementById(id);
const stage=$('order-stage'),browse=$('order-browse'),wall=$('order-wall'),slot=$('order-dossier-slot');
const rates=$('order-rates'),mount=$('order-dart-mount'),dots=$('order-dots'),counter=$('order-counter'),announcer=$('order-announcer');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const pagePath=location.pathname+location.search;
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const initialIsReduced=()=>reduced.matches;
let state='BROWSE',active=0,drag=null,dragFrac=0,run=0,timers=[],clickLock=0,wheelTime=0,selected=null;
const delay=(fn,ms)=>{const t=setTimeout(fn,ms);timers.push(t);return t};
const clearTimers=()=>{timers.forEach(clearTimeout);timers=[];run++;if(selected){selected.getAnimations().forEach(a=>a.cancel())}mount.getAnimations().forEach(a=>a.cancel())};
const member=()=>ORDER_MEMBERS[active];
const pending=()=>'<span class="order-photo-pending" role="img" aria-label="PORTRAIT PENDING"><b>V</b><span>VEIL / THE ARCHIVE</span><span>PORTRAIT PENDING</span></span>';
const portrait=(m,eager=false)=>m.photo?`<img src="${safe(m.photo)}" alt="${safe(m.name)}形象照" loading="${eager?'eager':'lazy'}" decoding="async" draggable="false" onerror="const p=this.parentNode,f=p.querySelector('.order-photo-pending');this.replaceWith(f);f.hidden=false"><span class="order-photo-pending" hidden><b>V</b><span>VEIL / THE ARCHIVE</span><span>PORTRAIT PENDING</span></span>`:pending();

// The exact same photo node and dossier sheet stay in the DOM during
// browse, extraction, flight, impact, and return. Nothing is cloned.
function folderHTML(m,i){
return `<span class="order-folder-shell">
 <span class="order-folder-tab"><span>${safe(m.archive)}</span><strong>${safe(m.name)}</strong></span>
 <span class="order-folder-face">
  <span class="order-folder-head"><span>VEIL / THE ARCHIVE</span><span>CLASS: GENTLEMEN</span></span>
  <span class="order-folder-photo">${portrait(m,Math.abs(i-active)<=1)}</span>
  <span class="order-folder-bottom"><strong class="order-folder-name">${safe(m.name)}</strong><span class="order-folder-stamp">CONFIDENTIAL<span class="order-barcode"></span></span></span>
 </span>
 <span class="order-folder-detail">
  <span class="order-file-id"><span>VEIL / PERSONAL ARCHIVE</span><span class="order-file-barcode"></span></span>
  <span class="order-file-fields">
   <span><b>NAME</b><span>${safe(m.name)}</span></span>
   <span><b>ROLE</b><span>${safe(m.role)}</span></span>
   <span><b>ARCHIVE</b><span>${safe(m.archive)}</span></span>
   <span><b>TAGS</b><span>${m.tags.map(safe).join('・')}</span></span>
  </span>
  <span class="order-file-intro"><b>INTRODUCTION / PERSONALITY</b><span>${safe(m.intro)}</span></span>
  <span class="order-file-tags">${m.tags.map(x=>`<em>${safe(x)}</em>`).join('')}</span>
  <span class="order-file-stamp">VEIL</span>
 </span></span>`;
}
function ratesHTML(m){
const noAppointment=['不接受指名','非指名'].includes(m.appointment);
return `<span class="order-rates-kicker">VEIL / SERVICE LEDGER / GIL</span><h2 id="order-rates-title" tabindex="-1">Service &amp; Rates</h2><p class="order-rates-lead">${safe(m.name)} · 遊戲內 Gil 計價（1 萬 = 10,000 Gil）</p>${RATE_GROUPS.map(g=>`<section class="order-rate-group"><h3>${safe(g.title)}</h3>${g.items.map(p=>{const unavailable=noAppointment&&['s01','s02','s03','s04'].includes(p.id),photo=m.slug==='guilan'&&['s05','s06'].includes(p.id);return `<article class="order-rate-item${unavailable?' is-unavailable':''}${photo?' is-photographer':''}" data-rate="${p.id}"><div class="order-rate-head"><div class="order-rate-title"><span class="order-rate-code">${safe(p.code)}</span><h4>${safe(p.name)}</h4>${unavailable?'<span class="order-availability">此位不接受指名</span>':''}${photo?'<span class="order-photo-label">館內攝影師</span>':''}</div><div class="order-rate-price">${safe(p.price)}<span class="order-price-unit">${safe(p.unit)}</span></div></div><ul class="order-rate-notes">${p.notes.map(t=>`<li>${safe(t)}</li>`).join('')}</ul></article>`}).join('')}</section>`).join('')}<p class="order-rate-footer">其他需求可洽館內公關。實際接待與安排以雙方意願為前提。</p>`;
}
function renderRates(){
rates.innerHTML=`<span class="order-pin" aria-hidden="true"></span><div id="order-rates-content">${ratesHTML(member())}</div>`;
rates.classList.remove('is-visible','is-sliding');
}
function renderDart(){
if(!mount.querySelector('.veil-dart-art'))mount.innerHTML='<span class="veil-dart-wound" aria-hidden="true"></span><img class="veil-dart-art" src="assets/veil-dart-angled.webp" width="700" height="407" draggable="false" alt=""><span class="veil-dart-paper-lip" aria-hidden="true"></span><div class="order-sparks">'+ '<i></i>'.repeat(6)+'</div>';
mount.className='order-dart-mount';
}
function createBrowse(){
stage.innerHTML=ORDER_MEMBERS.map((m,i)=>`<button type="button" class="order-folder" id="order-folder-${i}" data-index="${i}" role="option" tabindex="-1" aria-selected="false" aria-label="${safe(m.archive)} ${safe(m.name)}" style="--folder-accent:${m.accent}">${folderHTML(m,i)}</button>`).join('');
dots.innerHTML=ORDER_MEMBERS.map((m,i)=>`<button class="order-dot" type="button" data-dot="${i}" aria-current="false" aria-label="移至 ${safe(m.archive)} ${safe(m.name)}"></button>`).join('');
dots.addEventListener('click',e=>{const b=e.target.closest('[data-dot]');if(b&&state==='BROWSE')setActive(Number(b.dataset.dot))});
positionCards();renderDart();
}
function stepSize(){return innerWidth<600?Math.min(196,innerWidth*.49):innerWidth<900?202:Math.min(250,stage.clientWidth*.22)}
function positionCards(){
const step=stepSize();
stage.querySelectorAll('.order-folder').forEach((el,i)=>{
const d=i-active-dragFrac,ad=Math.abs(d),side=Math.sign(d),cutoff=innerWidth<600?1.95:innerWidth<900?2.4:3.25;
const pos=side*(Math.min(ad,1)*step+Math.max(0,ad-1)*step*.66);
el.style.setProperty('--shift',`${pos}px`);
el.style.setProperty('--z',`${-120*ad}px`);
el.style.setProperty('--turn',`${-side*Math.min(32,ad*32)}deg`);
el.style.setProperty('--size',String(Math.max(.58,1-.13*ad)));
el.style.setProperty('--alpha',String(ad>cutoff?0:Math.max(.3,1-ad*.17)));
el.style.setProperty('--light',String(Math.max(.42,1-ad*.19)));
el.style.setProperty('--order',String(100-Math.round(ad*12)));
el.style.setProperty('--click',ad>2.7?'none':'auto');
el.setAttribute('aria-selected',String(i===active));
el.tabIndex=i===active?0:-1;
el.classList.toggle('is-active',i===active);
const img=el.querySelector('img');if(img)img.loading=ad<=1?'eager':'lazy';
});
dots.querySelectorAll('.order-dot').forEach((d,i)=>d.setAttribute('aria-current',String(i===active)));
$('order-prev').disabled=active===0;$('order-next').disabled=active===ORDER_MEMBERS.length-1;
counter.textContent=String(active+1).padStart(2,'0')+' / '+String(ORDER_MEMBERS.length).padStart(2,'0');
announcer.textContent=member().archive+' '+member().name;
}
function setActive(i){if(state!=='BROWSE')return;active=clamp(i,0,ORDER_MEMBERS.length-1);dragFrac=0;positionCards()}
// Position the actual dart tip on the TOP EDGE OF THE REAL PAPER, not the
// dossier wrapper. The wrapper has breakpoint-dependent padding.
function alignDartToPaper(){
  if(!selected || selected.parentElement!==slot)return;
  const paper=selected.getBoundingClientRect();
  const wrap=mount.offsetParent?.getBoundingClientRect();
  if(!wrap || !paper.width)return;
  // The new image is pre-rotated to its actual flight angle.
  // Pin at the REAL metal tip, near the bottom-left of its transparent canvas.
  const tipX=paper.left+paper.width*.52;
  const tipY=paper.top+19;
  const anchorX=mount.offsetWidth*.01;
  const anchorY=mount.offsetHeight*.98;
  mount.style.left=(tipX-wrap.left-anchorX)+'px';
  mount.style.top=(tipY-wrap.top-anchorY)+'px';
}
function preparePinnedCard({direct=false}={}){
const ticketLink=$('order-ticket-link');
if(ticketLink)ticketLink.href='queue.html?member='+encodeURIComponent(member().slug);

if(selected?.parentElement===stage){}else selected=stage.querySelector(`#order-folder-${active}`);
if(!selected)throw Error("Selected archive is missing.");
renderRates();renderDart();
const oldRect=selected.getBoundingClientRect();
wall.hidden=false;browse.hidden=true;
slot.appendChild(selected);
selected.classList.add('is-pinned');
selected.classList.remove('is-active');
selected.removeAttribute('role');selected.removeAttribute('aria-selected');
selected.tabIndex=-1;selected.style.removeProperty('pointer-events');
selected.style.transformOrigin='top left';
mount.classList.add('is-visible','is-aiming');
alignDartToPaper();
if(direct){mount.classList.remove('is-aiming');mount.classList.add('is-pierced');rates.classList.add('is-visible');state='PINNED'}
return {oldRect,newRect:selected.getBoundingClientRect()};
}
function finishPinned(token){
if(token!==run||state!=='FLIGHT')return;
state='PINNED';selected.classList.remove('is-lifting');selected.style.transformOrigin='';
selected.getAnimations().forEach(a=>a.cancel());
const portraitNode=selected.querySelector('.order-folder-photo');
portraitNode?.getAnimations().forEach(a=>a.cancel());
if(portraitNode)portraitNode.style.transformOrigin='';
// Measure the final settled paper, never a frame from the moving animation.
alignDartToPaper();
mount.getAnimations().forEach(a=>a.cancel());mount.style.opacity='';
mount.classList.remove('is-aiming');mount.classList.add('is-visible','is-hit','is-pierced');
selected.classList.add('is-hit');wall.classList.add('is-hit');
mount.querySelector('.order-sparks')?.classList.add('is-hit');
const m=run;
delay(()=>{if(state==='PINNED'&&run===m){selected.classList.remove('is-hit');wall.classList.remove('is-hit');mount.classList.remove('is-hit');mount.querySelector('.order-sparks')?.classList.remove('is-hit')}},430);
delay(()=>{if(state==='PINNED'&&run===m){rates.classList.add('is-visible');$('order-rates-title').focus({preventScroll:true})}},240);
}
function fireDart(token){
  if(token!==run||state!=='FLIGHT')return;
  const r=mount.getBoundingClientRect();
  // The point travels from the upper right into the sheet along the shaft's
  // actual diagonal. The drawing never flips or changes to a second dart.
  const tipX=r.left+r.width*.01;
  const dx=Math.max(280,innerWidth-tipX+150);
  const dy=-Math.max(170,Math.min(innerHeight*.68,dx*.49));
  mount.classList.remove('is-aiming');
  mount.style.opacity='0';
  mount.getAnimations().forEach(a=>a.cancel());
  mount.animate([
    {translate:`${dx}px ${dy}px`,rotate:'-2deg',scale:'1.08',opacity:0,offset:0},
    {translate:`${dx*.57}px ${dy*.57}px`,rotate:'-1deg',scale:'1.04',opacity:1,offset:.36},
    {translate:'-5px -3px',rotate:'1deg',scale:'1',opacity:1,offset:.93},
    {translate:'0px 0px',rotate:'0deg',scale:'1',opacity:1,offset:1}
  ],{duration:285,easing:'cubic-bezier(.15,.73,.23,1)',fill:'both'});
}
function openMember(){
if(state!=='BROWSE')return;
history.pushState({veilPinned:true},'',pagePath+'#'+member().slug);
clearTimers();const token=run;
state='PULL';
const photo=stage.querySelector('#order-folder-'+active+' .order-folder-photo');
// Preserve the portrait's screen-space position as the paper unfolds.
const oldPhotoRect=photo?.getBoundingClientRect();
const {oldRect,newRect}=preparePinnedCard();
selected.classList.add('is-lifting');
if(initialIsReduced()){state='FLIGHT';finishPinned(token);return}
const dx=oldRect.left-newRect.left,dy=oldRect.top-newRect.top;
const sx=oldRect.width/newRect.width,sy=oldRect.height/newRect.height;
if(photo&&oldPhotoRect){
  const newPhotoRect=photo.getBoundingClientRect();
  const expectedX=oldRect.left+(newPhotoRect.left-newRect.left)*sx;
  const expectedY=oldRect.top+(newPhotoRect.top-newRect.top)*sy;
  const tx=(oldPhotoRect.left-expectedX)/sx,ty=(oldPhotoRect.top-expectedY)/sy;
  const px=oldPhotoRect.width/(newPhotoRect.width*sx);
  const py=oldPhotoRect.height/(newPhotoRect.height*sy);
  photo.style.transformOrigin='top left';
  photo.animate([
    {translate:`${tx}px ${ty}px`,scale:`${px} ${py}`,opacity:1},
    {translate:'0px 0px',scale:'1 1',opacity:1}
  ],{duration:1040,easing:'cubic-bezier(.28,.7,.3,1)',fill:'both'});
}
// Individual transform properties do not conflict with the pinned layout's
// base transform. The same node travels throughout the complete motion.
const k=[
{translate:`${dx}px ${dy}px`,scale:`${sx} ${sy}`,rotate:'0deg',offset:0,opacity:1},
{translate:`${dx*.45}px ${dy*.37-40}px`,scale:`${sx+(1-sx)*.45} ${sy+(1-sy)*.45}`,rotate:'-3deg',offset:.54,opacity:1},
{translate:'0px 0px',scale:'1 1',rotate:'0deg',offset:1,opacity:1}
];
selected.animate(k,{duration:1040,easing:'cubic-bezier(.28,.7,.3,1)',fill:'both'});
delay(()=>{if(token===run)state='FLIGHT'},540);
delay(()=>fireDart(token),755);
delay(()=>finishPinned(token),1040);
}
function restoreBrowse({reverse=true}={}){
if(state==='BROWSE')return;
clearTimers();const token=run,old=state;
state='RETURN';
rates.classList.remove('is-visible','is-sliding');
mount.className='order-dart-mount';mount.style.opacity='';
const item=selected;
if(!item){wall.hidden=true;browse.hidden=false;state='BROWSE';positionCards();return}
const start=item.getBoundingClientRect();
browse.hidden=false;
stage.appendChild(item);
item.classList.remove('is-pinned','is-lifting','is-hit');
item.setAttribute('role','option');item.setAttribute('aria-selected','true');
item.style.transformOrigin='';
selected=null;
positionCards();
wall.hidden=true;
const end=item.getBoundingClientRect();
const done=()=>{
if(token!==run)return;
state='BROWSE';positionCards();
browse.scrollIntoView({behavior:'instant',block:'center'});
stage.focus({preventScroll:true});
};
if(reverse&&!initialIsReduced()){
const dx=start.left-end.left,dy=start.top-end.top;
const sx=start.width/end.width,sy=start.height/end.height;
const anim=item.animate([{translate:`${dx}px ${dy}px`,scale:`${sx} ${sy}`,opacity:1},{translate:'0px 0px',scale:'1 1',opacity:1}],{duration:580,easing:'cubic-bezier(.25,.75,.3,1)',fill:'both'});
delay(()=>{anim.cancel();done()},585);
}else done();
}
function backToBrowse(){if(state!=='PINNED')return;if(history.state?.veilPinned)history.back();else{history.replaceState({veilBrowse:true},'',pagePath);restoreBrowse()}}
function syncFromLocation(){
const slug=decodeURIComponent(location.hash.slice(1)),idx=ORDER_MEMBERS.findIndex(m=>m.slug===slug);
if(idx>=0){
if(state!=='BROWSE')restoreBrowse({reverse:false});
active=idx;positionCards();clearTimers();
selected=stage.querySelector(`#order-folder-${active}`);
preparePinnedCard({direct:true});
}else restoreBrowse({reverse:true});
}
// Capture pointer to distinguish swipe from click on the same DOM node.
stage.addEventListener('pointerdown',e=>{
if(state!=='BROWSE'||(e.button!==undefined&&e.button!==0))return;
drag={id:e.pointerId,start:e.clientX,last:e.clientX,lastTime:performance.now(),velocity:0,target:e.target.closest('.order-folder'),moved:false};
stage.setPointerCapture(e.pointerId);
});
stage.addEventListener('pointermove',e=>{
if(!drag||e.pointerId!==drag.id||state!=='BROWSE')return;
const now=performance.now(),dt=Math.max(1,now-drag.lastTime),dx=e.clientX-drag.start;
drag.velocity=(e.clientX-drag.last)/dt;drag.last=e.clientX;drag.lastTime=now;
if(Math.abs(dx)>6)drag.moved=true;
if(drag.moved){dragFrac=clamp(-dx/stepSize(),-3.5,3.5);positionCards()}
});
function endPointer(e,cancel=false){
if(!drag||e.pointerId!==drag.id)return;
const d=drag;drag=null;
const dx=e.clientX-d.start,isDrag=d.moved||Math.abs(dx)>6;dragFrac=0;
if(state!=='BROWSE')return;
if(cancel){positionCards();return}
if(isDrag){
const fling=clamp(-dx/stepSize()-d.velocity*200/stepSize(),-3,3);
const steps=Math.abs(fling)<.3?0:fling>0?Math.max(1,Math.round(fling)):Math.min(-1,Math.round(fling));
setActive(active+steps);clickLock=performance.now()+250;
}else if(d.target){const idx=Number(d.target.dataset.index);if(idx!==active)setActive(idx);else openMember()}else positionCards();
}
stage.addEventListener('pointerup',e=>endPointer(e));
stage.addEventListener('pointercancel',e=>endPointer(e,true));
stage.addEventListener('lostpointercapture',e=>{if(drag&&e.pointerId===drag.id){drag=null;dragFrac=0;positionCards()}});
stage.addEventListener('wheel',e=>{
if(state!=='BROWSE')return;
const delta=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;
if(!delta)return;e.preventDefault();
const now=performance.now();if(now-wheelTime<260)return;
wheelTime=now;setActive(active+(delta>0?1:-1));
},{passive:false});
stage.addEventListener('click',e=>{if(performance.now()<clickLock)e.preventDefault()});
$('order-prev').addEventListener('click',()=>setActive(active-1));
$('order-next').addEventListener('click',()=>setActive(active+1));
$('order-select').addEventListener('click',openMember);
$('order-back').addEventListener('click',backToBrowse);
document.addEventListener('keydown',e=>{
const tag=document.activeElement?.tagName;if(['INPUT','TEXTAREA','SELECT'].includes(tag))return;
if(state==='BROWSE'){
if(e.key==='ArrowRight'){e.preventDefault();setActive(active+1)}
else if(e.key==='ArrowLeft'){e.preventDefault();setActive(active-1)}
else if((e.key==='Enter'||e.key===' ')&&(document.activeElement===stage||stage.contains(document.activeElement))){e.preventDefault();openMember()}
}else if(e.key==='Escape'&&state==='PINNED'){e.preventDefault();backToBrowse()}
});
window.addEventListener('resize',()=>{
  if(state==='BROWSE')positionCards();
  else if(state==='PINNED')alignDartToPaper();
});
window.addEventListener('popstate',syncFromLocation);
createBrowse();
const first=decodeURIComponent(location.hash.slice(1)),found=ORDER_MEMBERS.findIndex(m=>m.slug===first);
if(found!==-1){
history.replaceState({veilBrowse:true},'',pagePath);
history.pushState({veilPinned:true},'',pagePath+'#'+first);
active=found;positionCards();
selected=stage.querySelector(`#order-folder-${active}`);
preparePinnedCard({direct:true});
}else{history.replaceState({veilBrowse:true},'',pagePath);browse.hidden=false;wall.hidden=true}
})();