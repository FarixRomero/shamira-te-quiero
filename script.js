const messages = [
  'Me gusta muchísimo cómo piensas.',
  'Me encanta bailar contigo.',
  'Gracias por estar conmigo.',
  'Tu sonrisa hace bonito cualquier día.',
  'Contigo, hasta lo simple se siente especial.'
];
const positions = [
  { left: '7%', bottom: '3%', scale: .78 }, { left: '28%', bottom: '15%', scale: 1 },
  { left: '50%', bottom: '3%', scale: .85 }, { left: '68%', bottom: '18%', scale: .92 },
  { left: '79%', bottom: '1%', scale: .7 }
];
const intro = document.querySelector('#intro'), garden = document.querySelector('#garden');
const bouquet = document.querySelector('#bouquet'), finale = document.querySelector('#finale');
const plot = document.querySelector('#plot'), bed = document.querySelector('#flower-bed');
const count = document.querySelector('#flower-count'), prompt = document.querySelector('#prompt');
const card = document.querySelector('#message-card'), message = document.querySelector('#message-text');
const flowerTemplate = document.querySelector('#flower-template');
let planted = 0, locked = false;
function show(screen) { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); screen.classList.add('active'); }
function plant() {
  if (locked || planted >= messages.length) return;
  locked = true;
  document.querySelector('#tap-circle').classList.add('hidden');
  const flower = flowerTemplate.content.firstElementChild.cloneNode(true), p = positions[planted];
  flower.style.left = p.left; flower.style.bottom = p.bottom; flower.style.transform = `scale(${p.scale})`;
  bed.append(flower); message.textContent = messages[planted]; card.classList.add('show');
  planted++; count.textContent = planted;
  prompt.textContent = planted === messages.length ? 'Mira lo que hicimos crecer…' : 'Toca otra vez para plantar una más.';
  setTimeout(() => { locked = false; if (planted === messages.length) setTimeout(showBouquet, 1150); }, 700);
}
function showBouquet(){
  show(bouquet); const art = document.querySelector('#bouquet-art'); art.innerHTML = '';
  positions.forEach((p, i) => { const f = flowerTemplate.content.firstElementChild.cloneNode(true); f.style.left = `${(i * 42) + 4}px`; f.style.bottom = `${i % 2 ? 11 : 0}px`; f.style.transform = `scale(${.74 + (i % 2) * .12})`; f.style.animationDelay = `${i * .1}s`; art.append(f); });
}
document.querySelector('#start-button').onclick = () => show(garden);
plot.onclick = plant; plot.onkeydown = e => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); plant(); } };
document.querySelector('#more-button').onclick = () => show(finale);
document.querySelector('#restart-button').onclick = () => { planted=0; locked=false; bed.innerHTML=''; count.textContent=0; card.classList.remove('show'); prompt.textContent='Toca la tierra para plantar la primera.'; document.querySelector('#tap-circle').classList.remove('hidden'); show(intro); };
const canvas = document.querySelector('#petals'), ctx = canvas.getContext('2d'); let petals=[];
function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.scale(devicePixelRatio,devicePixelRatio)}
function addPetal(){petals.push({x:Math.random()*innerWidth,y:-12,s:3+Math.random()*4,v:0.35+Math.random()*.5,w:(Math.random()-.5)*.5,r:Math.random()*6.28})}
function draw(){ctx.clearRect(0,0,innerWidth,innerHeight); if(Math.random()<.025 && petals.length<18)addPetal(); petals=petals.filter(p=>p.y<innerHeight+20); petals.forEach(p=>{p.y+=p.v;p.x+=p.w;p.r+=.018;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle='#f4c830bb';ctx.beginPath();ctx.ellipse(0,0,p.s,p.s*.55,0,0,Math.PI*2);ctx.fill();ctx.restore()});requestAnimationFrame(draw)}
addEventListener('resize',resize);resize();draw();
