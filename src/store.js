import { create } from 'zustand';
import { clock } from './lib/playback';
let restoringClips=false;
const clipsKey=id=>`touchline:clips:${id}`;
function restoreClips(match){
  try {
    const saved=JSON.parse(localStorage.getItem(clipsKey(match.id))||'[]');
    return Array.isArray(saved)?saved.filter(c=>c&&typeof c.id==='string'&&typeof c.name==='string'&&Number.isFinite(c.start)&&Number.isFinite(c.end)&&c.start>=0&&c.end>c.start&&c.end<=match.duration&&c.end-c.start<=10+.000001):[];
  }catch{return [];}
}
export const useStore=create(set=>({match:null,loadKey:0,camera:'tactical',selected:0,trails:true,numbers:true,clips:[],error:'',busy:false,exporting:false,
  load:match=>{Object.assign(clock,{time:0,playing:false,speed:1,range:null,loop:false,exporting:false,revision:clock.revision+1});restoringClips=true;try{set(s=>({match,loadKey:s.loadKey+1,selected:0,clips:[],error:''}));set({clips:restoreClips(match)});}finally{restoringClips=false;}},
  patch:value=>set(value),saveClip:clip=>set(s=>({clips:[...s.clips,{...clip,id:crypto.randomUUID()}]})),removeClip:id=>set(s=>({clips:s.clips.filter(c=>c.id!==id)}))
}));
useStore.subscribe((state,previous)=>{
  if(restoringClips||!state.match||state.clips===previous.clips)return;
  try{localStorage.setItem(clipsKey(state.match.id),JSON.stringify(state.clips));}catch{}
});
