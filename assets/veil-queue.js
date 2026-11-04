/* VEIL admission / reception. Public publishable key only; no secret credentials. */
(()=>{
'use strict';
const API='https://ilkkjooemtqkquvkdtgk.supabase.co';
const KEY='sb_publishable_dRGH791flnK_eVRVcuFwLQ_-WL3Bjh1';
const $=id=>document.getElementById(id);
const form=$('queue-form'),message=$('queue-feedback'),status=$('queue-status'),submit=$('queue-submit'),member=$('queue-member');
const params=new URLSearchParams(location.search),slug=params.get('member');
if([...member.options].some(o=>o.value===slug))member.value=slug;
const LABEL={waiting:'等待帶位',seated:'已帶位',ordering:'服務確認中',closed:'已結束',cancelled:'已取消'};
const TOKEN_STORAGE='veil_admission_ticket_token_v1';
const api=async(path,body=null)=>{
  const response=await fetch(API+'/rest/v1/'+path,{
    method:body?'POST':'GET',
    headers:{'apikey':KEY,'Content-Type':'application/json','Accept':'application/json',...(body?{'Prefer':'return=representation'}:{})},
    body:body?JSON.stringify(body):undefined,
    cache:'no-store'
  });
  const value=await response.json().catch(()=>({}));
  if(!response.ok){const error=new Error(value.message||'SERVICE_UNAVAILABLE');error.code=value.code;throw error}
  return value;
};
const notice=(s)=>{message.textContent=s};
const setOpen=(open)=>{
  submit.disabled=!open;submit.textContent=open?'領取號碼牌':'尚未開放取號';
  status.classList.toggle('is-closed',!open);
  status.textContent=open?'本館現已開放取號。請填寫遊戲內角色名稱與同行人數。':'VEIL 目前尚未開放取號。請於館方公布營業後再使用。';
};
async function loadStatus(){
  try{
    const rows=await api('public_site_config?select=site_status&id=eq.true');
    setOpen(Array.isArray(rows)&&rows[0]?.site_status==='open');
  }catch(_){setOpen(false);status.textContent='目前無法確認營業狀態，已暫停取號。'}
}
function showTicket(row){
  if(!row?.ticket_code)return;
  $('queue-ticket').hidden=false;$('queue-placeholder').hidden=true;
  $('queue-ticket-code').textContent=row.ticket_code;
  $('queue-ticket-state').textContent=LABEL[row.ticket_status]||'等待館方確認';
}
async function updateTicket(){
  const token=sessionStorage.getItem(TOKEN_STORAGE);
  if(!token)return;
  try{
    const result=await api('rpc/veil_ticket_status',{p_token:token});
    const row=Array.isArray(result)?result[0]:null;
    if(row)showTicket(row);else{sessionStorage.removeItem(TOKEN_STORAGE);notice('找不到原先的號碼牌。')}
  }catch(_){notice('無法更新帶位狀態，請稍後再試。')}
}
form.addEventListener('submit',async event=>{
  event.preventDefault();
  if(submit.disabled)return;
  const guest=$('queue-guest').value.trim(),size=Number($('queue-count').value);
  if(guest.length<2||guest.length>48||!Number.isInteger(size)||size<1||size>10){
    notice('請確認角色名稱（2–48 字）與同行人數。');return
  }
  submit.disabled=true;submit.textContent='正在取號…';notice('');
  try{
    const result=await api('rpc/veil_issue_ticket',{p_guest_name:guest,p_party_size:size,p_member_slug:member.value});
    const row=Array.isArray(result)?result[0]:null;
    if(!row?.guest_token||!row?.ticket_code)throw Error('INVALID_RESPONSE');
    sessionStorage.setItem(TOKEN_STORAGE,row.guest_token);
    showTicket(row);
    notice('號碼牌已建立，請等候館方帶位。');
  }catch(error){
    notice(error.message?.includes('VEIL_TICKETS_NOT_OPEN')?'目前尚未開放取號。':error.message?.includes('VEIL_INVALID_TICKET')?'資料格式有誤，請重新確認。':'取號失敗，請稍後再試。');
  }finally{await loadStatus()}
});
$('queue-refresh').addEventListener('click',updateTicket);
loadStatus();updateTicket();
})();