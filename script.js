(()=>{'use strict';

/* ---------- Sprite factory: every fruit is painted once on an offscreen canvas ---------- */
const TAU=Math.PI*2,PX=256,U=200;
let _s=11;const rnd=()=>{_s|=0;_s=_s+0x6D2B79F5|0;let t=Math.imul(_s^_s>>>15,1|_s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
const mkc=()=>{const c=document.createElement('canvas');c.width=c.height=PX;const x=c.getContext('2d');x.scale(PX/U,PX/U);return[c,x];};
const rg=(x,cx,cy,r0,r1,s)=>{const g=x.createRadialGradient(cx,cy,r0,cx,cy,r1);s.forEach(a=>g.addColorStop(a[0],a[1]));return g;};
const lg=(x,x0,y0,x1,y1,s)=>{const g=x.createLinearGradient(x0,y0,x1,y1);s.forEach(a=>g.addColorStop(a[0],a[1]));return g;};
const ell=(x,cx,cy,rx,ry,r)=>{x.beginPath();x.ellipse(cx,cy,rx,ry,r||0,0,TAU);};
const gloss=(x,cx,cy,rx,ry,r,a)=>{ell(x,cx,cy,rx,ry,r);x.fillStyle='rgba(255,255,255,'+a+')';x.fill();};
const circ=(x,r,fill)=>{x.beginPath();x.arc(0,0,r,0,TAU);x.fillStyle=fill;x.fill();};
function leaf(x,bx,by,ang,L,w,c0,c1){
  x.save();x.translate(bx,by);x.rotate(ang);
  x.beginPath();x.moveTo(0,-w/2);x.quadraticCurveTo(L*.55,-w*.62,L,0);x.quadraticCurveTo(L*.55,w*.62,0,w/2);x.closePath();
  x.fillStyle=lg(x,0,0,L,0,[[0,c0],[1,c1]]);x.fill();
  x.strokeStyle='rgba(0,0,0,.2)';x.lineWidth=1;x.stroke();x.restore();
}
function seed(x,px,py,ang,len,col){
  x.save();x.translate(px,py);x.rotate(ang);x.beginPath();
  x.moveTo(len,0);x.quadraticCurveTo(0,-len*.55,-len*.6,0);x.quadraticCurveTo(0,len*.55,len,0);
  x.fillStyle=col;x.fill();x.restore();
}
function wedges(x,n,r,col,w){x.strokeStyle=col;x.lineWidth=w;for(let i=0;i<n;i++){const a=i/n*TAU;x.beginPath();x.moveTo(0,0);x.lineTo(Math.cos(a)*r,Math.sin(a)*r);x.stroke();}}

/* name, points, size multiplier, weight in spawn lottery, cut-face centre y, cut-face radius */
const FR={
lemon:{name:'Lemon',pts:5,sc:.92,w:10,fcy:100,fR:50,juice:'#fff176',
  whole(x){
    x.beginPath();x.moveTo(22,100);x.quadraticCurveTo(24,92,32,90);
    x.bezierCurveTo(50,46,150,46,168,90);x.quadraticCurveTo(176,92,178,100);
    x.quadraticCurveTo(176,108,168,110);x.bezierCurveTo(150,154,50,154,32,110);x.quadraticCurveTo(24,108,22,100);x.closePath();
    x.fillStyle=rg(x,84,80,6,100,[[0,'#fff59a'],[.45,'#f7dc2b'],[1,'#c9a400']]);x.fill();
    x.save();x.clip();for(let i=0;i<110;i++){ell(x,30+rnd()*140,56+rnd()*88,1.3,1,0);x.fillStyle='rgba(150,110,0,.22)';x.fill();}x.restore();
    gloss(x,78,78,22,9,-.35,.45);
  },
  face(x,R){circ(x,R+4,'#d8b800');circ(x,R,'#fffbe2');circ(x,R*.92,rg(x,0,0,2,R,[[0,'#fff8a8'],[1,'#f5dc3a']]));
    wedges(x,8,R*.9,'#fffbe2',3);circ(x,R*.1,'#fffbe2');
    for(let i=0;i<8;i++){const a=(i+.5)/8*TAU;seed(x,Math.cos(a)*R*.45,Math.sin(a)*R*.45,a,4.5,'#f3e7b0');}}},
apple:{name:'Apple',pts:10,sc:1,w:14,fcy:108,fR:60,juice:'#ffe9a8',
  whole(x){
    x.beginPath();x.moveTo(100,62);x.bezierCurveTo(128,44,170,62,166,108);x.bezierCurveTo(162,150,130,172,108,166);
    x.quadraticCurveTo(100,163,92,166);x.bezierCurveTo(70,172,38,150,34,108);x.bezierCurveTo(30,62,72,44,100,62);x.closePath();
    x.fillStyle=rg(x,80,88,6,104,[[0,'#ff7d6a'],[.35,'#e4182a'],[.8,'#a40f1e'],[1,'#6c0813']]);x.fill();
    x.save();x.clip();x.strokeStyle='rgba(255,200,120,.2)';x.lineWidth=3;
    for(let i=-3;i<=3;i++){x.beginPath();x.moveTo(100+i*5,68);x.quadraticCurveTo(100+i*24,112,100+i*17,164);x.stroke();}x.restore();
    ell(x,100,64,11,5,0);x.fillStyle='rgba(50,0,0,.5)';x.fill();
    gloss(x,72,92,12,26,-.45,.38);
    x.strokeStyle='#5a3a1a';x.lineWidth=5;x.lineCap='round';x.beginPath();x.moveTo(100,64);x.quadraticCurveTo(100,46,108,34);x.stroke();
    leaf(x,108,44,-.5,34,16,'#2f8f2a','#8fd14a');
  },
  face(x,R){circ(x,R+3,'#a40f1e');circ(x,R,rg(x,0,0,4,R,[[0,'#fffbe8'],[1,'#f4e3a2']]));
    x.beginPath();x.ellipse(0,0,R*.3,R*.42,0,0,TAU);x.fillStyle='#e9d9a0';x.fill();
    seed(x,-4,-6,-1.2,9,'#5b3414');seed(x,4,8,1.9,9,'#5b3414');}},
orange:{name:'Orange',pts:12,sc:1.02,w:12,fcy:100,fR:64,juice:'#ffb02e',
  whole(x){
    ell(x,100,100,66,66,0);x.fillStyle=rg(x,78,76,6,100,[[0,'#ffc15e'],[.45,'#f68c0a'],[1,'#b85600']]);x.fill();
    x.save();x.clip();for(let i=0;i<130;i++){const a=rnd()*TAU,r=Math.sqrt(rnd())*64;ell(x,100+Math.cos(a)*r,100+Math.sin(a)*r,1.3,1,0);x.fillStyle='rgba(130,60,0,.28)';x.fill();}x.restore();
    gloss(x,76,70,20,10,-.6,.45);
    x.save();x.translate(100,38);for(let i=0;i<5;i++){leaf(x,0,0,i/5*TAU,9,5,'#2f8f2a','#6dbb3a');}x.restore();
  },
  face(x,R){circ(x,R+4,'#ef8700');circ(x,R,'#fff0c9');circ(x,R*.9,rg(x,0,0,2,R*.9,[[0,'#ffc247'],[1,'#ff8a00']]));
    wedges(x,10,R*.9,'#ffe7b0',3);circ(x,R*.09,'#fff0c9');
    for(let i=0;i<10;i++){const a=(i+.5)/10*TAU;seed(x,Math.cos(a)*R*.5,Math.sin(a)*R*.5,a,5,'#fff1c4');}}},
strawberry:{name:'Strawberry',pts:15,sc:.9,w:11,fcy:112,fR:54,juice:'#ff6b81',
  whole(x){
    x.beginPath();x.moveTo(100,172);x.bezierCurveTo(60,152,28,112,36,80);x.bezierCurveTo(42,56,80,58,100,68);
    x.bezierCurveTo(120,58,158,56,164,80);x.bezierCurveTo(172,112,140,152,100,172);x.closePath();
    x.fillStyle=rg(x,80,84,6,100,[[0,'#ff6b73'],[.45,'#e3142d'],[1,'#8c0716']]);x.fill();
    const pts=[];for(let yy=84;yy<160;yy+=15)for(let xx=48;xx<156;xx+=17){const px=xx+((yy/15|0)%2?8:0),py=yy+rnd()*3;if(x.isPointInPath(px,py)&&x.isPointInPath(px-13,py)&&x.isPointInPath(px+13,py)&&x.isPointInPath(px,py-9))pts.push([px,py]);}
    pts.forEach(p=>{seed(x,p[0],p[1],1.57,5.5,'#ffe27a');});
    gloss(x,66,92,9,20,-.3,.32);
    for(let i=0;i<7;i++){leaf(x,100,70,-3.14+(i/6)*3.14+.0,34,13,'#2d8f3a','#6fd16a');}
    x.strokeStyle='#3b7a2a';x.lineWidth=6;x.lineCap='round';x.beginPath();x.moveTo(100,70);x.lineTo(100,48);x.stroke();
  },
  face(x,R){circ(x,R+3,'#c8102a');circ(x,R,rg(x,0,0,3,R,[[0,'#ffeaea'],[.4,'#ff8f9c'],[1,'#e3203d']]));
    x.beginPath();x.ellipse(0,0,R*.26,R*.42,0,0,TAU);x.fillStyle='rgba(255,246,246,.9)';x.fill();
    x.strokeStyle='rgba(255,230,230,.5)';x.lineWidth=2;for(let i=0;i<12;i++){const a=i/12*TAU;x.beginPath();x.moveTo(Math.cos(a)*R*.3,Math.sin(a)*R*.4);x.lineTo(Math.cos(a)*R*.85,Math.sin(a)*R*.85);x.stroke();}}},
banana:{name:'Banana',pts:18,sc:1.1,w:10,fcy:104,fR:21,juice:'#fff0a0',
  whole(x){
    x.save();x.translate(0,-20);
    x.beginPath();x.moveTo(40,46);x.bezierCurveTo(46,140,120,176,170,118);x.lineTo(176,112);x.bezierCurveTo(120,120,70,92,40,46);x.closePath();
    x.fillStyle=lg(x,40,50,170,150,[[0,'#ffe84d'],[.5,'#f9c80e'],[1,'#d89a00']]);x.fill();
    x.save();x.clip();x.strokeStyle='rgba(120,70,0,.28)';x.lineWidth=2;
    x.beginPath();x.moveTo(50,60);x.bezierCurveTo(62,130,120,156,165,118);x.stroke();
    x.beginPath();x.moveTo(56,52);x.bezierCurveTo(66,110,110,138,160,108);x.stroke();
    x.strokeStyle='rgba(255,255,255,.4)';x.lineWidth=5;x.beginPath();x.moveTo(60,70);x.bezierCurveTo(74,126,112,146,150,126);x.stroke();x.restore();
    ell(x,172,115,7,5,-.7);x.fillStyle='#4b3208';x.fill();
    x.strokeStyle='#6a4a10';x.lineWidth=11;x.lineCap='butt';x.beginPath();x.moveTo(40,48);x.lineTo(35,30);x.stroke();
    x.strokeStyle='#3b2a06';x.lineWidth=11;x.beginPath();x.moveTo(35,30);x.lineTo(34,24);x.stroke();
    x.restore();
  },
  face(x,R){circ(x,R+3,'#e7b400');circ(x,R,'#fff6d2');circ(x,R*.55,'#fff0b0');
    for(let i=0;i<3;i++){const a=i/3*TAU+.5;ell(x,Math.cos(a)*R*.28,Math.sin(a)*R*.28,2,2,0);x.fillStyle='#6b4a12';x.fill();}}},
kiwi:{name:'Kiwi',pts:20,sc:1,w:8,fcy:100,fR:58,juice:'#a6e22e',
  whole(x){
    ell(x,100,100,68,60,0);x.fillStyle=rg(x,80,80,6,100,[[0,'#b07a42'],[.55,'#845224'],[1,'#552f10']]);x.fill();
    x.save();x.clip();for(let i=0;i<260;i++){const px=30+rnd()*140,py=40+rnd()*120,a=rnd()*TAU;x.strokeStyle=rnd()<.5?'rgba(40,20,5,.35)':'rgba(214,170,110,.4)';x.lineWidth=1;x.beginPath();x.moveTo(px,py);x.lineTo(px+Math.cos(a)*5,py+Math.sin(a)*5);x.stroke();}x.restore();
    gloss(x,72,76,18,9,-.5,.16);
  },
  face(x,R){circ(x,R+3,'#6b4018');circ(x,R,rg(x,0,0,R*.3,R,[[0,'#d8ee8f'],[.5,'#8fcf2e'],[1,'#5aa31c']]));
    x.strokeStyle='rgba(235,255,170,.55)';x.lineWidth=1.6;for(let i=0;i<30;i++){const a=i/30*TAU;x.beginPath();x.moveTo(Math.cos(a)*R*.3,Math.sin(a)*R*.3);x.lineTo(Math.cos(a)*R*.88,Math.sin(a)*R*.88);x.stroke();}
    circ(x,R*.27,'#f6ffd8');
    for(let i=0;i<26;i++){const a=i/26*TAU;seed(x,Math.cos(a)*R*.42,Math.sin(a)*R*.42,a,4,'#15160a');}}},
watermelon:{name:'Watermelon',pts:25,sc:1.2,w:7,fcy:100,fR:60,juice:'#ff5468',
  whole(x){
    ell(x,100,100,80,64,0);x.fillStyle=rg(x,76,74,6,110,[[0,'#52b85a'],[.5,'#2a8a3c'],[1,'#145c27']]);x.fill();
    x.save();x.clip();x.strokeStyle='#0f5a24';x.lineWidth=7;x.lineCap='round';
    for(let i=-5;i<=5;i++){const o=i*17;x.beginPath();x.moveTo(100+o*.18,30);x.bezierCurveTo(100+o*1.7,70,100+o*1.7,130,100+o*.18,170);x.stroke();}x.restore();
    gloss(x,68,72,22,8,-.45,.3);
  },
  face(x,R){circ(x,R+4,'#1f7a2e');circ(x,R,'#a6e598');circ(x,R*.93,'#f4fff0');circ(x,R*.86,rg(x,0,0,2,R*.86,[[0,'#ff7f90'],[1,'#e5213d']]));
    for(let i=0;i<9;i++){const a=i/9*TAU+.3,r=R*(i%2?.5:.28);seed(x,Math.cos(a)*r,Math.sin(a)*r,a+1.2,6,'#1b1210');}}},
dragon:{name:'Dragon Fruit',pts:30,sc:1.08,w:5,fcy:102,fR:60,juice:'#ff4fa3',
  whole(x){
    for(let i=0;i<18;i++){const a=i/18*TAU;leaf(x,100+Math.cos(a)*48,102+Math.sin(a)*62,a,24,15,'#e2127a','#3fc65f');}
    ell(x,100,102,54,68,0);x.fillStyle=rg(x,78,80,6,100,[[0,'#ff4fa8'],[.5,'#e2127a'],[1,'#8f0a52']]);x.fill();
    x.save();x.clip();
    for(let r=0;r<6;r++)for(let c=0;c<5;c++){const px=60+c*20+(r%2?10:0),py=48+r*22,a=Math.atan2(py-102,(px-100)*1.2);leaf(x,px,py,a+.0,17,11,'#e2127a','#45cd62');}
    x.restore();gloss(x,76,74,12,26,-.3,.28);
  },
  face(x,R){circ(x,R+3,'#d4137a');circ(x,R,rg(x,0,0,3,R,[[0,'#ffffff'],[.7,'#fdeef6'],[1,'#f5cfe3']]));
    for(let i=0;i<110;i++){const a=rnd()*TAU,r=Math.sqrt(rnd())*R*.86;ell(x,Math.cos(a)*r,Math.sin(a)*r,1.6,1.6,0);x.fillStyle='#14090f';x.fill();}}},
pineapple:{name:'Pineapple',pts:40,sc:1.08,w:4,fcy:118,fR:56,juice:'#ffe14d',
  whole(x){
    for(let i=-3;i<=3;i++){leaf(x,100,70,-1.5708+i*.3,62-Math.abs(i)*7,15,'#1f6f2a','#8bd23c');}
    for(let i=-2;i<=2;i++){leaf(x,100,72,-1.5708+i*.2,56-Math.abs(i)*6,13,'#2c8a2e','#a6e04a');}
    ell(x,100,120,52,60,0);x.fillStyle=rg(x,80,100,6,100,[[0,'#ffd34e'],[.5,'#f0a21a'],[1,'#b9650a']]);x.fill();
    x.save();x.clip();x.strokeStyle='rgba(110,55,5,.6)';x.lineWidth=1.6;
    for(let i=-8;i<=8;i++){x.beginPath();x.moveTo(100+i*14-60,50);x.lineTo(100+i*14+60,190);x.stroke();x.beginPath();x.moveTo(100+i*14+60,50);x.lineTo(100+i*14-60,190);x.stroke();}
    for(let r=0;r<9;r++)for(let c=0;c<7;c++){const px=56+c*15+(r%2?7:0),py=66+r*15;ell(x,px,py,1.8,1.8,0);x.fillStyle='rgba(60,30,0,.55)';x.fill();}
    x.restore();gloss(x,76,98,10,26,-.2,.25);
  },
  face(x,R){circ(x,R+3,'#c27a0e');circ(x,R,rg(x,0,0,3,R,[[0,'#fff8c2'],[.6,'#ffe45c'],[1,'#f5c418']]));
    x.strokeStyle='rgba(255,250,200,.65)';x.lineWidth=1.8;for(let i=0;i<24;i++){const a=i/24*TAU;x.beginPath();x.moveTo(Math.cos(a)*R*.3,Math.sin(a)*R*.3);x.lineTo(Math.cos(a)*R*.9,Math.sin(a)*R*.9);x.stroke();}
    circ(x,R*.28,'#fffbe0');}},
bomb:{name:'Bomb',pts:-50,sc:1.02,w:0,fcy:112,fR:50,juice:'#ffb02e',
  whole(x){
    x.fillStyle=lg(x,88,50,112,70,[[0,'#8a8f98'],[1,'#3a3d44']]);x.beginPath();x.roundRect(84,44,32,22,5);x.fill();
    ell(x,100,114,62,60,0);x.fillStyle=rg(x,76,86,4,100,[[0,'#6d7280'],[.35,'#25282f'],[1,'#050607']]);x.fill();
    gloss(x,72,86,16,24,-.6,.35);
    x.strokeStyle='#6a4a22';x.lineWidth=6;x.lineCap='round';x.beginPath();x.moveTo(100,44);x.quadraticCurveTo(100,26,118,22);x.stroke();
    x.save();x.translate(100,122);x.fillStyle='#e9e9e2';ell(x,0,-2,19,17,0);x.fill();x.beginPath();x.roundRect(-11,8,22,12,3);x.fill();
    x.fillStyle='#0a0a0a';ell(x,-7,-3,5,6,0);x.fill();ell(x,7,-3,5,6,0);x.fill();x.beginPath();x.moveTo(0,3);x.lineTo(-3,9);x.lineTo(3,9);x.fill();
    x.strokeStyle='#0a0a0a';x.lineWidth=1.5;for(let i=-6;i<=6;i+=6){x.beginPath();x.moveTo(i,12);x.lineTo(i,19);x.stroke();}x.restore();
  },
  face(){}}
};
const NAMES=Object.keys(FR).filter(k=>k!=='bomb');
function buildSprites(){
  Object.keys(FR).forEach(k=>{const f=FR[k];const[c,x]=mkc();f.whole(x);f.img=c;
    if(k!=='bomb'){f.hl=half(f,-1);f.hr=half(f,1);}
    f.dataUrl=c.toDataURL('image/png');f.url='assets/fruits/'+k+'.png';});
}
function half(f,side){
  const[c,x]=mkc();
  x.save();x.beginPath();x.rect(side<0?0:100,0,100,U);x.clip();x.drawImage(f.img,0,0,U,U);x.restore();
  x.save();x.translate(100,f.fcy);x.scale(.3,1);f.face(x,f.fR);x.restore();
  return c;
}
buildSprites();
/* The painted sprites above are only a fallback. The real art lives in assets/fruits/*.png
   (whole fruit + left/right half). Replace those files with your own PNGs and the game uses them. */
function loadPNGs(){
  Object.keys(FR).forEach(k=>{
    const f=FR[k];
    const ld=(file,key)=>{const im=new Image();im.onload=()=>{if(im.naturalWidth>0)f[key]=im;};im.src='assets/fruits/'+file+'.png';};
    ld(k,'img');
    if(k!=='bomb'){ld(k+'_half_l','hl');ld(k+'_half_r','hr');}
  });
}
loadPNGs();

/* ---------- Sound engine: synthesised with Web Audio, no audio files ---------- */
let AC=null,bus=null,verb=null,soundOn=true,NBUF=null;
function ac(){
  if(!AC){
    try{
      AC=new(window.AudioContext||window.webkitAudioContext)();
      const comp=AC.createDynamicsCompressor();
      comp.threshold.value=-14;comp.knee.value=12;comp.ratio.value=6;comp.attack.value=.003;comp.release.value=.2;
      bus=AC.createGain();bus.gain.value=.9;bus.connect(comp);comp.connect(AC.destination);
      const len=AC.sampleRate*1.8|0,ir=AC.createBuffer(2,len,AC.sampleRate);
      for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6);}
      verb=AC.createConvolver();verb.buffer=ir;const vg=AC.createGain();vg.gain.value=.5;verb.connect(vg);vg.connect(bus);
      loadSamples();
    }catch(e){AC=null;}
  }
  if(AC&&AC.state==='suspended'){try{AC.resume();}catch(e){}}
  return AC;
}
function buzz(p){try{if(navigator.vibrate)navigator.vibrate(p);}catch(e){}}
function route(node,pan,wet){
  let n=node;
  if(pan!==undefined&&AC.createStereoPanner){const p=AC.createStereoPanner();p.pan.value=Math.max(-1,Math.min(1,pan));n.connect(p);n=p;}
  n.connect(bus);
  if(wet&&verb){const s=AC.createGain();s.gain.value=wet;n.connect(s);s.connect(verb);}
}
function env(g,t0,peak,dur,at){
  g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(Math.max(.0002,peak),t0+(at||.004));
  g.gain.exponentialRampToValueAtTime(.0001,t0+dur);
}
/* filtered noise burst. o: t dur type f0 f1 q g a pan wet */
function nz(o){
  const a=soundOn&&ac();if(!a)return;
  if(!NBUF){const n=a.sampleRate*2|0;NBUF=a.createBuffer(1,n,a.sampleRate);const d=NBUF.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;}
  const t0=a.currentTime+(o.t||0),s=a.createBufferSource();s.buffer=NBUF;s.loop=true;
  const f=a.createBiquadFilter();f.type=o.type||'bandpass';f.Q.value=o.q||1;
  f.frequency.setValueAtTime(o.f0,t0);f.frequency.exponentialRampToValueAtTime(Math.max(20,o.f1||o.f0),t0+o.dur);
  const g=a.createGain();env(g,t0,o.g,o.dur,o.a);
  s.connect(f);f.connect(g);route(g,o.pan,o.wet);s.start(t0,Math.random()*1.4);s.stop(t0+o.dur+.05);
}
/* oscillator tone. o: t dur f0 f1 type g a pan wet */
function tn(o){
  const a=soundOn&&ac();if(!a)return;
  const t0=a.currentTime+(o.t||0),os=a.createOscillator();os.type=o.type||'sine';
  os.frequency.setValueAtTime(o.f0,t0);if(o.f1)os.frequency.exponentialRampToValueAtTime(Math.max(20,o.f1),t0+o.dur);
  const g=a.createGain();env(g,t0,o.g,o.dur,o.a);
  os.connect(g);route(g,o.pan,o.wet);os.start(t0);os.stop(t0+o.dur+.05);
}
const R_=Math.random;
const synth={
  ui(){tn({dur:.09,f0:520,f1:880,type:'triangle',g:.12});},
  go(){nz({dur:.45,type:'bandpass',f0:300,f1:3200,q:1.1,g:.22,a:.12,wet:.3});tn({dur:.32,f0:330,f1:660,type:'triangle',g:.13,wet:.3});tn({t:.16,dur:.4,f0:660,f1:990,type:'triangle',g:.12,wet:.4});},
  launch(pan){tn({dur:.15,f0:170+R_()*60,f1:430,type:'sine',g:.05,pan});},
  swish(pan,v){nz({dur:.22,type:'bandpass',f0:700+v*500,f1:3600+v*1800,q:1.2,g:.07+.07*v,a:.06,pan});},
  slice(pan){
    const p=.88+R_()*.28;
    nz({dur:.12,type:'highpass',f0:3600,f1:7000,q:.7,g:.2,a:.002,pan});
    nz({dur:.22,type:'bandpass',f0:2400*p,f1:700,q:1.4,g:.3,a:.003,pan,wet:.15});
    nz({t:.015,dur:.16,type:'bandpass',f0:520*p,f1:160,q:3,g:.34,a:.004,pan});
    tn({dur:.11,f0:280*p,f1:90,type:'sine',g:.16,pan});
  },
  splat(pan){nz({dur:.2,type:'lowpass',f0:1500,f1:180,q:.9,g:.34,a:.002,pan});tn({dur:.15,f0:150,f1:52,type:'sine',g:.36,pan});},
  combo(n){
    const base=523.25,r=[1,1.25,1.5,2,2.5,3];
    for(let i=0;i<Math.min(n,6);i++){const f=base*r[i];tn({t:i*.065,dur:.26,f0:f,type:'triangle',g:.12,wet:.35});tn({t:i*.065,dur:.2,f0:f*2,type:'sine',g:.045,wet:.4});}
  },
  tick(){tn({dur:.07,f0:1100,f1:950,type:'square',g:.07});tn({dur:.12,f0:2200,f1:2200,type:'sine',g:.04});},
  timeUp(){
    [220,331,441,553].forEach((f,i)=>tn({t:i*.02,dur:2,f0:f,type:'sine',g:.16/(1+i*.5),wet:.5,a:.006}));
    nz({dur:.35,type:'bandpass',f0:900,f1:300,q:1.5,g:.1,a:.01});
  },
  bombLaunch(pan){
    nz({dur:.5,type:'highpass',f0:4200,f1:6400,q:.6,g:.09,a:.06,pan});
    tn({dur:.07,f0:880,type:'square',g:.05,pan});tn({t:.13,dur:.07,f0:880,type:'square',g:.05,pan});
  },
  bomb(){
    nz({dur:.1,type:'highpass',f0:1800,f1:900,q:.5,g:.95,a:.001,wet:.2});
    nz({dur:1.4,type:'lowpass',f0:2600,f1:70,q:.8,g:.95,a:.004,wet:.5});
    nz({t:.08,dur:2.3,type:'lowpass',f0:420,f1:55,q:.7,g:.45,a:.05,wet:.7});
    tn({dur:1.6,f0:112,f1:26,type:'sine',g:1,a:.005});
    tn({dur:1.2,f0:72,f1:30,type:'triangle',g:.6,a:.005});
    tn({dur:.8,f0:56,f1:20,type:'sine',g:.85,a:.003});
    for(let i=0;i<16;i++)nz({t:.18+i*.085+R_()*.06,dur:.05,type:'bandpass',f0:2400+R_()*2600,f1:1400,q:2,g:.16*(1-i/18)+.03,a:.001,pan:R_()*2-1});
    tn({t:.12,dur:1.5,f0:3300,f1:3200,type:'sine',g:.03,a:.1});
  },
  over(){[392,330,262,196].forEach((f,i)=>tn({t:i*.24,dur:.5,f0:f,type:'triangle',g:.14,wet:.35}));},
  fanfare(){[523.25,659.25,783.99,1046.5].forEach((f,i)=>{tn({t:i*.11,dur:.4,f0:f,type:'triangle',g:.13,wet:.4});tn({t:i*.11,dur:.3,f0:f*2,type:'sine',g:.04,wet:.4});});}
};

/* Sample playback: assets/sounds/*.mp3 (embedded in sounds.js so double-clicking index.html works). */
const bufs={};let ambSrc=null,ambGain=null,wantAmb=false;
function loadSamples(){
  const D=window.SFX_DATA;if(!D||!AC)return;
  Object.keys(D).forEach(k=>{
    if(k in bufs)return;bufs[k]=null;
    try{
      const bin=atob(D[k]),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
      AC.decodeAudioData(u.buffer,b=>{bufs[k]=b;if(k==='ambience'&&wantAmb)startAmb();},()=>{});
    }catch(e){}
  });
}
function smp(name,o){
  o=o||{};const a=soundOn&&ac(),b=bufs[name];if(!a||!b)return false;
  const s=a.createBufferSource();s.buffer=b;s.playbackRate.value=o.rate||1;
  const g=a.createGain();g.gain.value=o.vol===undefined?1:o.vol;
  s.connect(g);route(g,o.pan,o.wet);s.start(a.currentTime+(o.t||0));return true;
}
function startAmb(){
  wantAmb=true;const a=ac();if(!a||!bufs.ambience||ambSrc)return;
  ambSrc=a.createBufferSource();ambSrc.buffer=bufs.ambience;ambSrc.loop=true;
  ambGain=a.createGain();ambGain.gain.value=soundOn?.55:0;ambSrc.connect(ambGain);ambGain.connect(bus);ambSrc.start();
}
const pk=l=>l[(R_()*l.length)|0];
const sfx={
  ui(){smp('ui')||synth.ui();},
  go(){smp('go',{wet:.2})||synth.go();},
  launch(pan){smp('launch',{pan,vol:.55,rate:.9+R_()*.25})||synth.launch(pan);},
  swish(pan,v){smp(pk(['swish1','swish2','swish3']),{pan,vol:.3+.55*v,rate:.9+R_()*.25+v*.1})||synth.swish(pan,v);},
  slice(pan){smp(pk(['slice1','slice2','slice3']),{pan,vol:1,rate:.94+R_()*.14,wet:.1})||synth.slice(pan);},
  splat(pan){smp(pk(['splat1','splat2']),{pan,vol:.75,rate:.92+R_()*.18})||synth.splat(pan);},
  combo(n){smp('combo',{rate:1+Math.min(n,8)*.015,wet:.2})||synth.combo(n);},
  tick(){smp('tick')||synth.tick();},
  timeUp(){smp('timeup')||synth.timeUp();},
  bombLaunch(pan){smp('fuse',{pan,vol:.7})||synth.bombLaunch(pan);},
  bomb(){smp('bomb',{vol:1.1})||synth.bomb();},
  over(){smp('over')||synth.over();},
  fanfare(){smp('fanfare',{wet:.2})||synth.fanfare();}
};

/* ---------- State ---------- */
const $=id=>document.getElementById(id);
const app=$('app'),cv=$('c'),cx=cv.getContext('2d');
const nowS=()=>performance.now()/1000;
let W=0,H=0,dpr=1,BR=40,G=900,bgc=null;
let mode='menu',score=0,best=0,timeLeft=60,elapsed=0,newBest=false,dyingT=0,cutCount=0,sinceBomb=0,lastShown=60,bombDeath=false,timeScale=1;
let fruits=[],halves=[],parts=[],splats=[],texts=[],spawnQ=[],trail=[],smoke=[],rings=[],fireballs=[],debris=[],scorch=[],slashes=[];
let nextWave=.6,shake=0,flash=0,flashCol='255,255,255',lastLaunchSfx=0;
const combo={n:0,last:0,sx:0,sy:0};
const ptr={x:0,y:0,px:0,py:0,down:false,seen:false,ang:-.9,type:'mouse',swishAt:0,travel:0,speed:0,hit:0};
let petals=[];
try{best=+localStorage.getItem('fruit-slash-best')||0;}catch(e){}

function resize(){
  const r=cv.getBoundingClientRect();dpr=Math.min(window.devicePixelRatio||1,2);
  W=Math.max(1,r.width);H=Math.max(1,r.height);cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
  BR=Math.max(32,Math.min(58,Math.min(W,H)*.088));G=H*1.5;buildBg();
}
function bamboo(x,xc,w,top,bot,seg){
  const g=lg(x,xc-w/2,0,xc+w/2,0,[[0,'#143a1a'],[.3,'#4d9a3a'],[.5,'#8fd058'],[.75,'#3d8a30'],[1,'#10301a']]);
  x.fillStyle=g;x.fillRect(xc-w/2,top,w,bot-top);
  const n=Math.ceil((bot-top)/seg);
  for(let i=0;i<=n;i++){
    const y=top+i*seg+(rnd()-.5)*seg*.2;
    x.fillStyle='rgba(15,40,12,.75)';x.fillRect(xc-w/2-2,y-3,w+4,6);
    x.fillStyle='rgba(190,235,120,.45)';x.fillRect(xc-w/2-2,y-3,w+4,1.5);
    if(rnd()<.7){x.strokeStyle='rgba(10,30,10,.4)';x.lineWidth=1;x.beginPath();x.moveTo(xc-w*.1,y+6);x.lineTo(xc-w*.1,y+seg*.5);x.stroke();}
  }
}
function bambooLeaf(x,bx,by,ang,L){
  x.save();x.translate(bx,by);x.rotate(ang);x.beginPath();x.moveTo(0,0);x.quadraticCurveTo(L*.5,-L*.09,L,0);x.quadraticCurveTo(L*.5,L*.07,0,0);
  x.fillStyle=lg(x,0,0,L,0,[[0,'#2a7a2a'],[1,'#7fc94a']]);x.fill();x.restore();
}
function buildBg(){
  _s=77;
  bgc=document.createElement('canvas');bgc.width=Math.round(W*dpr);bgc.height=Math.round(H*dpr);
  const x=bgc.getContext('2d');x.scale(dpr,dpr);
  /* wooden dojo wall: vertical planks with grain and knots */
  const cnt=Math.max(6,Math.round(W/115)),pw=W/cnt;
  for(let i=0;i<cnt;i++){
    const l=34+rnd()*8,hue=24+rnd()*6,px=i*pw;
    x.fillStyle=lg(x,0,0,0,H,[[0,'hsl('+hue+',46%,'+(l+3)+'%)'],[.5,'hsl('+hue+',44%,'+l+'%)'],[1,'hsl('+hue+',46%,'+(l-9)+'%)']]);
    x.fillRect(px,0,pw+1,H);
    for(let j=0;j<16;j++){
      const gx=px+4+rnd()*(pw-8),ph=rnd()*6,amp=1+rnd()*3.5;
      x.strokeStyle='rgba('+(rnd()<.6?'35,16,5,'+(.1+rnd()*.14):'255,215,160,'+(.04+rnd()*.05))+')';x.lineWidth=.5+rnd()*1.3;
      x.beginPath();for(let y=0;y<=H;y+=14){const xx=gx+Math.sin(y/(60+j*7)+ph)*amp;y?x.lineTo(xx,y):x.moveTo(xx,y);}x.stroke();
    }
    if(rnd()<.55){const ky=H*(.15+rnd()*.7),kx=px+pw*(.25+rnd()*.5);
      for(let r=5;r>0;r--){ell(x,kx,ky,r*3.2,r*5.2,0);x.fillStyle='rgba(40,18,6,'+(.1+(5-r)*.07)+')';x.fill();}}
    x.fillStyle='rgba(18,7,2,.7)';x.fillRect(px+pw-1.5,0,2.5,H);
    x.fillStyle='rgba(255,210,150,.12)';x.fillRect(px+pw+1,0,1.2,H);
  }
  /* soft ink-red sun, like a hanging scroll behind the action */
  const sr=Math.min(W,H)*.36,sx=W/2,sy=H*.5;
  x.fillStyle=rg(x,sx,sy,sr*.2,sr*1.25,[[0,'rgba(210,45,28,.34)'],[.7,'rgba(190,35,20,.22)'],[1,'rgba(190,35,20,0)']]);x.fillRect(0,0,W,H);
  x.strokeStyle='rgba(120,16,8,.32)';x.lineWidth=Math.max(3,sr*.05);x.lineCap='round';
  x.beginPath();x.arc(sx,sy,sr*.82,.35,TAU-.2);x.stroke();
  /* bamboo grove framing both sides */
  const bw=Math.max(18,Math.min(34,W*.032));
  bamboo(x,W*.025,bw,-10,H+10,H/5.2);bamboo(x,W*.972,bw,-10,H+10,H/4.6);
  bamboo(x,W*.075,bw*.6,-10,H+10,H/6.3);bamboo(x,W*.925,bw*.6,-10,H+10,H/5.6);
  for(let i=0;i<7;i++){bambooLeaf(x,W*.04+rnd()*8,H*(.08+rnd()*.5),.2+rnd()*.9,60+rnd()*50);bambooLeaf(x,W*.96-rnd()*8,H*(.08+rnd()*.5),Math.PI-.2-rnd()*.9,60+rnd()*50);}
  /* wooden floor strip + vignette */
  x.fillStyle=lg(x,0,H*.9,0,H,[[0,'rgba(20,8,2,0)'],[1,'rgba(20,8,2,.55)']]);x.fillRect(0,H*.9,W,H*.1);
  x.fillStyle=rg(x,W/2,H*.45,H*.12,Math.max(W,H)*.78,[[0,'rgba(255,200,120,.1)'],[1,'rgba(10,3,0,.62)']]);x.fillRect(0,0,W,H);
  x.fillStyle=lg(x,0,0,0,H*.2,[[0,'rgba(10,3,0,.55)'],[1,'rgba(10,3,0,0)']]);x.fillRect(0,0,W,H*.2);
  petals=[];for(let i=0;i<26;i++)petals.push({x:Math.random()*W,y:Math.random()*H,s:3+Math.random()*4,vy:18+Math.random()*28,ph:Math.random()*TAU,rot:Math.random()*TAU,vr:(Math.random()-.5)*2});
}
function drawLantern(x,y,len,r,ph,t){
  const sw=Math.sin(t*.9+ph)*.09,fl=.85+.15*Math.sin(t*7+ph*3)*Math.sin(t*3.1+ph);
  cx.save();cx.translate(x,0);cx.rotate(sw);
  cx.strokeStyle='#2a140a';cx.lineWidth=2;cx.beginPath();cx.moveTo(0,0);cx.lineTo(0,y+len);cx.stroke();
  cx.translate(0,y+len+r*1.1);
  cx.globalCompositeOperation='lighter';
  const gl=cx.createRadialGradient(0,0,r*.3,0,0,r*3.4);gl.addColorStop(0,'rgba(255,140,50,'+(.5*fl)+')');gl.addColorStop(1,'rgba(255,80,20,0)');
  cx.fillStyle=gl;cx.beginPath();cx.arc(0,0,r*3.4,0,TAU);cx.fill();
  cx.globalCompositeOperation='source-over';
  cx.fillStyle='#1d0e06';cx.beginPath();cx.roundRect(-r*.45,-r*1.28,r*.9,r*.3,3);cx.fill();cx.beginPath();cx.roundRect(-r*.45,r*.98,r*.9,r*.3,3);cx.fill();
  cx.beginPath();cx.ellipse(0,0,r,r*1.12,0,0,TAU);
  const bg2=cx.createRadialGradient(0,0,r*.1,0,0,r*1.15);bg2.addColorStop(0,'rgba(255,225,140,'+fl+')');bg2.addColorStop(.45,'rgba(255,110,40,'+fl+')');bg2.addColorStop(1,'#a0160c');
  cx.fillStyle=bg2;cx.fill();
  cx.strokeStyle='rgba(90,10,4,.55)';cx.lineWidth=1.3;
  for(let i=-3;i<=3;i++){cx.beginPath();cx.ellipse(0,i*r*.3,r*Math.sqrt(Math.max(0,1-Math.pow(i*.3/1.12,2))),r*.09,0,0,TAU);cx.stroke();}
  cx.strokeStyle='#e7b84a';cx.lineWidth=2;cx.beginPath();cx.moveTo(0,r*1.28);cx.lineTo(0,r*1.28+r*.7);cx.stroke();
  cx.restore();
}
function drawAmbience(t,dt){
  const lr=Math.max(16,BR*.5);
  drawLantern(W*.3,0,H*.045,lr,0,t);drawLantern(W*.7,0,H*.07,lr*1.1,2.1,t);
  for(const p of petals){
    p.y+=p.vy*dt;p.x+=Math.sin(t*1.2+p.ph)*22*dt+8*dt;p.rot+=p.vr*dt;
    if(p.y>H+10){p.y=-10;p.x=Math.random()*W;}if(p.x>W+10)p.x=-10;
    cx.save();cx.translate(p.x,p.y);cx.rotate(p.rot);cx.scale(1,.55+.45*Math.sin(t*2+p.ph));
    cx.globalAlpha=.75;cx.fillStyle='#ffc2d4';cx.beginPath();cx.ellipse(0,0,p.s,p.s*.6,0,0,TAU);cx.fill();
    cx.fillStyle='rgba(255,255,255,.5)';cx.beginPath();cx.ellipse(-p.s*.2,-p.s*.1,p.s*.4,p.s*.2,0,0,TAU);cx.fill();cx.restore();
  }
  cx.globalAlpha=1;
}

/* ---------- HUD ---------- */
const timeEl=$('time'),scoreEl=$('score');
function hud(){
  scoreEl.textContent=score;$('best').textContent=best;
  const s=Math.ceil(timeLeft);timeEl.textContent=s;timeEl.classList.toggle('low',s<=10&&mode==='play');
}
function popScore(){scoreEl.classList.remove('pop');void scoreEl.offsetWidth;scoreEl.classList.add('pop');}
const legend=$('legend');
NAMES.map(k=>FR[k]).sort((a,b)=>a.pts-b.pts).concat([FR.bomb]).forEach((f,i)=>{
  legend.insertAdjacentHTML('beforeend','<li style="--i:'+i+'"'+(f.pts<0?' class="bomb"':'')+'><img alt="" src="'+f.url+'" onerror="this.onerror=null;this.src=\''+f.dataUrl+'\'"><span class="nm">'+f.name+'</span><span class="pts">'+(f.pts<0?'Ends game':'+'+f.pts)+'</span></li>');
});

/* ---------- Spawning ---------- */
function pick(){
  let tot=0;NAMES.forEach(k=>tot+=FR[k].w);let r=Math.random()*tot;
  for(const k of NAMES){r-=FR[k].w;if(r<=0)return k;}return NAMES[0];
}
function launch(k){
  const f=FR[k],r=BR*f.sc;
  const x=W*.12+Math.random()*W*.76;
  const rise=H*(.5+Math.random()*.3);
  const vy=-Math.sqrt(2*G*rise);
  let vx=(W/2-x)*(.15+Math.random()*.35)+(Math.random()-.5)*W*.2;
  const ta=-vy/G;if(x+vx*ta<r||x+vx*ta>W-r)vx=-vx*.6;
  fruits.push({k,x,y:H+r*1.2,vx,vy,rot:Math.random()*TAU,vr:(Math.random()-.5)*5,r,cut:false,sp:0});
  if(mode==='play'){
    const t=nowS(),pan=(x/W)*2-1;
    if(k==='bomb')sfx.bombLaunch(pan);else if(t-lastLaunchSfx>.09){sfx.launch(pan);lastLaunchSfx=t;}
  }
}
function wave(){
  const lvl=Math.min(8,elapsed/8|0);
  const n=Math.min(6,1+(Math.random()*(3+lvl*.4)|0));
  const bombWave=n>=2&&elapsed>3&&(sinceBomb>10||Math.random()<Math.min(.14,.08+lvl*.008));
  const bi=bombWave?1+(Math.random()*(n-1)|0):-1;
  for(let i=0;i<n;i++){
    if(i===bi)sinceBomb=0;
    spawnQ.push({t:nowS()+i*.13+Math.random()*.07,k:i===bi?'bomb':pick()});
  }
  nextWave=Math.max(.5,1.35-lvl*.1)+Math.random()*.35;
}

/* ---------- Effects ---------- */
function juice(x,y,col,n,spd){
  for(let i=0;i<n;i++){const a=Math.random()*TAU,s=(.3+Math.random())*spd;
    parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-60,life:.5+Math.random()*.5,max:.9,r:2+Math.random()*3.5*(BR/45),col,g:.7,streak:Math.random()<.5});}
}
function addText(x,y,txt,col,size,life){
  const l=life||.9;texts.push({x:Math.min(W-50,Math.max(50,x)),y,txt,col,size:size||28,life:l,max:l});
}
function addSplat(x,y,col,r){
  const blobs=[];for(let i=0;i<6;i++){const a=Math.random()*TAU,d=Math.random()*r*.7;blobs.push([Math.cos(a)*d,Math.sin(a)*d,r*(.25+Math.random()*.35)]);}
  splats.push({x,y,col,r,blobs,life:1.6});
}
function addRing(x,y,r0,r1,life,col,w){rings.push({x,y,r0,r1,life,max:life,col,w});}
const SEEDC={kiwi:'#15160a',watermelon:'#1b1210',dragon:'#14090f',apple:'#5b3414',strawberry:'#ffe27a',orange:'#fff1c4'};

function shove(x,y,power){
  const M=Math.max(W,H);
  const push=o=>{const dx=o.x-x,dy=o.y-y,d=Math.hypot(dx,dy)||1,u=power*Math.max(0,1-d/(M*.9));
    o.vx+=dx/d*u;o.vy+=dy/d*u-60;if(o.vr!==undefined)o.vr+=(Math.random()-.5)*10;};
  fruits.forEach(push);halves.forEach(push);
}
function explode(f){
  bombDeath=true;mode='dying';dyingT=1.7;timeScale=.28;shake=1.5;flash=1.1;flashCol='255,238,200';spawnQ=[];combo.n=0;
  sfx.bomb();buzz([70,40,180]);hud();
  const M=Math.max(W,H),x=f.x,y=f.y;
  fireballs.push({x,y,life:.95,max:.95,R:BR*4.4});
  addRing(x,y,BR*.5,M*1.05,.75,'255,190,90',12);
  addRing(x,y,BR*.3,M*.8,.95,'255,255,255',4);
  scorch.push({x,y,r:BR*2.3,life:5});
  const cols=['#fff4b0','#ffc233','#ff7a1a','#ff3d0d'];
  for(let i=0;i<80;i++){const a=Math.random()*TAU,s=140+Math.random()*820;
    parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-80,life:.5+Math.random()*.9,max:1.1,r:2+Math.random()*5,col:cols[i%4],g:.45,add:true,streak:true,shrink:true,drag:1.2});}
  for(let i=0;i<18;i++){const a=Math.random()*TAU,s=40+Math.random()*180;
    smoke.push({x:x+Math.cos(a)*BR*.5,y:y+Math.sin(a)*BR*.5,vx:Math.cos(a)*s*.6,vy:Math.sin(a)*s*.6-70,r:BR*(.5+Math.random()*.7),gr:BR*(1+Math.random()*1.2),life:1.5+Math.random()*1,max:2.5});}
  for(let i=0;i<18;i++){const a=Math.random()*TAU,s=200+Math.random()*620;
    debris.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-200,rot:Math.random()*TAU,vr:(Math.random()-.5)*16,size:4+Math.random()*9,life:1.6+Math.random(),col:i%3?'#25272d':'#4a4d55'});}
  addText(x,y-BR*.2,'BOOM!','#ffb02e',68,1.3);
  shove(x,y,1100);
}
function comboBurst(x,y,n){
  addRing(x,y,BR*.4,BR*3.2,.5,'125,255,176',5);
  const cols=['#7dffb0','#ffe27a','#ffffff'];
  for(let i=0;i<28;i++){const a=Math.random()*TAU,s=120+Math.random()*320;
    parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-60,life:.5+Math.random()*.5,max:.9,r:2+Math.random()*3,col:cols[i%3],g:.5,add:true,shrink:true,streak:true,drag:1});}
}

/* ---------- Slicing ---------- */
function sliceFruit(f,ang){
  f.cut=true;const d=FR[f.k];
  if(f.k==='bomb'){explode(f);return;}
  const phi=ang-Math.PI/2,nx=Math.cos(phi),ny=Math.sin(phi),sp=(60+Math.random()*50)*(.5+H/900);
  halves.push({k:f.k,side:-1,x:f.x,y:f.y,vx:f.vx-nx*sp,vy:f.vy-ny*sp-30,rot:phi,vr:-(1.5+Math.random()*2.5),r:f.r});
  halves.push({k:f.k,side:1,x:f.x,y:f.y,vx:f.vx+nx*sp,vy:f.vy+ny*sp-30,rot:phi,vr:1.5+Math.random()*2.5,r:f.r});
  juice(f.x,f.y,d.juice,18,330);addSplat(f.x,f.y,d.juice,f.r*1.15);
  const sd=SEEDC[f.k];
  if(sd)for(let i=0;i<6;i++){const a=Math.random()*TAU,s=80+Math.random()*220;parts.push({x:f.x,y:f.y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-120,life:.9,max:.9,r:2.2,col:sd,g:.9});}
  slashes.push({x:f.x,y:f.y,ang,len:f.r*3.2,life:.26,max:.26});
  ptr.hit=1;shake=Math.max(shake,.14);
  for(let i=0;i<14;i++){const a=ang+(Math.random()-.5)*.9,s=300+Math.random()*700,sg=Math.random()<.5?1:-1;
    parts.push({x:f.x,y:f.y,vx:Math.cos(a)*s*sg,vy:Math.sin(a)*s*sg,life:.25+Math.random()*.3,max:.5,r:1.6+Math.random()*2.2,col:i%3?'#ffffff':'#ffe9a8',g:.2,add:true,streak:true,shrink:true,drag:3});}
  addRing(f.x,f.y,f.r*.4,f.r*1.7,.28,'255,255,255',3);
  score+=d.pts;cutCount++;addText(f.x,f.y-f.r*.6,'+'+d.pts,'#ffd24a',30);popScore();hud();
  const pan=(f.x/W)*2-1;sfx.slice(pan);setTimeout(()=>sfx.splat(pan),35);buzz(10);
  const t=nowS();
  if(t-combo.last<.35){combo.n++;combo.sx+=f.x;combo.sy+=f.y;}else{combo.n=1;combo.sx=f.x;combo.sy=f.y;}
  combo.last=t;
}
function distSeg(px,py,ax,ay,bx,by){
  const dx=bx-ax,dy=by-ay,l=dx*dx+dy*dy;let t=l?((px-ax)*dx+(py-ay)*dy)/l:0;t=Math.max(0,Math.min(1,t));
  const qx=ax+dx*t-px,qy=ay+dy*t-py;return Math.sqrt(qx*qx+qy*qy);
}
function swipe(ax,ay,bx,by){
  if(mode!=='play')return;
  const ang=Math.atan2(by-ay,bx-ax);
  for(const f of fruits){if(f.cut)continue;
    if(distSeg(f.x,f.y,ax,ay,bx,by)<f.r*(f.k==='bomb'?.85:.95)){sliceFruit(f,ang);if(mode!=='play')return;}}
}

/* ---------- Update ---------- */
function update(dt,raw){
  const t=nowS();
  if(mode==='play'){
    elapsed+=dt;sinceBomb+=dt;timeLeft=Math.max(0,timeLeft-dt);
    if(Math.ceil(timeLeft)!==lastShown){lastShown=Math.ceil(timeLeft);hud();if(lastShown<=5&&lastShown>0)sfx.tick();}
    if(timeLeft<=0){mode='dying';dyingT=1.1;sfx.timeUp();addText(W/2,H*.42,"Time's up!",'#ffd24a',52,1.1);hud();}
    else{nextWave-=dt;if(nextWave<=0)wave();}
  }else if(mode==='menu'){
    nextWave-=dt;if(nextWave<=0){launch(pick());nextWave=.9+Math.random()*.6;}
  }else if(mode==='dying'){
    dyingT-=dt;if(dyingT<=0)showOver();
  }
  for(let i=spawnQ.length-1;i>=0;i--)if(spawnQ[i].t<=t){launch(spawnQ[i].k);spawnQ.splice(i,1);}
  for(const f of fruits){
    f.vy+=G*dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.rot+=f.vr*dt;
    if(FR[f.k].pts>=30&&Math.random()<dt*16)parts.push({x:f.x+(Math.random()-.5)*f.r*1.6,y:f.y+(Math.random()-.5)*f.r*1.6,vx:0,vy:-20,life:.45,max:.45,r:2.2,col:'#fff6c8',g:0,add:true,shrink:true});
    if(f.vy>0&&f.y>H+f.r*1.6){f.cut=true;f.gone=true;}
  }
  fruits=fruits.filter(f=>!f.gone&&!f.cut);
  for(const h of halves){h.vy+=G*dt;h.x+=h.vx*dt;h.y+=h.vy*dt;h.rot+=h.vr*dt;}
  halves=halves.filter(h=>h.y<H+h.r*2.2);
  for(const p of parts){if(p.drag){const k=Math.max(0,1-p.drag*dt);p.vx*=k;p.vy*=k;}p.vy+=G*p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;}
  parts=parts.filter(p=>p.life>0);
  for(const s of smoke){s.x+=s.vx*dt;s.y+=s.vy*dt;s.vx*=1-.8*dt;s.vy*=1-.6*dt;s.r+=s.gr*dt;s.life-=dt;}
  smoke=smoke.filter(s=>s.life>0);
  for(const d of debris){d.vy+=G*.8*dt;d.x+=d.vx*dt;d.y+=d.vy*dt;d.rot+=d.vr*dt;d.life-=dt;}
  debris=debris.filter(d=>d.life>0&&d.y<H+40);
  for(const s of splats)s.life-=dt;splats=splats.filter(s=>s.life>0);
  for(const s of texts){s.y-=46*dt;s.life-=dt;}texts=texts.filter(s=>s.life>0);
  for(const r of rings)r.life-=dt;rings=rings.filter(r=>r.life>0);
  for(const b of fireballs)b.life-=dt;fireballs=fireballs.filter(b=>b.life>0);
  for(const s of slashes)s.life-=dt;slashes=slashes.filter(s=>s.life>0);
  for(const s of scorch)s.life-=raw;scorch=scorch.filter(s=>s.life>0);
  trail=trail.filter(p=>t-p.t<.32);
  ptr.speed*=Math.max(0,1-raw*7);ptr.hit=Math.max(0,ptr.hit-raw*3.5);
  if(combo.n>0&&t-combo.last>.35){
    if(combo.n>=3&&mode==='play'){
      const b=combo.n*5,cxm=combo.sx/combo.n,cym=combo.sy/combo.n;
      score+=b;popScore();hud();sfx.combo(combo.n);comboBurst(cxm,cym,combo.n);
      addText(cxm,cym-BR*1.3,'Combo x'+combo.n+'  +'+b,'#7dffb0',36,1.1);
    }
    combo.n=0;
  }
  shake=Math.max(0,shake-raw*1.5);flash=Math.max(0,flash-raw*2.2);
}

/* ---------- Game flow ---------- */
const overlay=$('overlay');
function startGame(){
  ac();startAmb();sfx.ui();
  score=0;elapsed=0;timeLeft=60;lastShown=60;cutCount=0;sinceBomb=0;newBest=false;bombDeath=false;timeScale=1;
  fruits=[];halves=[];parts=[];splats=[];texts=[];spawnQ=[];smoke=[];rings=[];fireballs=[];debris=[];scorch=[];slashes=[];trail=[];combo.n=0;
  mode='play';hud();nextWave=.9;
  app.dataset.mode='play';overlay.hidden=true;
  sfx.go();addText(W/2,H*.42,'GO!','#7dffb0',70,.9);
}
function showOver(){
  mode='over';
  if(score>best){best=score;newBest=true;try{localStorage.setItem('fruit-slash-best',String(best));}catch(e){}}
  hud();
  if(bombDeath){
    $('title').innerHTML='Game <em>Over</em>';
    $('sub').textContent=newBest?'You hit a bomb, but that is a new high score!':'You sliced a bomb. The match ends here!';
    sfx.over();
  }else{
    $('title').innerHTML='Time’s <em>Up</em>';
    $('sub').textContent=newBest?'New high score! Great run!':'One minute is over. Ready for another round?';
  }
  if(newBest)setTimeout(sfx.fanfare,bombDeath?1000:150);
  $('fscore').textContent=score;$('ffruit').textContent=cutCount;$('fbest').textContent=best;$('final').hidden=false;
  $('play').textContent='Play Again';
  app.dataset.mode='over';overlay.hidden=false;try{$('play').focus({preventScroll:true});}catch(e){}
}

/* ---------- Drawing ---------- */
const ease=t=>1-Math.pow(1-t,3);
const backOut=t=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2);};
function bladePath(){
  cx.beginPath();cx.moveTo(3,2);
  cx.quadraticCurveTo(-6,-11,-34,-14);cx.lineTo(-106,-15);cx.lineTo(-106,14);
  cx.quadraticCurveTo(-54,16,-24,10);cx.quadraticCurveTo(-6,6,3,2);cx.closePath();
}
function drawKnife(x,y,ang,k,al,t){
  cx.save();cx.translate(x,y);cx.rotate(ang);cx.scale(k,k);cx.globalAlpha=al;
  /* blade */
  cx.shadowColor='rgba(0,0,0,.5)';cx.shadowBlur=12;cx.shadowOffsetY=5;
  bladePath();cx.fillStyle=lg(cx,0,-15,0,15,[[0,'#ffffff'],[.3,'#dfe6ee'],[.52,'#9eabb9'],[.54,'#eef3f8'],[1,'#b4c0cc']]);cx.fill();
  cx.shadowColor='transparent';
  cx.save();bladePath();cx.clip();
  /* bevel on the cutting edge + fuller groove */
  cx.fillStyle='rgba(255,255,255,.55)';cx.beginPath();cx.moveTo(3,2);cx.quadraticCurveTo(-6,6,-24,10);cx.quadraticCurveTo(-54,16,-106,14);cx.lineTo(-106,9);cx.quadraticCurveTo(-52,11,-22,5);cx.closePath();cx.fill();
  cx.strokeStyle='rgba(60,72,88,.35)';cx.lineWidth=2;cx.beginPath();cx.moveTo(-26,-6);cx.lineTo(-100,-6);cx.stroke();
  cx.strokeStyle='rgba(255,255,255,.7)';cx.lineWidth=1;cx.beginPath();cx.moveTo(-26,-8);cx.lineTo(-100,-8);cx.stroke();
  /* travelling glint */
  const gx=-120+((t*70)%190);
  cx.fillStyle=lg(cx,gx-14,0,gx+14,0,[[0,'rgba(255,255,255,0)'],[.5,'rgba(255,255,255,.85)'],[1,'rgba(255,255,255,0)']]);
  cx.beginPath();cx.moveTo(gx-8,-16);cx.lineTo(gx+16,-16);cx.lineTo(gx+4,18);cx.lineTo(gx-20,18);cx.closePath();cx.fill();
  cx.restore();
  cx.strokeStyle='rgba(255,255,255,.95)';cx.lineWidth=1.4;cx.beginPath();cx.moveTo(3,2);cx.quadraticCurveTo(-6,6,-24,10);cx.quadraticCurveTo(-54,16,-106,14);cx.stroke();
  /* bolster, handle, rivets */
  cx.fillStyle=lg(cx,0,-14,0,14,[[0,'#d9c27a'],[.5,'#a8893a'],[1,'#6e5518']]);cx.beginPath();cx.roundRect(-114,-14,10,28,3);cx.fill();
  cx.fillStyle=lg(cx,0,-12,0,12,[[0,'#9a5a2c'],[.45,'#6d3a18'],[1,'#3b1d0b']]);cx.beginPath();cx.roundRect(-196,-12,86,24,[4,10,10,4]);cx.fill();
  cx.strokeStyle='rgba(20,8,2,.35)';cx.lineWidth=1;for(let i=0;i<5;i++){cx.beginPath();cx.moveTo(-186+i*14,-10);cx.quadraticCurveTo(-180+i*14,0,-186+i*14,10);cx.stroke();}
  cx.fillStyle='rgba(255,220,170,.3)';cx.beginPath();cx.roundRect(-190,-10,76,4,2);cx.fill();
  cx.fillStyle='#f0d27c';[-126,-152,-178].forEach(px=>{cx.beginPath();cx.arc(px,0,3.2,0,TAU);cx.fill();});
  cx.fillStyle='#c9a24a';cx.beginPath();cx.roundRect(-200,-13,8,26,4);cx.fill();
  cx.restore();
}
function ribbon(maxW,fill,t){
  const n=trail.length;if(n<2)return;
  const L=[],Rr=[];
  for(let i=0;i<n;i++){
    const p=trail[i],q=trail[Math.min(n-1,i+1)],o=trail[Math.max(0,i-1)];
    let dx=q.x-o.x,dy=q.y-o.y;const l=Math.hypot(dx,dy)||1;dx/=l;dy/=l;
    const u=i/(n-1),age=1-Math.min(1,(t-p.t)/.32),w=maxW*Math.pow(u,.85)*age*.5;
    L.push([p.x-dy*w,p.y+dx*w]);Rr.push([p.x+dy*w,p.y-dx*w]);
  }
  cx.beginPath();cx.moveTo(L[0][0],L[0][1]);
  for(let i=1;i<n;i++)cx.lineTo(L[i][0],L[i][1]);
  for(let i=n-1;i>=0;i--)cx.lineTo(Rr[i][0],Rr[i][1]);
  cx.closePath();cx.fillStyle=fill;cx.fill();
}
function drawParts(add){
  for(const p of parts){
    if(!!p.add!==add)continue;
    const k=p.life/p.max;cx.globalAlpha=Math.max(0,Math.min(1,k*2));
    const rad=p.r*(p.shrink?Math.max(.2,k):1);
    if(p.streak){cx.strokeStyle=p.col;cx.lineWidth=rad*1.5;cx.lineCap='round';cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(p.x-p.vx*.03,p.y-p.vy*.03);cx.stroke();}
    else{cx.fillStyle=p.col;cx.beginPath();cx.arc(p.x,p.y,rad,0,TAU);cx.fill();}
  }
  cx.globalAlpha=1;
}
let dtDraw=.016;
function draw(){
  const t=nowS();
  cx.setTransform(dpr,0,0,dpr,0,0);cx.clearRect(0,0,W,H);
  cx.save();
  if(shake>0)cx.translate((Math.random()-.5)*shake*18,(Math.random()-.5)*shake*18);
  cx.drawImage(bgc,0,0,W,H);
  drawAmbience(t,dtDraw);
  for(const s of scorch){
    cx.globalAlpha=Math.min(1,s.life);const g=cx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r);
    g.addColorStop(0,'rgba(0,0,0,.6)');g.addColorStop(.6,'rgba(0,0,0,.3)');g.addColorStop(1,'rgba(0,0,0,0)');
    cx.fillStyle=g;cx.beginPath();cx.arc(s.x,s.y,s.r,0,TAU);cx.fill();
  }
  for(const s of splats){cx.globalAlpha=Math.min(1,s.life/1.6)*.5;cx.fillStyle=s.col;
    cx.beginPath();cx.arc(s.x,s.y,s.r*.55,0,TAU);cx.fill();
    for(const b of s.blobs){cx.beginPath();cx.arc(s.x+b[0],s.y+b[1],b[2],0,TAU);cx.fill();}}
  cx.globalAlpha=1;
  for(const h of halves){
    const d=FR[h.k],sc=h.r/66;
    cx.save();cx.translate(h.x,h.y);cx.rotate(h.rot);
    cx.drawImage(h.side<0?d.hl:d.hr,-100*sc,-100*sc,200*sc,200*sc);cx.restore();
  }
  for(const f of fruits){
    const d=FR[f.k],sc=f.r/66;
    cx.save();cx.translate(f.x,f.y);cx.rotate(f.rot);
    if(f.k==='bomb'){
      const pulse=.5+.5*Math.sin(t*10+f.x),g=cx.createRadialGradient(0,0,f.r*.7,0,0,f.r*1.75);
      g.addColorStop(0,'rgba(255,60,50,'+(.16+.2*pulse)+')');g.addColorStop(1,'rgba(255,60,50,0)');
      cx.fillStyle=g;cx.beginPath();cx.arc(0,0,f.r*1.75,0,TAU);cx.fill();
    }
    cx.drawImage(d.img,-100*sc,-100*sc,200*sc,200*sc);
    if(f.k==='bomb'){
      const fx=18*sc,fy=-78*sc,fl=.75+Math.random()*.5;
      const g=cx.createRadialGradient(fx,fy,0,fx,fy,14*sc*fl);g.addColorStop(0,'rgba(255,255,220,1)');g.addColorStop(.3,'rgba(255,190,60,.9)');g.addColorStop(1,'rgba(255,90,20,0)');
      cx.fillStyle=g;cx.beginPath();cx.arc(fx,fy,14*sc*fl,0,TAU);cx.fill();
    }
    cx.restore();
  }
  drawParts(false);
  /* explosion: smoke, debris, fireball, additive sparks, shock rings */
  for(const s of smoke){
    const k=s.life/s.max;cx.globalAlpha=Math.min(.6,k*.8);
    const g=cx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r);g.addColorStop(0,'rgba(80,80,86,1)');g.addColorStop(1,'rgba(30,30,34,0)');
    cx.fillStyle=g;cx.beginPath();cx.arc(s.x,s.y,s.r,0,TAU);cx.fill();
  }
  cx.globalAlpha=1;
  for(const d of debris){
    cx.save();cx.translate(d.x,d.y);cx.rotate(d.rot);cx.globalAlpha=Math.min(1,d.life*2);cx.fillStyle=d.col;
    cx.beginPath();cx.moveTo(-d.size,-d.size*.5);cx.lineTo(d.size,0);cx.lineTo(-d.size*.2,d.size*.8);cx.closePath();cx.fill();cx.restore();
  }
  cx.globalAlpha=1;cx.globalCompositeOperation='lighter';
  for(const b of fireballs){
    const k=1-b.life/b.max,R=b.R*(.25+.75*ease(Math.min(1,k*2.2))),a=k<.35?1:Math.max(0,1-(k-.35)/.65);
    const g=cx.createRadialGradient(b.x,b.y,0,b.x,b.y,R);
    g.addColorStop(0,'rgba(255,255,240,'+a+')');g.addColorStop(.25,'rgba(255,214,90,'+a*.95+')');
    g.addColorStop(.55,'rgba(255,110,30,'+a*.7+')');g.addColorStop(1,'rgba(160,20,0,0)');
    cx.fillStyle=g;cx.beginPath();cx.arc(b.x,b.y,R,0,TAU);cx.fill();
  }
  for(const s of slashes){
    const k=s.life/s.max,h=s.len/2*(1+(1-k)*.35),c=Math.cos(s.ang)*h,sn=Math.sin(s.ang)*h;
    cx.lineCap='round';
    cx.strokeStyle='rgba(255,255,255,'+(.35*k)+')';cx.lineWidth=16*k+2;cx.beginPath();cx.moveTo(s.x-c,s.y-sn);cx.lineTo(s.x+c,s.y+sn);cx.stroke();
    cx.strokeStyle='rgba(255,255,255,'+k+')';cx.lineWidth=4*k+.5;cx.beginPath();cx.moveTo(s.x-c,s.y-sn);cx.lineTo(s.x+c,s.y+sn);cx.stroke();
  }
  drawParts(true);
  for(const r of rings){
    const k=1-r.life/r.max,rad=r.r0+(r.r1-r.r0)*ease(k);
    cx.strokeStyle='rgba('+r.col+','+(1-k)+')';cx.lineWidth=Math.max(.5,r.w*(1-k*.6));cx.beginPath();cx.arc(r.x,r.y,rad,0,TAU);cx.stroke();
  }
  cx.globalCompositeOperation='source-over';
  /* blade swoosh: tapered, glowing ribbon that follows the swipe */
  if(trail.length>2){
    cx.globalCompositeOperation='lighter';cx.lineJoin='round';
    ribbon(46,'rgba(255,170,70,.16)',t);
    ribbon(26,'rgba(120,205,255,.32)',t);
    ribbon(12,'rgba(200,240,255,.7)',t);
    ribbon(5,'rgba(255,255,255,1)',t);
    cx.globalCompositeOperation='source-over';
  }
  if(ptr.seen&&(mode==='play'||(mode==='dying'&&!bombDeath))){
    const kb=Math.min(1,BR/50)*.9*(1+.28*ptr.hit),sp=Math.min(1,ptr.speed/28);
    const wob=ptr.down?Math.sin(t*42)*.035*sp:Math.sin(t*2.2)*.05;
    /* motion-blur afterimages along the recent path */
    if(ptr.down&&sp>.25)for(let j=3;j>=1;j--){const q=trail[trail.length-1-j*2];if(q)drawKnife(q.x,q.y,ptr.ang,kb,.1*sp*(4-j)/3,t);}
    drawKnife(ptr.x,ptr.y,ptr.ang+wob+ptr.hit*.12,kb,1,t);
    if(ptr.hit>.02){ /* bright flash at the tip when the blade bites */
      cx.globalCompositeOperation='lighter';const gr=cx.createRadialGradient(ptr.x,ptr.y,0,ptr.x,ptr.y,50*ptr.hit+8);
      gr.addColorStop(0,'rgba(255,255,255,'+ptr.hit+')');gr.addColorStop(1,'rgba(255,220,150,0)');
      cx.fillStyle=gr;cx.beginPath();cx.arc(ptr.x,ptr.y,50*ptr.hit+8,0,TAU);cx.fill();
      cx.strokeStyle='rgba(255,255,255,'+ptr.hit+')';cx.lineWidth=2;cx.beginPath();
      for(let i=0;i<4;i++){const a2=i*Math.PI/2+.4,l=34*ptr.hit;cx.moveTo(ptr.x,ptr.y);cx.lineTo(ptr.x+Math.cos(a2)*l,ptr.y+Math.sin(a2)*l);}cx.stroke();
      cx.globalCompositeOperation='source-over';
    }
  }
  /* floating text, pops in with a small overshoot */
  cx.textAlign='center';cx.textBaseline='middle';cx.lineJoin='round';
  for(const s of texts){
    const age=s.max-s.life,sc=backOut(Math.min(1,age/.2));
    cx.save();cx.translate(s.x,s.y);cx.scale(sc,sc);cx.globalAlpha=Math.max(0,Math.min(1,s.life*2.2));
    cx.font='400 '+s.size+'px "Lilita One","Trebuchet MS",system-ui,sans-serif';
    cx.lineWidth=7;cx.strokeStyle='rgba(0,0,0,.55)';cx.strokeText(s.txt,0,0);cx.fillStyle=s.col;cx.fillText(s.txt,0,0);cx.restore();
  }
  cx.globalAlpha=1;cx.restore();
  /* last 10 seconds: pulsing red edges */
  if(mode==='play'&&timeLeft<=10&&timeLeft>0){
    const a=.16+.12*Math.sin(t*6),g=cx.createRadialGradient(W/2,H/2,Math.min(W,H)*.35,W/2,H/2,Math.max(W,H)*.75);
    g.addColorStop(0,'rgba(255,40,60,0)');g.addColorStop(1,'rgba(255,40,60,'+a+')');cx.fillStyle=g;cx.fillRect(0,0,W,H);
  }
  if(flash>0){cx.fillStyle='rgba('+flashCol+','+Math.min(1,flash*.55)+')';cx.fillRect(0,0,W,H);}
}

/* ---------- Loop ---------- */
let last=nowS();
function frame(){
  const t=nowS(),raw=Math.min(.033,t-last);last=t;dtDraw=raw;
  if(timeScale<1)timeScale=Math.min(1,timeScale+raw*.9);
  update(raw*timeScale,raw);draw();requestAnimationFrame(frame);
}

/* ---------- Input ---------- */
function pos(e){const r=cv.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top];}
function moveTo(x,y){
  ptr.px=ptr.x;ptr.py=ptr.y;ptr.x=x;ptr.y=y;ptr.seen=true;
  const dx=x-ptr.px,dy=y-ptr.py,len=Math.hypot(dx,dy);
  ptr.speed=ptr.speed*.6+len*.4;
  if(len>2){
    const a=Math.atan2(dy,dx);let d=a-ptr.ang;while(d>Math.PI)d-=TAU;while(d<-Math.PI)d+=TAU;ptr.ang+=d*.4;
  }
  if(ptr.down){
    trail.push({x,y,t:nowS()});
    ptr.travel+=len;
    if(ptr.travel>90&&nowS()-ptr.swishAt>.28&&mode==='play'){sfx.swish((x/W)*2-1,Math.min(1,len/50));ptr.swishAt=nowS();ptr.travel=0;}
    if(len>0)swipe(ptr.px,ptr.py,x,y);
  }
}
cv.addEventListener('pointerdown',e=>{
  if(soundOn){ac();startAmb();}
  const p=pos(e);ptr.type=e.pointerType;ptr.down=true;ptr.x=ptr.px=p[0];ptr.y=ptr.py=p[1];ptr.seen=true;ptr.travel=0;
  trail=[{x:p[0],y:p[1],t:nowS()}];try{cv.setPointerCapture(e.pointerId);}catch(_){}
  e.preventDefault();
});
cv.addEventListener('pointermove',e=>{const p=pos(e);moveTo(p[0],p[1]);});
function up(e){ptr.down=false;if(e.pointerType==='touch'||e.type==='pointercancel')ptr.seen=ptr.type==='mouse'?ptr.seen:false;}
cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
cv.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')ptr.seen=false;});
cv.addEventListener('contextmenu',e=>e.preventDefault());

$('play').addEventListener('click',startGame);
const snd=$('snd');
snd.addEventListener('click',()=>{soundOn=!soundOn;snd.setAttribute('aria-pressed',String(soundOn));if(soundOn){ac();sfx.ui();}if(ambGain)ambGain.gain.value=soundOn?.55:0;});
window.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!overlay.hidden&&document.activeElement!==$('play')){e.preventDefault();startGame();}});
window.addEventListener('resize',resize);
if(window.ResizeObserver)new ResizeObserver(resize).observe(app);

resize();hud();
frame();
})();
