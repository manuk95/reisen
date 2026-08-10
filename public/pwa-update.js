const panel=document.querySelector('#pwa-update');
const updateStatus=panel?.querySelector('[data-update-status]');
const button=panel?.querySelector('[data-update-button]');
const base=panel?.dataset.base;
let registration;
let refreshing=false;

const show=(text,canUpdate=false)=>{
  if(!panel||!updateStatus||!button)return;
  updateStatus.textContent=text;
  button.hidden=!canUpdate;
};

const watchInstalling=worker=>{
  if(!worker)return;
  worker.addEventListener('statechange',()=>{
    if(worker.state==='installed'&&navigator.serviceWorker.controller)show('Neue Version verfügbar',true);
  });
};

const check=async()=>{
  if(!navigator.onLine){show('Offline – Aktualisierungsprüfung nicht möglich');return}
  show('Prüfe auf Aktualisierung …');
  try{
    await registration.update();
    if(registration.waiting)show('Neue Version verfügbar',true);
    else if(!registration.installing)show('Aktuell');
  }catch(error){
    console.error('Aktualisierungsprüfung fehlgeschlagen',error);
    show(navigator.onLine?'Aktualisierung fehlgeschlagen':'Offline – Aktualisierungsprüfung nicht möglich');
  }
};

if(panel&&'serviceWorker'in navigator){
  navigator.serviceWorker.addEventListener('controllerchange',()=>{
    if(refreshing)return;
    refreshing=true;
    location.reload();
  });
  navigator.serviceWorker.addEventListener('message',event=>{
    if(event.data?.type==='UPDATE_ACTIVATED'&&!refreshing){refreshing=true;location.reload()}
  });
  navigator.serviceWorker.register(`${base}sw.js`,{scope:base,updateViaCache:'none'}).then(async reg=>{
    registration=reg;
    registration.addEventListener('updatefound',()=>watchInstalling(registration.installing));
    if(registration.waiting)show('Neue Version verfügbar',true);
    await check();
  }).catch(error=>{console.error('Service Worker konnte nicht registriert werden',error);show('Aktualisierung fehlgeschlagen')});
  button?.addEventListener('click',()=>{
    const waiting=registration?.waiting;
    if(!waiting){check();return}
    button.disabled=true;
    updateStatus.textContent='Aktualisierung wird übernommen …';
    waiting.postMessage({type:'SKIP_WAITING'});
  });
  addEventListener('online',check);
  addEventListener('offline',()=>show('Offline – Aktualisierungsprüfung nicht möglich'));
}else if(panel){
  show('Aktualisierung fehlgeschlagen');
}
